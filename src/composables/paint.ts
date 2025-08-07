// ##############
// # インポート #
// ##############

import { Board } from '@/composables/board';

// ############
// # ルーチン #
// ############

/**
 * 描画。
 * @returns 
 */
export function paint(
        {
            drawingName,
            tileIndex,
            selectedTilepath,
            board,
        } :
        {
            drawingName: string,
            tileIndex: number,
            selectedTilepath: string,
            board: Board,
        }) : Record<number, string> {
    const dict : Record<number, string> = {};

    // １マスずつ
    if (drawingName == "dot") {
        dict[tileIndex] = selectedTilepath;

    // 塗り潰し
    } else if (drawingName == "fill") {

        const checkboard : boolean[] = new Array(board.tilepathArray.value.length).fill(false);
        const tileIndexBuffer : number[] = Array();
        const nextTileIndexBuffer : number[] = Array();

        tileIndexBuffer.push(tileIndex);
        const targetTilepath = board.tilepathArray.value[tileIndex].slice();

        // NOTE: 再帰関数はスタック・オーバーフローするタイミングが読めないので、ただのループで実装する。
        // FIXME: 🌟 Rust は高速でも、TypeScript の方が高速ではない？ JSON受け渡しが遅い？
        while(tileIndexBuffer.length!=0 && Object.keys(dict).length <= 100){    // 100 ぐらいなら速い
            nextTileIndexBuffer.length = 0; // 配列をクリアーするのと同等

            tileIndexBuffer.forEach((tileIndex2)=>{

                // 塗る
                dict[tileIndex2] = selectedTilepath;
                checkboard[tileIndex2] = true;

                // 次の四方向を追加
                add_4_sides(
                        tileIndex2,
                        nextTileIndexBuffer,
                        board,
                        checkboard,
                        targetTilepath);
            });

            // 入れ替え
            tileIndexBuffer.length = 0;
            tileIndexBuffer.push(...nextTileIndexBuffer); // コピーして追加（extend）
        }

    // 境界線の自動接続
    } else if (drawingName == "border") {
        dict[tileIndex] = selectedTilepath;

    }

    return dict;
}

// ################
// # サブルーチン #
// ################

function add_4_sides(
        tileIndex: number,
        next_tile_index_buffer: number[],
        board: Board,
        checkboard : boolean[],
        targetTilepath: string
) {

    // 上のタイルが同じなら塗り潰し
    const upIndex = tileIndex - board.widthCells.value;
    if (0 <= upIndex && !checkboard[upIndex]) {
        if (targetTilepath == board.tilepathArray.value[upIndex]) {
            next_tile_index_buffer.push(upIndex);
        }
    }

    // 右のタイルが同じなら塗り潰し
    if (tileIndex%board.widthCells.value != (board.widthCells.value-1)) {
        const rightIndex = tileIndex + 1;
        if (rightIndex < board.tilepathArray.value.length && !checkboard[rightIndex]) {
            if (targetTilepath == board.tilepathArray.value[rightIndex]) {
                next_tile_index_buffer.push(rightIndex);
            }
        }
    }

    // 左のタイルが同じなら塗り潰し
    if (tileIndex%board.widthCells.value!=0) {
        const leftIndex = tileIndex - 1;
        if (!checkboard[leftIndex]) {
            if (targetTilepath == board.tilepathArray.value[leftIndex]) {
                next_tile_index_buffer.push(leftIndex);
            }
        }
    }

    // 下のタイルが同じなら塗り潰し
    if (tileIndex%board.heightCells.value != (board.heightCells.value-1)) {
        const downIndex = tileIndex + board.widthCells.value;
        if (downIndex < board.tilepathArray.value.length && !checkboard[downIndex]) {
            if (targetTilepath == board.tilepathArray.value[downIndex]) {
                next_tile_index_buffer.push(downIndex);
            }
        }
    }
}
