import DB from "../models/db.js";
import jwt from "jsonwebtoken";

export const getPosts = function (req, res) {
    const queryCategory = req.body.category ? "SELECT * FROM posts WHERE category = ?" : "SELECT * FROM posts";

    DB.query(queryCategory, [req.body.category], (err, data) => {
        if (err) {
            throw res.status(500).send(err);
        }

        return res.status(200).json(data);
    });
    
};

export const getPost = function (req, res) {
    const queryPost = "SELECT p.id, `username`, `title`, `description`, p.img AS postImg, u.img AS userImg, `category`, `date` FROM users AS u JOIN posts AS p ON u.id=p.user_id WHERE p.id = ?";
    DB.query(queryPost, [req.params.id], (err, data) => {
        if (err) {
            throw res.status(500).send(err);
        }

        return res.status(200).json(data[0]);
    })
};

export const addPost = function (req, res) {
    
    const token = req.cookies.access_token;
    console.log("🟥", req.headers.cookie);
    if (!token) return res.status(401).send("Not authenticated!");

    jwt.verify(token, process.env.TOKEN_KEY, (err, userInfo) => {
        if (err) {
            throw res.status(403).send("Token is not valid!");
        }

        const queryInsert = "INSERT INTO posts(`title`, `description`, `img`, `date`, `user_id`, `category`) VALUES(?)";
        const values = [
            req.body.title,
            req.body.description,
            req.body.img.data,
            req.body.date,
            userInfo.id,
            req.body.category,
        ];

        DB.query(queryInsert, [values], (err, data) => {
            if (err) {
                throw res.status(500).send(err);
            }

            return res.status(200).json("Post has been created.");
        })

    })
};


export const deletePost = function (req, res) {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).send("Not authenticated!");

    jwt.verify(token, process.env.TOKEN_KEY, (err, userInfo) => {
        if (err) {
            throw res.status(403).send("Token is not valid!");
        }

        const postId = req.params.id;
        const queryDeletePost = "DELETE FROM posts WHERE `id` = ? AND `user_id` = ?";

        DB.query(queryDeletePost, [postId, userInfo.id], (err, data) => {
            if (err) {
                throw res.status(403).send("You can delete only your post!");
            }

            return res.status(200).json("Post has been deleted.");
        });
    })


};
export const updatePost = function (req, res) {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).send("Not authenticated!");

    jwt.verify(token, process.env.TOKEN_KEY, (err, userInfo) => {
        if (err) {
            throw res.status(403).send("Token is not valid!");
        }

        const postId = req.params.id;
        const queryInsert = "UPDATE posts SET title=?, description=?WHERE id=? AND user_id=?";
        const values = [
            req.body.title,
            req.body.description,
            userInfo.id,
            req.body.category,
        ];

        DB.query(queryInsert, [...values, postId, userInfo.id], (err, data) => {
            if (err) {
                throw res.status(500).send(err);
            }

            return res.status(200).json("Post has been updated.");
        })

    })
};