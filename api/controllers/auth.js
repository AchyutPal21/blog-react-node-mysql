import bcrypt from "bcryptjs";
import DB from "../models/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = function (req, res) {
    // Check Existing user
    const queryForUser = "SELECT * FROM users WHERE email = ? OR username = ? ";
    DB.query(queryForUser, [req.body.email, req.body.username], (err, data) => {
        if (err) throw res.status(500).send(err);

        // Got data means user exists in out DB
        if (data.length) return res.status(409).json("User already exists.");

        // Hash the password to register an user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const queryToAddUser = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
        const values = [req.body.username, req.body.email, hash];

        DB.query(queryToAddUser, [values], (err, data) => {
            if (err) {
                console.log("🟥 [Error from auth controller while registering the user]");
                throw res.status(500).send(err);
            }
            console.log("[Auth Controller] user registered");
            return res.status(200).json("User has been registered.");
        });


    });
};

export const login = function (req, res) {
    // If User Exists
    const queryForUser = "SELECT * FROM users WHERE username = ?";
    DB.query(queryForUser, [req.body.username], (err, data) => {
        if (err) {
            console.log("🟥 [Error from auth controller while login the user]");
            throw res.status(500).send(err);
        }

        if (data.length === 0) {
            return res.status(404).json("User not found!");
        }

        // Check for password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if (!isPasswordCorrect) {
            return res.status(400).json("Wrong username or password");
        }

        const token = jwt.sign({id: data[0].id}, process.env.TOKEN_KEY);
        const {password, ...other} = data[0];
        return res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(other);
    });
};

export const logout = function (req, res) {
    return res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.");
};