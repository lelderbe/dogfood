import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import store, { persistor } from './store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<App />
						<ToastContainer
							position='top-right'
							autoClose={5000}
							newestOnTop={true}
							pauseOnFocusLoss={false}
							theme='colored'
						/>
					</PersistGate>
				</Provider>
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>
);
