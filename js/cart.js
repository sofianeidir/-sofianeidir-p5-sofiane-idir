

function panierProduit(){
document.getElementById("cart__items").innerHTML = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
<div class="cart__item__img">
  <img src="" alt="">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>soso</h2>
    <p>titi</p>
    <p>2€</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>`
}
panierProduit()


/*function saveProduits(produit){
  localStorage.setItem("produit", JSON.stringify(produit));
}

function getProduits(){
let produits = (localStorage.getItem("produit"));
if(produit == null){
return []; 
}else{
  return JSON.parse(produit);
}
}

function addProduits(matiere){
  let produits = getProduits();
  produits.push(matiere);
  saveProduits(produit);
}*/



