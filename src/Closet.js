import React from "react";
import {
    StyleSheet,
    FlatList,
    Image,
    Text,
    ToolbarAndroid,
    View,
} from "react-native";
import { material, materialColors } from "react-native-typography";

export default class Closet extends React.PureComponent {
    render() {
        const sortedItems = [...this.props.items].sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            } else {
                return 0;
            }
        });

        return (
            <View style={styles.closet}>
                <ToolbarAndroid
                    title="Your outfit"
                    style={styles.toolbar}
                    titleColor="white"
                    actions={[
                        {
                            title: "Search items",
                            icon: require("../icons/search/search.png"),
                            show: "ifRoom",
                        },
                    ]}
                />
                <FlatList
                    style={styles.itemList}
                    data={sortedItems}
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
                                    {item.asset.zone.name}
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
        width: "100%",
        height: "100%",
    },

    toolbar: {
        backgroundColor: "#388E3C",
        height: 56,
        elevation: 2,
        marginBottom: 8,
    },

    itemList: {
        flex: 1,
        paddingBottom: 16,
    },

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
