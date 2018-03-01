import React from "react";
import {
    StyleSheet,
    Image,
    TextInput,
    ToolbarAndroid,
    TouchableNativeFeedback,
    View,
} from "react-native";
import { material } from "react-native-typography";

import { TEXT_STARTS_AT } from "./util";

export default class ClosetSearch extends React.PureComponent {
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
                                source={require("../../icons/back/back.png")}
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

const styles = StyleSheet.create({
    closetSearch: {
        width: "100%",
        height: "100%",
    },

    toolbarSearch: {
        backgroundColor: "white",
        height: 56,
        elevation: 2,
        marginBottom: 8,
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
        marginLeft: TEXT_STARTS_AT - 24 - 16, // back icon, toolbar auto padding
        flex: 1,
    },
});
