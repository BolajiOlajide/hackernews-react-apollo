import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';

import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import client from './utils/ApolloClient';


const Main = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
