import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../../../layout/Footer";
import UserNavBar from "../../../layout/user/UserNavBar";
import {showConfirmationAlert, showErrorAlert, showSuccessAlert} from "../../../utils/swalAlerts";

const FavoriteIndex = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const token = localStorage.getItem("authToken");
    const authId = localStorage.getItem("authId");

    const fetchProducts = async () => {
        try {
            if (token && authId) {
                const favoriteResponse = await axios.get(`http://localhost:3000/api/getAllFavoriteOnly/${authId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducts(favoriteResponse.data);
            }
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [token, authId]);

    const removeFavorite = async (productId) => {
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            await showConfirmationAlert("Are you sure you want to remove this item from your favorites?", async () => {
                try {
                    await axios.delete(`http://localhost:3000/api/DeleteFavoriteFindProductId/${productId}`, {
                        data: { authId },
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    await fetchProducts();
                } catch (error) {
                    console.error("Error deleting item:", error);
                    showErrorAlert("Error deleting item:", error);
                }
            });
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = products.slice(startIndex, endIndex);

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <UserNavBar />

            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Your Favorite Products</h1>

                {products.length === 0 ? (
                    <div className="text-center text-gray-500">
                        <p>No favorite products found.</p>
                    </div>
                ) : (
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                        {currentItems.map((product) => (
                            <Link to={`/user/product/show/${product._id}`} className="block">
                                <div key={product._id} className="w-full sm:w-60 md:w-150 lg:w-80 cursor-pointer">
                                    <img
                                        src={product.imageUrl || "https://via.placeholder.com/300"}
                                        alt={product.name}
                                        className="w-full sm:w-60 md:w-150 h-60 object-cover"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold">{product.name}</h2>
                                        <p className="text-gray-600">{product.modelNumber}</p>
                                        <p className="text-gray-500">{product.color} - {product.rom} GB ROM / {product.ram} GB RAM</p>
                                        <div className="mt-4 flex justify-between items-center">
                                            <p className="text-gray-500 text-sm">{new Date(product.createdAt).toLocaleDateString()}</p>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault(); // Prevent navigation when clicking the remove button
                                                    removeFavorite(product._id);
                                                }}
                                                className="text-xl text-red-600"
                                            >
                                                <i className="fas fa-heart text-red-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                )}
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

export default FavoriteIndex;
