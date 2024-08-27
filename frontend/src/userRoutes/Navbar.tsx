import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Navbar = () => {

    const { userData, token } = useSelector((state) => state.auth);

    const style = "py-2 px-5 bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-lg text-slate-100 font-semibold rounded-md";
    return (
        <>
            <div className="flex bg-zinc-800 justify-between">

                <div className="hidden sm:flex ">

                    <div className={`${style}`}>
                        <Link to={"/home"}> Home</Link>
                    </div>
                    <div className={`${style}`}>
                        Trending
                    </div>
                    <div className={`${style}`}>

                        Blogs
                    </div>
                    <div className={`${style}`}>

                        About
                    </div>
                </div>

                <div className="hidden sm:flex sm:visible">
                    {userData ?
                        <div className={`${style}`}> {userData.name}</div>:
                        <div className="flex">
                            <div className={`${style}`}>
                                <Link to={"/signup"}> Sign up</Link>
                            </div>

                            <div className={`${style}`}>
                                <Link to={"/login"}> Log in</Link>
                            </div>
                        </div>
                    }


                </div>


            </div>
        </>
    )
}

export default Navbar
