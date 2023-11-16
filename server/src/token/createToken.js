import jwt from 'jsonwebtoken';

const secret = 'tu-secreto-secreto' // Convierte la cadena a base64


const createToken = (user) => {
    const expiresIn = 60 * 60; // 1 hora en segundos

    const token = jwt.sign(user, secret, { expiresIn });

    return token;
}

export default createToken;


