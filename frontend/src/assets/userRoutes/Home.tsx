import { Link } from "react-router-dom"
import Button from "../../components/Button"


const Home = () => {
    return (
        <>
            <div className="sm:flex justify-evenly min-h-screen">
                {/* left side */}
                <div className="sm:w-1/2 bg-zinc-300 flex">
                    <h1 className="flex flex-col justify-center font-semibold text-[17.5px] px-16 font-sans ">Dive into a world of
                        <br />
                        <span className="font-bold text-xl font-mono"> Tech, lifestyle, travel, personal development </span>
                        and join us on this journey of discovery. Here, every post is a new adventure waiting to be explored.</h1>
                </div>


                {/* //right part  */}
                <div className=" sm:w-1/2 bg-slate-200">


                    <div className="flex flex-col p-16 justify-center items-center h-screen">

                        <span className="text-[22px] font-semibold font-mono leading-snug	 ">
                        Don't just read—share your thoughts, leave comments, and connect with fellow readers. Your voice matters here.
                        </span>

                        <div className="mt-10 text-2xl m-5">
                            Create your account 
                            <h1 className="text-center"> Now!</h1>
                        </div>
                        <div>
                            <Button> <Link to={"/signup"}> Sign up </Link></Button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home
