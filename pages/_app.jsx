import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from '@apollo/client';

import '../src/styles/globals.scss';

import {AppHeader} from '../src/components/AppHeader';

const httpLink = createHttpLink({
    uri: '/api/graphql'
});


const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

const MyApp = ({Component, pageProps}) => {

    return (
        <ApolloProvider client={client}>
            <AppHeader />
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default MyApp;