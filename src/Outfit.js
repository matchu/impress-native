/**
 * A class for managing outfit data! What is the pet wearing? How does it look?
 */
import { BIOLOGY_ASSETS } from "./hardcoded-data";

class Outfit {
    constructor(allItemIds, wornItemIds) {
        this.allItemIds = allItemIds;
        this.wornItemIds = wornItemIds;
    }

    getAssets(outfitData) {
        // First, organize the incoming item data by ID.
        const itemsById = {};
        for (const item of outfitData.items) {
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

    isCloseted(itemId) {
        return this.allItemIds.includes(itemId);
    }

    isWearing(itemId) {
        return this.wornItemIds.includes(itemId);
    }

    wearItem(newItem, outfitData) {
        let allItemIds = this.allItemIds;
        let wornItemIds = this.wornItemIds;

        // First, prepare to unwear items that conflict with this item's zones.
        // Organize the incoming items by ID.
        const itemsById = {};
        for (const item of outfitData.items) {
            itemsById[item.id] = item;
        }

        // Then, unwear items that occupy the same zones as this item, by
        // filtering to items that don't conflict.
        const occupiedZoneIds = newItem.swfAssets.map(sa => sa.zone.id);
        wornItemIds = wornItemIds.filter(otherItemId => {
            // Does the other item have any assets whose zone is one of the
            // newly occupied zones? If so, they conflict.
            const otherItem = itemsById[otherItemId];
            const hasConflicts = otherItem.swfAssets.some(sa =>
                occupiedZoneIds.includes(sa.zone.id),
            );
            return !hasConflicts;
        });

        // Then, closet the item if it's not yet.
        if (!this.isCloseted(newItem.id)) {
            allItemIds = allItemIds.concat([newItem.id]);
        }

        // Then, wear the item if it's not yet.
        if (!this.isWearing(newItem.id)) {
            wornItemIds = wornItemIds.concat([newItem.id]);
        }

        return new Outfit(allItemIds, wornItemIds);
    }

    unwearItem(itemId) {
        return new Outfit(
            this.allItemIds,
            this.wornItemIds.filter(id => id !== itemId),
        );
    }
}

export default function createOutfit(initialItemIds) {
    return new Outfit(initialItemIds, initialItemIds);
}
