import { CartItem } from '../store/slices/cart-slice';

export const isLikedByUser = (likes: ILikeUser[] | undefined, userId: string | undefined) =>
	likes?.some((like) => like.userId === userId) || false;

export const isLiked = (likes: ILikeUser[] | undefined, productId: string | undefined) =>
	likes?.some((like) => like.productId === productId) || false;

export function getLocaleDate(date: string) {
	return new Date(date).toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});
}

export async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getCartCount(cart: CartItem[]) {
	return cart.reduce((acc, item) => acc + item.count, 0);
}

export function words(count: number, words: string[]) {
	let index = 2;
	if (count % 10 === 1 && count % 100 !== 11) {
		index = 0;
	} else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
		index = 1;
	}
	return words[index];
}
