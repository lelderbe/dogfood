import FavoritesPage from '../pages/favorites';
import HomePage from '../pages/home';
import NotFoundPage from '../pages/not-found';
import ProductsPage from '../pages/products';
import ProfilePage from '../pages/profile';
import ProfileEditPage from '../pages/profile-edit';
import ReviewPage from '../pages/review';
import { SignInPage } from '../pages/signIn/signInPage';
import { SignUpPage } from '../pages/signUp/signUpPage';
import SingleProductPage from '../pages/single-product';

export const paths = {
	home: '/',
	profile: '/profile',
	editProfile: '/profile/edit',
	favorites: '/favorites',
	products: '/products',
	singleProduct: '/products/:id',
	review: '/reviews/leave/:id',
	signUp: '/signup',
	login: '/login',
};

export const routes = [
	{
		path: paths.home,
		element: <HomePage />,
	},
	{
		path: paths.profile,
		element: <ProfilePage />,
	},
	{
		path: paths.editProfile,
		element: <ProfileEditPage />,
	},
	{
		path: paths.favorites,
		element: <FavoritesPage />,
	},
	{
		path: paths.products,
		element: <ProductsPage />,
	},
	{
		path: paths.singleProduct,
		element: <SingleProductPage />,
	},
	{
		path: paths.review,
		element: <ReviewPage />,
	},
	{
		path: paths.signUp,
		element: <SignUpPage />,
	},
	{
		path: paths.login,
		element: <SignInPage />,
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
];
