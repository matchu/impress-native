import React from "react";
import { StyleSheet, Image, StatusBar, View } from "react-native";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { DEFAULT_ITEM_IDS, BODY_ID } from "./hardcoded-data";
import Closet from "./closet/Closet";
import createOutfit from "./Outfit";
import PetPreview from "./PetPreview";

export default class Wardrobe extends React.PureComponent {
    state = { outfit: createOutfit(DEFAULT_ITEM_IDS) };

    _handleWearItem = item => {
        this.setState(({ outfit }) => ({
            outfit: outfit.wearItem(item),
        }));
    };

    _handleUnwearItem = item => {
        this.setState(({ outfit }) => ({
            outfit: outfit.unwearItem(item),
        }));
    };

    render() {
        return (
            <WardrobeView
                outfit={this.state.outfit}
                wearItem={this._handleWearItem}
                unwearItem={this._handleUnwearItem}
            />
        );
    }
}

function WardrobeView({ data, outfit, onAddItem, wearItem, unwearItem }) {
    return (
        <View style={styles.container}>
            <View style={styles.petPreview}>
                <PetPreview data={data} outfit={outfit} />
            </View>
            <View style={styles.closet}>
                <Closet
                    bodyId={BODY_ID}
                    outfit={outfit}
                    data={data}
                    onAddItem={onAddItem}
                    onWearItem={wearItem}
                    onUnwearItem={unwearItem}
                />
            </View>
        </View>
    );
}
const ItemsForWardrobe = gql`
    query ItemsForWardrobe($itemIds: [ID!]!, $bodyId: Int!) {
        items(ids: $itemIds) {
            id
            name
            thumbnailUrl

            swfAssets(bodyId: $bodyId) {
                id
                largeImageUrl
                zone {
                    label
                    depth
                }
            }
        }
    }
`;
WardrobeView = graphql(ItemsForWardrobe, {
    options: ({ outfit }) => ({
        variables: {
            itemIds: outfit.allItemIds,
            bodyId: BODY_ID,
        },
    }),
})(WardrobeView);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#212121",
        flex: 1,
        alignItems: "stretch",
        paddingTop: StatusBar.currentHeight,
    },

    petPreview: {
        height: 300,
    },

    closet: {
        backgroundColor: "white",
        flex: 1,
    },
});
