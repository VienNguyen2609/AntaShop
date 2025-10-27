import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider, AuthProvider } from "./contexts";
import { ROUTES } from "./constants";
import { 
  HomePage, 
  Login, 
  Register, 
  ForgotPassword, 
  ResetPassword, 
  AdminPage, 
  MegaSale, 
  CartPage,
  ProductListPage,
  ProductDetailPage
} from "./pages";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to={ROUTES.HOME} />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.ADMIN} element={<AdminPage />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path={ROUTES.MEGA_SALE} element={<MegaSale />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/men" element={<ProductListPage />} />
            <Route path="/women" element={<ProductListPage />} />
            <Route path="/kids" element={<ProductListPage />} />
            <Route path="/accessories" element={<ProductListPage />} />
            <Route path="/new" element={<ProductListPage />} />
            <Route path="/exclusive" element={<ProductListPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
