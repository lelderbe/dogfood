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
