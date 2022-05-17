// on recupère les données de l'API via la methode fetch
function getArticles(){
  return fetch("http://localhost:3000/api/products")   
  .then(function(res){                  
    if(res.ok){ 
      return res.json()  
    }
  })
  // ici on récupère le retrun du then précédent donc les articles
  .then(function(data){  
  return data
  })
  .catch(function(error){
    alert("le serveur est éteint") 
  })
}
// on affiche dans la page nos articles
function displayArticle(product){         
  document.getElementById('items').innerHTML += `<a href="./product.html?id=${product._id}">
  <article>
    <img src=${product.imageUrl} alt=${product.altTxt}>
    <h3 class="productName">${product.name}</h3>
    <p class="productDescription">${product.description}</p>
  </article>
</a>`
}
// on regroupe les fonctions dans une seule 
async function main(){     
 // constante des données de l'API
  const articles = await getArticles() 
 //on boucle la constante articles 
  for(let produit of articles){           
    displayArticle(produit)
  }
}
main()  // fonction qui s'affiche au chargement de la page 
