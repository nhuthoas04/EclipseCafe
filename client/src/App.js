import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Products from './pages/shop/Products';
import ProductDetail from './pages/shop/ProductDetail';
import Cart from './pages/shop/Cart';
import Checkout from './pages/shop/Checkout';
import OrderSuccess from './pages/shop/OrderSuccess';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/user/Profile';
import About from './pages/About';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import CaPheArabicaCaoNguyen from './pages/blogDetails/CaPheArabicaCaoNguyen';
import CaPheSuaDaLinhHonViet from './pages/blogDetails/CaPheSuaDaLinhHonViet';
import NgheThuatPhaTraOolong from './pages/blogDetails/NgheThuatPhaTraOolong';
import TraSenVangHuongViTruyenThong from './pages/blogDetails/TraSenVangHuongViTruyenThong';
import EclipseHanhTrinhCaPheViet from './pages/blogDetails/EclipseHanhTrinhCaPheViet';
import MuaDongAmApEclipse from './pages/blogDetails/MuaDongAmApEclipse';
import AdminDashboard from './pages/admin/AdminDashboard';
import DrinkManagement from './pages/admin/DrinkManagement';
import AddEditDrink from './pages/admin/AddEditDrink';
import UserManagement from './pages/admin/UserManagement';
import OrderManagement from './pages/admin/OrderManagement';
import Analytics from './pages/admin/Analytics';
import BlogModern from './pages/BlogModern';

// Context
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || "your_google_client_id_here"}>
      <AuthProvider>
        <CartProvider>
          <Router>
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<Products />} />
              <Route path="/careers" element={<Careers />} />
              
              {/* Blog Routes */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog-list" element={<BlogList />} />
              <Route path="/blog/ca-phe-arabica-cao-nguyen" element={<CaPheArabicaCaoNguyen />} />
              <Route path="/blog/ca-phe-sua-da-linh-hon-viet" element={<CaPheSuaDaLinhHonViet />} />
              <Route path="/blog/nghe-thuat-pha-tra-oolong" element={<NgheThuatPhaTraOolong />} />
              <Route path="/blog/tra-sen-vang-huong-vi-truyen-thong" element={<TraSenVangHuongViTruyenThong />} />
              <Route path="/blog/eclipse-hanh-trinh-ca-phe-viet" element={<EclipseHanhTrinhCaPheViet />} />
              <Route path="/blog/mua-dong-am-ap-eclipse" element={<MuaDongAmApEclipse />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/blog-modern" element={<BlogModern />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/drinks" element={
                <ProtectedRoute>
                  <DrinkManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/drinks/add" element={
                <ProtectedRoute>
                  <AddEditDrink />
                </ProtectedRoute>
              } />
              <Route path="/admin/drinks/edit/:id" element={
                <ProtectedRoute>
                  <AddEditDrink />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute>
                  <UserManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/orders" element={
                <ProtectedRoute>
                  <OrderManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/analytics" element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      </CartProvider>
    </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
