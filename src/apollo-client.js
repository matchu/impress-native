import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { toIdValue } from "apollo-utilities";

import { IMPRESS_GRAPHQL_URL } from "react-native-dotenv";

const cache = new InMemoryCache({
    cacheRedirects: {
        Query: {
            // The `items` query is just a simple read of item data. Before
            // asking the server, first try to read the corresponding
            // records from the cache. (This means no extra queries when we
            // move an item from search results to closet!)
            items: (_, args) => {
                return args.ids.map(id =>
                    toIdValue(
                        cache.config.dataIdFromObject({
                            __typename: "Item",
                            id,
                        }),
                    ),
                );
            },
        },
    },
});

const client = new ApolloClient({
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
                            locations,
                        )}, Path: ${path}`,
                    ),
                );
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        new HttpLink({ uri: IMPRESS_GRAPHQL_URL }),
    ]),
    cache,
});

export default client;
