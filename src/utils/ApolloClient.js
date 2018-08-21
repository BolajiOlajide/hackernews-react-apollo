import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

// utils
import { AUTH_TOKEN } from './constants';


const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000`,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem(AUTH_TOKEN),
        }
    }
});

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

const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    authLink.concat(httpLink)
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

export default client;
