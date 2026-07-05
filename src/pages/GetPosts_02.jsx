import React, { useEffect, useState } from "react";
import axios from 'axios'

const GetPosts = ()=>{

    const [posts, setPosts] = useState([
        {
            _id: "1",
            image: "https://ik.imagekit.io/nocjgn8ovp/image_XFdJvZpt2.jpg",
            title: "creation title",
        }
    ])

    useEffect( ()=>{
        axios.get("http://localhost:3000/api/post/")
        .then( (res)=>{
            console.log(res.data)
            // setPosts(res.data.posts)
        })
        .catch( (err)=>{
            alert("error fetching")
        })
    }, [] )


    return(
        <section className="get-post-section">
           {
                posts.length>0? (
                    posts.map( (post) =>(
                        <div key={post._id} className="post-card">
                            <img src={post.image} alt={post.title} />
                            <h3>{post.caption}</h3>
                        </div>
                    ))
                ):(
                    <h1>no post found</h1>
                )
           }
        </section>
    )
}

export default GetPosts;