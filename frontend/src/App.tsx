import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Dashboard from "./pages/DashboardPage";
import { Toaster } from "@/components/ui/sonner";
import ContentList from "./pages/ContentListPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route pour la page d'accueil qui redirige selon l'état d'auth */}
          <Route path="/" element={<HomePage />} />

          {/* Routes Publiques (accessibles UNIQUEMENT si NON connecté) */}
          <Route path="/" element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Routes Protégées (accessibles UNIQUEMENT si connecté) */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:contentId" element={<Dashboard />} />
            <Route path="/my-content" element={<ContentList />} />
          </Route>
          
          {/* Gérer les routes non trouvées (par exemple, 404) */}
          <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirige toute route inconnue vers la page d'accueil */}
        </Routes>
        <Toaster position="top-right" richColors closeButton />
      </Router>
    </AuthProvider>
  );
};

export default App;
