import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

// utils
import { AUTH_TOKEN } from './constants';


const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ''
        }
    };
});

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;
