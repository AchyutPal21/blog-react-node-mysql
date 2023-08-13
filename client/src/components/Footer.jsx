import React from 'react'
import {Link} from "react-router-dom"
import Logo from "../images/logo.png"

const Footer = () => {
  return (
    <footer>
        <div className="shadow">
            <img src={Logo} alt="logo" />
        </div>
        <span>Made With ❤️ Happiness By &nbsp;<Link className='link' to="https://github.com/AchyutPal21">Achyut Pal</Link></span>
    </footer>
  );
}

export default Footer