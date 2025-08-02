// ################
// # エクスポート #
// ################

// タイルパスを管理する型
export interface Tilepath {
    value: string;

    getTilemapName: () => string;
    getTileName: () => string;
}

export function newTilepath(value: string): Tilepath {
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
