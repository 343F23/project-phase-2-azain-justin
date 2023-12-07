

const myImage = document.createElement("img");

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
            
            card.style.width = "18rem";
            img.style.height = "10rem";
            gif.style.height = "10rem";

            name.textContent = c.food.label;
            let isGif = false;
            if (c.food.image != null) {
                img.src = c.food.image;
            }
            
            button.addEventListener("click", function (e) {
                if (!isGif) {
                    getGif(name.textContent, card);
                    isGif = true;
                } else {
                    let newImg = document.createElement("img");
                    newImg.style.height = "10rem";
                    if (c.food.image != null) {
                        newImg.src = c.food.image;
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
                    card.appendChild(gif);
                    getGif(c.food.label, card);
                }
                card.appendChild(body);
                div.appendChild(card);
            }
            
            prev = name.textContent;
          })
          });;

    } catch (error) {
        console.error(error);
    }
}

function getGif(name, card) {
    const url = 'http://api.giphy.com/v1/gifs/translate?s=' + name + '&api_key=u1gkCum5AcQOtATyb6idz3lww8hJ4ZY2';
    const response = fetch(url)
    .then ((response) => response.json())
    .then(data => {
        const gif = document.createElement("img");
        gif.classList.add("gif");
        let src = data.data.images.fixed_height.url
        gif.src = src;
        gif.style.height = "10rem";

        console.log(card);
        card.firstChild.replaceWith(gif);

    })
}
search.value = "";
const search = document.getElementById("search");
const div = document.createElement("div");
div.id = "apiStuff";
document.getElementById("apiStuff").replaceWith(div);
search.addEventListener("change", function(e) {
    getArticles(search.value);
    e.preventDefault();
});