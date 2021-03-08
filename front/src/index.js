import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    QueryClient,
    QueryClientProvider
} from 'react-query';

// Create a client
const queryClient = new QueryClient()

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
