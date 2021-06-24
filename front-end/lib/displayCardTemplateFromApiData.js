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

  export{displayCardTemplateFromApiData}