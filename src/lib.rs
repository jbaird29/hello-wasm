// https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_wasm
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn sum(arr: Box<[i32]>) -> i32 {
    let sum: i32 = arr.iter().sum();
    sum
}

#[wasm_bindgen]
pub fn count(arr: Box<[i32]>) -> i32 {
    let mut count: i32 = 0;
    for _ in arr.iter() {
        count += 1;
    };
    count
}