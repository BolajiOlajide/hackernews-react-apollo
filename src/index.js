import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import client from './utils/ApolloClient';


ReactDOM.render(<ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
