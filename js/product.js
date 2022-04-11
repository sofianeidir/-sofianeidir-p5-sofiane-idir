
// On récupère l'id
function getId(){ 
  return new URL(location.href).searchParams.get("id") 
}

// On récupère les données via fetch
function getArticle(articleId){ 
  return fetch(`http://localhost:3000/api/products/${articleId}`)                           
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

// On hydrate le contenue de la page produit avec les bonnes valeurs de l'article
function hydrateArticle(article){  
document.querySelector(".item article >.item__img").innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}">`
document.getElementById("title").textContent = article.name
document.getElementById("price").textContent = article.price
document.getElementById("description").textContent = article.description
// On récupère l'id dans la page
let selectColor =  document.querySelector("#colors")
let colors = article.colors.length;
let colorChoice = article.colors;
for (let i = 0; i < colorChoice.length; i++){
selectColor.innerHTML += `<option value="${colorChoice[i]}">${colorChoice[i]}</option>`;
}

/**************************LOCAL STORAGE *****************************/

function event(){  
// Selection des élements dans le DOM 
let btnSupp = document.getElementById("addToCart");
let color = document.querySelector('select[name="color-select"]');
let quant = document.getElementById("quantity");

// Écoute du changement de couleur
color.addEventListener("change", function(c){
tab.colors = c.target.value;
})

// Écoute du changement de la quantité
quant.addEventListener("input", function(d){
tab.quantite = d.target.value;
})

// Tableux des valeurs séléctionnées par l'utilisateur, affiché dans le localStorage
let tab = {
id :article._id, 
colors : article.colors,  
quantite: 1,
};

// Écoute du bouton " Ajouter au panier " 
btnSupp.addEventListener("click", function(e){

if(tab.colors === article.colors || tab.colors === ""){    
alert("Veillez sélectionner une couleur")
sessionStorage.removeItem("produit"); 
} else {
// Fonction pour rediriger l'utilisateur en fonction de sa réponse
function redirection(){
  alert("votre produit à bien été ajouté au panier !")
  // Si oui, il sera rdirigé vers la page panier 
   let oui = confirm("Voulez-vous être redirigé vers la page panier ?")
   if (oui){
    document.location.href = "./cart.html"
   } 
  else {
   document.location.href= "./index.html"
  }         
}redirection()

/*********** Envoie des produits selectionnés dans le local storage ****************/
// On créer la variable qui contient les données du local storage 
let produitJson = JSON.parse(localStorage.getItem("produit"));
// Première condition, si le localStorage est vide
if(produitJson === null){
produitJson = [];
// On push les données ( du tableau créer plus haut ) dans le localStorage
produitJson.push(tab);
// On re actualise le localStorage (avec les nouvelles valeurs ajoutées)
localStorage.setItem("produit", JSON.stringify(produitJson));
} 

// Deuxième condition, si le localStorage n'est pas vide
else if(produitJson != null){
// On boucle sur les données présente dans le localStorage
for( i = 0; i < produitJson.length; i++){
// Si les données qu'on ajoute sont égales aux données déjà enregistrées dans le localStorage 
 if (produitJson[i].id === tab.id && produitJson[i].colors === tab.colors){
// On retourne + 1 à la quantité du produit en question
   return(
     produitJson[i].quantite++,
     localStorage.setItem("produit", JSON.stringify(produitJson)))
 }
}
// Si les données qu'on ajoute ont le même id mais pas la même couleur ou l'inverse
for( i = 0; i < produitJson.length; i++) {
  if(
    (produitJson[i].id === tab.id &&  produitJson[i].colors !== tab.colors) || produitJson[i].id !== tab.id ){
// On retourne les valeurs ajoutées dans un nouvel index      
    return(
      produitJson.push(tab), 
      localStorage.setItem("produit", JSON.stringify(produitJson)))
  }
}
}
}
// Fin du else (Dans le cas ou mon localStorage ne serait pas vide)

});
// Fin de l'écoute au click du bouton "ajouter au panier"

}event()
} //fin de la fonction HydrateArticle


// Appelle de la fonction qui englobe tout 
async function main(){  
// id de l'article
const articleId = getId()
// Données reucpérées de l'API
const article = await getArticle(articleId)
// modification du contenue de la page produit avec les valeurs de l'article en fonction de son id
hydrateArticle(article)
}
main();

