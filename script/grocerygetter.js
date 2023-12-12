
// constants for easy access of HTML elements
const myImage = document.createElement("img");
const search = document.getElementById("search");
const div = document.createElement("div");

// first api call (get food)
function getArticles(search) {

    const div = document.createElement("div");
    div.id = "apiStuff";
    document.getElementById("apiStuff").replaceWith(div);
    const url = 'https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser?ingr=' + search;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2ab8fcf230msh86523a62684eb34p1b6144jsn120fe51b1e18',
            'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
        }
    };

    try {
        const response =  fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            let prev = "";
            console.log(data);
          data.hints.forEach(c => {
            // initialize elements of card
            let card = document.createElement("div");
            let img = document.createElement("img");
            let gif = document.createElement("img");
            let body = document.createElement("div");
            let name = document.createElement("header");
            let info = document.createElement("p");
            let button = document.createElement("button");
            button.type = "submit";
            button.textContent = "Toggle Gif";
            body.id = "body";

            img.id = "img" + c.food.label;

            card.classList.add("card");
            body.classList.add("card_body");
            img.classList.add("card_image");
            name.classList.add("card_name");
            info.classList.add("card_info");
            button.classList.add("card_button");

            card.style.width = "18rem";
            body.style.height = "70\px";
            img.style.height = "10rem";
            gif.style.height = "10rem";

            name.textContent = c.food.label;
            let isGif = false;

            // set image to the one from element
            if (c.food.image != null) {
                img.src = c.food.image;
                img.alt = "";
            }
            
            // toggle between gif and image, if both options exist
            button.addEventListener("click", function (e) {
                if (!isGif) {
                    getGif(name.textContent, card);
                    isGif = true;
                } else {
                    let newImg = document.createElement("img");
                    newImg.style.height = "10rem";
                    if (c.food.image != null) {
                        newImg.src = c.food.image;
                        newImg.alt = "";
                    }
                    card.firstChild.replaceWith(newImg);
                    isGif = false;
                }
                e.preventDefault();
            });

            info.textContent = c.food.nutrients.ENERC_KCAL + " calories per 100 grams";
            if (name.textContent != prev) {
                body.appendChild(name);
                body.appendChild(info);
                if (c.food.image != null) {
                    body.appendChild(button);
                    card.appendChild(img);
                } else {
                    // use gif if element from response doesn't have image and 
                    // don't include a toggle button
                    card.appendChild(gif);
                    getGif(c.food.label, card);
                }
                card.appendChild(body);
                div.appendChild(card);
            }
            // don't diplay duplicate items
            prev = name.textContent;
          })
          });;

    } catch (error) {
        console.error(error);
    }
}

// 2nd api call: searches giphy for a gif with the food name and replaces the 
// image with a bootstrap card
function getGif(name, card) {
    const url = 'https://api.giphy.com/v1/gifs/translate?rating=g&s=' + name + '&api_key=u1gkCum5AcQOtATyb6idz3lww8hJ4ZY2';
    const response = fetch(url)
    .then ((response) => response.json())
    .then(data => {
        const gif = document.createElement("img");
        gif.classList.add("gif");
        let src = data.data.images.fixed_height.url
        gif.src = src;
        gif.alt = "";
        gif.style.height = "10rem";

        console.log(card);
        card.firstChild.replaceWith(gif);

    })
}

// resets all fields and fetches
function clear() {
    search.value = "";
    div.id = "apiStuff";
    document.getElementById("apiStuff").replaceWith(div);
}

// make first API call
search.addEventListener("change", function(e) {
    getArticles(search.value);
    e.preventDefault();
});

// functionality for clear button
document.getElementById("clear").addEventListener("click", function (e) {
    clear();
});

// on page load (refresh dynamic elements)
clear()