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
import AuthStore from './authStore';


// Create a client
const queryClient = new QueryClient()

ReactDOM.render(
    <AuthStore>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </QueryClientProvider>
    </AuthStore>,

    document.getElementById('root')
);

reportWebVitals();
