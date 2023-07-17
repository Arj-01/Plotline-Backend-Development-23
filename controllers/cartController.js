
const {
  calculateProductTax,
  calculateServiceTax,
} = require("../utils/taxCalculator.js");
const Cart = require("../models/cart.js");
const Product = require("../models/product.js");
const Service = require("../models/service.js");
const TotalBill = require("../models/totalBill.js");
const Order = require("../models/order.js");



module.exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId })
      .populate("products.item")
      .populate("services.item");

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
}



module.exports.addInCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { type, itemId } = req.params;
        const { quantity } = req.body;
    
        let cart = await Cart.findOne({ userId });
    
        if (!cart) {
          // Create a new cart for the user if it doesn't exist
          cart = new Cart({ userId, products: [], services: [] });
        }
    
        let item;
        let tax;
        let totalPrice;
        let price;
    
        if (type === "product") {

          item = await Product.findById(itemId);
          tax = calculateProductTax(item.price, quantity);
          price = item.price;
          totalPrice = price * quantity + tax;

          // Checking if the product is already in the cart
          const existingProductIndex = cart.products.findIndex((product) => product.item.toString() === itemId);

          if (existingProductIndex !== -1) {

            // Updating the existing product in the cart
            cart.products[existingProductIndex].quantity += quantity;
            cart.products[existingProductIndex].price += totalPrice;
            cart.products[existingProductIndex].tax += tax;

          } else {
      
            // adding a new product
            cart.products.push({ item: itemId, quantity, price, totalPrice, tax });

          }
    
        } else if (type === "service") {
    
          item = await Service.findById(itemId);
          tax = calculateServiceTax(item.price, quantity);
          price = item.price;
          totalPrice = price * quantity + tax;

          const existingServiceIndex = cart.services.findIndex((service) => service.item.toString() === itemId);

          if (existingServiceIndex !== -1) {
           
            // updating existing service in the cart
            cart.services[existingServiceIndex].quantity += quantity;
            cart.services[existingServiceIndex].price += totalPrice;
            cart.services[existingServiceIndex].tax += tax;

          } else {
            // Adding a new service to the cart
            cart.services.push({ item: itemId, quantity, price, totalPrice, tax });
          }
    
          
        } else {
          return res.status(400).json({ message: "Invalid item type" });
        }
    
        await cart.save();

        res.status(200).json({ message: "Item added to the cart", cart });
      } catch (error) {
        res.status(500).json({ message: "An error occurred", error });
      }
}


module.exports.deleteFromCart = async (req, res) => {
  try{

    const userId = req.user.userId;
    const { type, itemId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    let items;
    if (type === 'product') {
      items = cart.products;
    } else if (type === 'service') {
      items = cart.services;
    } else {
      return res.status(400).json({ message: 'Invalid item type' });
    }

    ///
    const updatedItems = items.filter((item) => item.item.toString() !== itemId);

    if (type === 'product') {
      cart.products = updatedItems;
    } else if (type === 'service') {
      cart.services = updatedItems;
    }

    await cart.save();

    res.status(200).json({ message: 'Item removed from the cart', cart});
  } 
   
  catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }

}


module.exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    await Cart.findOneAndDelete({ userId });

    res.status(200).json({ message: "Cart cleared successfully", Cart});
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
}


module.exports.checkout  = async(req, res) => {
  try {
    
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId }).populate('products.item').populate('services.item');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const items = [...cart.products, ...cart.services];

    let total = 0;
    let totalValue = 0;
    let products = [];
    let services = [];

    // console.log("-2");

    // console.log("-1");


    for (const item of items) {

      const {item: itemId, quantity, price, totalPrice, tax} = item;

      if (item.item instanceof Product) {

        products.push({item: itemId, quantity, price, totalPrice, tax });

      } else if (item.item instanceof Service) {

      
        services.push({ item: itemId, quantity, price, totalPrice, tax });

      } else {
        continue;
      }

      totalValue += totalPrice;

    }

    let totalBill = new TotalBill({ userId, products , services, totalValue});

    await totalBill.save();

    res.status(200).json({ message: 'Checkout successful', totalBill});
  } catch (error) {
    res.status(500).json({ message: 'error occurred in checkout' });
  }
}



module.exports.confirmOrder = async(req, res) => {

  try {

    const userId = req.user.userId;

    const totalBill = await TotalBill.findOne({ userId });

    if (!totalBill) {
      return res.status(404).json({ message: 'Total bill not found' });
    }


    let products = totalBill.products;
    let services = totalBill.services;
    let totalValue = totalBill.totalValue;

    if (products.length === 0 && services.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let order = new Order({ userId, products , services, totalPrice: totalValue});

    await order.save();

    // Clear the cart and total bill
    await Cart.findOneAndDelete({ userId });
    
    await TotalBill.findOneAndDelete({ userId });

    res.status(200).json({ message: 'Order confirmed successfully', order});
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
  
}

