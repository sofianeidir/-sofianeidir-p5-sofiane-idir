

function getArticleId(){ // getId
    return new URL(location.href).searchParams.get("id") // on recupère l'article id
}

function getArticle(articleId){ // changer nom
    return fetch(`http://localhost:3000/api/products/${articleId}`)                           
    .then(function(res){               
      if (res.ok) { 
        return res.json() 
 
      }
    })
    .then(function(data){  
      //console.log(data)
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



 //**************************LOCAL STORAGE *****************************/
let btn = document.getElementById("addToCart");
 
 document.querySelector('select[name="color-select"]').addEventListener("change", function(c){
  let recap = c.target.value;
 
   let tab = {
     id :article._id, 
     colors : recap,
     quantite:1}

  btn.addEventListener("click", function(e){
  e.preventDefault();

  let produitJson = JSON.stringify(tab);
  localStorage.setItem("produit", produitJson);
  
  })

  
  // let teste = localStorage.getItem("produit")
 // localStorage.getItem("produit");

})







 
}} // creer un fonction et l'appeler dedans







  


async function init(){  
  const articleId = getArticleId() // id de l'article
  const article = await getArticle(articleId)
  hydrateArticle(article)
}
init();




// ****************************LOCAL STORAGE  ***************************************************
















/****************************************mon erreur mais qui etait juste mais torp longue */






/*
if(colors < 3 ){
  document.getElementById("colors").innerHTML = `<option value="">--SVP, choisissez une couleur --</option> <option value="">${article.colors[0]}</option>
  <option value="">${article.colors[1]}</option>`;
}else if(colors  == 3  ){ 
  document.getElementById("colors").innerHTML = `<option value="">--SVP, choisissez une couleur --</option> <option value="">${article.colors[0]}</option>
  <option value="">${article.colors[1]}</option> <option value="">${article.colors[2]}</option>`;
}else{
  document.getElementById("colors").innerHTML = `<option value="">--SVP, choisissez une couleur --</option> <option value="">${article.colors[0]}</option>
  <option value="">${article.colors[1]}</option> <option value="">${article.colors[2]}</option> <option value="">${article.colors[3]}</option>`;
}
// faire une boucle 
}*/
