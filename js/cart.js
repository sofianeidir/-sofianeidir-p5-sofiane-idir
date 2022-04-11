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


let structureProduits = []
// Si le panier est vide : 
if(addProduits === null){
const panierVide = `<div>Le panier est vide</div>`
carte.innerHTML = panierVide;
} 
else {

// Si le panier n'est pas vide
for(p = 0; p < addProduits.length; p++){

  for(k= 0; k < article.length; k++){
    if(addProduits[p].id === article[k]._id){

      structureProduits = structureProduits + `
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

// Calcul du nombre de produit dans le panier + le prix 
      let totalProduits = document.querySelector("#totalQuantity");
      let totalMoney = document.querySelector("#totalPrice");
  
      totalProduits.textContent = addProduits.length
     
      totalMoney.textContent = article[k].price * addProduits[p].quantite;
    }
  }
}
}
// injection produits page panier
 if(p === addProduits.length){ // à revoir, quand p n'est pas définit ( panier vide)
    carte.innerHTML = structureProduits;
 }
   
/*********************Augmenter la quantiter depuis la page panier***********************/
// Sélection du bouton +
let btnPlus = document.querySelectorAll(".itemQuantity")
// Sélection du bouton supprimé
let supprimer = document.querySelectorAll(".deleteItem");
// Sélection de la div qui contient le produit
let carteProduit = document.querySelectorAll(".cart__item")

// Exécute une fonction donnée sur chaque élément du tableau
carteProduit.forEach((positive)=> {
  
  positive.addEventListener("change", (e)=> {
// Rafraîchissement de la page au changement de valeur
    window.location.href = "cart.html"
    for(i = 0; i < addProduits.length; i++){
      let x = e.target.value;
// parseInt convertit la chaîne de caractère en nombre
      let nombreX = parseInt(x);

      if(addProduits[i].id === positive.dataset.id && addProduits[i].colors === positive.dataset.color && x < addProduits[i].quantite ){
        return addProduits[i].quantite = nombreX, localStorage.setItem("produit", JSON.stringify(addProduits))
      //return addProduits[i].quantite--, localStorage.setItem("produit", JSON.stringify(addProduits))
   
      } else if (addProduits[i].id === positive.dataset.id && addProduits[i].colors === positive.dataset.color){
    return addProduits[i].quantite = nombreX, localStorage.setItem("produit", JSON.stringify(addProduits))
       // return addProduits[i].quantite++, localStorage.setItem("produit", JSON.stringify(addProduits))
      }
    }
  })
})
// BOUTON SUPPRIMER
supprimer.forEach((supp) => {
  
  supp.addEventListener("click", function(){
   
// Rafraîchissement de la page au changement de valeur
    window.location.href = "cart.html"
    for(i = 0; i < addProduits.length; i ++){
     // voir si quand on clic sur supp tout doit partir ou attendre la quantite a 1
      if(supp.closest(".cart__item").dataset.id === addProduits[i].id && supp.closest(".cart__item").dataset.color === addProduits[i].colors && addProduits[i].quantite > 1){
        return addProduits[i].quantite--,

        localStorage.setItem("produit", JSON.stringify(addProduits))
      }
      
      else if(supp.closest(".cart__item").dataset.id === addProduits[i].id && supp.closest(".cart__item").dataset.color === addProduits[i].colors && addProduits[i].quantite === 1 && addProduits.length > 1){
        addProduits.splice(i, 1);
        localStorage.setItem("produit", JSON.stringify(addProduits));
      }

      if(supp.closest(".cart__item").dataset.id === addProduits[i].id && supp.closest(".cart__item").dataset.color === addProduits[i].colors && addProduits[i].quantite === 1 && addProduits.length == 1) {
        localStorage.removeItem("produit");   
      }    
    }
  })
})
}



/******************** Validation du formulaire  *************************/
let prenom = document.getElementById("firstName");
let nom = document.getElementById("lastName");
let adresse = document.getElementById("address");
let ville = document.getElementById("city");
let email = document.getElementById("email");
let error = document.getElementById("firstNameErrorMsg");


// On récupère le bouton commander
let btnValider = document.getElementById("order");

// On écoute le bouton "Commander"
btnValider.addEventListener("click", function(){
  if(prenom == null){
    error.textContent += " veuillez renseigner tous les champs"
  }
    
 // alert("Merci pour votre commande")
})


let teste = document.querySelectorAll(".cart__item__content__description p:last-child");
console.log(teste)

// Fonction main qui regroupe les autres
async function main(){  
  const article = await getArticle()
  panierArticle(article)
} main()




















