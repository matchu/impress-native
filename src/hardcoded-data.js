export const ITEMS = [
    // The table comes first, to confirm that we sort by zone depth.
    {
        id: 7,
        name: "Magic Ball Table",
        thumbnailUrl: "http://images.neopets.com/items/gif_magicball_table.gif",
        asset: {
            url:
                "https://impress-asset-images.s3.amazonaws.com/object/000/000/051/51959/600x600.png?0",
            zone: { depth: 12, name: "Lower Foreground Item" },
        },
    },
    {
        id: 1,
        name: "Moon and Stars Background",
        thumbnailUrl: "http://images.neopets.com/items/bg_moonstars.gif",
        asset: {
            url:
                "https://impress-asset-images.s3.amazonaws.com/object/000/000/006/6829/600x600.png?0",
            zone: { depth: 1, name: "Background" },
        },
    },
    {
        id: 2,
        name: "Green Leaf String Lights",
        thumbnailUrl:
            "http://images.neopets.com/items/toy_stringlight_illleaf.gif",
        asset: {
            url:
                "https://impress-asset-images.s3.amazonaws.com/object/000/000/036/36414/600x600.png?0",
            zone: { depth: 2, name: "Background Item" },
        },
    },
    {
        id: 3,
        name: "Zafara Agent Robe",
        thumbnailUrl:
            "http://images.neopets.com/items/clo_zafara_agent_robe.gif",
        asset: {
            url:
                "https://impress-asset-images.s3.amazonaws.com/object/000/000/014/14856/600x600.png?0",
            zone: { depth: 8, name: "Jacket" },
        },
    },
    {
        id: 4,
        name: "Zafara Agent Hood",
        thumbnailUrl:
            "http://images.neopets.com/items/clo_zafara_agent_hood.gif",
        asset: {
            url:
                "https://impress-asset-images.s3.amazonaws.com/object/000/000/014/14857/600x600.png?0",
            zone: { depth: 9, name: "Hat" },
        },
    },
    {
        id: 5,
        name: "Jewelled Staff",
        thumbnailUrl: "http://images.neopets.com/items/mall_staff_jewelled.gif",
        asset: {
            url:
                "https://impress-asset-images.s3.amazonaws.com/object/000/000/039/39646/600x600.png?0",
            zone: { depth: 10, name: "Left-hand Item" },
        },
    },
    {
        id: 6,
        name: "Altador Cup Brooch",
        thumbnailUrl:
            "http://images.neopets.com/items/clo_altcuplogo_brooch.gif",
        asset: {
            url:
                "https://impress-asset-images.s3.amazonaws.com/object/000/000/056/56478/600x600.png?0",
            zone: { depth: 11, name: "Collar" },
        },
    },
];

export const ITEMS_BY_ID = {};
for (const item of ITEMS) {
    ITEMS_BY_ID[item.id] = item;
}

export const BIOLOGY_ASSETS = [
    {
        url:
            "https://impress-asset-images.s3.amazonaws.com/biology/000/000/007/7942/600x600.png?0",
        zone: { depth: 3, name: "Biology" },
    },
    {
        url:
            "https://impress-asset-images.s3.amazonaws.com/biology/000/000/007/7941/600x600.png?0",
        zone: { depth: 4, name: "Biology" },
    },
    {
        url:
            "https://impress-asset-images.s3.amazonaws.com/biology/000/000/024/24008/600x600.png?0",
        zone: { depth: 5, name: "Biology" },
    },
    {
        url:
            "https://impress-asset-images.s3.amazonaws.com/biology/000/000/028/28548/600x600.png?1345694257",
        zone: { depth: 6, name: "Biology" },
    },
    {
        url:
            "https://impress-asset-images.s3.amazonaws.com/biology/000/000/036/36887/600x600.png?1354211908",
        zone: { depth: 7, name: "Biology" },
    },
];
