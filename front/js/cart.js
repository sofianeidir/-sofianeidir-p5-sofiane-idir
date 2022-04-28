// On récupère les données de l'API via fetch
function getArticle(){
  return fetch(`http://localhost:3000/api/products/`)                           
  .then(function(res){               
    if (res.ok) { 
      return res.json() 
    }
  })
  .then(function(data){  
  return data
  })
  .catch(function(error){
    alert("le serveur est eteint") 
  })
}


function panierArticle(article) {
// On récupère les produits stockés dans le local storage
  let addProduits = JSON.parse(localStorage.getItem("produit"));
//  Affichage des produits 
// Sélection de l'id, de la div qui va contenir le contenue des articles
  const carte = document.getElementById("cart__items");
 // On récupère les endroits où l'on souhaite les afficher
  let totalProduits = document.querySelector("#totalQuantity");
  let totalPrix = document.querySelector("#totalPrice");
// Si le panier est vide : 
  if(addProduits === null){
    carte.innerHTML = `<div>Le panier est vide</div>`;
    totalProduits.textContent = 0;
    totalPrix.textContent = 0;
  } 
  else {
// Si le panier n'est pas vide
    for(p = 0; p < addProduits.length; p++){

      for(let k= 0; k < article.length; k++){
        if(addProduits[p].id === article[k]._id){
          carte.innerHTML += `
          <article class="cart__item" data-id="${addProduits[p].id}" data-color="${addProduits[p].colors}">
            <div class="cart__item__img">
              <img src="${article[k].imageUrl}" alt="">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${article[k].name}</h2>
                <p>${addProduits[p].colors}</p>
                <p>${article[k].price}€</p>  
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${addProduits[p].quantite}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
                </div>
            </div>
          </article>`; 
        }
      }
    }
  }
/********************* Augmenter la quantiter depuis la page panier ***********************/

// Sélection du bouton supprimé
  let supprimer = document.querySelectorAll(".deleteItem");
// Sélection de la div qui contient le produit
  let carteProduit = document.querySelectorAll(".cart__item")

// Exécute une fonction donnée sur chaque élément du tableau
  carteProduit.forEach((positive)=> {
  
    positive.addEventListener("change", (e)=> {

      for(let i = 0; i < addProduits.length; i++){
        let x = e.target.value;
// parseInt convertit la chaîne de caractère en nombre
        let nombreX = parseInt(x);

        if(addProduits[i].id === positive.dataset.id && addProduits[i].colors === positive.dataset.color && x < addProduits[i].quantite && x <= 100 ){
          return addProduits[i].quantite = nombreX, localStorage.setItem("produit", JSON.stringify(addProduits))
        } 
        else if (addProduits[i].id === positive.dataset.id && addProduits[i].colors === positive.dataset.color && x <= 100){
          return addProduits[i].quantite = nombreX, localStorage.setItem("produit", JSON.stringify(addProduits))
        }
      }
    })
  })
// BOUTON SUPPRIMER
  supprimer.forEach((supp) => {

    supp.addEventListener("click", function(){
// Confirmation de la suppression du produit    
      let yes = confirm(" Vous souhaitez retirer ce produit de votre panier ?");
      if(yes){

        for(let i = 0; i < addProduits.length; i ++){
// On rafraîchit le nombre d'articles et le prix après la suppression d'un produit 
          let produitLog = supp.closest(".cart__item");
          if(produitLog.dataset.id === addProduits[i].id && produitLog.dataset.color === addProduits[i].colors){
// Calcul de la quantité après avoir supprimé un article
            let quantLocal = addProduits[i].quantite;
            let valueQuant = totalProduits.textContent;
            let totalValueQuant =  valueQuant - quantLocal;
            totalProduits.textContent = totalValueQuant;
 
// Calcul du prix après avoir supprimé un article 
            let valuePrice = totalPrix.textContent;
            let contenuePrice = document.querySelectorAll(".cart__item__content__description p:last-child");
            let prix = contenuePrice[i].textContent;
            let nomberPrice = parseInt(prix);
            let totalValuePrice = valuePrice - nomberPrice;
            totalPrix.textContent = totalValuePrice;
          }
  
          if(supp.closest(".cart__item").dataset.id === addProduits[i].id && supp.closest(".cart__item").dataset.color === addProduits[i].colors  && addProduits.length > 1){
            addProduits.splice(i, 1);
            localStorage.setItem("produit", JSON.stringify(addProduits));
            supp.closest(".cart__item").remove();
          }

          if(supp.closest(".cart__item").dataset.id === addProduits[i].id && supp.closest(".cart__item").dataset.color === addProduits[i].colors && addProduits.length == 1) {
            localStorage.removeItem("produit");   
            supp.closest(".cart__item").remove(); 
            carte.innerHTML = `<div>Le panier est vide</div>`;
          }    
        }
      }
      else {
      localStorage.setItem("produit", JSON.stringify(addProduits));
      }
    })
  })
/************************ Affichage du prix total et de la quantité ************************/


// Tableaux qui vont contenir les prix / quantité de produits
  let tabPrix = [];
  let tabQuantite = [];

  for (let i = 0; i < carteProduit.length; i++ ){

// Calcul du nombre de produit dans le panier ***************************
    let contenueQuantite = document.querySelectorAll(".itemQuantity");
    let quantite = contenueQuantite[i].value;

// Convertie la chaîne de caractère en nombre
    let quantNomber = parseInt(quantite);
// On envoie les prix dans le tableau  
    tabQuantite.push(quantNomber);

// On additionne les valeurs dans le tableau tabQuantite
    const reducer2 = (accumulator, currentValue) => accumulator + currentValue;
    const quantiteToto = tabQuantite.reduce(reducer2, 0);
// Total de la quantité afficher dans la page panier
    totalProduits.textContent = quantiteToto;


// Calcul du prix total des produits dans le panier *************************
    let contenuePrice = document.querySelectorAll(".cart__item__content__description p:last-child");
    let price = contenuePrice[i].textContent;
// Convertie la chaîne de caractère en nombre
    let nomber = parseInt(price);
// RAJOUTER COM + voir placement
    contenuePrice[i].textContent = nomber * quantNomber + "€";
// On envoie les prix dans le tableau  
    tabPrix.push(nomber * quantNomber);
// On additionne les valeurs dans le tableau tabPrix
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const prixToto = tabPrix.reduce(reducer, 0);
// Total du prix afficher dans la page panier
    totalPrix.textContent = prixToto;

/******************************** Quantité et prix en fonction des séléctions du client **********************************/
    carteProduit[i].addEventListener("change", function(e){
// Total de la quantitée après changement de celle ci 
      quantite = e.target.value;
      quantNomber = parseInt(quantite);
      tabQuantite.splice(i, 1, quantNomber);
      const reducer2 = (accumulator, currentValue) => accumulator + currentValue;
      const quantiteTotalChange = tabQuantite.reduce(reducer2, 0);
      totalProduits.textContent = quantiteTotalChange;


      let calculPriceProduct = quantNomber * nomber;
      contenuePrice[i].textContent = calculPriceProduct + "€"
// Total du prix après changement de la quantité  
      let priceChange = contenuePrice[i].textContent;
      let priceChangeNomber = parseInt(priceChange);
      tabPrix.splice(i, 1, priceChangeNomber);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const priceTotalChange = tabPrix.reduce(reducer, 0);
      totalPrix.textContent = priceTotalChange;

      if(quantNomber > 100){
        alert("La quantité total maximum par produit est de 100 !");
        window.location.reload()
      }
    })
  }
}
/******************** Validation du formulaire  *************************/

// On récupère le bouton commander
let form = document.querySelector(".cart__order__form")
// Champs prénom
let prenom = document.getElementById("firstName");
prenom.addEventListener("input", function(){
  validPrenom(this)
})
// Fonction validPrenom
const validPrenom = function(inputPrenom){
  let prenomRegExp = new RegExp ('^[a-zA-Zàâéèëêïîôùüç -]{2,20}$') 
  let prenomInfo = document.getElementById("firstNameErrorMsg");
  if(prenomRegExp.test(inputPrenom.value)){
    prenomInfo.textContent = ""
    return true
  } else if(inputPrenom.value < 1){
   prenomInfo.textContent = "Champs obligatoire"
   return false
  } 
  else{
    prenomInfo.textContent = "Prénom incorrect!"
    return false
  }
}
// Champs nom
let nom = document.getElementById("lastName");
  nom.addEventListener("input", function(){
  validName(this)
})
// Fonction validNom 
const validName = function(inputName){
  let nameRegExp = new RegExp ('^[a-zA-Zàâéèëêïîôùüç -]{2,60}$');
  let nameInfo = document.getElementById("lastNameErrorMsg");
  if(nameRegExp.test(inputName.value)){
    nameInfo.textContent = "";
    return true
  }else if(inputName.value < 1){
    nameInfo.textContent = "Champs obligatoire"
    return false
  } 
   else{
    nameInfo.textContent = "Nom incorrect!";
    return false
  }
}
// Champs adresse
let adresse = document.getElementById("address");
adresse.addEventListener("input", function(){
  validAdress(this)
})
// Fonction validAdress
const validAdress = function(inputAdress){
  let adressRegExp = new RegExp ("^[a-zA-Z0-9\s,.' -]{3,}$");
  let adressInfo = document.getElementById("addressErrorMsg")
  if(adressRegExp.test(inputAdress.value)){
    adressInfo.textContent = "";
    return true
  } else if(inputAdress.value < 1){
    adressInfo.textContent = "Champs obligatoire"
    return false
  } 
  else {
    adressInfo.textContent = " Adresse non valide"
    return false
  }
}
// Champs ville 
let city = document.getElementById("city");
city.addEventListener("input", function(){
  validCity(this)
});
// Fonction validCity
const validCity = function(inputCity){
  let cityRegExp = new RegExp ('[a-z0-9._-]{3,12}$'); 
  let cityInfo = document.getElementById("cityErrorMsg");
  if(cityRegExp.test(inputCity.value)){
    cityInfo.textContent = ""
    return true
  }else if(inputCity.value < 1){
    cityInfo.textContent = "Champs obligatoire";
    return false
  } 
  else {
    cityInfo.textContent = "Ville non trouvée !";
    return false
  }
}
// Champs email
let email = document.getElementById("email");
email.addEventListener("input", function(){
  validEmail(this);
})
// Fonction validEmail
const validEmail = function(inputEmail){
  let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$','g');
  let emailInfo = document.getElementById("emailErrorMsg");
  if(emailRegExp.test(inputEmail.value)){
    emailInfo.textContent = ""
    return true
  } else if(inputEmail.value < 1){
    emailInfo.textContent = "Champs obligatoire";
    return false
  } 
  else {
    emailInfo.textContent = "Votre adresse mail n'est pas valide !";
    return false
  }
}
// déclaration de la vairable du bouton commander
let btnValider = document.getElementById("order");
// On écoute le bouton "Commander"
btnValider.addEventListener("click", function(event) {
  event.preventDefault();
  if(validPrenom(form.firstName) && validName(form.lastName) && validAdress(form.address) && validCity(form.city) && validEmail(form.email)){

    let tabProduit = [];
    let addProduits = JSON.parse(localStorage.getItem("produit"));
    if (addProduits === null){
      alert("Votre panier est vide")
    }
    for(let i = 0; i < addProduits.length; i++){
      tabProduit.push(addProduits[i].id);
    }
    let order = {
      contact : {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        address: form.address.value, // adresse 
        city: form.city.value,
        email: form.email.value,
      },
      products: tabProduit,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
    .then((response) => response.json())
    .then((data) => {
      window.location.href = `confirmation.html?id=${data.orderId}`;
    })
    .catch((err) => {
      alert ("Problème avec fetch : error");
    }); 
// si tout est ok, le local storage est vidée après la commande
    localStorage.clear();
  } 
  else {
    alert("Veuillez remplir les champs correctements avant de procéder au paiement");
  }
});

// Fonction main qui regroupe les autres
async function main(){  
  const article = await getArticle()
  panierArticle(article)
} main()

// au cas ou 
/*
function teste(){
  carteProduit[i].addEventListener("change", function(e){

    let teste = contenueQuantite[i].value;
    let parse = parseInt(teste);
    tabQuantite.splice(i, 1, parse)
    const reducer3 = (accumulator, currentValue) => accumulator + currentValue;
    const quantiteToto2 = tabQuantite.reduce(reducer3, 0);
  // Total de la quantité afficher dans la page panier
  totalProduits.textContent = quantiteToto2;  
  
  let sisi = parse * nomber;
    ////////// PRIX QUAND IL CHANGE
  let contenuePrix = document.querySelectorAll(".cart__item__content__description p:last-child");
  contenuePrix[i].textContent = sisi + "€"
  
    let prix = contenuePrix[i].textContent;
    let voila = parseInt(prix);
    tabPrix.splice(i,1, voila)
    const reducer4 = (accumulator, currentValue) => accumulator + currentValue;
    const prixToto4 = tabPrix.reduce(reducer4, 0);
  // Total du prix afficher dans la page panier
    totalPrix.textContent = prixToto4;
  });
}teste()*/