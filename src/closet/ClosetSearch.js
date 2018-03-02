import React from "react";
import {
    StyleSheet,
    ActivityIndicator,
    Image,
    Text,
    TextInput,
    ToolbarAndroid,
    TouchableNativeFeedback,
    View,
} from "react-native";
import { material } from "react-native-typography";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import ItemList from "./ItemList";
import { TEXT_STARTS_AT, debounce } from "./util";

export default class ClosetSearch extends React.PureComponent {
    state = { query: "", queryToLoad: "" };

    _addItemAndExit = item => {
        this.props.onWearItem(item);
        this.props.onExit();
    };

    _handleExit = () => {
        this.props.onExit();
    };

    _handleNewQuery = query => {
        this.setState({ query, queryToLoad: "" });
        this._loadQuerySoon();
    };

    _loadQueryNow = () => {
        this.setState(({ query }) => ({
            queryToLoad: query,
        }));
    };

    _loadQuerySoon = debounce(this._loadQueryNow, 500);

    render() {
        return (
            <View style={styles.closetSearch}>
                <ToolbarAndroid style={styles.toolbar}>
                    <View style={styles.toolbarContent}>
                        <TouchableNativeFeedback onPress={this._handleExit}>
                            <Image
                                source={require("../../icons/back/back.png")} // TODO: This is an 18dp icon in assets :x
                                style={{ height: 24, width: 24, opacity: 0.5 }}
                            />
                        </TouchableNativeFeedback>
                        <TextInput
                            style={[material.subheading, styles.searchField]}
                            autoCapitalize="words"
                            autoFocus
                            placeholder="Search items"
                            returnKeyType="search"
                            selectionColor="#4CAF50"
                            underlineColorAndroid="transparent"
                            value={
                                this.state.query // Green 500
                            }
                            onChangeText={this._handleNewQuery}
                        />
                    </View>
                </ToolbarAndroid>
                <View style={styles.results}>
                    {this.state.queryToLoad.length > 0 && (
                        <ClosetSearchResults
                            bodyId={this.props.bodyId}
                            // TODO: We're auto-including "fitting" in the
                            //       query, and hardcoding the pet type.
                            query={this.state.queryToLoad + " fits:blue-zafara"}
                            onPressItem={this._addItemAndExit}
                        />
                    )}
                </View>
            </View>
        );
    }
}

function ClosetSearchResults({ data, onPressItem }) {
    if (data.loading) {
        return (
            <ActivityIndicator
                color="#4CAF50" // Green 500
                size="large"
            />
        );
    }

    return <ItemList items={data.itemSearch} onPressItem={onPressItem} />;
}
// TODO: Extract fragment for the item list's data?
const ItemsForClosetSearch = gql`
    query ItemsForClosetSearch($query: String!, $bodyId: Int!) {
        itemSearch(query: $query) {
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
ClosetSearchResults = graphql(ItemsForClosetSearch)(ClosetSearchResults);

const styles = StyleSheet.create({
    closetSearch: {
        width: "100%",
        height: "100%",
    },

    toolbar: {
        backgroundColor: "white",
        height: 56,
        elevation: 2,
        marginBottom: 8,
    },

    toolbarContent: {
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
        marginLeft: TEXT_STARTS_AT - 24 - 16, // back icon, toolbar auto padding
        flex: 1,
    },

    results: {
        flex: 1,
    },
});
