import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { IMPRESS_GRAPHQL_URL } from "react-native-dotenv";
import React from "react";

import createApolloCache from "./src/apollo-cache";
import Wardrobe from "./src/Wardrobe";

const client = new ApolloClient({
    link: new HttpLink({ uri: IMPRESS_GRAPHQL_URL }),
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
