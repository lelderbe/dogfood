export {};

declare global {
	interface IProducts {
		products: IProduct[];
		length: number;
	}

	interface IProduct {
		updatedAt?: string;
		wight?: string;
		categoryId?: number;
		userId?: string;
		images: string;
		description: string;
		id: string;
		name: string;
		price: number;
		createdAt: string;
		slug: string;
		discount: number;
		isPublished: boolean;
		stock: number;
		tags: string[];
		category?: ICategory;
		likes?: ILike[];
		reviews?: IReview[];
		user?: IUser;
	}

	interface ICategory {
		id: number;
		name: string;
		slug: string;
	}

	interface ILike {
		id: string;
		userId: string;
		productId: string;
		user?: IUser;
		product?: IProduct;
	}

	interface IUser {
		id: string;
		createdAt?: string;
		updatedAt?: string;
		email: string;
		password?: string;
		provider?: any; //null,
		isAdmin?: boolean;
		isBlocked?: boolean;
		name: string;
		avatarPath: string;
		about: string;
		phone: string;
		roles: string[];
		likes?: ILike[];
		favoritesPost?: IFavoritesPosts[];
	}

	interface IFavoritesPosts {
		id: string;
		userId: string;
		postId: string;
		post?: IPost;
	}

	interface IPost {
		id: string;
		createdAt: string;
		updatedAt: string;
		title: string;
		slug: string;
		description: string;
		body: string;
		images: string;
		tags: string[];
		isPublished: boolean;
		favoritesCount: number;
		userId: string;
	}

	interface IReview {
		user: IUser;
		createdAt: string;
		text: string;
		rating: number;
		id: string;
		product: IProduct;
	}
}
