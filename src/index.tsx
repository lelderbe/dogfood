import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import store from './store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Provider store={store}>
					<App />
					<ToastContainer
						position='top-right'
						autoClose={5000}
						newestOnTop={true}
						pauseOnFocusLoss={false}
						theme='colored'
					/>
				</Provider>
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>
);
