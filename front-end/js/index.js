/********************* Page index.html (Acceuil) **************************/

//Création du template HTML
const cardTemplate = (product) => {
  return `<div id="theme_card"><a href="produit.html?produit=${
    product._id
  }" class="card_product"><h3 class="title">${product.name}</h3> 
    <img src="${product.imageUrl}" class="img_product">
    <p class="price">Prix : ${product.price / 100}.00 €</p>
    <p class="decription_product">${product.description}</p></a>
    </div>`;
};

//Appel de l'API pour récupérer les données de chaques articles disponibles
const getProductsFromApi = async () => {
  await fetch("http://localhost:3000/api/cameras")
    .then((response) => response.json())
    .then((data) => displayCardTemplateFromApiData(data, cardTemplate));
};

//Création des produits dans HTML
const displayCardTemplateFromApiData = (arrayOfProduct, cardTemplate) => {
  const listOfProduct = document.createElement("div");
  arrayOfProduct.forEach((product) => {
    const homeCard = document.createElement("div");
    homeCard.innerHTML = cardTemplate(product);
    listOfProduct.appendChild(homeCard);
  });
  const listContainer = document.querySelector("#list-container");
  listContainer.appendChild(listOfProduct);
};

getProductsFromApi();
