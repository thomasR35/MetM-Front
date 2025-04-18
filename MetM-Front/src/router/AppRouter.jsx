import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import Checkout from "@/pages/Checkout";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import MainLayout from "@/layouts/MainLayout";
import Register from "@/pages/Register";
import ProductPage from "@/pages/ProductPage";
import LegalMentions from "@/pages/LegalMentions";
import Contact from "@/pages/Contact";
import CartPage from "@/pages/CartPage";
import { useAuth } from "@/hooks/useAuth.jsx";

const AppRouter = ({ setShowSignup, setPostLoginRedirect }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/gallery"
        element={
          <MainLayout>
            <Gallery />
          </MainLayout>
        }
      />
      <Route
        path="/register"
        element={
          <MainLayout>
            <Register />
          </MainLayout>
        }
      />
      <Route
        path="/checkout"
        element={
          isAuthenticated ? (
            <MainLayout>
              <Checkout />
            </MainLayout>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/mentions-legales"
        element={
          <MainLayout>
            <LegalMentions />
          </MainLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />

      <Route
        path="/product/:productType"
        element={
          <MainLayout>
            <ProductPage />
          </MainLayout>
        }
      />
      <Route
        path="/panier"
        element={
          <MainLayout>
            <CartPage
              setShowSignup={setShowSignup}
              setPostLoginRedirect={setPostLoginRedirect}
            />
          </MainLayout>
        }
      />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AppRouter;
