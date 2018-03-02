/**
 * A class for managing outfit data! What is the pet wearing? How does it look?
 */
import { BIOLOGY_ASSETS } from "./hardcoded-data";

class Outfit {
    constructor(allItemIds, wornItemIds) {
        this.allItemIds = allItemIds;
        this.wornItemIds = wornItemIds;
    }

    getAssets(itemData) {
        // First, organize the incoming item data by ID.
        const itemsById = {};
        for (const item of itemData) {
            itemsById[item.id] = item;
        }

        // Next, iterate over our list of worn item IDs, and get each worn
        // item's assets from the incoming item data. Add them to the full list
        // of assets, which is already initialized with biology assets.
        const assets = [...BIOLOGY_ASSETS];
        for (const itemId of this.wornItemIds) {
            const item = itemsById[itemId];
            if (!item) {
                console.warn(`No item data found for item ID ${itemId}`);
                continue;
            }
            assets.push(...item.swfAssets);
        }

        // Finally, sort all the assets by zone.
        assets.sort((a, b) => {
            if (a.zone.depth < b.zone.depth) {
                return -1;
            } else if (a.zone.depth > b.zone.depth) {
                return 1;
            } else {
                return 0;
            }
        });

        return assets;
    }

    isCloseted(item) {
        return this.allItemIds.includes(item.id);
    }

    isWearing(item) {
        return this.wornItemIds.includes(item.id);
    }

    wearItem(item) {
        let allItemIds = this.allItemIds;
        let wornItemIds = this.wornItemIds;

        if (!this.isCloseted(item)) {
            allItemIds = allItemIds.concat([item.id]);
        }

        if (!this.isWearing(item)) {
            wornItemIds = wornItemIds.concat([item.id]);
        }

        return new Outfit(allItemIds, wornItemIds);
    }

    unwearItem(item) {
        return new Outfit(
            this.allItemIds,
            this.wornItemIds.filter(id => id !== item.id),
        );
    }
}

export default function createOutfit(initialItemIds) {
    return new Outfit(initialItemIds, initialItemIds);
}
