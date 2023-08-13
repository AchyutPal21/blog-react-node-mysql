import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Edit from "../images/edit.png";
import Delete from "../images/delete.png";
import Menu from '../components/Menu';
import axios from 'axios';
import moment from "moment";
import { AuthContext } from '../context/authContext';

const Single = () => {
    const [post, setPost] = useState({});

    const location = useLocation();
    const navigate = useNavigate

    const postId = location.pathname.split("/")[2];

    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_PROXY}/posts/${postId}`);
                setPost(res.data);
            } catch (err) {
                console.log("[Error while fetching posts data]");
                console.log(err);
            }
        }

        fetchData();
    }, [postId]);

    const handlePostDelete = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`${import.meta.env.VITE_PROXY}/posts/${postId}`);
            navigate("/");
        } catch (err) {
            console.log("[Error while fetching posts data]");
            console.log(err);
        }

    }

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    }

    return (
        <div className='single'>
            <div className="content">
                <img src={`../upload/${post?.postImg}`} alt="post image" />
                <div className="user">
                    {   post.userImg &&
                        (<img src={post.userImg} alt="user profile image" />)
                    }
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.data).fromNow()}</p>
                    </div>
                    {
                        currentUser.username === post.username &&
                        (<div className="edit">
                            <Link to={`/write?edit=${post.id}`} state={post}>
                                <img src={Edit} alt="Edit post icon" />
                            </Link>
                            <img onClick={handlePostDelete} src={Delete} alt="Delete post icon" />
                        </div>)
                    }
                </div>
                <h1>{post.title}</h1>
                {getText(post.description)}
            </div>
            <Menu category={post.category} />
        </div>
    );
}

export default Single