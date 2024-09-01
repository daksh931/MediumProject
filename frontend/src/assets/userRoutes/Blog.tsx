import { useState } from "react"

export interface blogIFC{
  title:"",
  description:"",
  authorName:"",
}

const Blog = (props:blogIFC) => {

  const [isExpand, setIsExpand] = useState(false); 
  const maxLength = 250;

  const toggleExpansion = ()=>{
    if(props.description.length>250){

      setIsExpand(!isExpand);
    }
  }

 
  return (
    <div>
      <div className="flex justify-center pb-10" >
        <div className="bg-zinc-100  p-5 mt-10 md:w-[55vw] rounded-md hover:shadow-xl shadow-zinc-900">
     <div id="title" className="font-bold text-xl">{props.title}</div>
     <div id="description content" className="leading-tight	mt-3 webkitLineClamp:3">{(isExpand ||  props.description.length<250) ? props.description: (`${props.description.slice(0,250)}...`)}
     
     </div>

        <div id="author" className="text-xs mt-4 font-semibold text-zinc-600">{props.authorName}</div>

        </div>
    </div>
    </div>
  )
}

export default Blog
