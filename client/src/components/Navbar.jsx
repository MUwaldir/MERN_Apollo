import { useApolloClient, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GET_USER } from "../graphql/projects";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const apolloClient = useApolloClient();
  const id = localStorage.getItem("userId");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { loading, error, data } = useQuery(GET_USER, { variables: { id: id || null } });

  useEffect(() => {
    const tok = localStorage.getItem("token");
    setToken(tok);

    // Manejar la redirección en caso de error
    if (error && location.pathname !== "/login" && location.pathname !== "/register") {
      navigate("/projects");
    }
  }, [location.pathname, error]);

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken("");
    // Limpiar la caché de Apollo Client
  await apolloClient.clearStore();

  // Restablecer la caché de Apollo Client al cerrar sesión
  await apolloClient.resetStore();

  navigate("/projects");
   // Forzar una recarga completa de la página
   window.location.reload();
    
  };

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 w-full z-10 mb-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-lg font-bold">
          Projects Manager
        </Link>

        <div className="space-x-4 flex items-center">
          {token ? (
            <>
              <Link to="/projectsuser" className="text-white hover:text-gray-300">
                Mis Proyectos
              </Link>
              {data &&  <div className="text-white font-semibold">
                ¡Hola, {data.user.username}!
              </div>}
              <button onClick={logout} className="text-white hover:text-gray-300">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="text-white hover:text-gray-300">
                Registrarse
              </Link>
              <Link to="/login" className="text-white hover:text-gray-300">
                Iniciar Sesión
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
