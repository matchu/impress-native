import React from "react";
import { StyleSheet, Image, View, ActivityIndicator } from "react-native";

import { BIOLOGY_ASSETS } from "./hardcoded-data";

export default class PetPreview extends React.PureComponent {
    render() {
        const { data } = this.props;
        if (data.loading) {
            return (
                <View style={[styles.petPreview, styles.loading]}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            );
        }

        const items = data.items || [];

        const assets = [...BIOLOGY_ASSETS];
        for (const item of items) {
            assets.push(...item.swfAssets);
        }
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
                        key={asset.id}
                        source={{ uri: asset.largeImageUrl }}
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

    loading: {
        alignItems: "center",
        justifyContent: "center",
    },

    petPreviewLayer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
