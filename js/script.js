// RAJOUTER DES COMMENTAIRES
function getArticles(){
  return fetch("http://localhost:3000/api/products")                           
  .then(function(res){                  // on lui donne des foncitons qu'il va executer quand il aura récupéré les données.
    if (res.ok) { 
      return res.json()    // retour en json
    }
  })
  .then(function(data){  // ici on récupère le retrun du then précédent donc les articles
  return data
  })
  .catch(function(error){
    alert("le serveur est éteint") // en cas d'erreur si fetch n'arrive pas à destination
  })
}


// 
function displayArticle(product){        // ici on affiche dans la page nos articles
  document.getElementById('items').innerHTML += `<a href="./product.html?id=${product._id}">
  <article>
    <img src=${product.imageUrl} alt=${product.altTxt}>
    <h3 class="productName">${product.name}</h3>
    <p class="productDescription">${product.description}</p>
  </article>
</a>`
}


// commentaire
async function main() {                      // await que avec fonction asynchrone donc async
  const articles = await getArticles()    // articles = fonction qui recupère les données, await car on attend que la promess à été résolut
  for(let article of articles){            // boucle
    displayArticle(article)
  }
}
main()  // fonction qui s'affiche au chargement de la page // J'appelle ma fonction main()
