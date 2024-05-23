import { createContext } from 'react';

export const ProductsContext = createContext<IProductsContext | null>(null);

export interface IProductsContext {
	products: IProduct[];
	onProductLike: (productData: IProductLikeParams) => Promise<IProduct | undefined>;
}

ProductsContext.displayName = 'ProductsContext2';
