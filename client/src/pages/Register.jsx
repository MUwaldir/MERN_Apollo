import React, { useState } from 'react';

import * as yup from 'yup';
import { CREATE_USER } from '../graphql/projects';
import { useMutation } from '@apollo/client';



function Register() {
  const schema = yup.object().shape({
    username: yup.string().required('El nombre de usuario es obligatorio'),
    email: yup.string().email('Ingrese un correo electrónico válido').required('El correo electrónico es obligatorio'),
    password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
  });
  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  
  const [values, setValues] = useState({ username: '', email: '', password: '' });
   const [errors, setErrors] = useState({ username: '', email: '', password: '' });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
 };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Enviar datos al servidor o realizar otras acciones
     
    try {
      await schema.validate(values, { abortEarly: false });
      await createUser({variables: values});
      console.log('Datos enviados:', values);
      setValues({username:'', password:'',email: ''})
      setErrors({username:'', password:'',email: ''})
      
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Manejar errores de validación del esquema
        console.error(error.message);
        const validationErrors = {};
        error.inner.forEach((innerError) => {
          validationErrors[innerError.path] = innerError.message;
        });
        setErrors(validationErrors);
      } else {
        // Manejar errores específicos del servidor (puedes personalizar según tu API)
        console.error('Error del servidor:', error.message);
        // Mostrar el mensaje de error al usuario
        setErrors({ server: 'Ocurrió un error. Por favor, inténtelo de nuevo más tarde.' });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Nombre de Usuario:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            className={`mt-1 p-2 border rounded-md w-full ${errors.username ? 'border-red-500' : ''}`}
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo Electrónico:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className={`mt-1 p-2 border rounded-md w-full ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className={`mt-1 p-2 border rounded-md w-full ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <button type="submit" className="bg-indigo-500 text-white p-2 rounded-md w-full">
          Registrar
        </button>
      </form>
      {error && (
        <div className="mt-4 text-red-500">
          <p>{error.message}</p>
        </div>
      )}
    </div>
  );
}

export default Register;
