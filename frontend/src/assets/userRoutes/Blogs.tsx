import { useDispatch, useSelector } from "react-redux"
import { setBlogs } from "../../store/slices/blogsSlice"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { useEffect } from "react"
import Blog from "./Blog"

export interface blogsInterface{
  id:"",
  title:"",
  content:"",
  author:{
    name:""
  }
}

const Blogs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlpgs = async () =>{
      try {
        console.log("trying")
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
          headers:{
            Authorization:localStorage.getItem("token")
          }
        });
        // console.log(response.data.blogs);
        dispatch(setBlogs(response.data.blogs));

      } catch (error) {
        alert("Error No blogs or server error")
      }
    }
    fetchBlpgs();
  }, [])
  
  const {blogs} = useSelector((state)=> state.blogs);
  // console.log("fetched blogs using state " ,blogs);


    return (
    <>
    {
        blogs.map((item:blogsInterface )=>
          <div key={item.id}>
          <Blog 
        title={item.title}
        description={item.content}
        authorName = {item.author.name}
        />
          </div>
      )
      
    }
    </>
  )
}

export default Blogs
