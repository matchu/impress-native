import React from "react";
import {
    StyleSheet,
    FlatList,
    Image,
    ToolbarAndroid,
    TouchableNativeFeedback,
    View,
    Text,
} from "react-native";

import ItemList from "./ItemList";

export default class ClosetMain extends React.PureComponent {
    _handleSearch = () => {
        this.props.onSearch();
    };

    _shouldCrossOutItem = item => {
        return !this.props.outfit.isWearing(item);
    };

    _toggleItem = item => {
        if (this.props.outfit.isWearing(item)) {
            this.props.onUnwearItem(item);
        } else {
            this.props.onWearItem(item);
        }
    };

    render() {
        const { data, outfit } = this.props;

        // NOTE: This component's `items` query is based on the outfit, so it's
        //       not necessary to check this list against the actual outfit's
        //       closeted item IDs.
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
            <View style={styles.closetMain}>
                <ToolbarAndroid
                    title="Your outfit"
                    style={[styles.toolbar]}
                    titleColor="white"
                    actions={[
                        {
                            title: "Search items",
                            icon: require("../../icons/search/search.png"),
                            show: "ifRoom",
                        },
                    ]}
                    onActionSelected={this._handleSearch}
                />
                <View style={styles.itemList}>
                    <ItemList
                        items={sortedItems}
                        onPressItem={this._toggleItem}
                        shouldCrossOutItem={this._shouldCrossOutItem}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    closetMain: {
        width: "100%",
        height: "100%",
    },

    toolbar: {
        backgroundColor: "#388E3C",
        height: 56,
        elevation: 2,
        marginBottom: 8,
    },

    itemList: {
        flex: 1,
    },
});
