// ################
// # エクスポート #
// ################

// タイルパスを管理する型
export interface Tilepath {
    value: String;

    getTilemapName: () => String;
    getTileName: () => String;
}

export function newTilepath(value: String): Tilepath {
    return <Tilepath>{
        value,
        getTilemapName: () => {
            // "_" でスプリットして、その前半分。
            return value.split("_")[0];
        },
        getTileName: () => {
            // "_" でスプリットして、その後ろ半分。
            return value.split("_")[1];
        },
    };
}
