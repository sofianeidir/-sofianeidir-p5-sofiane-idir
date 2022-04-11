
function getId(){ // getId
    return new URL(location.href).searchParams.get("id") // on recupère l'article id
}


function getArticle(articleId){ // changer nom ON DOIT
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



function hydrateArticle(article){  
document.querySelector(".item article >.item__img").innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}">`
document.getElementById("title").textContent = article.name
document.getElementById("price").textContent = article.price
document.getElementById("description").textContent = article.description
let selectColor =  document.querySelector("#colors")
let colors = article.colors.length;
let red = article.colors;
for (let i = 0; i < red.length; i++){

 selectColor.innerHTML += `<option value="${red[i]}">${red[i]}</option>`;
}


 /**************************LOCAL STORAGE *****************************/

function nuage(){   // CHANGER DE NOM !!
let btn = document.getElementById("addToCart");
let color = document.querySelector('select[name="color-select"]');
let quant = document.getElementById("quantity");

// ecoute du changement des couleurs
color.addEventListener("change", function(c){
tab.colors = c.target.value;
console.log(tab.colors)
})

console.log()

// ecoute du changement de la quantité
 quant.addEventListener("input", function(d){
tab.quantite = d.target.value;
})

// Tableux des valeurs séléctionnées par l'utilisateur
let tab = {
  id :article._id, 
  colors : article.colors,  
  quantite: 1,
};

// écoute du bouton au click
btn.addEventListener("click", function(e){
  
e.preventDefault();
e.stopPropagation();

if(tab.colors === article.colors || tab.colors === ""){    // tab.colors === article.colors || tab.colors === "" ou alors j'ai fait ca tab.colors.length === 3
  alert("Une couleur doit être remplie")
  sessionStorage.removeItem("produit"); // pour supp le produit mais est ce la bonne facon ?
} else {
// envoie dans le local storage
let produitJson = JSON.parse(localStorage.getItem("produit"));

if(produitJson === null){
  produitJson = [];
  produitJson.push(tab);
  localStorage.setItem("produit", JSON.stringify(produitJson));
  
  
} else if(produitJson != null){
  for( i = 0; i < produitJson.length; i++){
   if (produitJson[i].id === tab.id && produitJson[i].colors === tab.colors){
     return(
       produitJson[i].quantite++,
       localStorage.setItem("produit", JSON.stringify(produitJson)))
   }
  }
  for( i = 0; i < produitJson.length; i++) {
    if(
      (produitJson[i].id === tab.id &&  produitJson[i].colors !== tab.colors) || produitJson[i].id !== tab.id ){
      return(
        produitJson.push(tab), // retourne le tab dans un nouvelle index
        localStorage.setItem("produit", JSON.stringify(produitJson)))
    }
  }
}
}


});



}nuage()
} //fin de la fonction HydrateArticle


// appelle de la fonction qui englobe tout 
async function init(){  
  const articleId = getId() // id de l'article
  const article = await getArticle(articleId)

  hydrateArticle(article)
}
init();

// CREER UN MESSAGE DALERTE SI RIEN EST REMPLIE !!!!!!!! au click on peut pas continuer si on a rien remplie
// voir les nomsdes variables et fonctions, les commentaires !












