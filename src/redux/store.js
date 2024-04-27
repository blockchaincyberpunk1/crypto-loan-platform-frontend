import { configureStore } from '@reduxjs/toolkit';
import loanReducer from './loanSlice'; // Assuming loanSlice contains your reducer logic

/**
 * Configures and returns the Redux store for the application.
 * Includes `loanReducer` to manage the state of loans within the application.
 * Utilizes Redux Toolkit's `configureStore` for simplified configuration,
 * which automatically sets up the Redux DevTools extension and thunk middleware.
 * 
 * @returns {object} The configured Redux store
 */
function setupStore() {
  try {
    const store = configureStore({
      reducer: {
        loans: loanReducer, // Mount the loan reducer under the 'loans' key
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });

    return store;
  } catch (error) {
    console.error("Failed to configure store:", error);
    throw new Error("Store configuration failed"); // Propagate the error
  }
}

export const store = setupStore(); // Export the store for use in the application
