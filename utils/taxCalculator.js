
function calculateProductTax(price, quantity) {
    
    let tax = 200;

    if(price > 1000 && price <= 5000){
        tax = price * (0.12);
    }else if(price > 5000){
        tax = price * (0.18);
    }
    
    return tax * quantity;
  }
  
  function calculateServiceTax(price, quantity) {

    let tax = 100;
    
    if(price > 1000 && price <= 8000){
        tax = price * (0.10);
    }else if(price > 8000){
        tax = price * (0.15);
    }
    
    return tax * quantity;
  }
  
module.exports = { calculateProductTax, calculateServiceTax };
  