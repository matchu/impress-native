import React from "react";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";

import createApolloCache from "./src/apollo-cache";
import Wardrobe from "./src/Wardrobe";

const client = new ApolloClient({
    link: new HttpLink({ uri: "http://192.168.1.249/graphql" }),
    cache: createApolloCache(),
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
