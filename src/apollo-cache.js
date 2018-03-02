import { InMemoryCache } from "apollo-cache-inmemory";
import { toIdValue } from "apollo-utilities";

export default function createApolloCache() {
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

    return cache;
}
