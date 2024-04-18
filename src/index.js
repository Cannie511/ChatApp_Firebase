import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './components/Context/AuthProvider';
import AppProvider from './components/Context/AppProvider';
library.add(fas, faTwitter, faFontAwesome, faFacebook, faGoogle)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
