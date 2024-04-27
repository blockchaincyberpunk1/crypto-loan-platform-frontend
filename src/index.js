import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import for React 18
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import App from './App';
import { store } from './redux/store'; // Import the configured Redux store

/**
 * This is the entry point of the React application. It renders the main App component 
 * within a Redux Provider to enable Redux state management throughout the application. 
 * Bootstrap's CSS is also imported globally here to ensure it is available in all components.
 */
const container = document.getElementById('root'); // Get the root container
const root = createRoot(container); // Create a root

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
