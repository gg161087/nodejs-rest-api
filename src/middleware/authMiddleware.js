import config from './../config';
import jwt from 'jsonwebtoken';

const jwtMiddleware = (req, res, next) => {  
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).json({ error: 'No authentication token provided' });
	}

	try {     
		const payload = jwt.verify(token, config.jwt_secret);     
		req.id = payload.id;		
		next();
	} catch (err) {		
		res.status(401).json({ error: 'Invalid authentication token' });
	}
};

module.exports = jwtMiddleware;