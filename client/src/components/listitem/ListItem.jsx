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
          headers:{
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMmFhZWM3ZjE2NWFhNWEwZmJjNWE4MyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjM3NDc5ODEsImV4cCI6MTY2NDE3OTk4MX0.ryLl-Gn-Zqg4TsrNYVL25kX019KVXMokPHZr4Pl2PKA"
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
    <Link to={{pathname: "/watch", movie: movie }}>
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
