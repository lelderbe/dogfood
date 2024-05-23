import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import store from './store/store';
import { Provider } from 'react-redux';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>
);
