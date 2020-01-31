import {Request, Response, NextFunction} from 'express';
import {User} from '../models/User';
import {IUser} from "../interfaces/models";
import * as bcrypt from 'bcryptjs';
import * as gravatar from 'gravatar';
import {DocumentQuery} from "mongoose";

async function register(req: Request, res: Response, next: NextFunction) {
    const {email, name, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (user) {  //TODO replace by the middleware
            return res.status(400).json({email: 'Email Already Exist'})
        }
        const avatar = gravatar.url(email, {
            s: '200',//Size
            r: 'pg',//Rating
            d: 'm' //Default
        });
        const newUser: IUser = new User({email, name, avatar, password});

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        let savedUser: any = await newUser.save();
        res.status(200).json({...savedUser._doc});
    } catch (err) {
        console.log(err);
    }
}


async function login(req: Request, res: Response, next: NextFunction) {
    const {email, password} = req.body;
    try {
        const user: any = await User.findOne({email});
        if (!user) {
            return res.status(400).json({email: 'Email Already Exist'})
        }

        let isMatch: boolean = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({email: 'Email Already Exist'})
        }
        res.status(200).json({msg: 'Success'})

    } catch (err) {

    }

}


export {register, login}