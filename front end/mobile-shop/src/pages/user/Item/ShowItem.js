import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa"; // Icons
import Footer from "../../../layout/Footer";
import UserNavBar from "../../../layout/user/UserNavBar";

const ProductShow = () => {
    const { id } = useParams();
    const token = localStorage.getItem("authToken");
    const authId = localStorage.getItem("authId");
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [favorite, setFavorite] = useState();
    const [addToCartGet, setAddToCart] = useState();

    let productId = id;

    useEffect(() => {
        fetchProduct();
        getFavoriteItemFindId();
        getToCartItemFindId();
    }, [token,id]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/itemFindByIdUser/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProduct(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching product details:", error);
            setLoading(false);
        }
    };

    //getFavoriteItemFindId true or false
    const getFavoriteItemFindId = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/getFavoriteItemFindId/${authId}`, {
                params: { productId:id },
                headers:{
                    Authorization: `Bearer ${token}`
                },
            });
            setFavorite(response.data)

        } catch (error) {
            console.error("Error fetching product details:", error);
            setLoading(false);
        }
    };

    const getToCartItemFindId = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/getAddToCartItemFindId/${authId}`, {
                params: { productId:id },
                headers:{
                    Authorization: `Bearer ${token}`
                },
            });

            setAddToCart(response.data)

        } catch (error) {
            console.error("Error fetching product details:", error);
            setLoading(false);
        }
    };

    const handleFavoriteToggle = async () => {
        try {
            if (favorite) {
                await axios.delete(`http://localhost:3000/api/DeleteFavoriteFindProductId/${productId}`, {
                    data: { authId },
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                 const response = await axios.post(`http://localhost:3000/api/addFavorite`, {
                    userId: authId,
                    itemId: id
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

            }
            setFavorite((prev) => !prev);
        } catch (error) {
            console.error("Error updating favorite status:", error);
        }
    };

    const addToCartToggle = async () => {
        try {
            if (addToCartGet) {
                const response = await axios.delete(`http://localhost:3000/api/DeleteAddToCart/${productId}`, {
                    data: { authId },
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                const response = await axios.post(`http://localhost:3000/api/addAddToCart`, {
                    userId: authId,
                    itemId: id
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
            }
            setAddToCart((prev) => !prev);
        } catch (error) {
            console.error("Error updating favorite status:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-600 text-lg">Loading product details...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500 text-lg">Product not found</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <UserNavBar />
            <div className="p-12">
                <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6 flex items-center
                ">
                    {/* Product Image with Zoom Effect */}
                    <div className="relative group  bg-gray-100 p-12 rounded-lg shadow-inner">
                        <img
                            src={product.imageUrl || "https://via.placeholder.com/400"}
                            alt={product.name}
                            className="w-96 h-96 object-cover rounded-lg transform transition-transform group-hover:scale-110"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="relative flex flex-col justify-between left-16">
                        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                        <div className="relative group  bg-gray-100 p-6 mt-3  rounded-lg shadow-inner">

                            <p className="text-gray-600 mt-2">Model: {product.modelNumber}</p>
                            <p className="text-gray-600 mt-2">Color: {product.color}</p>
                            <p className="text-gray-600 mt-2">Storage: {product.rom} GB / RAM: {product.ram} GB</p>
                            <p className="text-xl font-semibold text-green-600 mt-4">Price: ${product.price}</p>
                            <p className="text-gray-700 mt-4">{product.description}</p>

                            <div className="flex items-center mt-3">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <FaStar
                                        key={index}
                                        className={index < product.rating ? "text-yellow-400" : "text-gray-300"}
                                    />
                                ))}
                                <span className="ml-2 text-gray-600">{product.rating || 0}/5</span>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mt-4">
                            <label className="text-gray-700 font-medium text-lg font-semibold">Available Quantity: {product.qty}</label>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex space-x-4">
                            <button
                                className={`px-6 py-2 flex items-center rounded-lg transition ${
                                    addToCartGet ? "bg-green-600 text-white hover:bg-green-800" : "bg-gray-300 text-black hover:bg-gray-400"
                                }`}
                                onClick={addToCartToggle}
                            >
                                <FaShoppingCart className="mr-2" /> {addToCartGet ? "Remove from Cart" : "Add to Cart"}
                            </button>

                            <button
                                className={`px-6 py-2 flex items-center rounded-lg transition ${
                                    favorite ? "bg-red-600 text-white hover:bg-red-800" : "bg-gray-300 text-black hover:bg-gray-400"
                                }`}
                                onClick={handleFavoriteToggle}
                            >
                                <FaHeart className="mr-2" /> {favorite ? "Remove from Wishlist" : "Add to Wishlist"}
                            </button>

                        </div>

                        {/* Back to Products */}
                        <div className="mt-6">
                            <Link to="/user/item/index" className="text-blue-600 hover:underline">
                                ← Back to Products
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductShow;

