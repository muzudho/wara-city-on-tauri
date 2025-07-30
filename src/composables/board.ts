import { ref, computed, Ref, ComputedRef } from 'vue';

// 型
import { TileDict } from '@/types/tile-dict'; // @はsrcへのエイリアス

// 辞書の型（例：キーがstring、値がstring）
type Dict = Record<string, string>;

// ボードの設定を管理する型
interface Board {
    widthCells: Ref<number>;
    heightCells: Ref<number>;
    cellWidth: Ref<number>;
    cellHeight: Ref<number>;
    areaCells: ComputedRef<number>;
    widthPixels: Ref<number>;
    heightPixels: Ref<number>;
    areaPixels: ComputedRef<number>;
    tilemapFilepathDict: Dict;  // 変更がないデータ。
    srcTileDict: Ref<TileDict>;
}

export function getBoard(): Board {
    const widthCells: Ref<number> = ref(10);
    const heightCells: Ref<number> = ref(10);
    const areaCells: ComputedRef<number> = computed(() => widthCells.value * heightCells.value);
    const cellWidth: Ref<number> = ref(32);
    const cellHeight: Ref<number> = ref(32);
    const widthPixels: ComputedRef<number> = computed(() => widthCells.value * cellWidth.value);
    const heightPixels: ComputedRef<number> = computed(() => heightCells.value * cellHeight.value);
    const areaPixels: ComputedRef<number> = computed(() => (widthCells.value * cellWidth.value) * (heightCells.value * cellHeight.value));

    const tilemapFilepathDict = {
        'sea': '/public/img/tiles/tilemap_sea.png',
    };

    const srcTileDict = {
    } as Ref<TileDict>;

    return {
        widthCells,
        heightCells,
        cellWidth,
        cellHeight,
        areaCells,
        widthPixels,
        heightPixels,
        areaPixels,
        tilemapFilepathDict,
        srcTileDict,
    };
}
