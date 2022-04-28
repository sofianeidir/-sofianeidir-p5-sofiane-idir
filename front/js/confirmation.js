let orderId = document.getElementById("orderId");

function getId(){ 
  return new URL(location.href).searchParams.get("id") 
}

const idValidation = getId()
  
orderId.textContent = idValidation;


