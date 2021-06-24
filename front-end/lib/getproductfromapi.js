//Appel de l'API pour récupérer les données de chaques articles disponibles
const getProductsFromApi = async () => {
    await fetch("http://localhost:3000/api/cameras")
      .then((response) => response.json())
      .then((data) => displayCardTemplateFromApiData(data, cardTemplate));
  };

  // Appel de l'API pour récupérer le lien du produit à afficher à l'aide de la variable "idProduct" et affichage du html
 
const getProductFromApi = async () => {
    await fetch(`http://localhost:3000/api/cameras/${idProduct}`)
      .then((response) => response.json())
      .then((product) => {
        displayCardTemplateFromApiData(product, templateHtmlProduct)
        // Affichage du HTML
    }
    )
};



