import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyBooks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("https://book-library-bc.onrender.com/api/mybooks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBooks(res.data.data);
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-5">{error}</p>;

  return (
    <div className="w-[80%] m-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {books.length === 0 ? (
        <p className="text-center col-span-full">You haven't added any books yet.</p>
      ) : (
        books.map((item) => (
          <div
            key={item._id}
            className="border border-gray-300 rounded-md shadow-md p-4"
          >
            <img
              src={item.bookId.coverImage}
              alt={item.bookId.title}
              className="w-full h-[200px] object-cover mb-4 rounded"
            />
            <h3 className="font-bold text-lg">{item.bookId.title}</h3>
            <p className="text-sm">{item.bookId.author}</p>
            <p className="text-sm italic text-gray-600">
              Status: {item.status}
            </p>
            <p className="text-sm">Rating: {item.rating}/5</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBooks;