import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config"
import { useParams } from "react-router-dom"
interface Blog {
    title: string;
    content: string;
    authorName: string;
  }

const BlogPage = () => {

    const {id} = useParams<{id:string}>()
    const [blogData, setBlogData] = useState<Blog>({
        title: "",
        content: "",
        authorName: "",
    })
    useEffect(() => {
        const fetchBlpgs = async () =>{
            try {
              console.log("trying")
              const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
                headers:{
                  Authorization:localStorage.getItem("token")
                }
              });
              console.log(response.data);
              console.log(response.data.blog.title);
              console.log(response.data.blog.content);
              console.log(response.data.blog.author.name);
              setBlogData({
                title: response.data.blog.title,
                content: response.data.blog.content,
                authorName:response.data.blog.author.name,
              });
            } catch (error) {
              alert("Error No blogs or server error")
            }
          }
          fetchBlpgs();
    
    }, [])
    
    console.log(blogData)

  return (
    <div>
    <div className="flex justify-center pb-10" >
      <div className="bg-zinc-100 flex flex-col justify-between
       p-5 mt-10 md:min-h-48 md:w-[55vw] rounded-md hover:shadow-xl shadow-zinc-900">
       <div>
        <div className="flex justify-between">

       <div id="title" className="font-bold text-xl"> {blogData.title}</div>
        </div>
       <div id="title" className="font-light text-xl"> {blogData.content}</div>
        </div>
        <div id="author" className="text-xs mt-4 font-semibold text-zinc-600">By {blogData.authorName}</div>
       </div>


      </div>
    </div>
  )
}

export default BlogPage
