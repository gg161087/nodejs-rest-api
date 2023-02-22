import config from './../config';
import jwt from "jsonwebtoken";

const jwtMiddleware = (req, res, next) => {
  // obtener el token del encabezado de autorización
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);
  // si no hay token, responder con un error
  if (!token) {
    return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
  }

  try {
    // verificar el token y obtener el payload    
    const payload = jwt.verify(token, config.jwt_secret);    
    // agregar el ID del usuario al objeto de solicitud
    req.id = payload.id;

    // continuar con la siguiente función de middleware
    next();
  } catch (err) {
    // si el token es inválido, responder con un error
    res.status(401).json({ error: 'Token de autenticación inválido' });
  }
};

module.exports = jwtMiddleware;