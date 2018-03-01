import React from "react";
import {
    StyleSheet,
    FlatList,
    Image,
    Text,
    TextInput,
    ToolbarAndroid,
    TouchableNativeFeedback,
    View,
} from "react-native";
import { material, materialColors } from "react-native-typography";

export default class Closet extends React.PureComponent {
    state = { tab: "main" };

    _goToSearch = () => {
        this.setState({ tab: "search" });
    };

    _goToMain = () => {
        this.setState({ tab: "main" });
    };

    render() {
        if (this.state.tab === "main") {
            return <ClosetMain {...this.props} onSearch={this._goToSearch} />;
        } else if (this.state.tab === "search") {
            return <ClosetSearch {...this.props} onExit={this._goToMain} />;
        } else {
            throw new Error(`unexpected tab ${this.state.tab}`);
        }
    }
}

class ClosetMain extends React.PureComponent {
    _handleSearch = () => {
        this.props.onSearch();
    };

    _toggleItem(item) {
        if (this.props.wornItemIds.includes(item.id)) {
            this.props.unwearItem(item);
        } else {
            this.props.wearItem(item);
        }
    }

    _renderItemRow = ({ item }) => {
        const isWorn = this.props.wornItemIds.includes(item.id);

        return (
            <TouchableNativeFeedback onPress={() => this._toggleItem(item)}>
                <View style={styles.itemRow}>
                    <Image
                        source={{ uri: item.thumbnailUrl }}
                        style={styles.thumbnail}
                    />
                    <View>
                        <Text
                            style={[
                                material.subheading,
                                !isWorn && styles.unwornItemName,
                            ]}
                        >
                            {item.name}
                        </Text>
                        {item.swfAssets.length && (
                            <Text
                                style={[
                                    styles.itemInfo,
                                    !isWorn && styles.unwornItemInfo,
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
        const { data } = this.props;

        const items = data.items || [];

        const sortedItems = [...items].sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            } else {
                return 0;
            }
        });

        return (
            <View style={styles.closet}>
                <ToolbarAndroid
                    title="Your outfit"
                    style={[styles.toolbar]}
                    titleColor="white"
                    actions={[
                        {
                            title: "Search items",
                            icon: require("../icons/search/search.png"),
                            show: "ifRoom",
                        },
                    ]}
                    onActionSelected={this._handleSearch}
                />
                <FlatList
                    style={styles.itemList}
                    data={sortedItems}
                    keyExtractor={item => item.id}
                    renderItem={this._renderItemRow}
                    ItemSeparatorComponent={ItemRowDivider}
                />
            </View>
        );
    }
}

function ItemRowDivider() {
    return <View style={styles.itemRowDivider} />;
}

class ClosetSearch extends React.PureComponent {
    _handleExit = () => {
        this.props.onExit();
    };

    render() {
        return (
            <View style={styles.closet}>
                <ToolbarAndroid style={[styles.toolbar, styles.toolbarSearch]}>
                    <View style={styles.searchToolbarContent}>
                        <TouchableNativeFeedback onPress={this._handleExit}>
                            <Image
                                source={require("../icons/back/back.png")}
                                // TODO: This is an 18dp icon in assets :x
                                style={{ height: 24, width: 24, opacity: 0.5 }}
                            />
                        </TouchableNativeFeedback>
                        <TextInput
                            style={[material.subheading, styles.searchField]}
                            autoFocus
                            placeholder="Search items"
                            returnKeyType="search"
                            underlineColorAndroid="transparent"
                        />
                    </View>
                </ToolbarAndroid>
            </View>
        );
    }
}

const CONTAINER_PADDING = 16;
const THUMBNAIL_SIZE = 48;
const THUMBNAIL_RIGHT_MARGIN = 16;
const TEXT_STARTS_AT =
    CONTAINER_PADDING + THUMBNAIL_SIZE + THUMBNAIL_RIGHT_MARGIN;

const styles = StyleSheet.create({
    closet: {
        width: "100%",
        height: "100%",
    },

    toolbar: {
        backgroundColor: "#388E3C",
        height: 56,
        elevation: 2,
        marginBottom: 8,
    },

    toolbarSearch: {
        backgroundColor: "white",
    },

    itemList: {
        flex: 1,
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

    unwornItemName: {
        color: materialColors.blackTertiary,
        textDecorationLine: "line-through",
    },

    unwornItemInfo: {
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

    searchToolbarContent: {
        // HACK: The view doesn't take up the full space unless it has a
        //       background?
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        flex: 1,

        // The first 16 is an overflow hack. The second 16 is desired spacing,
        // to match the effective 16 left-margin already provided.
        paddingRight: 16 + 16,
    },

    searchField: {
        marginLeft: TEXT_STARTS_AT - 24 - CONTAINER_PADDING, // back icon, extra padding
        flex: 1,
    },
});
