use wasm_bindgen::prelude::wasm_bindgen;
use web_sys::console::log_1 as log;
use base64::prelude::*;
use image::load_from_memory;
use std::io::Cursor;
use image::ImageFormat::Png;


#[wasm_bindgen]
pub fn apply_effect(encoded_file: &str, opt:Option<String>, blur_sigma: Option<f32>) -> String{
    // max to 20.00 blur min of 0.3
    let blur_sigma_value = blur_sigma.unwrap_or(20.00);
    let option = opt.unwrap_or(String::from("grayscale"));
    log(&"grayscale() called!".into());
    let base64_to_vector = BASE64_STANDARD.decode(&encoded_file).unwrap();
    log(&"Image decoded!".into());
    let mut img = load_from_memory(&base64_to_vector).unwrap();
    log(&"Image loaded!".into());


    if option == "blur" {
            log(&"blur chosen".into());
        img = img.blur(blur_sigma_value);
    }

    if option == "grayscale" {
                  log(&"grayscale chosen".into());
        img = img.grayscale();
               log(&"blur applied".into());
    }
    
    log(&"Effect applied!".into());
    
    let mut buffer = vec![];

    img.write_to(&mut Cursor::new(&mut buffer), Png).unwrap();

    log(&"New image written".into());

    let encoded_image = BASE64_STANDARD.encode(&buffer);
    // transformando a imagem em base64 com data url novamente
    let data_url = format!("data:image/png;base64,{}", encoded_image);

    data_url
}