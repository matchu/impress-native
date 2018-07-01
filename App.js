import { ApolloProvider } from "react-apollo";
import React from "react";

import apolloClient from "./src/apollo-client";
import Wardrobe from "./src/Wardrobe";

export default class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={apolloClient}>
                <Wardrobe />
            </ApolloProvider>
        );
    }
}
