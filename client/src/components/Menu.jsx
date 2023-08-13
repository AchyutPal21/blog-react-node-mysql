import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Menu = ({category}) => {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_PROXY}/posts/?category=${category}`);
                setPosts(res.data)
            } catch (err) {
                console.log("[Error while fetching category posts data in Menu.jsx]");
                console.log(err);
            }
        }

        fetchData();
    }, [category]);

  return (
    <div className='menu'>
        <h1><u>Other Post's You May Like</u></h1>
        {
            posts.map((post) => {
                return (
                    <div className="post" key={post.id}>
                        <img src={`../upload/${post.img}`} alt="post image" />
                        <h2>{post.title}</h2>
                        <button>Read More</button>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Menu