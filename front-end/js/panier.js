///----------------------- PAGE PANIER ------------------------///

//Déclaration de la variable "productSaveInLocalStorage" dans laquelle on met les keys et values présent dans le localStorage
//JSON.parse permet de convertir les données au format JSON qui sont dans le localStorage en objet Javascript
let productSaveInLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(productSaveInLocalStorage);

//----------DEBUT - Fonction AFFICHAGE DES PRODUITS DANS LE PANIER ----------//

//Sélectionner la classe ou je doit injecter mon html
const positionElementBasket = document.querySelector("#basket");
console.log(positionElementBasket);

// Si panier est vide : Afficher le panier est vide
if (productSaveInLocalStorage === null || productSaveInLocalStorage == 0) {
  const basketBlank = `
    <div class="container-panier-vide">
        <div>	
        &#10077;
        Le panier est vide !
        &#x275D;
        </div>
    </div>`;
  positionElementBasket.innerHTML = basketBlank;
} else {
  //si le panier n'est pas vide, je dois afficher les produits sélectionné depuis le localStorage
  let templateProductBasket = [];
  for (j = 0; j < productSaveInLocalStorage.length; j++) {
    templateProductBasket =
      templateProductBasket +
      `
      <div class="container-recap-basket">
        <div>Appareil photo : ${productSaveInLocalStorage[j].name} - Options : ${productSaveInLocalStorage[j].options} - Quantité : ${productSaveInLocalStorage[j].quantity}</div>
        <div class="priceAndClear">Tarif : ${productSaveInLocalStorage[j].prix}.00 € TTC &emsp;
        &emsp;
        <button class="btn-clear"><i class="fas fa-trash-alt"></i></button>
        </div>
      </div>
      `;
    console.log(productSaveInLocalStorage[j].prix);
  }
  if (j === productSaveInLocalStorage.length) {
    // injecter le html sur la page panier
    positionElementBasket.innerHTML = templateProductBasket;
  }
}

//const products = {
 // productSaveInLocalStorage,
//};
//console.log(products);

//----------FIN - Fonction AFFICHAGE DES PRODUITS DANS LE PANIER ----------//

/*********************************************************************************/

//////////////Gestion du bouton de suppression produit /////////////

// Création d'une variable "btnClear" pour la suppression des articles dans le panier
let btnClear = document.querySelectorAll(".btn-clear");
console.log(btnClear);

//Boucle for pour itéréer sur tout les éléments "cta supp" du panier
for (let k = 0; k < btnClear.length; k++) {
  //écoute des btn à supprimer
  btnClear[k].addEventListener("click", (event) => {
    event.preventDefault();
    //Sélection de l'id du produit qui va être supprimé en cliquant sur le CTA
    let selectIdDelete = productSaveInLocalStorage[k].product_id;
    console.log(selectIdDelete);

    // Suppression des éléments avec la méthode filter
    productSaveInLocalStorage = productSaveInLocalStorage.filter(
      (elt) => elt.product_id !== selectIdDelete
    );
    console.log(productSaveInLocalStorage);

    // On envoi les nouvelles valeurs dans le localStorage
    localStorage.setItem("produit", JSON.stringify(productSaveInLocalStorage));

    //Alert pour avertir de la suppression de l'article
    alert("Votre produit a été supprimer de votre panier");
    window.location.href = "panier.html";
  });
}

/*********************************************************************************/

//----------DEBUT - Fonction du bouton pour vider intégralement le panier ----------//

//Template html du btn à afficher sur la page.
const eltBtnAllClear = `
<button class="btn-clear-All">Videz le panier</button>
`;
console.log(eltBtnAllClear);

// insertion du bouton dans le HTML de la page panier
//insertAdjacentHTML() analyse le texte spécifié en tant que HTML ou XML Ceci, et le fait d'éviter la sérialisation supplémentaire, rend la fonction plus rapide et directe que innerHTML.
positionElementBasket.insertAdjacentHTML("beforeend", eltBtnAllClear);

//Sélectionner de l'id du bouton "btnAllClear".
const btnAllClear = document.querySelector(".btn-clear-All");
console.log(btnAllClear);

//-------Suppression de la "key" produit du localStorage
btnAllClear.addEventListener("click", (event) => {
  event.preventDefault();

  //.removeItem pour vider intégralement mon localStorage
  localStorage.removeItem("produit");

  //Alert le panier a été vidé
  alert("Votre panier est vide !");

  //Rechargement de la page panier après suppression
  window.location.href = "panier.html";
});

//----------FIN - Fonction du bouton pour vider intégralement le panier ----------//

/*********************************************************************************/

//---------- DEBUT- Fonction Calcul de la somme totale du panier ----------//

// Déclaration d'une variable pour récuperer les prix des articles présents dans le panier.
let sumTotal = [];

//Boucle for pour récuper les prix dans le tableau.
for (let l = 0; l < productSaveInLocalStorage.length; l++) {
  let priceProductOfBasket = productSaveInLocalStorage[l].prix;

  //Ajouter les prix du panier dans le tableau "sumTotal"
  sumTotal.push(priceProductOfBasket);
}

//Additionner la somme total du panier de la variable "sumTotal" avec la méthode "ARRAY.REDUCE".
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const priceTotal = sumTotal.reduce(reducer, 0);

// Template html pour afficher le prix total
const displayPriceTotalBasket = `
<div class="display-price-total">Prix total du panier : ${priceTotal}.00 € TTC</div>`;
//injecter le template html sur la page avec la methode "insertAdjacentHTML".
positionElementBasket.insertAdjacentHTML("beforeend", displayPriceTotalBasket);

//---------- FIN - Fonction Calcul de la somme totale du panier ----------//

/*********************************************************************************/

//-------- Début - Formulaire de commande --------//
//Fonction pour créer le template du formulaire
const displayFormBasket = () => {
  // Sélection élément du DOM pour le positionnement du formulaire
  const positionElementForm = document.querySelector("#basket");
  const templateForm = `
    <div id="formBasket">
      <h2 class="titleform">Remplissez le formulaire pour valider la commande</h2>

      <form>
        <label for="lastName">Nom :</label>
        <input type="text" id="lastName" name="lastName" placeholder="ex : JEAN" required />

        <label for="firstName">Prénom :</label>
        <input type="text" id="firstName" name="firstName" placeholder="ex : Mouloud" required />

        <label for="address">Addresse :</label>
        <textarea
          name="address"
          id="address"
          cols="15"
          rows="3"
          placeholder="ex : 15 rue de Paris"
          required
        ></textarea>

        <label for="city">Ville :</label>
        <input type="text" id="city" name="city" placeholder="ex : Paris" required />

        <label for="email">Adresse mail :</label>
        <input type="text" id="email" name="email" pattern="[^ @]*@[^ @]*" placeholder="Entrer votre email, ex : jean@mouloud.fr" required />

        <button id="btn-Validation-form" type="submit" name="sendForm">
          Confirmation de la commande
        </button>
      </form>
    </div>
    `;
  //injecter le HTML du formularire
  positionElementBasket.insertAdjacentHTML("afterend", templateForm);
};

//Afficher le formulaire
displayFormBasket();

//Séléction du CTA envoyer formulaire de contact
const btnSendForm = document.querySelector("#btn-Validation-form");
console.log(btnSendForm);

//---------AddEventListener pour écouter les évenements du formulaire

btnSendForm.addEventListener("click", (event) => {
  event.preventDefault();

  // Création d'un objet "contact" avec les valeurs du formulaire
  const contact = {
    lastName: document.querySelector("#lastName").value,
    firstName: document.querySelector("#firstName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };
  console.log("VALEUR FORMULAIRE DE CONTACT :");
  console.log(contact);

  //-------- Début - GESTION VALIDATION DU FORMULAIRE  --------//

  // Fonction intégrant les messages d'alerte lors d'un erreur de saisi
  const textAlert = (value) => {
    return `${value}: Les Chiffres et symbole ne sont pas autorisé :/ \n Merci de corriger votre saisie. \n Pour info  Min: 3 caractères et Max: 20 caractères autorisés `;
  };

  /********************Configuration des REGEX**************************/

  // Fonction pour sauvegarder la methode regEx pour les champs (lastName, Prénom et city)
  const regExLastNameFirstNameCity = (value) => {
    return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
  };

  // Fonction pour sauvegarder la methode regEx pour les champs (Adresse)
  const regExAdresse = (value) => {
    return /^[A-Za-z0-9\s]{5,50}$/.test(value);
  };


  //Fonction pour sauvegarder la methode regEx pour le champ (EMAIL)
  const regExEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };

  /********************Controle des champs du formulaire ***************/

  //Controle et validité du champ "NOM"
  function validityLastName() {
    const lastName = contact.lastName;
    if (regExLastNameFirstNameCity(lastName)) {
      return true;
    } else {
      alert(textAlert(" lastName"));
      return false;
    }
  }

  //Controle et validité du champ "firstName"
  function validityFirstName() {
    const firstName = contact.firstName;
    if (regExLastNameFirstNameCity(firstName)) {
      return true;
    } else {
      alert(textAlert(" firstName"));
      return false;
    }
  }

  //Controle et validité du champ "ADRESSE"
  function validityAdress() {
    const address = contact.address;
    if (regExAdresse(address)) {
      return true;
    } else {
      alert(
        "L'adresse ne doit contenir que des chiffres et des lettres. \nPour info : Minimum 3 caractères et 50 caractères "
      );
      return false;
    }
  }

  //Controle et validité du champ "city"
  function validityCity() {
    const city = contact.city;
    if (regExLastNameFirstNameCity(city)) {
      return true;
    } else {
      alert(textAlert(" city"));
      return false;
    }
  }

  //Controle et validité du champ "EMAIL"
  function validityEmail() {
    const adresseEmail = contact.email;
    if (regExEmail(adresseEmail)) {
      return true;
    } else {
      alert('Votre adresse "email" n\'est pas valide');
      return false;
    }
  }

  //-------- FIN - GESTION VALIDATION DU FORMULAIRE  --------//

  // Si les toutes les champs son complété correctement alors tu peux envoyer les valeurs sur le localStorage
  if (
    validityLastName() &&
    validityFirstName() &&
    validityCity() &&
    validityEmail() &&
    validityAdress()
  ) {
    //Mettre l'objet "contact" dans le localStorage et CONVERTIR l'objet en chaine de caractère avec la méthode "JSON.stringify()"
    localStorage.setItem("contact", JSON.stringify(contact));
    localStorage.setItem("priceTotal", JSON.stringify(priceTotal));

    //Enregistrer les valeurs du formulaire et des produits sélectionnées dans un objet à envoyer au serveur.
    const sendServer = {
      contact,
      products: productSaveInLocalStorage.map(
        (products) => products.product_id
      ),
    };

    console.log("Donnée envoyée au server");
    console.log(sendServer);
    console.log(productSaveInLocalStorage.map((product) => product.product_id));

    sendDataServer(sendServer);

    //Sinon 'Alert' champ ou saisi incorrect
  } else {
    alert("Veuillez compléter les informations du formulaire");
  }

  function sendDataServer(sendServer) {
    //ENvoie de l'objet "sendServer" vers le serveur avec une promesse
    console.log();
    let promise01 = fetch("http://localhost:3000/api/cameras/order", {
      method: "POST",
      body: JSON.stringify(sendServer),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("promise objet SendServer");
    console.log(promise01);

    //Pour consulter le résultat du serveur sur la console
    promise01.then(async (response) => {
      //si la promesse est rejetée et pas résolu "gestion des erreurs avec try et catch()"
      try {
        const content = await response.json();
        console.log("contenu de la reponse");
        console.log(content);

        if (response.ok) {
          console.log(`Resultat de response.ok : ${response.ok}`);

          //récupération de l'id de la réponse
          console.log("réponse avec l'ID");
          console.log(content.orderId);

          //Mettre l'id ORDER dans le localStorage
          localStorage.setItem("orderId", content.orderId);

          //Aller vers la page de confirmation commande
          window.location = "confirmation.html";
        } else {
          console.log(`Resultat de response.status : ${response.status}`);
          alert(`Problème avec le serveur : erreur ${response.status}`);
        }
      } catch (event) {
        console.log("ERREUR : qui vient du catch()");
        console.log(event);
        alert(`Erreur qui vient du catch() ${event}`);
      }
    });
  }
});

/*************Function pour Envoi data au server***************** */

//-------------Mettre le contenu du localStorage sur les champs du formulaire
// récuperer la key du localStorage et la mettre dans une variable
const dataLocalStorage = localStorage.getItem("contact");

//CONVERTIR la chaine de caractère enobjet Javascript avec la methode "JSON.parse()"
const dataLocalStorageObject = JSON.parse(dataLocalStorage);

//Fonction pour que les champs du formulaire soit rempli si les données sont présent sur le localStorage

function dataFormSaveInLocalStrorage(input) {
  if (dataLocalStorageObject == null) {
    console.log("Le localStorage a pour valeur null");
  } else {
    document.querySelector(`#${input}`).value = dataLocalStorageObject[input];
  }
}

dataFormSaveInLocalStrorage("lastName");
dataFormSaveInLocalStrorage("firstName");
dataFormSaveInLocalStrorage("address");
dataFormSaveInLocalStrorage("city");
dataFormSaveInLocalStrorage("email");

console.log("data LocalStorage Object");
console.log(dataLocalStorageObject);
