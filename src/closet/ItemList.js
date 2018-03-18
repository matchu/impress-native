import React from "react";
import {
    StyleSheet,
    FlatList,
    Image,
    Text,
    TouchableNativeFeedback,
    View,
} from "react-native";
import { material, materialColors } from "react-native-typography";

import {
    CONTAINER_PADDING,
    THUMBNAIL_SIZE,
    THUMBNAIL_RIGHT_MARGIN,
    TEXT_STARTS_AT,
} from "./util";

export default class ItemList extends React.PureComponent {
    static defaultProps = {
        onPressItem: () => {},
    };

    _renderItemRow = ({ item }) => {
        const itemIsWorn = this.props.outfit.isWearing(item.id);

        // HACK: If this item is a background, it probably has a full-bleed
        //     thumbnail. In a ring, it looks better without shrinking too much.
        const itemIsBackground = item.swfAssets.some(sa => sa.zone.id === "3");

        return (
            <TouchableNativeFeedback
                onPress={() => this.props.onPressItem(item)}
            >
                <View style={styles.itemRow}>
                    <View
                        style={[
                            styles.thumbnailWrapper,
                            !itemIsWorn && styles.unwornThumbnailWrapper,
                        ]}
                    >
                        <Image
                            source={{ uri: item.thumbnailUrl }}
                            style={[
                                itemIsWorn && styles.wornThumbnail,
                                !itemIsWorn && styles.unwornThumbnail,
                                !itemIsWorn &&
                                    itemIsBackground &&
                                    styles.unwornBackgroundThumbnail,
                            ]}
                        />
                    </View>
                    <View>
                        <Text
                            style={[
                                material.subheading,
                                !itemIsWorn && styles.unwornItemName,
                            ]}
                        >
                            {item.name}
                        </Text>
                        {item.swfAssets.length && (
                            <Text
                                style={[
                                    styles.itemInfo,
                                    !itemIsWorn && styles.unwornItemInfo,
                                ]}
                            >
                                {item.swfAssets[0].zone.label}
                            </Text>
                        )}
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    };

    render() {
        return (
            <FlatList
                style={styles.itemList}
                data={this.props.items}
                keyExtractor={item => item.id}
                renderItem={this._renderItemRow}
                ItemSeparatorComponent={ItemRowDivider}
            />
        );
    }
}

function ItemRowDivider() {
    return <View style={styles.itemRowDivider} />;
}

const RING_WIDTH = 2;
const RINGED_THUMBNAIL_SIZE = 32;

const styles = StyleSheet.create({
    itemList: {
        paddingBottom: 16,
    },

    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        minHeight: 72,
        paddingLeft: CONTAINER_PADDING,
        paddingRight: CONTAINER_PADDING,
    },

    unwornItemName: {
        color: materialColors.blackSecondary,
    },

    itemInfo: {
        ...material.body1Object,
        color: materialColors.blackSecondary,
    },

    unwornItemInfo: {
        color: materialColors.blackTertiary,
    },

    itemRowDivider: {
        marginLeft: TEXT_STARTS_AT,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0, 0, 0, .12)",
    },

    thumbnailWrapper: {
        height: THUMBNAIL_SIZE,
        width: THUMBNAIL_SIZE,
        marginRight: THUMBNAIL_RIGHT_MARGIN,

        alignItems: "center",
        justifyContent: "center",
    },

    unwornThumbnailWrapper: {
        backgroundColor: "white",
        borderRadius: THUMBNAIL_SIZE,
        borderWidth: RING_WIDTH,
        borderColor: "#E0E0E0", // Gray 300
        overflow: "hidden",
    },

    wornThumbnail: {
        height: THUMBNAIL_SIZE,
        width: THUMBNAIL_SIZE,
    },

    unwornThumbnail: {
        height: RINGED_THUMBNAIL_SIZE,
        width: RINGED_THUMBNAIL_SIZE,
        opacity: 0.8,
    },

    unwornBackgroundThumbnail: {
        height: THUMBNAIL_SIZE - RING_WIDTH,
        width: THUMBNAIL_SIZE - RING_WIDTH,
    },
});
