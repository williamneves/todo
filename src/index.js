import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'flowbite';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<RecoilRoot>
			<BrowserRouter>
				<App />
				<Toaster />
			</BrowserRouter>
		</RecoilRoot>
	</React.StrictMode>
);