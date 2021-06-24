////////////// page produit //////////////////////

// Création d'une fonction permettant la récupération d'une nouvelle URL produit avec une requete de la clé et valeur de paramètre.
// récupération de la chaine de requete dans l'url
const getQueries = () => {
  const params = new URLSearchParams(window.location.search);
  const objectOfQueries = {};
  for (const [key, value] of params) {
    objectOfQueries[`${key}`] = value;
  }
  return objectOfQueries;
};

// Variable pour l'appel de la requete de l'id produit
const idProduct = getQueries().produit;

// Appel de l'API pour récupérer le lien du produit à afficher à l'aide de la variable "idProduct" et affichage du html
const getProductFromApi = async () => {
  await fetch(`http://localhost:3000/api/cameras/${idProduct}`)
    .then((response) => response.json())
    .then((product) => {
      // Affichage du HTML
      document.querySelector("#container-product").innerHTML += `
        <div id="theme_card">
          <h3 class="titleProduct">${product.name} </h3>
       
            <img src="${product.imageUrl}" class="img_product">
            <p class="price">Prix : ${product.price / 100}.00 €</p>
            <p class="decription_product">${product.description}</p>
            <form>
              <label for="option_product">Choisir l'option : </label>
                <select name="option_product" id="option_product">
                </select>
                    
              <label for="quantity_product">Choisir la quantité : </label>
                <input id="numberQuantity" type="number" placeholder="Quantité" step="1" min="1" max="10">
            </form>
            <button id="btn" type="submit" name="btn">Ajouter au panier</button>
        </div>`;

      //Le formulaire s'adapte au nombre d'option qu'il y a dans l'objet du produit.
      const optionQuantity = product.lenses;
      let templateOptions = [];

      //Générer une boucle for pour itérer sur toute les options.
      for (let i = 0; i < optionQuantity.length; i++) {
        templateOptions =
          templateOptions +
          `<option value="${optionQuantity[i]}">${optionQuantity[i]}</option>`;
      }
      //injecter le html pour le choix des options produit.
      const eltOption = document.querySelector("#option_product");
      eltOption.innerHTML = templateOptions;

      //Quantité : choisir la quantité de produit.
      const templateQuantity = `
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>`;

      //Afficher les quantité sur la page :
      const positionElementQuantity = document.querySelector("#numberQuantity");
      positionElementQuantity.innerHTML = templateQuantity;

      /////////////////////////////// La gestion du panier /////////////////////////

      //Récupération des données sélectionnées par l'utilisateur et envoie du panier.

      // Sélection de l'id du formulaire.
      const idForm = document.querySelector("#option_product");

      //Sélection du bouton Ajouter au panier.
      const btnAddBasket = document.querySelector("#btn");

      //Ecouter le bouton et envoyer au panier.
      btnAddBasket.addEventListener("click", (event) => {
        event.preventDefault();

        //Mettre le choix de l'utilisateur dans une variable
        const options = idForm.value;

        //Mettre la quantité dans une variable.
        const selectQuantity = positionElementQuantity.value;

        //Récupération des valeurs et options du produit sélectionné.
        let optionsUser = {
          name: product.name,
          product_id: product._id,
          options: options,
          quantity: selectQuantity,
          prix: (product.price * selectQuantity) / 100,
        };

        //Fonction fenêtre Alert Pop Up
        const popupConfirmation = () => {
          //window.confirm affiche un dialogue modal avec un message et deux boutons, OK et Annuler.
          if (
            window.confirm(`Bravo ! Votre ${product.name} option: ${options} a bien été ajouté au panier. 
Pour consultez le panier appuyez sur OK sinon appuyez sur ANNULER pour revenir à l'accueil`)
          ) {
            window.location.href = "panier.html";
          } else {
            window.location.href = "index.html";
          }
        };
        /////////////////////////Local Storage//////////////////////////////

        //Stocker la récupération des valeurs du panier dans le localStorage

        /*Déclaration de la variable "productSaveInLocalStorage" 
        dans laquelle on met les keys et values présent dans le localStorage. la méthode 
        JSON.parse permet de convertir les données au format JSON qui sont dans le localStorage en objet Javascript*/
        let productSaveInLocalStorage = JSON.parse(
          localStorage.getItem("produit")
        );

        //Fonction permettant l'ajout du produit sélectionné au panier
        const addProductBasket = () => {
          // Ajout dans le tableau de l'objet contenant les valeurs choisi par l'utilisateur
          productSaveInLocalStorage.push(optionsUser);
          // Transformation en format JSON et envoi dans la key "basket" du localStorage
          localStorage.setItem(
            "produit",
            JSON.stringify(productSaveInLocalStorage)
          );
        };

        //Si des produits sont enregistrés dans le localStorage
        if (productSaveInLocalStorage) {
          addProductBasket();
          popupConfirmation();
        }
        //Si le localStrage ne présente pas de produit enregistré.
        else {
          productSaveInLocalStorage = [];
          addProductBasket();
          popupConfirmation();
        }
      });
    });
};

getProductFromApi();
