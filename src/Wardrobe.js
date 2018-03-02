import React from "react";
import { StyleSheet, Image, StatusBar, View } from "react-native";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { DEFAULT_ITEM_IDS, BODY_ID } from "./hardcoded-data";
import Closet from "./closet/Closet";
import PetPreview from "./PetPreview";

export default class Wardrobe extends React.PureComponent {
    constructor(props) {
        super(props);

        const closetRecords = {};
        for (const itemId of DEFAULT_ITEM_IDS) {
            closetRecords[itemId] = "wearing";
        }

        this.state = { closetRecords };
    }

    _handleWearItem = item => {
        this.setState(({ closetRecords }) => ({
            closetRecords: {
                ...closetRecords,
                [item.id]: "wearing",
            },
        }));
    };

    _handleUnwearItem = item => {
        this.setState(({ closetRecords }) => ({
            closetRecords: {
                ...closetRecords,
                [item.id]: "not-wearing",
            },
        }));
    };

    render() {
        return (
            <WardrobeView
                closetRecords={this.state.closetRecords}
                onAddItem={this._handleWearItem}
                wearItem={this._handleWearItem}
                unwearItem={this._handleUnwearItem}
            />
        );
    }
}

function WardrobeView({
    data,
    closetRecords,
    onAddItem,
    wearItem,
    unwearItem,
}) {
    return (
        <View style={styles.container}>
            <View style={styles.petPreview}>
                <PetPreview data={data} closetRecords={closetRecords} />
            </View>
            <View style={styles.closet}>
                <Closet
                    bodyId={BODY_ID}
                    closetRecords={closetRecords}
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
    options: ({ closetRecords }) => ({
        variables: {
            itemIds: Object.keys(closetRecords),
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
