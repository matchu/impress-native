import React from "react";
import { StyleSheet, Image, View, StatusBar } from "react-native";

import Closet from "./src/Closet";

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
        id: 1,
        name: "Moon and Stars Background",
        petPreviewLayerUrl:
            "https://impress-asset-images.s3.amazonaws.com/object/000/000/006/6829/600x600.png?0",
        thumbnailUrl: "http://images.neopets.com/items/bg_moonstars.gif",
        zone: { depth: 1, name: "Background" },
    },
    {
        id: 2,
        name: "Green Leaf String Lights",
        petPreviewLayerUrl:
            "https://impress-asset-images.s3.amazonaws.com/object/000/000/036/36414/600x600.png?0",
        thumbnailUrl:
            "http://images.neopets.com/items/toy_stringlight_illleaf.gif",
        zone: { depth: 2, name: "Background Item" },
    },
    {
        id: 3,
        name: "Zafara Agent Robe",
        petPreviewLayerUrl:
            "https://impress-asset-images.s3.amazonaws.com/object/000/000/014/14856/600x600.png?0",
        thumbnailUrl:
            "http://images.neopets.com/items/clo_zafara_agent_robe.gif",
        zone: { depth: 8, name: "Jacket" },
    },
    {
        id: 4,
        name: "Zafara Agent Hood",
        petPreviewLayerUrl:
            "https://impress-asset-images.s3.amazonaws.com/object/000/000/014/14857/600x600.png?0",
        thumbnailUrl:
            "http://images.neopets.com/items/clo_zafara_agent_hood.gif",
        zone: { depth: 9, name: "Hat" },
    },
    {
        id: 5,
        name: "Jewelled Staff",
        petPreviewLayerUrl:
            "https://impress-asset-images.s3.amazonaws.com/object/000/000/039/39646/600x600.png?0",
        thumbnailUrl: "http://images.neopets.com/items/mall_staff_jewelled.gif",
        zone: { depth: 10, name: "Left-hand Item" },
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
        backgroundColor: "white",
    },
});
