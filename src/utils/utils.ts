export const isLiked = (likes: ILikeUser[] | undefined, userId: string | undefined) =>
	likes?.some((like) => like.userId === userId) || false;
