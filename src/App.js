import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import CartPage from './CartPage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  useEffect(() => {
    // Fetch the list of products from the FakestoreAPI 
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        // Add 'quantity' property to each product in the initial state
        const productsWithQuantity = data.reduce((acc, product) => {
          return { ...acc, [product.id]: { ...product, quantity: 0 } };
        }, {});
        setProducts(productsWithQuantity);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Function to handle adding items to the cart
  const addToCart = (item) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      updatedCartItems[item.id] = {
        ...item,
        quantity: updatedCartItems[item.id] ? updatedCartItems[item.id].quantity + 1 : 1,
      };
      toast.success('Item added to cart!', { autoClose: 2000 });
      return updatedCartItems;
    });
   
  };




  // Function to handle removing items from the cart
  const removeFromCart = (itemToRemove) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      if (updatedCartItems[itemToRemove.id].quantity > 1) {
        updatedCartItems[itemToRemove.id].quantity -= 1;
      } else {
        delete updatedCartItems[itemToRemove.id];
      }
      toast.error('Item removed from cart!', {
        autoClose: 2000,
        className: 'custom-toast',
        bodyClassName: 'toast-body',
        progressClassName: 'toast-progress',
      });
      return updatedCartItems;
    });
  };

  // Function to calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return Object.values(cartItems).reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Router>
      <div className="app">
        <header>
          <nav> 
            <ul>
              <li><Link className='home' to="/"><i className='fas fa-home'></i> Home</Link></li>
              <li><Link className='cart' to="/cart"><i className='fas fa-shopping-cart'></i> Cart</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            {/* Homepage route */}
            <Route exact path="/" element={<HomePage products={Object.values(products)} addToCart={addToCart} />} />
            {/* Shopping cart route */}
            
            <Route path="/cart" element={<CartPage
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                total={calculateTotalPrice()}
              />} />
          </Routes>
        </main>
      </div>
      <footer className="footer py-5 bg-dark">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <p className="text-muted">Everything at one place!</p>
          </div>
          <div className="col-md-4">
            <h3 className="footer-title text-light">Quick Links</h3>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light">Home</a></li>
              <li><a href="/cart" className="text-light">Cart</a></li>
            </ul>
          </div>
          <div className="col-md-4 text-md-right">
            <h3 className="footer-title text-light">Follow Us</h3>
            <ul className="list-unstyled footer-social">
              <li><a href="#" className="text-light"><i className="fab fa-facebook"></i></a></li>
              <li><a href="#" className="text-light"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#" className="text-light"><i className="fab fa-instagram"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom bg-dark">
        <div className="container text-muted">
          <p className="mb-0">&copy; 2023 Your Company. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
    </Router>
    
  );
};

export default App;
