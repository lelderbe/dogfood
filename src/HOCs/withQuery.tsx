import { ComponentType, FC } from 'react';
import { Container, Alert, Button, AlertTitle, Box, CircularProgress } from '@mui/material';

interface WithQueryProps {
	isLoading: boolean;
	isError: boolean;
	queryErrorMsg: string;
	refetch: () => void;
}

export const withQuery = <WrappedComponentProps extends object>(
	WrappedComponent: ComponentType<WrappedComponentProps>
) => {
	const ReturnedComponent: FC<WrappedComponentProps & WithQueryProps> = (props) => {
		const { isLoading, isError, queryErrorMsg, refetch, ...rest } = props;

		// Ошибки часто возникают при сетевых взаимодействия,
		// нужно быть к ним готовым
		if (isError) {
			return (
				<Container maxWidth='sm'>
					<Alert
						action={
							<Button onClick={refetch} color='inherit' size='small'>
								Refetch
							</Button>
						}
						severity='error'>
						<AlertTitle>Error</AlertTitle>
						{queryErrorMsg}
					</Alert>
				</Container>
			);
		}

		// Если ошибки нет, но запрос еще не завершен, то мы показываем
		// индикатор загрузки. Чтобы конечный пользователь понимал, что
		// наше приложение не зависло и скоро покажет данные
		if (isLoading) {
			return (
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<CircularProgress />
				</Box>
			);
		}

		return <WrappedComponent {...(rest as WrappedComponentProps)} />;
	};

	ReturnedComponent.displayName = `withQuery${WrappedComponent.displayName}`;

	return ReturnedComponent;
};
