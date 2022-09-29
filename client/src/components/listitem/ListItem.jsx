import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined,  } from "@material-ui/icons"
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./listitem.scss"

export default function ListItem({index, item}) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  

  //fetching movies for homepage
  useEffect(()=>{
    const getMovie = async ()=>{
      try{
        const res = await axios.get("/movies/find/"+item,{ //"item" here represents the id of each movie because that is what i set as the "content" properties of each lists array. The ids of the randomly generated movies (because that's what is contained in the list.content which i iterated from). I just brought the "item"  here as a prop from "List" after mapping there.
          headers: {  
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken, 
        }, 
        });
      setMovie(res.data);
      }catch(err){
        console.log("err");
      }
    };
    getMovie()
  },[item]);
  
  return (
    <Link to={{pathname: "/watch", movie: movie }}> {/*passing the "movie" object as a sort of prop into the "watch" component through the link. The "movie" by the right represents the movie we just fetched above. The "movie" by the left is us telling the code to call the movie object we just fetched "movie" in the "watch" component.*/}
    <div className="listItem"
    style={{left: isHovered && index * 225 - 50 + index * 2.5}} //if "isHovered" is true, "left" is "index * 225 -50"
    onMouseEnter={()=>setIsHovered(true)} 
    onMouseLeave={()=>setIsHovered(false)}>
         <img src={movie.img} alt="" />
         {isHovered && (
         <>
         <video src={movie.trailer} autoPlay={true} loop />
         <div className="itemInfo">
          <div className="icons">
            <PlayArrow className="icon" />
            <Add className="icon"/>
            <ThumbUpAltOutlined className="icon"/>
            <ThumbDownAltOutlined className="icon"/>
          </div>
          <div className="itemInfoTop">
              <span>{movie.duration}</span>
              <span className="limit">+{movie.limit}</span>
              <span>{movie.year}</span>
          </div>
          <div className="desc">
            {movie.desc}
          </div>
          <div className="genre">{movie.genre}</div>
         </div> 
         </>
         )}
    </div>
   </Link>
  );
}
