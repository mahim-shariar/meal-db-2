let handleSearch = (event) => {
  event.preventDefault();
  let search = document.getElementById("search").value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((data) => {
      displayCard(data.meals);
    });
};

let displayCard = (data) => {
  let cardContainer = document.getElementById("meal-container");
  cardContainer.innerHTML = "";
  if (data == null) {
    let notfound = document.createElement("h1");
    notfound.className = "text-center";
    notfound.innerText = "Not Found";
    cardContainer.appendChild(notfound);
  } else {
    data.forEach((element) => {
      console.log(element);
      let card = document.createElement("div");
      card.className = "col-lg-3 mb-4";

      card.innerHTML = `
              <div class="card" onclick="handleDetails(${element.idMeal})" >
                <img class="card-img-top" src="${element.strMealThumb}" alt="${element.strMeal}" />
                <div class="card-body">
                  <h5 class="card-title">${element.strMeal}</h5>
                </div>
              </div>
            `;

      cardContainer.appendChild(card);
    });
  }
};

let handleDetails = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      let meal = data.meals[0];
      displayDetails(meal);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

let displayDetails = (meal) => {
  let detailsContainer = document.getElementById("meal-details");

  detailsContainer.innerHTML = `
      <div class="card w-50 mx-auto">
        <img class="card-img-top" src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text"><strong>Category:</strong> ${meal.strCategory}</p>
          <p class="card-text"><strong>Area:</strong> ${meal.strArea}</p>
          <p class="card-text"><strong>Instructions:</strong> ${meal.strInstructions.slice(0,300)}</p>
          <a href="${meal.strYoutube}" class="btn btn-danger" target="_blank">Watch Video</a>

        </div>
      </div>
    `;
};
