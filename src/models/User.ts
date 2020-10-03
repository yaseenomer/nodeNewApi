import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

export type UserDocument = mongoose.Document & {
    email: string
    password: string
    name: string
    comparePassword: comparePasswordFunction;
}

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    name: String,
},  { timestamps: true });

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<UserDocument>("User", userSchema);