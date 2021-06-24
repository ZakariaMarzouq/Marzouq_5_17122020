/*****************PAGE DE CONFIRMATION DE COMMANDE********** */

//récupération de l'id de la commande (provenant du Serveur) dans le localStorage)
const responseId = localStorage.getItem("orderId");
console.log(`orderId : ${responseId} `);

//Récupération du prix total de la commande
const priceTotal = localStorage.getItem("priceTotal");
console.log(`priceTotal : ${priceTotal}€ TTC`);

//Template structure HTML de la page de confirmation et sélection de l'élément du DOM
const eltHtmlConfirmOrder = document.querySelector("#container-order");

const templateConfirmOrder = `
<h2>Récapitulatif de la commande :</h2>
<div class="recapOrder">
    <p>Merci pour votre commande !</p>
    <p>Votre commande numéro :<span class="bold"> ${responseId}</span> a bien été prise en compte.</p>
    <p>Le montant de votre commande est de :<span class="bold"> ${priceTotal}€ TTC.</span></p>
    <p class="bold">Au plaisir de vous revoir !</p>
</div>`;
//Injection html page confirmation commande :
eltHtmlConfirmOrder.insertAdjacentHTML("afterbegin", templateConfirmOrder);

//Supprimer les données du localStorage
function deleteKeyLocalStorage(keys) {
  keys.forEach(key => {
    localStorage.removeItem(key);
  });
}

deleteKeyLocalStorage(["priceTotal", "orderId", "produit"]);
