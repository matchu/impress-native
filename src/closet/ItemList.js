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
        shouldCrossOutItem: () => false,
    };

    _renderItemRow = ({ item }) => {
        const shouldCrossOut = this.props.shouldCrossOutItem(item);

        return (
            <TouchableNativeFeedback
                onPress={() => this.props.onPressItem(item)}
            >
                <View style={styles.itemRow}>
                    <Image
                        source={{ uri: item.thumbnailUrl }}
                        style={styles.thumbnail}
                    />
                    <View>
                        <Text
                            style={[
                                material.subheading,
                                shouldCrossOut && styles.crossedOutItemName,
                            ]}
                        >
                            {item.name}
                        </Text>
                        {item.swfAssets.length && (
                            <Text
                                style={[
                                    styles.itemInfo,
                                    shouldCrossOut && styles.crossedOutItemInfo,
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

    itemInfo: {
        ...material.body1Object,
        color: materialColors.blackSecondary,
    },

    crossedOutItemName: {
        color: materialColors.blackTertiary,
        textDecorationLine: "line-through",
    },

    crossedOutItemInfo: {
        color: materialColors.blackTertiary,
        textDecorationLine: "line-through",
    },

    itemRowDivider: {
        marginLeft: TEXT_STARTS_AT,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0, 0, 0, .12)",
    },

    thumbnail: {
        height: THUMBNAIL_SIZE,
        width: THUMBNAIL_SIZE,
        marginRight: THUMBNAIL_RIGHT_MARGIN,
    },
});
