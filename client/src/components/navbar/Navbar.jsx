import { ArrowDropDown, Notifications, Search } from "@material-ui/icons"
import "./navbar.scss"
import { useState } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false); //for setting the navbar to black or transparent depending on the "isScrolled" value.

    window.onscroll = () =>{ //"windows.onscroll" listens for any scroll event on the browser
        setIsScrolled(window.pageYOffset === 0 ? false : true); //this means that if "window.pageYOffset" is equal to 0 ( meaning that the scrollbar is at the top of the page), setIsScroll is false. if it's more than 0, it means the scroolbar is not at the top so setIsScolled is set to true. 
        return () => (window.onscroll = null) //cleanup funtion so that the "window.onscroll" funstion is not a loop
    };

    
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}> {/* if "isScrolled" is true, the className is "navbar scrolled", if it's false the className is "navbar"  */}
      <div className="container">
        <div className="left">
            <img src="https://1000logos.net/wp-content/uploads/2017/05/Netflix-symbol-500x157.jpg" alt="" />
            <Link to="/" className="link">
            <span>Homepage</span>
            </Link>
            <Link to="/series" className="link">
            <span>Series</span>
            </Link>
            <Link to="/movies" className="link">
            <span>Movies</span>
            </Link>
            <span>New and Popular</span>
            <span>My List</span>
        </div>
        <div className="right">
            <Search className="icon"/>
            <span>KID</span>
            <Notifications className="icon" />
            <img src="data:image/jpeg;base64,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" alt="" />
            <div className="profile">
              <ArrowDropDown className="icon" />
              <div className="options">
                <span>Settings</span>
                <span>Logout</span>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
            
