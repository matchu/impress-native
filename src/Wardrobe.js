import React from "react";
import { StyleSheet, Image, StatusBar, View } from "react-native";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { DEFAULT_ITEM_IDS, BODY_ID } from "./hardcoded-data";
import Closet from "./closet/Closet";
import PetPreview from "./PetPreview";

class Wardrobe extends React.PureComponent {
    state = { wornItemIds: DEFAULT_ITEM_IDS };

    _handleWearItem = item => {
        this.setState(({ wornItemIds }) => ({
            wornItemIds: wornItemIds.concat([item.id]),
        }));
    };

    _handleUnwearItem = item => {
        this.setState(({ wornItemIds }) => ({
            wornItemIds: wornItemIds.filter(id => id !== item.id),
        }));
    };

    render() {
        const { wornItemIds } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.petPreview}>
                    <PetPreview
                        data={this.props.data}
                        wornItemIds={wornItemIds}
                    />
                </View>
                <View style={styles.closet}>
                    <Closet
                        bodyId={BODY_ID}
                        data={this.props.data}
                        wornItemIds={wornItemIds}
                        wearItem={this._handleWearItem}
                        unwearItem={this._handleUnwearItem}
                    />
                </View>
            </View>
        );
    }
}

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

export default graphql(ItemsForWardrobe, {
    options: {
        variables: {
            itemIds: DEFAULT_ITEM_IDS,
            bodyId: BODY_ID,
        },
    },
})(Wardrobe);
