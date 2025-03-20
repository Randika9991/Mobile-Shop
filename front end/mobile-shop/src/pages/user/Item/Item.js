import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../../../layout/Footer";
import UserNavBar from "../../../layout/user/UserNavBar";
import AddToCardShow from "../addToCard/AddToCardShow";
import {FaShoppingCart} from "react-icons/fa";

const ItemIndex = () => {
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]); // Track favorite products
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Items per page
    const token = localStorage.getItem("authToken");
    const authId = localStorage.getItem("authId");

    // Fetch all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (token) {
                    const response = await axios.get("http://localhost:3000/api/getAllItemsUser", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setProducts(response.data);
                }
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchProducts();
    }, [token]);

    // Fetch user's favorite items
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                if (token) {
                    const response = await axios.get(`http://localhost:3000/api/getAllUserFavorite/${authId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setFavorites(response.data.map((fav) => fav.itemId));
                }
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };
        fetchFavorites();
    }, [token]);

    const toggleFavorite = async (productId) => {
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            if (favorites.includes(productId)) {
                console.log(productId)
                await axios.delete(`http://localhost:3000/api/DeleteFavoriteFindProductId/${productId}`, {
                    data: { authId }, // Send authId in the request body
                    headers: { Authorization: `Bearer ${token}` }
                });

                setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== productId));
            } else {
                await axios.post(
                    "http://localhost:3000/api/addFavorite",
                    { itemId: productId, authId: authId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setFavorites((prevFavorites) => [...prevFavorites, productId]);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = products.slice(startIndex, endIndex);

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <UserNavBar />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Available Products</h1>

                {/* Cards Container */}
                <div className="flex justify-center bg-white bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6 flex items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-24 justify-center items-center">
                        {currentItems.map((product) => (
                            <Link to={`/user/product/show/${product._id}`} className="block">
                                <div key={product._id} className="w-full rounded-lg shadow-inner sm:w-60 md:w-72 lg:w-80 bg-gray-100 rounded-lg  flex flex-col justify-between items-center">
                                    <img
                                        src={product.imageUrl || "https://via.placeholder.com/300"}
                                        alt={product.name}
                                        className="w-3/4 h-60 object-cover"
                                    />
                                    <div className="p-4 text-center">
                                        <h2 className="text-lg font-semibold">{product.name}</h2>
                                        <p className="text-gray-600">{product.modelNumber}</p>
                                        <p className="text-gray-500">{product.color} - {product.rom} GB ROM / {product.ram} GB RAM</p>
                                        <div className="mt-4 flex justify-between items-center w-full">
                                            <p className="text-gray-500 text-sm">{new Date(product.createdAt).toLocaleDateString()}</p>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    toggleFavorite(product._id);
                                                }}
                                                className={`text-xl ${favorites.includes(product._id) ? 'text-red-600' : 'text-gray-500'}`}
                                            >
                                                <i className={`fas fa-heart ${favorites.includes(product._id) ? 'text-red-600' : 'text-gray-500'}`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Pagination Buttons */}
                <div className="flex justify-center mt-6 space-x-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-800"}`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrentPage((prev) => (endIndex < products.length ? prev + 1 : prev))}
                        disabled={endIndex >= products.length}
                        className={`px-4 py-2 rounded-lg ${endIndex >= products.length ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-800"}`}
                    >
                        Next
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ItemIndex;
