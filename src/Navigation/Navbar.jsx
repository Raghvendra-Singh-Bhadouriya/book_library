import { Link } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from "../Context/UserInfoContext";

const Navbar = () => {
    const { user, isLoggedIn } = useContext(AuthContext)

console.log("user: ", user)

    return(
        <>
        <div className="border flex border-black">
            <div className="w-[70%] flex justify-between m-4">
                <div className="">
                    <h1 className="text-3xl font-bold">
                        <Link to="/">
                            My Library
                        </Link>
                    </h1>
                </div>
                <div className="flex justify-between w-[20%]">
                    <p className="text-xl font-bold">
                        <Link to="/">
                            Home
                        </Link>
                    </p>
                    <p className="text-xl font-bold">
                        <Link to="/my-books">
                            My Books
                        </Link>
                    </p>
                    
                </div>
                
            </div>
            {isLoggedIn ? (
                <button className="text-red-500 font-bold">
                    <Link to="/auth/me">
                        {user?.email || "Logged In"}
                    </Link>
                </button>
                ) : (
                <p className="m-auto text-blue-500 font-bold">
                    <Link to="/login">
                        Login
                    </Link>
                </p>
            )}
        </div>
        </>
    )
}

export default Navbar;