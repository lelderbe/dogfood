import { config } from './config';

type TConfigApi = {
	baseUrl: string;
	headers: HeadersInit;
};

type ProductListResponse = {
	products: IProduct[];
	length: number;
};

export type UserUpdateDto = Partial<Omit<IUser, 'favoritesPost' | 'id'> & { password: string }>;

export type SearchParams = {
	searchTerm?: string;
};

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

		return this.onResponse<T>(res);
	}

	async getAllInfo(): Promise<[ProductListResponse, IUser]> {
		return Promise.all([this.getProductsList({}), this.getUserInfo()]);
	}

	async getUserInfo() {
		return this.request<IUser>('/users/me');
	}

	async getProductsList(searchQuery: SearchParams) {
		const searchParams = new URLSearchParams(searchQuery);
		return this.request<ProductListResponse>(`/products?${searchParams}`);
	}

	async setUserInfo(userData: UserUpdateDto) {
		return this.request<IUser>('/users/me/', {
			method: 'PATCH',
			body: JSON.stringify(userData),
		});
	}

	async changeLikeProductStatus(productID: string, isProductLiked: boolean) {
		return this.request<TProductLikeResponse>(`/products/${productID}/likes`, {
			method: isProductLiked ? 'DELETE' : 'PUT',
		});
	}

	async getProductById(productID: string) {
		return this.request<IProduct>(`/products/${productID}`);
	}
}

const api = new Api({
	baseUrl: config.apiUrl,
	headers: {
		'content-type': 'application/json',
		authorization: `Bearer ${config.apiToken}`,
	},
});

export default api;
