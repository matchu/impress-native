// @flow
import React from "react";
import { StyleSheet, Image, View } from "react-native";

import Closet from "./src/closet";

const IMAGE_LAYERS = [
    "https://impress-asset-images.s3.amazonaws.com/object/000/000/006/6829/600x600.png?0", // background
    "https://impress-asset-images.s3.amazonaws.com/object/000/000/036/36414/600x600.png?0", // lights
    "https://impress-asset-images.s3.amazonaws.com/biology/000/000/007/7942/600x600.png?0",
    "https://impress-asset-images.s3.amazonaws.com/biology/000/000/007/7941/600x600.png?0",
    "https://impress-asset-images.s3.amazonaws.com/biology/000/000/024/24008/600x600.png?0",
    "https://impress-asset-images.s3.amazonaws.com/biology/000/000/028/28548/600x600.png?1345694257", // happy eyes
    "https://impress-asset-images.s3.amazonaws.com/biology/000/000/036/36887/600x600.png?1354211908", // smile
    "https://impress-asset-images.s3.amazonaws.com/object/000/000/014/14856/600x600.png?0", // cloak
    "https://impress-asset-images.s3.amazonaws.com/object/000/000/014/14857/600x600.png?0", // hood
    "https://impress-asset-images.s3.amazonaws.com/object/000/000/039/39646/600x600.png?0", // staff
    "https://impress-asset-images.s3.amazonaws.com/object/000/000/056/56478/600x600.png?0", // badge
    "https://impress-asset-images.s3.amazonaws.com/object/000/000/051/51959/600x600.png?0", // ball
];

const ITEMS = [
    {
        key: 1,
        name: "Moon and Stars Background",
        petPreviewLayerUrl:
            "https://impress-asset-images.s3.amazonaws.com/object/000/000/006/6829/600x600.png?0",
        thumbnailUrl: "http://images.neopets.com/items/bg_moonstars.gif",
        zone: 1,
    },
];

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
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
                <View style={styles.closet}>
                    <Closet />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "stretch",
    },

    petPreview: {
        flex: 1,
    },

    petPreviewLayer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    closet: {
        borderTopWidth: 1,
    },
});
