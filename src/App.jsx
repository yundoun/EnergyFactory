import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './components/common/Toast';
import GlobalStyles from './styles/globalStyles';

// 레이아웃 컴포넌트
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// 페이지 컴포넌트
import HomePage from './pages/HomePage';
import NutritionCalculatorPage from './pages/NutritionCalculatorPage';
// 아직 구현되지 않은 컴포넌트는 주석 처리
import DietCoachPage from './pages/DietCoachPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <UserProvider>
          <ToastProvider>
            <CartProvider>
              <GlobalStyles />
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                      path="/nutrition-calculator"
                      element={<NutritionCalculatorPage />}
                    />
                    <Route path="/diet-coach" element={<DietCoachPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route
                      path="/products/:id"
                      element={<ProductDetailPage />}
                    />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </CartProvider>
          </ToastProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
