import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import * as serviceWorker from './serviceWorker';

import App from './components/App/component';

// Wrap the rendering in a function:
const render = () => {
    ReactDOM.render(
        // Wrap App inside AppContainer
        <AppContainer>
            <App />
        </AppContainer>,
        document.getElementById('root')
    );
};

serviceWorker.unregister();

// Render once
render();

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/App/component', () => {
        render();
    });
}