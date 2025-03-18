import React, {useEffect, useState} from "react";
import AdminNavbar from "../../../layout/admin/AdminNavbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import {showErrorAlert, showSuccessAlert} from "../../../utils/swalAlerts";
import {updateItem} from "../../../services/ItemService";
import Footer from "../../../layout/Footer";

const UpdateItem = () => {
    const { id } = useParams();  // Get the product ID from the URL
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        date: "",
        name: "",
        price: "",
        imageUrl: "",
        color: "",
        ram: "",
        rom: "",
        processor: "",
        operatingSystem: "",
        battery: "",
        frontCamera: "",
        rearCamera: "",
        displaySize: "",
        warranty: "",
        modelName: "",
        modelNumber: "",
        qty: "",
    });

    const authToken = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/itemFindById/${id}`,{
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                console.log(response)
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [authToken]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem("authToken");

        try {
            await updateItem(id, formData, authToken);
            // Use PUT or PATCH for updating data, not GET
            showSuccessAlert("Item updated successfully!");

            setError(null);
        } catch (error) {
            console.log("API Error:", error);
            if (error.errors) {
                showErrorAlert(error.errors[0]?.msg || error.errors);
            } else {
                showErrorAlert(error.message || "Something went wrong");
            }
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <div>
            <AdminNavbar />
            <div className="max-w-5xl mx-auto p-6">
                {/* Title and Back Button */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Update Product</h1>
                    <button
                        onClick={() => window.history.back()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        ← Back
                    </button>
                </div>

                {/* Form */}
                <div className=" max-w-5xl mx-auto">
                    <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-inner max-h-[500px] overflow-y-auto">
                            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                                <div className="grid grid-cols-2 gap-6">
                                    {/* Date */}
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-medium">Date:</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="w-2/3 border rounded-md p-2"
                                            required
                                        />
                                    </div>

                                    {/* Name */}
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-medium">Product Name:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-2/3 border rounded-md p-2"
                                            required
                                        />
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-medium">Price:</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="w-2/3 border rounded-md p-2"
                                            required
                                        />
                                    </div>

                                    {/* Image URL */}
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-medium">Image URL:</label>
                                        <input
                                            type="text"
                                            name="imageUrl"
                                            value={formData.imageUrl}
                                            onChange={handleChange}
                                            className="w-2/3 border rounded-md p-2"
                                            required
                                        />
                                    </div>

                                    {/* Color */}
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-medium">Color:</label>
                                        <input
                                            type="text"
                                            name="color"
                                            value={formData.color}
                                            onChange={handleChange}
                                            className="w-2/3 border rounded-md p-2"
                                        />
                                    </div>

                                    {/* RAM */}
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-medium">RAM (GB):</label>
                                        <input
                                            type="number"
                                            name="ram"
                                            value={formData.ram}
                                            onChange={handleChange}
                                            className="w-2/3 border rounded-md p-2"
                                        />
                                    </div>

                                    {/* ROM */}
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-medium">ROM (GB):</label>
                                        <input
                                            type="number"
                                            name="rom"
                                            value={formData.rom}
                                            onChange={handleChange}
                                            className="w-2/3 border rounded-md p-2"
                                        />
                                    </div>

                                    {/* Processor */}
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-medium">Processor:</label>
                                        <input
                                            type="text"
                                            name="processor"
                                            value={formData.processor}
                                            onChange={handleChange}
                                            className="w-2/3 border rounded-md p-2"
                                        />
                                    </div>

                                    {/* Operating System */}
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-medium">Operating System:</label>
                                        <input
                                            type="text"
                                            name="operatingSystem"
                                            value={formData.operatingSystem}
                                            onChange={handleChange}
                                            className="w-2/3 border rounded-md p-2"
                                        />
                                    </div>

                                    {/* Battery */}
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-medium">Battery (mAh):</label>
                                        <input
                                            type="number"
                                            name="battery"
                                            value={formData.battery}
                                            onChange={handleChange}
                                            className="w-2/3 border rounded-md p-2"
                                        />
                                    </div>

                                    {/* Front Camera */}
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-medium">Front Camera (MP):</label>
                                        <input
                                            type="number"
                                            name="frontCamera"
                                            value={formData.frontCamera}
                                            onChange={handleChange}
                                            className="w-2/3 border rounded-md p-2"
                                        />
                                    </div>

                                    {/* Rear Camera */}
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-medium">Rear Camera (MP):</label>
                                        <input
                                            type="number"
                                            name="rearCamera"
                                            value={formData.rearCamera}
                                            onChange={handleChange}
                                            className="w-2/3 border rounded-md p-2"
                                        />
                                    </div>

                                    {/* Display Size */}
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-medium">Display Size (inches):</label>
                                        <input
                                            type="number"
                                            name="displaySize"
                                            value={formData.displaySize}
                                            onChange={handleChange}
                                            className="w-2/3 border rounded-md p-2"
                                        />
                                    </div>

                                    {/* Model Name */}
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-medium">Model Name:</label>
                                        <input
                                            type="text"
                                            name="modelName"
                                            value={formData.modelName}
                                            onChange={handleChange}
                                            className="w-2/3 border rounded-md p-2"
                                        />
                                    </div>

                                    {/* Model Number */}
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-medium">Model Number:</label>
                                        <input
                                            type="text"
                                            name="modelNumber"
                                            value={formData.modelNumber}
                                            onChange={handleChange}
                                            className="w-2/3 border rounded-md p-2"
                                        />
                                    </div>

                                    {/* Quantity */}
                                    <div className="flex items-center">
                                        <label className="w-1/3 font-medium">Quantity:</label>
                                        <input
                                            type="number"
                                            name="qty"
                                            value={formData.qty}
                                            onChange={handleChange}
                                            className="w-2/3 border rounded-md p-2"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="text-sm text-red-500 mt-2">
                                        {typeof error === "string" ? error : "Something went wrong"}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <div className="flex justify-end mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <Footer />
        </div>
    );
};

export default UpdateItem;
