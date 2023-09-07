import HomePage from './pages/home/HomePage';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './store/store';
function App() {
    return (
        <main>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <RouterProvider router={router}/>
                </PersistGate>
            </Provider>
        </main>
    );
}

export default App;
