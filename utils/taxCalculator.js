
function calculateProductTax(price) {
    
    const tax = 200;

    if(price > 1000 && price <= 5000){
        tax = price * (0.12);
    }else if(price > 5000){
        tax = price * (0.18);
    }
    
    return tax;
  }
  
  function calculateServiceTax(price) {

    const tax = 100;
    
    if(price > 1000 && price <= 8000){
        tax = price * (0.10);
    }else if(price > 8000){
        tax = price * (0.15);
    }
    
    return tax;
  }
  
module.exports = { calculateProductTax, calculateServiceTax };
  