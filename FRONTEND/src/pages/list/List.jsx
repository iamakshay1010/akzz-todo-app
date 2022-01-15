import React from 'react';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./list.css";
import { productRows } from "../../dummydata";
import { Context } from "../../context/Context";


export default function List() {
    
    const [posts, setPosts] = useState([]);
    //const [cat, setCats] = useState([]);
    const [title, setTitle] = useState("");
     const [desc, setDesc] = useState("");
    // const [completed,setComplete]=useState(false);
     const { user } = useContext(Context);
    console.log(posts);

    useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/lists");
      console.log("data here"); 
      console.log(res);
  //  http://localhost:4000/api/posts/61dc05892227113648cd2c64
      
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt); //this is to show recent posts on top
          })
        );
    }
    fetchPosts();
    },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
     const newPost = {
      username: user.username,
      title,
      desc
    };
     try {
      const res = await axios.post("/lists", newPost);
      //console.log(res.data);
     window.location.replace("/");//this will show display post content
       
    } catch (err) {}
    };
    
    const handleDelete = async (id) => {
      try {
        await axios.delete("/lists/"+ id, {
          data: { username: user.username },   //res.data.username
        });
        window.location.replace("/");
      } catch (err) {}
    };

  return (
   <div className="MainWrapper">

     <div className="inputwrapper">
     <div className="wrapper">
       
      <form action="datainput" onSubmit={handleSubmit}>
      <input
            type="text"
            placeholder="Title of the post"
            className="posttitile"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
         <textarea
            placeholder="description of post"
            type="text"
            className="teatxarea "
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
          <button className="publish" type="submit">
          Publish
        </button>

      </form>
     </div>
     </div>
      
      {
        posts.map((post)=>(
          <div className="wrapper" key={post._id}>
          <div className="toprow">
               <h2>{post.title}</h2>
               <span>{new Date(post.createdAt).toDateString()}</span>
             
               <button  onClick={()=>handleDelete(post._id)}>Delete</button>
              
          </div>
          <hr className="hr"/>
          <p>{post.desc}</p>
          
        </div>
        ))
      }

    

    
   </div>
  )
}
