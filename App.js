import React from "react";
import { StyleSheet, Image, StatusBar, View } from "react-native";

import { ITEMS } from "./src/hardcoded-data";
import Closet from "./src/Closet";
import PetPreview from "./src/PetPreview";

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.petPreview}>
                    <PetPreview />
                </View>
                <View style={styles.closet}>
                    <Closet items={ITEMS} />
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
