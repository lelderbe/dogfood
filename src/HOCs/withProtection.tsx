import { ComponentType, FC } from 'react';
import { useLocation, Navigate } from 'react-router';
import { useAppSelector } from '../store/hooks';
import { authSelectors } from '../store/slices/auth-slice';
import { paths } from '../app/routes';

export const withProtection = <WrappedComponentProps extends object>(
	WrappedComponent: ComponentType<WrappedComponentProps>
) => {
	const ReturnedComponent: FC<WrappedComponentProps> = (props) => {
		// Достаем accessToken из redux'a
		const accessToken = useAppSelector(authSelectors.accessTokenSelector);
		// Объект location нам понадобится для задания состояния при redirect'e
		const location = useLocation();

		// Если токен пустой, то нужно отправить пользователя на странице входа в систему
		if (!accessToken) {
			return (
				<Navigate
					to={paths.login}
					// при этом мы передаем состояние, в котором указываем, какую
					// страницу хотел посетить пользователь. И если он в дальнейшем
					// войдет в систему, то мы его автоматически перебросим на желаемую страницу
					state={{
						from: location.pathname,
					}}
				/>
			);
		}

		return <WrappedComponent {...props} />;
	};

	// У каждого компонента должно быть имя. Это поможет нам, когда будем использовать
	// dev tools'ы реакта
	ReturnedComponent.displayName = `withProtection${WrappedComponent.displayName}`;

	return ReturnedComponent;
};
