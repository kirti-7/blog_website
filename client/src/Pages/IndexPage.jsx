import { useEffect, useState } from "react"
import Post from "../Components/Post"


function IndexPage() {

  const [posts, setPosts] = useState([]);


  // useEffect(()=> {
  //   fetch('http://localhost:4000/post').then(
  //     response => {
        
  //       response.json().then(posts => {
  //         console.log(posts);
  //       })
  //     }
  //   )
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/post');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const posts = await response.json();
        console.log(posts);
        setPosts(posts)
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }, []);

    
  
  return (
      <>
      {posts.length > 0 && posts.map(post=>(
        <Post {...post} />
      ))}
      </>
      
  )
}

export default IndexPage