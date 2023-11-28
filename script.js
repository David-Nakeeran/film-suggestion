'use strict';

import {filmGenres} from "./data.js";

const container = document.querySelector('.radio-container');
const checkbox = document.getElementById('bluray-check');
const chooseBtn = document.getElementById('choose-btn');
const modalContainer = document.getElementById('modal-container');
const modalInner = document.getElementById('modal-inner');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalBg = document.getElementById('modal-bg');


container.addEventListener('change', highlightCheckedRadio);

modalCloseBtn.addEventListener('click', () => {
    modalContainer.style.display = 'none';
});


    





chooseBtn.addEventListener('click', renderFilm);


function highlightCheckedRadio(e) {
    const items = document.getElementsByClassName('radio');
    for(let item of items) {
        item.classList.remove('highlight');
    };
    document.getElementById(e.target.id).parentElement.classList.add('highlight');
};

function renderFilm() {
    const singleFilm = getSingleFilm();
    modalInner.textContent = singleFilm;
    modalContainer.style.display = 'flex';

    removeModal();
    
};

function removeModal() {
    modalContainer.parentElement.classList.add('modalbackground');
    document.addEventListener('click', (e) => {
        
        if(e.target == modalBg) {
            modalContainer.style.display = 'none';
            modalContainer.parentElement.classList.remove('modalbackground');
        };
        
    });
};

function randomNumber(arr) {
    return Math.floor(Math.random() * arr.length);
};

function getSingleFilm() {
    const filmArr = getSingleObject();
    const arr = filmArr.films;
    return arr[randomNumber(arr)];
    
};


function getSingleObject() {
    const genreArr = getMatchingGenreSelection();
    if(genreArr.length === 1) {
        return genreArr[0];
    } else {
        return genreArr[randomNumber(genreArr)];
    }

};


function getMatchingGenreSelection() {
    if(document.querySelector('input[type="radio"]:checked')) {
        const selectedGenre = document.querySelector('input[type="radio"]:checked').value;
        const hasBluray = checkbox.checked;

        const matchingGenreArr = filmGenres.filter(function(film) {
            if(hasBluray) {
                return film.genre.includes(selectedGenre) && film.isBluRay;
            } else {
                return film.genre.includes(selectedGenre)
            }
            
        })
        
        return matchingGenreArr;
    }
};



// function to get key value from object, push to array and return to function
function getKeyValue(array) {
    let arr = [];
    for(let item of array) {
        for(let i of item.genre) {
            if(!arr.includes(i)) {
                arr.push(i);
            }
        }
                
    };
    return arr;
};

function renderGenres(array) {
    const genres = getKeyValue(array)
    for(let genre of genres) {
        renderInputRadio(genre);
    };
};

// Set element attributes
function setAttribute(element, key, value) {
    element.setAttribute([key], value)
};

// Render Input Element
function renderInputRadio(value) {
    const input = document.createElement('input');
    const radio = document.createElement('div');
    const label = document.createElement('label');

    setAttribute(radio, "class", "radio");
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



renderGenres(filmGenres);