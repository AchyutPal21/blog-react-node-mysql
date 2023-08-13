import axios from 'axios';
import moment from 'moment';
import React, {useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Write = () => {
    const state = useLocation().state;
    const [value, setValue] = useState(state?.description || "");
    const [title, setTitle] = useState(state?.title || "");
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState(state?.category || "");
    const navigate = useNavigate();

    const upload = async () => {
        try {
            if (file == null) return "";
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post(`${import.meta.env.VITE_PROXY}/upload`, formData);
            return res;
        } catch(err) {
            console.log("[ERROR while uploading file from client]");
            console.log(err);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const imgUrl = await upload();
            console.log(imgUrl);
            console.log(imgUrl.data);
            // if (imgUrl) return;
            // For edit post
            if (state) {
                console.log("This is editing post");
                console.log(imgUrl.data);
                await axios.put(`${import.meta.env.VITE_PROXY}/posts/${state.id}`, {
                    title,
                    description: value,
                    img: imgUrl.data,
                    category,
                }, {withCredentials: true});
            } else if (!state) {
                console.log("This is writing a post");
                await axios.post(`${import.meta.env.VITE_PROXY}/posts`, {
                    title,
                    description: value,
                    img: imgUrl.data,
                    category,
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                }, {withCredentials: true});
            }

            navigate("/");
            
        } catch (err) {
            console.log("[ERROR while using handelSubmit file/data]");
            console.log(err);
        }

        // navigate("/");
    }

  return (
    <div className='add'>
        <div className="content">
            <input type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <div className="editorContainer">
                <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
            </div>
        </div>
        <div className="menu">
            <div className="item">
                <h1>Publish</h1>
                <span>
                    <b>Status: </b> Draft
                </span>
                <span>
                    <b>Visibility: </b> Public
                </span>
                <input style={{display:"none"}} type="file" id='file'  onChange={(e)=>setFile(e.target.files[0])}/>
                <label className='uploadImage' htmlFor="file">Upload Post Image {file && `✅`}</label>
                <div className="buttons">
                    <button>Save as Draft</button>
                    <button onClick={handleSubmit}>Publish</button>
                </div>
            </div>
            <div className="item category">
                <h1>Category</h1>
                <div className="options">
                    <label htmlFor="art">ART</label>
                    <input type="radio" name='category' checked={category==="art"} value="art" id='art' onChange={(e)=>setCategory(e.target.value)}/>
                </div>
                <div className="options">
                    <label htmlFor="science">SCIENCE</label>
                    <input type="radio" name='category' checked={category==="science"} value="science" id='science' onChange={(e)=>setCategory(e.target.value)}/>
                </div>
                <div className="options">
                    <label htmlFor="technology">TECHNOLOGY</label>
                    <input type="radio" name='category' checked={category==="technology"} value="technology" id='technology' onChange={(e)=>setCategory(e.target.value)}/>
                </div>
                <div className="options">
                    <label htmlFor="cinema">CINEMA</label>
                    <input type="radio" name='category' checked={category==="cinema"} value="cinema" id='cinema' onChange={(e)=>setCategory(e.target.value)}/>
                </div>
                <div className="options">
                    <label htmlFor="design">DESIGN</label>
                    <input type="radio" name='category' checked={category==="design"} value="design" id='design' onChange={(e)=>setCategory(e.target.value)}/>
                </div>
                <div className="options">
                    <label htmlFor="food">FOOD</label>
                    <input type="radio" name='category' checked={category==="food"} value="food" id='food' onChange={(e)=>setCategory(e.target.value)}/>
                </div>
                
            </div>
        </div>
    </div>
  );
}

export default Write