import JWT from 'jsonwebtoken'
import {Request, Response, NextFunction } from 'express'

export function setToken(user: any) {
    return JWT.sign({
        id: user._id,
        iat: new Date().getTime(),
    }, process.env.SECRET_KEY)
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    JWT.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next()
    })
}