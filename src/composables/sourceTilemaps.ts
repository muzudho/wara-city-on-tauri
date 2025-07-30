// 辞書の型（例：キーがstring、値がstring）
type Dict = Record<string, string>;

// タイルマップの元画像を管理する型
export interface SourceTilemaps {
    tilemapFilepathDict: Dict;  // 変更がないデータ
}

// モジュールスコープでインスタンスを1つだけ作る
const tilemapFilepathDict = <Dict>{
    'sea': '/public/img/tiles/tilemap_sea.png',
    'land': '/public/img/tiles/tilemap_land.png',
};

const sourceTilemaps: SourceTilemaps = {
    tilemapFilepathDict
};

// 返すオブジェクトはシングルトン。
export function getSourceTilemaps(): SourceTilemaps {
    return sourceTilemaps;
}
