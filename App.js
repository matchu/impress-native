import React from "react";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import Wardrobe from "./src/Wardrobe";

const client = new ApolloClient({
    link: new HttpLink({ uri: "http://192.168.1.249/graphql" }),
    cache: new InMemoryCache(),
});

export default class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Wardrobe />
            </ApolloProvider>
        );
    }
}
