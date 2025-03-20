import React, {useEffect, useState} from "react";
import axios from "axios";
import {showSuccessAlert} from "../../../utils/swalAlerts";

const OrderPart = ({ isOpen, setIsOpen,quantities,totalPrice }) => {
    const token = localStorage.getItem("authToken");
    const authId = localStorage.getItem("authId");
    const [productsOrder, setProductsOrder] = useState([]);
    const [shippingInfo, setShippingInfo] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
    });

    const SHIPPING_COST = 10;

    const handleInputChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

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
            setProductsOrder(response.data);

        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const handlePlaceOrder = async () => {
        if (!shippingInfo.email || !shippingInfo.firstName || !shippingInfo.address || !shippingInfo.city || !shippingInfo.postalCode) {
            alert("Please fill in all shipping details.");
            return;
        }

        const orderData = {
            userId: authId,
            shippingInfo,
            items: productsOrder.map(item => ({
                productId: item._id,
                name: item.name,
                quantity: quantities[item._id] || 1,
                price: item.price,
            })),
            totalAmount: totalPrice + SHIPPING_COST,
        };

        try {
            const response = await axios.post("http://localhost:3000/api/orders", orderData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 201) {
                showSuccessAlert("Order placed successfully!");
                setIsOpen(false); // Close the order modal
                addToCartToggle();
            } else {
                alert("Error placing order. Please try again.");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        }
    };

    const addToCartToggle = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/ClearUserCartAll/${authId}`, {
                data: { authId },
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error("Error updating favorite status:", error);
        }
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${isOpen ? "block" : "hidden"}`}>
            <div className="bg-white w-[1000px] h-[450px] p-6 rounded-lg shadow-lg relative flex flex-col">
                {/* Close Button */}
                <button
                    className="text-red-500 text-lg absolute top-4 right-4"
                    onClick={() => setIsOpen(false)}
                >
                    ✖
                </button>

                {/* Title */}
                <div className="p-4 max-w-5xl mx-auto flex gap-10">
                <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                    <form className="grid grid-cols-2 gap-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="p-2 border rounded-md col-span-2"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            className="p-2 border rounded-md"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            className="p-2 border rounded-md"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            className="p-2 border rounded-md col-span-2"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            className="p-2 border rounded-md"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="postalCode"
                            placeholder="Postal Code"
                            className="p-2 border rounded-md"
                            onChange={handleInputChange}
                        />
                    </form>
                    <button
                        onClick={handlePlaceOrder}
                        className="w-full mt-6 bg-black text-white py-3 rounded-md text-lg hover:bg-gray-900 transition"
                    >
                        Place Order
                    </button>
                </div>

                <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div>
                        {productsOrder.map((item) => (
                            <div key={item._id} className="flex justify-between py-2 border-b">
                                <div>
                                    <p className="font-semibold">Name: {item.name}</p>
                                    <p className="text-gray-500">Qty: {quantities[item._id]}</p>
                                </div>
                                <p className="font-semibold">${item.price.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>${totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Shipping</p>
                            <p>${SHIPPING_COST.toFixed(2)}</p>
                        </div>

                        <div className="flex justify-between font-bold text-lg mt-2">
                            <p>Total</p>
                            <p>${(totalPrice + SHIPPING_COST).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                {/* Content (Can Adjust Height for Scrolling) */}
                </div>
                {/* Checkout Button */}

            </div>
        </div>
    );
};

export default OrderPart;
