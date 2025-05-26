// src/router/AppRouter.jsx
// ========================
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import Checkout from "@/pages/Checkout";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import MainLayout from "@/layouts/MainLayout";
import Register from "@/components/RegisterModal";
import ProductPage from "@/pages/ProductPage";
import LegalMentions from "@/pages/static/LegalMentions";
import Contact from "@/pages/Contact";
import CartPage from "@/pages/CartPage";
import Terms from "@/pages/static/Terms";
import Privacy from "@/pages/static/Privacy";
import NotFoundPage from "@/pages/static/NotFoundPage";
import SuccessPage from "@/pages/static/SuccessPage";
import CancelPage from "@/pages/static/CancelPage";
import PersonalGalleryPage from "@/pages/PersonalGalleryPage";
import OrdersHistoryPage from "@/pages/OrdersHistoryPage";
import OrderDetailPage from "@/pages/OrderDetailPage";
import { useAuth } from "@/context/AuthContext";

const AppRouter = ({
  setShowSignup,
  setShowRegister,
  setPostLoginRedirect,
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout
            setShowSignup={setShowSignup}
            setShowRegister={setShowRegister}
            setPostLoginRedirect={setPostLoginRedirect}
          >
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
          <MainLayout
            setShowSignup={setShowSignup}
            setShowRegister={setShowRegister}
            setPostLoginRedirect={setPostLoginRedirect}
          >
            <Register />
          </MainLayout>
        }
      />

      <Route
        path="/checkout"
        element={
          isAuthenticated ? (
            <MainLayout
              setShowSignup={setShowSignup}
              setShowRegister={setShowRegister}
              setPostLoginRedirect={setPostLoginRedirect}
            >
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
          <MainLayout
            setShowSignup={setShowSignup}
            setShowRegister={setShowRegister}
            setPostLoginRedirect={setPostLoginRedirect}
          >
            <LegalMentions />
          </MainLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <MainLayout
            setShowSignup={setShowSignup}
            setShowRegister={setShowRegister}
            setPostLoginRedirect={setPostLoginRedirect}
          >
            <Contact />
          </MainLayout>
        }
      />

      <Route
        path="/product/:productType"
        element={
          <MainLayout
            setShowSignup={setShowSignup}
            setShowRegister={setShowRegister}
            setPostLoginRedirect={setPostLoginRedirect}
          >
            <ProductPage />
          </MainLayout>
        }
      />
      <Route
        path="/panier"
        element={
          <MainLayout
            setShowSignup={setShowSignup}
            setShowRegister={setShowRegister}
            setPostLoginRedirect={setPostLoginRedirect}
          >
            <CartPage
              setShowSignup={setShowSignup}
              setPostLoginRedirect={setPostLoginRedirect}
            />
          </MainLayout>
        }
      />
      <Route
        path="/account/creations"
        element={
          <MainLayout
            setShowSignup={setShowSignup}
            setShowRegister={setShowRegister}
            setPostLoginRedirect={setPostLoginRedirect}
          >
            <PersonalGalleryPage />
          </MainLayout>
        }
      />
      <Route
        path="/account/orders"
        element={
          <MainLayout
            setShowSignup={setShowSignup}
            setShowRegister={setShowRegister}
            setPostLoginRedirect={setPostLoginRedirect}
          >
            <OrdersHistoryPage />
          </MainLayout>
        }
      />
      <Route
        path="/order/:orderId"
        element={
          <MainLayout
            setShowSignup={setShowSignup}
            setShowRegister={setShowRegister}
            setPostLoginRedirect={setPostLoginRedirect}
          >
            <OrderDetailPage />
          </MainLayout>
        }
      />

      <Route path="/success" element={<SuccessPage />} />
      <Route path="/cancel" element={<CancelPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />

      <Route path="/account/creations" element={<PersonalGalleryPage />} />
      <Route path="/account/orders" element={<OrdersHistoryPage />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AppRouter;
