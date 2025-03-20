import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserNavBar from "../../../layout/user/UserNavBar";
import Footer from "../../../layout/Footer";
import UserOrder from "../Order/UserOrder";

const AddToCartShow = () => {
    const token = localStorage.getItem("authToken");
    const authId = localStorage.getItem("authId");
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);
    const [quantities, setQuantities] = useState({});


    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (token && authId) {
            fetchProducts();
        }
    }, [token, authId]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/getAllAddToCartOnly/${authId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(response.data);

        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle quantity change
    const handleQtyChange = (id, newQty) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: Math.max(newQty, 1), // Ensure quantity is never less than 1
        }));
    };

    // Calculate total price based on user quantities
    const calculateTotalPrice = () => {
        let total = 0;
        products.forEach((item) => {
            const itemQty = quantities[item._id] || 1; // Default to 1 if no quantity is provided
            total += item.price * itemQty;
        });
        setTotalPrice(total);
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [quantities, products]); // Recalculate total price when quantities or products change

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <UserNavBar />
            <div className="p-4">
                <div className="bg-white">
                    <h2 className="text-xl font-bold mb-7">Your Cart</h2>

                    {loading ? (
                        <p className="text-gray-600">Loading cart items...</p>
                    ) : products.length === 0 ? (
                        <p className="text-red-500">No items in cart</p>
                    ) : (
                        products.map((item) => (
                            <div key={item._id} className="flex justify-between items-center mt-6 border-b py-2">
                                <Link to={`/user/product/show/${item._id}`} className="block">
                                    <img src={item.imageUrl} className="w-16 h-16 rounded-md" alt={item.name} />
                                </Link>
                                <div className="ml-4 flex-1">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-gray-500">{item.color} - {item.rom} GB ROM / {item.ram} GB RAM</p>
                                    <p className="text-gray-600">${item.price}</p>

                                    {/* Quantity Section */}
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={() => handleQtyChange(item._id, (quantities[item._id] || 1) - 1)}
                                            className="px-2 py-1 border rounded-md bg-gray-200 text-gray-600"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={quantities[item._id] || 1} // Default to 1 if no quantity is set for this product
                                            onChange={(e) => handleQtyChange(item._id, Math.max(Number(e.target.value), 1))}
                                            className="w-12 mx-2 text-center border rounded-md"
                                        />
                                        <button
                                            onClick={() => handleQtyChange(item._id, (quantities[item._id] || 1) + 1)}
                                            className="px-2 py-1 border rounded-md bg-gray-200 text-gray-600"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <UserOrder isOpen={isOpen} setIsOpen={setIsOpen} quantities={quantities} totalPrice={totalPrice}/>
                            </div>
                        ))
                    )}

                    {products.length > 0 && (
                        <div className="flex-1 flex justify-end  mt-3">
                            <div>
                                <p className="font-semibold ">Total Price: ${totalPrice.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-end mt-6">
                                <button  onClick={() => setIsOpen(true)} className="bg-green-500 text-white py-3 px-8 rounded-md text-lg hover:bg-green-700 transition">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddToCartShow;
