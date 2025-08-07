# 没コード Rust

```rust

/*
#[tauri::command]
#[allow(non_snake_case)]
fn paintRs(drawingName:&str, tileIndex:i32, selectedTilepath:&str, board:Board) -> HashMap<i32, String> {
    let mut dict = HashMap::new();

    // １マスずつ
    if drawingName == "dot" {
        dict.insert(tileIndex, String::from(selectedTilepath));
    
    // 塗り潰し
    } else if drawingName == "fill" {

        let mut checkboard : Vec<bool> = vec![false; board.tilepath_array.len()];
        let mut tile_index_buffer : Vec<i32> = vec![];
        let mut next_tile_index_buffer : Vec<i32> = vec![];

        tile_index_buffer.push(tileIndex);
        let target_tilepath = board.tilepath_array[tileIndex as usize].clone();

        // NOTE: 再帰関数はスタック・オーバーフローするタイミングが読めないので、ただのループで実装する。
        // FIXME: 🌟 Rust は高速でも、TypeScript の方が高速ではない？ JSON受け渡しが遅い？
        loop {
            if tile_index_buffer.is_empty() || 100 < dict.len() {   // 100 ぐらいなら速い
                break;
            }

            next_tile_index_buffer.clear();

            for tile_index_2 in tile_index_buffer.iter() {

                // 塗る
                dict.insert(*tile_index_2, String::from(selectedTilepath));
                checkboard[*tile_index_2 as usize] = true;

                // 次の四方向を追加
                add_4_sides(
                        *tile_index_2,
                        &mut next_tile_index_buffer,
                        &board,
                        &mut checkboard,
                        target_tilepath.as_str());
            }

            // 入れ替え
            tile_index_buffer.clear();
            tile_index_buffer.extend(next_tile_index_buffer.iter().cloned()); // コピーして追加
        }

    // 境界線の自動接続
    } else if drawingName == "border" {
        dict.insert(tileIndex, String::from(selectedTilepath));
        
    }

    dict
}
*/

/*
fn add_4_sides(
        tile_index: i32,
        next_tile_index_buffer: &mut Vec<i32>,
        board:&Board,
        checkboard : &mut Vec<bool>,
        target_tilepath: &str
) {

    // 上のタイルが同じなら塗り潰し
    let up_index = tile_index - board.width_cells;
    if 0 <= up_index && !checkboard[up_index as usize] {
        if target_tilepath == board.tilepath_array[up_index as usize] {
            next_tile_index_buffer.push(up_index);
        }
    }

    // 右のタイルが同じなら塗り潰し
    if tile_index%board.width_cells != (board.width_cells-1) {
        let right_index = tile_index + 1;
        if (right_index as usize) < board.tilepath_array.len() && !checkboard[right_index as usize] {
            if target_tilepath == board.tilepath_array[right_index as usize] {
                next_tile_index_buffer.push(right_index);
            }
        }
    }

    // 左のタイルが同じなら塗り潰し
    if tile_index%board.width_cells!=0 {
        let left_index = tile_index - 1;
        if !checkboard[left_index as usize] {
            if target_tilepath == board.tilepath_array[left_index as usize] {
                next_tile_index_buffer.push(left_index);
            }
        }
    }

    // 下のタイルが同じなら塗り潰し
    if tile_index%board.height_cells != (board.height_cells-1) {
        let down_index = tile_index + board.width_cells;
        if (down_index as usize) < board.tilepath_array.len() && !checkboard[down_index as usize] {
            if target_tilepath == board.tilepath_array[down_index as usize] {
                next_tile_index_buffer.push(down_index);
            }
        }
    }
}
 */
```
