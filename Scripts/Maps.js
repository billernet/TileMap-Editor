var demo1 = {
    tileSet: "tileset.png",
    mainMap: {
        mapRowLength: 24,
        palletRowLength: 7,
    },
    pallet: {
        mapRowLength: 7,
        palletRowLength: 7,
        layers: [],
        width: 224,
        height: 160
    }
};
demo1.pallet.layers.push({ name: "background", map: window.CreatePalletMap(7 * 5) });

var demo2 = {
    tileSet: "detail_tile.png",
    mainMap: {
        mapRowLength: 24,
        palletRowLength: 12,
    },
    pallet: {
        mapRowLength: 12,
        palletRowLength: 12,
        layers: [],
        width: 384,
        height: 224
    }
};
demo2.pallet.layers.push({ name: "background", map: window.CreatePalletMap(12 * 12) });

var dune2 = {
    tileSet: "dune2-tileset.png",
    mainMap: {
        mapRowLength: 24,
        palletRowLength: 22,
        tileDimensions: [32, 32]
    },
    pallet: {
        mapRowLength: 22,
        palletRowLength: 22,
        layers: [],
        width: 704,
        height: 640
    }
};
dune2.pallet.layers.push({ name: "background", map: window.CreatePalletMap(22 * 20) });

var chaosEngine = {
    tileSet: "ChaosEngineTileSet.png",
    mainMap: {
        mapRowLength: 48,
        palletRowLength: 20,
        tileDimensions: [16, 16],
        cellSpace: 1,
        edgeSpace: 1
    },
    pallet: {
        map: [],
        mapRowLength: 20,
        palletRowLength: 20,
        layers: [],
        width: 320,
        height: 304,
        tileDimensions: [16, 16],
        cellSpace: 1,
        edgeSpace: 1
    }
};
chaosEngine.pallet.layers.push({ name: "background", map: window.CreatePalletMap(20 * 19) });


var mario = {
    tileSet: "mario-tileset.png",
    mainMap: {
        mapRowLength: 24,
        palletRowLength: 19,
        tileDimensions: [32, 32],
        layers: []
    },
    pallet: {
        mapRowLength: 19,
        palletRowLength: 19,
        width: 608,
        height: 384,
        tileDimensions: [32, 32],
        layers: []
    }
};
mario.mainMap.layers.push({
    name: "background",
    map: [43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 57, 58, 58, 58, 59, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 38, 39, 39, 40, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 57, 58, 58, 59, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 41, 42, 43, 43, 43, 43, 43, 43, 48, 11, 48, 11, 48, 43, 43, 43, 43, 43, 43, 48, 11, 48, 43, 43, 60, 61, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 60, 61, 43, 43, 43, 43, 43, 26, 43, 43, 43, 43, 43, 43, 43, 41, 42, 43, 43, 43, 43, 43, 43, 43, 60, 61, 43, 43, 21, 43, 62, 45, 46, 43, 43, 43, 43, 43, 43, 60, 61, 43, 43, 43, 43, 43, 43, 43, 60, 61, 19, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
});

mario.pallet.layers.push({ name: "background", map: window.CreatePalletMap(20 * 19) });


var chipsChallenge = {
    tileSet: "chipschallenge-tileset.gif",
    mainMap: {
        mapRowLength: 24,
        palletRowLength: 14
    },
    pallet: {
        mapRowLength: 14,
        palletRowLength: 14,
        layers: [],
        width: 448,
        height: 256
    }
};
chipsChallenge.pallet.layers.push({ name: "background", map: window.CreatePalletMap(14 * 8) });


var pokemonFireRed = {
    tileSet: "Pokemon FireRed Tileset.png",
    mainMap: {
        mapRowLength: 24,
        palletRowLength: 29,
        cellSpace: 2,
        edgeSpace: 2
    },
    pallet: {
        mapRowLength: 29,
        palletRowLength: 29,
        layers: [],
        width: 954,
        height: 1600,
        cellSpace: 2,
        edgeSpace: 2
    }
};

pokemonFireRed.pallet.layers.push({ name: "background", map: window.CreatePalletMap(29 * 50) });
