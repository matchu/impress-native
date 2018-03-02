import React from "react";
import { StyleSheet, Image, View, ActivityIndicator } from "react-native";

export default class PetPreview extends React.PureComponent {
    render() {
        const { data, outfit } = this.props;

        if (data.loading) {
            return (
                <View style={[styles.petPreview, styles.loading]}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            );
        }

        const itemData = data.items || [];
        const assets = outfit.getAssets(itemData);

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
