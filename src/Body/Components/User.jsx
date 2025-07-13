import axios from "axios";
import React, { useReducer, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/UserInfoContext";

const User = () => {

    const [me, setMe] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { setUser } = useContext(AuthContext)

    async function fetchUserData(){
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("User not logged in");
                setLoading(false);
                return;
            }


            let res = await axios({
                method: `get`,
                url: `https://book-library-bc.onrender.com/api/auth/me`,
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            })

            console.log(res)
            setUser(res.data.user)
            setMe(res.data.user);
            setError("");

        } catch (error) {
            const msg = error.response?.data?.message || "Failed to fetch user";
            setError(msg);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    return(
    <>
        <div className="w-[30%] m-auto mt-[5%] p-[2%] border border-blue-300 rounded">
        {loading ? (
            <p>Loading...</p>
            ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
            ) : (
            me && (
            <>
                <h2 className="text-lg font-bold mb-2">User Info</h2>
                <p><strong>Name:</strong> {me.name}</p>
                <p><strong>Email:</strong> {me.email}</p>
                <p><strong>Role:</strong> {me.role || "User"}</p>
            </>
            )
        )}
        </div>
    </>
    )
}

export default User;