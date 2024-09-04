import { FormEvent, useState } from "react"
import Button from "../../components/Button"
import { CreatePost } from "@daksh931/project-medium"
// import { useSelector } from "react-redux"
import { BACKEND_URL } from "../../config"
import axios from "axios"
import.meta.env.VITE_BACKEND_URL as 'BACKEND_URL'

const CreateBlog = () => {
    // const { userData } = useSelector((state) => state.auth);
    // console.log(userData);
    // console.log(userData.id);
    const [blogData, setBlogData] = useState<CreatePost>({
         title : "",
         content :""
    })

    const handlePostBlog = async(e:FormEvent) => {
        e.preventDefault();

        try {
            // console.log(blogData)
            if(blogData.title.length<3){
              alert("min length of title should be 3")
              return}
            if(blogData.content.length<10){
              alert("min length of descirption should be 10")
              return}
            
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,blogData,{
              headers:{
                Authorization:localStorage.getItem("token")
              }
            });
            console.log(response.data);
            alert("Posted Successfully");
            setBlogData({
              title:"",
              content:"",
            })
        } catch (error) {
           alert("Failed to post");
        }

    } 


    return (
    <>
            <div className="flex justify-center items-center w-[100vw] h-[93vh] bg-white ">

<form onSubmit={handlePostBlog}>
        <div className="flex flex-col text-[15px] items-center h-96 w-80 rounded-md min-h-80 bg-zinc-300
          px-5  pt-16 shadow-xl shadow-zinc-400 hover:shadow-zinc-300 hover:border-slate-500 hover:border-[1px]">
            
            <span>Post Now 
            </span>

            <input type="text" className="rounded-lg h-9 w-full text-[17px] mx-4 pl-3 my-3" placeholder="Title"
              value={blogData.title} onChange={(e)=>setBlogData({...blogData,title:e.target.value})}/> 
            <input type="text" className="rounded-lg h-9 w-full text-[17px] mx-4 pl-3 my-3" placeholder="Content"
              value={blogData.content} onChange={(e)=>setBlogData({...blogData,content:e.target.value})}/> 
            

            <div className="mt-9"> <Button>Post</Button> </div>
        </div>
</form>

    </div>
    </>
  )
}

export default CreateBlog
