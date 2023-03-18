import {ApiId} from "./apiId.js";
import {HomeApi} from "./homeApi.js";
import {CategorySearch} from "./categorySearch.js";
import {LetterApi} from "./letterSearch.js";
import { Category } from "./category.js";
import { ImageApi } from "./imageApi.js";
import { Area } from "./areaApi.js";
import { AreaFood } from "./AreaFood.js";
import { IngredientsApi } from "./ingredients.js";

// $ HTML Elements
let rowDiv = document.querySelector('.rowDiv');
let firstInput = document.querySelector('.cat');
let secondInput = document.querySelector('.letter');
let firstInputInRow = document.querySelector('.rowDiv div:nth-child(1) input');
let secondInputInRow = document.querySelector('.rowDiv div:nth-child(2) input');
let thirdInputInRow = document.querySelector('.rowDiv div:nth-child(3) input');
let fourthInputInRow = document.querySelector('.rowDiv div:nth-child(4) input');
let fifthInputInRow = document.querySelector('.rowDiv div:nth-child(5) input');
let sixInputInRow = document.querySelector('.rowDiv div:nth-child(6) input');
let submitBtn = document.querySelector('.submitBtn');

let categoryArr = [
    "beef",
    'chicken',
    "desert",
    'lamp',
    "miscellaneous",
    "pasta",
    "pork",
    "seafood",
    "side",
    "starter",
    "vegan",
    "vegetarian",
    "breakfast",
    "Vegetarian"
]

$('.menu').click(function () {
    let sideBar = $('.sidebar').innerWidth() - $('.sidebarController').innerWidth();
    if ($('.menu').attr('class') == 'fa-solid fa-close fa-3x menu') {
        $('.sidebar').animate({
            left: - sideBar
        }, 1000)
        $('.menu').removeClass('fa-solid fa-close fa-3x menu').addClass('fa-solid fa-bars fa-3x menu')
        $('.header li').slideUp();
    } else {
        $('.sidebar').animate({
            left: 0
        }, 1000)
        $('.menu').removeClass('fa-solid fa-bars fa-3x menu').addClass('fa-solid fa-close fa-3x menu')
        $('.header li').slideDown(1500);
    }
})

$('.searchBtn').click(function () {
    rowDiv.innerHTML = '';
    document.querySelector('.searchContainer').classList.replace('d-none', 'd-block')
})

function display(arr) {
    let displayElement = '';
    for (let i = 0; i < arr.length; i++) {
        displayElement += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="box position-relative text-center rounded-3 overflow-hidden" data-id=${
            arr[i].idMeal
        }>
                    <img src="${
            arr[i].strMealThumb
        }" alt="${
            arr[i].strMeal
        }" class="w-100">
                    <span class="position-absolute start-0 w-100 h-100 fs-3 fw-bold text-black d-flex align-items-center justify-content-center">${
            arr[i].strMeal.split(' ').splice(0, 2).join(' ')
        }</span>
                </div>
            </div>
        `
    }
    rowDiv.innerHTML = displayElement;
    let allBox = document.querySelectorAll('.box');
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].addEventListener('click', async function (e) {
            const recipe = await new ApiId(e.target.closest('.box').dataset.id).getIdApi();
            displayDetails(recipe ? recipe : '');
        })
    }
}

function displayCategories(arr) {
    let displayElement = '';
    for (let i = 0; i < arr.length; i++) {
        displayElement += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="box position-relative text-center rounded-3 overflow-hidden" data-category=${
                        arr[i].strCategory
                    }>
                    <img src="${
                        arr[i].strCategoryThumb
                    }" alt="${
                        arr[i].strCategory
                    }" class="w-100">
                                <span class="position-absolute start-0 w-100 h-100 fs-3 fw-bold text-black d-flex align-items-center justify-content-center flex-column">${
                        arr[i].strCategory
                    }

                    <p class="fs-6 fw-normal">
                    ${
                        arr[i].strCategoryDescription.split(' ').splice(0, 9).join(' ')
                    }
                    </p>

                    </span>

                </div>
            </div>
        `
    }

    rowDiv.innerHTML = displayElement;
    let allBox = document.querySelectorAll('.box');
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].addEventListener('click', async function (e) {
            const recipe = await new CategorySearch(e.target.closest('.box').dataset.category).getCategoryApi();
            display(recipe);
        })
    }
}

function displayDetails(meal) {
    const {
        strMealThumb,
        strMeal,
        strInstructions,
        strArea,
        strCategory,
        strTags,
        strSource,
        strYoutube
    } = meal;

    const ingredientIndices = Array.from({
        length: 20
    }, (_, i) => i + 1);

    const ingredients = ingredientIndices.map(index => {
        const ingredient = meal[`strIngredient${index}`];
        const measure = meal[`strMeasure${index}`];
        if (ingredient) {
            return `<li class="alert alert-danger m-2 px-2 py-1">${measure} ${ingredient}</li>`;
        }
        return '';
    }).join('');

    const tags = strTags ?. split(',') || [];

    const tagsStr = tags.map(tag => `
            <li class="alert alert-danger m-2 p-1">${tag}</li>
        `).join('');

    const displayElement = `
            <div class="col-md-4">
            <img class="w-100 rounded-3" src="${strMealThumb}" alt="">
            <h2>${strMeal}</h2>
            </div>
            <div class="col-md-8">
            <h2 class="text-white">Instructions</h2>
            <p class="text-white lh-lg text-white-50">${strInstructions}</p>
            <h3 class="text-white fw-bolder">Area : <span class="fs-5 fw-medium"> ${strArea}</span></h3>
            <h3 class="text-white fw-bolder">Category : <span class="fs-5 fw-medium"> ${strCategory}</span></h3>
            <h3 class="text-white fw-bolder">Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredients}
            </ul>

            <h3 class="text-white fw-bolder">Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${tagsStr}
            </ul>

            <a target="_blank" href="${strSource}" class="btn btn-success me-2">Source</a>
            <a target="_blank" href="${strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
        `;

    rowDiv.innerHTML = displayElement;
}

async function getHomeApiForDisplaying() {
    let apiRes = await new HomeApi().getHomeApi();
    display(apiRes);
}

getHomeApiForDisplaying();

async function getCategory(value) {
    let apiRes = await new CategorySearch(value).getCategoryApi();
    display(apiRes)
}

firstInput.addEventListener('keyup', function () {
    if (categoryArr.includes(this.value)) {
        getCategory(this.value);
    }
});

async function getLetter(value) {
    let apiRes = await new LetterApi(value).getLetterApi();
    display(apiRes)
}

secondInput.addEventListener('keyup', function () {
    getLetter(this.value);
});

async function getAllCategories() {
    rowDiv.innerHTML = '';
    let apiRes = await new Category().getCategoryApi();
    displayCategories(apiRes)
}

$('.categories').click(function() {
    getAllCategories();
})

async function displayArea(area) {
    let displayElement = '';
    for (let i = 0; i < area.length; i++) {
        displayElement += `

            <div class="col-md-3">
                <div class="box p-5 text-center" data-country="${area[i].strArea}">
                    <img src = "${await countryImageApi(area[i].strArea)}" class="rounded-circle countryImg" />
                    <p class="fs-6 fw-bold text-white mt-3">${area[i].strArea}</p>
                </div>
            </div>

        `
    }

    rowDiv.innerHTML = displayElement;
    let allBox = document.querySelectorAll('.box');
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].addEventListener('click', async function(e) {
            const recipe = await new AreaFood(e.target.closest('.box').dataset.country).getAreaFoodApi();
            display(recipe);
        })
    }
}

async function countryImageApi(value) {
    let country = await new ImageApi(value).getCountryImageApi();
    return country;
}

$('.area').click(async function() {
    rowDiv.innerHTML = '';
    let arr = await new Area().getAreaApi();
    displayArea(arr);
})

$('.ingredients').click(async function() {
    rowDiv.innerHTML = '';
    let arr = await new IngredientsApi().getIngredientsApi();
    displayIngredients(arr)
})

async function displayIngredients(arr) {
    let displayElement = '';
    for (let i = 0; i < arr.length; i++) {
        displayElement += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="box position-relative text-center text-white rounded-3 overflow-hidden" data-category=${
                        arr[i].strIngredient
                    }>
                    <i class="fa-solid fa-turkey fa-2x text-white"></i>

                    <h3>${arr[i].strIngredient.split(' ').slice(0, 1).join(' ')}</h3>

                    <p class="fs-6 fw-normal">
                    ${
                        arr[i].strDescription.split(' ').splice(0, 10).join(' ')
                    }
                    </p>

                </div>
            </div>
        `
    }

    rowDiv.innerHTML = displayElement;
    let allBox = document.querySelectorAll('.box');
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].addEventListener('click', async function (e) {
            const recipe = await new CategorySearch(e.target.closest('.box').dataset.category).getCategoryApi();
            display(recipe ? recipe : '');
        })
    }
}

let userNameRegex = /^[a-zA-Z0-9_-]{3,16}$/ig;
let emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/ig;
let phoneNumberRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
let ageRegex = /^\d{1,3}$/;
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ig;
let rePasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ig;

function validate(regex, element) {
    if (regex.test(element.value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
    }

    return regex.test(element.value);
}

$('.contactus').click(function() {
    let displayElement = '';
    displayElement = `
    
    <div class="col-md-6">
    <div class="box">
        <input type="text" placeholder="Enter your first name" class="w-100 px-3 py-2 text-white form-control bg-transparent rounded-5">
    </div>
</div>
<div class="col-md-6">
    <div class="box">
        <input type="email" placeholder="Enter your Email" class="w-100 px-3 py-2 text-white form-control bg-transparent rounded-5">
    </div>
</div>
<div class="col-md-6">
    <div class="box">
        <input type="number" placeholder="Enter your phone" class="w-100 px-3 py-2 text-white form-control bg-transparent rounded-5">
    </div>
</div>
<div class="col-md-6">
    <div class="box">
        <input type="number" placeholder="Enter your age" class="w-100 px-3 py-2 text-white form-control bg-transparent rounded-5">
    </div>
</div>
<div class="col-md-6">
    <div class="box">
        <input type="password" placeholder="Enter your Password" class="w-100 px-3 py-2 text-white form-control bg-transparent rounded-5">
    </div>
</div>
<div class="col-md-6">
    <div class="box">
        <input type="password" placeholder="re Enter your Password" class="w-100 px-3 py-2 text-white form-control bg-transparent rounded-5">
    </div>
</div>
<button class =" w-25 submitBtn btn btn-outline-danger px-4 py-2 rounded-3 mx-auto d-block mt-4" disabled="true">Submit</button>
    
    `;

    rowDiv.innerHTML = displayElement;
})

firstInputInRow.addEventListener('input', () => {
    validate(userNameRegex, firstInputInRow)
})

secondInputInRow.addEventListener('input', () => {
    validate(emailRegex, secondInputInRow)
})

thirdInputInRow.addEventListener('input', () => {
    validate(phoneNumberRegex, thirdInputInRow)
})

fourthInputInRow.addEventListener('input', () => {
    validate(ageRegex, fourthInputInRow)
})

fifthInputInRow.addEventListener('input', () => {
    validate(passwordRegex, fifthInputInRow)
})

sixInputInRow.addEventListener('input', () => {
    validate(rePasswordRegex, sixInputInRow)
})

if (validate(userNameRegex, firstInputInRow) && validate(emailRegex, secondInputInRow) && validate(phoneNumberRegex, thirdInputInRow) && validate(ageRegex, fourthInputInRow) && validate(passwordRegex, fifthInputInRow) && validate(rePasswordRegex, sixInputInRow)) {
    submitBtn.removeAttribute('disabled');
} else {
    submitBtn.setAttribute('disabled', true);
}

    // function validation()
