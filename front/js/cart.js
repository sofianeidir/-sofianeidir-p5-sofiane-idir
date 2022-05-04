// On récupère les produits stockés dans le local storage
let addProduits = JSON.parse(localStorage.getItem("produit"));
// déclaration de constantes
const totalProduits = document.querySelector("#totalQuantity");
const totalPrix = document.querySelector("#totalPrice");
// Tableaux qui vont contenir les prix / quantité de produits
let tabQuantite = [];
let tabPrix = [];

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
// Fonction pour afficher les produits sur la page panier
function displayArticle(article) {
// Sélection de l'id, de la div qui va contenir le contenue des articles
  const carte = document.getElementById("cart__items");
// Si le panier est vide : 
  if(addProduits === null){
    carte.innerHTML = `<div>Le panier est vide</div>`;
    totalProduits.textContent = 0;
    totalPrix.textContent = 0;
  } 
  else {
// Si le panier n'est pas vide
    for(let p = 0; p < addProduits.length; p++){ 
      for(let k= 0; k < article.length; k++){
        if(addProduits[p].id === article[k]._id){
          carte.innerHTML += `
          <article class="cart__item" data-id="${addProduits[p].id}" data-color="${addProduits[p].colors}">
            <div class="cart__item__img">
              <img src="${article[k].imageUrl}" alt="${article[k].altTxt}"> 
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
}
// Fonction pour augmenter la quantiter dans le local storage depuis la page panier
function changeQuantityLocalStorage(){
// Sélection de la div qui contient le produit
  const carteProduit = document.querySelectorAll(".cart__item");

  carteProduit.forEach((valueQuantity)=> {
    valueQuantity.addEventListener("change", (event)=> {
      for(let i = 0; i < addProduits.length; i++){ 
        let newValueQuantity = event.target.value;
        let parseNewValueQuantity = parseInt(newValueQuantity);
        if(addProduits[i].id === valueQuantity.dataset.id && addProduits[i].colors === valueQuantity.dataset.color &&  parseNewValueQuantity <= 100){
          return addProduits[i].quantite = parseNewValueQuantity, localStorage.setItem("produit", JSON.stringify(addProduits))
        }
      }
    })
  })
}
function deletProduct(){
// Sélection du bouton supprimé
let supprimer = document.querySelectorAll(".deleteItem");
// BOUTON SUPPRIMER
  supprimer.forEach((supp) => {
    supp.addEventListener("click", function(){
      location.reload();
// Si l'utilisateur confirme la suppression du produit
      let yes = confirm(" Vous souhaitez retirer ce produit de votre panier ?");
      if(yes){
        for(let i = 0; i < addProduits.length; i ++){
           if(supp.closest(".cart__item").dataset.id === addProduits[i].id && supp.closest(".cart__item").dataset.color === addProduits[i].colors && addProduits.length === 1) {
             localStorage.removeItem("produit");   
           } 
          if(supp.closest(".cart__item").dataset.id === addProduits[i].id && supp.closest(".cart__item").dataset.color === addProduits[i].colors && addProduits.length > 1 ){
            addProduits.splice(i,1);
            localStorage.setItem("produit", JSON.stringify(addProduits));
          }   
        }
      }
    })
  })
}
// Fonction qui va calculer la quantité/prix total des produits ajoutés au panier
function calculTotalQuantitePrix(){
let quantiteDom = document.querySelectorAll(".itemQuantity");
  for (let i = 0; i < quantiteDom.length; i++ ){
    // Calcul de la quantité total
    let quantite = quantiteDom[i].value;
    let quantNomber = parseInt(quantite);
    tabQuantite.push(quantNomber);
    const reducer2 = (accumulator, currentValue) => accumulator + currentValue;
    const quantiteToto = tabQuantite.reduce(reducer2, 0);
    totalProduits.textContent = quantiteToto;
    // Calcul du prix total 
    let contenuePrice = document.querySelectorAll(".cart__item__content__description p:last-child");
    let price = contenuePrice[i].textContent;
    let nomber = parseInt(price);
    contenuePrice[i].textContent = nomber * quantNomber + "€";
    tabPrix.push(nomber * quantNomber);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const prixToto = tabPrix.reduce(reducer, 0);
    totalPrix.textContent = prixToto;

/******************************** total Quantité/prix en fonction des changements **********************************/
    quantiteDom[i].addEventListener("change", function(event){
  // Total de la quantité après changement
      quantite = event.target.value;
      quantNomber = parseInt(quantite);
      tabQuantite.splice(i, 1, quantNomber) 
      const reducer3 = (accumulator, currentValue) => accumulator + currentValue;
      const quantiteTotalChange = tabQuantite.reduce(reducer3, 0);
      totalProduits.textContent = quantiteTotalChange;
  // Modification du prix d'un seul article en fonction de sa quantité
      let calculPriceProduct = quantNomber * nomber;
      contenuePrice[i].textContent = calculPriceProduct + "€" 
  // Total du prix après changement de la quantité  
      let priceChange = contenuePrice[i].textContent;
      let priceChangeNomber = parseInt(priceChange);
      tabPrix.splice(i, 1, priceChangeNomber);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const priceTotalChange = tabPrix.reduce(reducer, 0);
      totalPrix.textContent = priceTotalChange;
  // Si la quantité renseignée dans le dom est supérieur à 100        
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
// Fonction validNom 
const validName = function(inputName){
  let nameRegExp = new RegExp ('^[a-zA-Zàâéèëêïîôùüç -]{2,30}$');
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
// Fonction validAdress
const validAdress = function(inputAdress){
  let adressRegExp = new RegExp (`^[0-9a-z'àâéèêôùûçÀÂÉÈÔÙÛÇ\s,.' -]{1,50}$`);
  let adressInfo = document.getElementById("addressErrorMsg")
  if(adressRegExp.test(inputAdress.value)){
    adressInfo.textContent = "";
    return true
  }else if(inputAdress.value < 1){
    adressInfo.textContent = "Champs obligatoire"
    return false
  } 
  else {
    adressInfo.textContent = " Adresse non valide"
    return false
  }
}
// Fonction validCity
const validCity = function(inputCity){
  let cityRegExp = new RegExp ('^[a-zA-Zàâéèëêïîôùüç -]{2,30}$');
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
// Fonction validEmail
const validEmail = function(inputEmail){
  let emailRegExp = new RegExp('^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$', "g");
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
function validForm(){
// Champs prénom
  let prenom = document.getElementById("firstName");
  prenom.addEventListener("input", function(){
    validPrenom(this)
  })
// Champs nom
  let nom = document.getElementById("lastName");
    nom.addEventListener("input", function(){
    validName(this)  
  })
// Champs adresse  
  let adresse = document.getElementById("address");
  adresse.addEventListener("input", function(){
    validAdress(this)
  })
// Champs ville 
  let city = document.getElementById("city");
  city.addEventListener("input", function(){
    validCity(this)
  });
// Champs email
  let email = document.getElementById("email");
  email.addEventListener("input", function(){
    validEmail(this);
  })
}
function sendData(){
// déclaration de la vairable du bouton commander
  let btnValider = document.getElementById("order");
// On écoute le bouton "Commander"
  btnValider.addEventListener("click", function(event){
    event.preventDefault();
    if(validPrenom(form.firstName) && validName(form.lastName) && validAdress(form.address) && validCity(form.city) && validEmail(form.email)){ 
      let tabProduit = [];
      let addProduits = JSON.parse(localStorage.getItem("produit"));
    if(addProduits === null){
      alert("Votre panier est vide")
    }
    for(let i = 0; i < addProduits.length; i++){
      tabProduit.push(addProduits[i].id);
    }
    let order = {
      contact : {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        address: form.address.value,
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
      }
    };
// envoie des données avec la méthode POST
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
    } else{
    alert("Veuillez remplir les champs correctements avant de procéder au paiement");
    }
  });
}
// Fonction main qui regroupe toutes les fonctions
async function main(){  
  const article = await getArticle();
  displayArticle(article);
  changeQuantityLocalStorage();
  deletProduct();
  calculTotalQuantitePrix();
  validForm();
  sendData();
} main()
