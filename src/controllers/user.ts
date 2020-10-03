import {Request as Req, Response as Res, NextFunction} from 'express'
import bcrypt from "bcrypt";
import { User } from '../models/User'
import { setToken } from '../config/jwt'

export const getUsers = (req: Req, res: Res) => {
    User.find({}, (err, users) => {
        res.status(200).send(users)
    })
}

export const register = async (req: Req, res: Res) => {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await new User({
        email: req.body.email,
        name: req.body.name,
        password: hashPassword,
    }).save();
    return  res.status(201).send(newUser)
}

export const login = (req: Req, res: Res, next: NextFunction) => {
    const  token = setToken(req.user)
    req.logIn(req.user, (err) => {  if (err) return next(err)} )
    return res.status(200).send({ user: req.user, token})
}

export const logOut =  (req: Req, res: Res) => {
    req.logout();
     res.send({ message: 'logout successfully'})
}

export const me =  (req: Req, res: Res) => {
    if (req.isAuthenticated()) return res.send(req.user)
    return  res.status(401).send({ message: 'unauthorized'})

}