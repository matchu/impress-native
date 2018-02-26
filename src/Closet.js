// @flow
import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { material } from "react-native-typography";

type NeoItem = {
    id: number,
    name: string,
    petPreviewLayerUrl: string,
    thumbnailUrl: string,
    zone: number,
};

type Props = {
    neoItems: Array<NeoItem>,
};

export default class Closet extends React.PureComponent<Props> {
    render() {
        return (
            <View>
                <Text style={material.display1}>Closet</Text>
                <FlatList
                    data={this.props.neoItems.map(neoItem => {
                        key: neoItem.id, neoItem;
                    })}
                    renderItem={({ item: { neoItem } }) => (
                        <View key={neoItem.id}>
                            <Image
                                source={{ uri: neoItem.thumbnailUrl }}
                                style={{ height: 24, width: 24 }}
                            />
                            <Text style={material.subheading}>
                                {neoItem.name}
                            </Text>
                        </View>
                    )}
                />
            </View>
        );
    }
}
