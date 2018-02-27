import React from "react";
import { StyleSheet, Image, View } from "react-native";

import { IMAGE_LAYERS, BIOLOGY_ASSETS } from "./hardcoded-data";

export default class PetPreview extends React.PureComponent {
    render() {
        const itemAssets = this.props.items.map(item => item.asset);
        const assets = [...itemAssets, ...BIOLOGY_ASSETS];
        assets.sort((a, b) => {
            if (a.zone.depth < b.zone.depth) {
                return -1;
            } else if (a.zone.depth > b.zone.depth) {
                return 1;
            } else {
                return 0;
            }
        });

        return (
            <View style={styles.petPreview}>
                {assets.map(asset => (
                    <Image
                        key={asset.url}
                        source={{ uri: asset.url }}
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
