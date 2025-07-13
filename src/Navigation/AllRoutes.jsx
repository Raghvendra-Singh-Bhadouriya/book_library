import { Routes, Route } from "react-router-dom";
import Home from "../Body/Home";
import Login from "../Body/Login";
import Register from "../Body/Register";
import User from "../Body/Components/User"
import MyBooks from "../Body/MyBook";

const AllRoutes = () => {
    return(
        <>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/my-books" element={<MyBooks/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/auth/me" element={<User/>} />
        </Routes>
        </>
    )
}

export default AllRoutes;