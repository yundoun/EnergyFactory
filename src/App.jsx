import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import GlobalStyles from './styles/globalStyles';

// 레이아웃 컴포넌트
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// 페이지 컴포넌트
import HomePage from './pages/HomePage';
// 아직 구현되지 않은 컴포넌트는 주석 처리
// import NutritionCalculator from './pages/NutritionCalculator';
// import DietCoach from './pages/DietCoach';
// import Products from './pages/Products';
// import ProductDetail from './pages/ProductDetail';
// import Cart from './pages/Cart';
// import Login from './pages/Login';
// import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <UserProvider>
          <CartProvider>
            <GlobalStyles />
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  {/* 
                  <Route path="/nutrition-calculator" element={<NutritionCalculator />} />
                  <Route path="/diet-coach" element={<DietCoach />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  */}
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
