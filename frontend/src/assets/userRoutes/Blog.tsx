import { useState } from "react"
import { FaExternalLinkAlt } from "react-icons/fa";
// import BlogPage from "./BlogPage";

export interface blogIFC {
  id: "",
  title: "",
  description: "",
  authorName: "",
}

const Blog = (props: blogIFC) => {

  // const navigate = useNavigate();
  const [isExpand, setIsExpand] = useState(false);
  // const maxLength = 250;

  const toggleExpansion = () => {
    if (props.description.length > 250) {

      setIsExpand(!isExpand);
    }
  }
  const handleExplore = ()=>{
    // navigate(`/blog/${props.id}`)
    window.open(`/blog/${props.id}`,'_blank');
  }

  return (
    <div>
      <div className="flex justify-center pb-10" >
        <div className="bg-zinc-100 flex flex-col justify-between
         p-5 mt-10 md:min-h-48 md:w-[55vw] rounded-md hover:shadow-xl shadow-zinc-900">
         <div>
          <div className="flex justify-between">

         <div id="title" className="font-bold text-xl">{props.title}</div>
          <button onClick={handleExplore}><FaExternalLinkAlt /></button>
          </div>
          <div id="description content" className="leading-tight	mt-3 webkitLineClamp:3">{(isExpand || props.description.length < 250) ? props.description : (`${props.description.slice(0, 250)}...`)}
            <br />
            {(props.description.length < 250) ? <></> : <button className="text-sm font-mono font-bold text-zinc-500 rounded-md bg-slate-200 px-[7px] mt-3" onClick={toggleExpansion}> {isExpand ? "Close" : "Read more"} </button>}
          </div>
         </div>

          <div id="author" className="text-xs mt-4 font-semibold text-zinc-600">By {props.authorName}</div>

        </div>
      </div>
    </div>
  )
}

export default Blog
