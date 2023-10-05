'use strict';

import {filmGenres} from "./data.js";

const container = document.querySelector('.container');

// function to get key value from object, push to array and return to function
function getKeyValue(array, key) {
    let arr = [];
    for(let item of array) {
            arr.push(item[key]);    
    };
    return arr;
};



function renderGenres(array) {
    const genres = getKeyValue(array,['genre'])
    for(let genre of genres) {
        renderInputRadio(genre);
    };
};

// Render Input Element
function renderInputRadio(value) {
    const input = document.createElement('input');
    const radio = document.createElement('div');
    const label = document.createElement('label');

    setAttribute(radio, "id", "radio");
    setAttribute(input, "type", "radio");
    setAttribute(input, "id", value);
    setAttribute(input, "value", value);
    setAttribute(input, "name", "genres");
    setAttribute(label, "for", value)
    
    label.textContent = value;
    container.append(radio);
    radio.append(label);
    radio.append(input);
};


// Set element attributes
function setAttribute(element, key, value) {
    element.setAttribute([key], value)
};

renderGenres(filmGenres);