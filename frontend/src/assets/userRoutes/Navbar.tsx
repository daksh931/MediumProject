import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { logoutUser } from "../../store/slices/authSlice";
import { RootState } from "../../store";


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData } = useSelector((state:RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    }
    const style = "py-2 px-5 bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-lg text-slate-100 font-semibold rounded-md";
    return (
        <>
            <div className="flex bg-zinc-800 justify-between">

                <div className="hidden sm:flex ">

                    <Link to={"/"}>
                        <div className={`${style}`}> Home </div>
                    </Link>

                    <div className={`${style}`}>
                        Trending
                    </div>

                    <Link to={"/blogs"}>
                        <div className={`${style}`}>Blogs</div>
                    </Link>


                    <Link to={"/addblog"}>
                        <div className={`${style}`}> Add Blog</div> 
                    </Link>

                    <div className={`${style}`}>
                        About
                    </div>
                </div>

                <div className="hidden sm:flex sm:visible">
                    {userData ?
                        <div className="flex">
                            <div className={`${style}`}> {userData.name}
                            </div>
                            <div className="text-white flex justify-center items-center text-3xl font-extrabold cursor-pointer px-1 mr-2 hover:text-slate-200
                         hover:bg-zinc-700 rounded-lg"><button onClick={handleLogout}>  <CiLogout /> </button></div>
                        </div> :
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
