import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECT_USER, LOGIN } from '../graphql/projects'; // Asegúrate de tener la ruta correcta
import { useNavigate } from 'react-router-dom';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const [login, { loading, error }] = useMutation(LOGIN, {
    
    onCompleted:async (data) => {
      console.log(data);
      const token = data.login.value;
      const id = data.login.userId;

      localStorage.setItem('token', token);
      localStorage.setItem('userId',id);
      navigate('/projects')
      window.location.reload();
      // Realiza acciones adicionales después de iniciar sesión
      // history.push('/dashboard');
       // Limpiar la caché
      //  client.clearStore().then(() => {
      //   // Refrescar las consultas después de limpiar la caché
      //   client.query({
      //     query: GET_PROJECT_USER,
      //     variables: { /* Tus variables si las necesitas */ },
      //   });
      // });
    }
  });

  const handleLogin = () => {
    console.log({username, password})
    login({
      variables: {
        username,
        password,
      },
    });
   
    
  };
 

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
              disabled={loading}
            >
              Log In
            </button>
          </div>
        </form>
        {error && (
          <p className="text-red-500 text-xs italic">
            Error al iniciar sesión. Verifica tus credenciales.
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
