#![recursion_limit = "256"]

#[macro_use]
mod macros;
#[macro_use]
mod app;
mod components;
mod connector;
mod data;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// This is the entry point for the web app
#[wasm_bindgen]
pub fn run_app() -> Result<(), JsValue> {
    wasm_logger::init(wasm_logger::Config::default());
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let mounting_div = document.get_element_by_id("southern_crossing_app").unwrap();
    yew::App::<app::App>::new().mount(mounting_div);
    Ok(())
}
