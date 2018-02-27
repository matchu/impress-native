import React from "react";
import { StyleSheet, Image, View } from "react-native";

import { IMAGE_LAYERS } from "./hardcoded-data";

export default class PetPreview extends React.PureComponent {
    render() {
        return (
            <View style={styles.petPreview}>
                {IMAGE_LAYERS.map(uri => (
                    <Image
                        key={uri}
                        source={{ uri }}
                        style={styles.petPreviewLayer}
                        resizeMode={Image.resizeMode.contain}
                    />
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    petPreview: {
        width: "100%",
        height: "100%",
    },

    petPreviewLayer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
