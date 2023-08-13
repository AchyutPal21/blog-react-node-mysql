import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


const Home = () => {
    const [posts, setPosts] = useState([]);

    const category = useLocation().search;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_PROXY}/posts/${category}`);
                setPosts(res.data)
            } catch (err) {
                console.log("[Error while fetching posts data]");
                console.log(err);
            }
        }

        fetchData();
    }, [category]);

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    }
  return (
    <div className='home'>
        <div className="posts">
            {
                posts.map((post) => {
                    return (
                        <div className="post" key={post.id}>
                            <div className="image">
                                <img src={`../upload/${post.img}`} alt="image" />
                            </div>
                            <div className="content">
                                <h1>{post.title}</h1>
                                <p>{getText(post.desc)}</p>
                                <Link className='link' to={`/post/${post.id}`}>
                                    <button>Read More</button>
                                </Link>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    </div>
  )
}

export default Home