import React from "react";
import { StyleSheet, Image, View, Text, ActivityIndicator } from "react-native";

export default class PetPreview extends React.PureComponent {
    render() {
        const { outfit, outfitData } = this.props;

        if (outfitData.loading) {
            return (
                <View style={[styles.petPreview, styles.loading]}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            );
        }

        if (outfitData.error) {
            return (
                <View style={[styles.petPreview]}>
                    <Text style={[styles.error]}>Error loading images</Text>
                </View>
            );
        }

        const assets = outfit.getAssets(outfitData);

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

    error: {
        color: "white",
        textAlign: "center",
    },

    petPreviewLayer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
