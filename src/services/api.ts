import { config } from './config';

type TConfigApi = {
	baseUrl: string;
	headers: HeadersInit;
};

type ProductListResponse = {
	products: IProduct[];
	length: number;
};

// type ProductCreateDto = Pick<IProduct, 'name' | 'images' | 'tags' | 'price' | 'description'>;

type UserUpdateDto = Partial<Omit<IUser, 'favoritesPost' | 'id'> & { password: string }>;

type TProductLikeResponse = {
	message: string;
	like: ILike;
};

export class Api {
	private baseUrl;
	private headers;

	constructor({ baseUrl, headers }: TConfigApi) {
		this.baseUrl = baseUrl;
		this.headers = headers;
	}

	private async onResponse<T>(res: Response): Promise<T> {
		return res.ok ? res.json() : res.json().then((data) => Promise.reject(data));
	}

	private async request<T>(endpoint: string, options?: RequestInit) {
		const res = await fetch(`${this.baseUrl}${endpoint}`, {
			method: 'GET',
			...options,
			headers: { ...this.headers, ...options?.headers },
		});

		return await this.onResponse<T>(res);
	}

	async getAllInfo(): Promise<[ProductListResponse, IUser]> {
		return await Promise.all([this.getProductsList(), this.getUserInfo()]);
	}

	async getUserInfo() {
		return await this.request<IUser>('/users/me');
	}

	async getProductsList(searchQuery?: string) {
		return await this.request<ProductListResponse>(`/products?${searchQuery}`);
	}

	// async getCommentsByPost(postID: string) {
	// 	return await this.request<CommentPost>(`/comments/${postID}`);
	// }

	async setUserInfo(userData: UserUpdateDto) {
		return await this.request<IUser>('/users/me/', {
			method: 'PATCH',
			body: JSON.stringify(userData),
		});
	}

	async changeLikeProductStatus(productID: string, isProductLiked: boolean) {
		return await this.request<TProductLikeResponse>(`/products/${productID}/likes`, {
			method: isProductLiked ? 'DELETE' : 'PUT',
		});
	}

	async getProductById(productID: string) {
		return await this.request<IProduct>(`/products/${productID}`);
	}

	// async deletePostById(postID: string) {
	// 	return await this.request<Post>(`/posts/${postID}`, { method: 'DELETE' });
	// }

	// async addPost(postData: PostCreateDto) {
	// 	return await this.request<Post>('/posts', {
	// 		method: 'POST',
	// 		body: JSON.stringify(postData),
	// 	});
	// }
}

const api = new Api({
	baseUrl: config.apiUrl,
	headers: {
		'content-type': 'application/json',
		authorization: `Bearer ${config.apiToken}`,
	},
});

export default api;
