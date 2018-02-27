import React from "react";
import { StyleSheet, FlatList, Image, Text, View } from "react-native";
import { material, materialColors } from "react-native-typography";

export default class Closet extends React.PureComponent {
    render() {
        return (
            <View style={styles.closet}>
                <View style={styles.header}>
                    <Text style={material.headline}>Your outfit</Text>
                </View>
                <FlatList
                    style={styles.itemList}
                    data={this.props.items}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.itemRow}>
                            <Image
                                source={{ uri: item.thumbnailUrl }}
                                style={styles.thumbnail}
                            />
                            <View>
                                <Text style={material.subheading}>
                                    {item.name}
                                </Text>
                                <Text style={styles.itemInfo}>
                                    {item.zone.name}
                                </Text>
                            </View>
                        </View>
                    )}
                    ItemSeparatorComponent={ItemRowDivider}
                />
            </View>
        );
    }
}

function ItemRowDivider() {
    return <View style={styles.itemRowDivider} />;
}

const styles = StyleSheet.create({
    closet: {
        paddingBottom: 16,
    },

    header: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 12,
    },

    itemList: {},

    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        minHeight: 72,
        paddingLeft: 16,
        paddingRight: 16,
    },

    itemInfo: {
        ...material.body1Object,
        color: materialColors.blackSecondary,
    },

    itemRowDivider: {
        marginLeft: 16 + 56 + 16, // leftpad + image + margin
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0, 0, 0, .12)",
    },

    thumbnail: {
        height: 56,
        width: 56,
        marginRight: 16,
    },
});
