import React, {useEffect, useState} from "react";
import AdminNavbar from "../../../layout/admin/AdminNavbar";
import { FaTrash, FaEdit } from "react-icons/fa";
import {Link} from "react-router-dom";
import axios from "axios";
import {showConfirmationAlert, showErrorAlert, showSuccessAlert} from "../../../utils/swalAlerts";
import Footer from "../../../layout/Footer";

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("authToken");
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const response =  await axios.get("http://localhost:3000/api/getAllItems", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setProducts(response.data);
                }
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchData();
    }, [token]);

    const deleteItem = (id) => {
        showConfirmationAlert("Do you want to remove this item?", async () => {
            try {
                await axios.delete(`http://localhost:3000/api/itemDelete/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                showSuccessAlert("The item has been removed.");

                setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));

            } catch (error) {
                console.error("Error deleting item:", error);
                showErrorAlert("Error deleting item:", error);
            }
        });
    }

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
        <div>
            <AdminNavbar />
            <div className="max-w-5xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

                <Link to="/item/add" >
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">
                        ADD PRODUCT
                    </button>
                </Link>


                {/* Table Container */}
                <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="max-h-[400px] overflow-y-auto">
                        <table className="w-full border-collapse">
                            {/* Sticky Table Head */}
                            <thead className="bg-gray-200 sticky top-0 z-10">
                            <tr>
                                <th className="p-3 text-left">Id</th>
                                <th className="p-3 text-left">Product</th>
                                <th className="p-3 text-center">Qty</th>
                                <th className="p-3 text-center">Delete</th>
                                <th className="p-3 text-center">Update</th>
                                <th className="p-3 text-center">Create At</th>
                                <th className="p-3 text-center">Update At</th>
                            </tr>
                            </thead>
                            {/* Scrollable Table Body */}
                            <tbody className="divide-y divide-gray-300">
                            {products.map((product,index) => (
                                <tr  key={product._id} className="border-b">
                                    <td className="p-3">{index+1}</td>
                                    <td className="p-3">{product.name} {product.modelNumber} ({product.color},{product.rom} GB ROM) ({product.ram} GB RAM)</td>
                                    <td className="p-3 text-center">{product.qty}</td>
                                    <td className="p-3 text-center">
                                        <button onClick={() => deleteItem(product._id)} className="text-red-600 hover:text-red-800">
                                            <FaTrash />
                                        </button>
                                    </td>
                                    <td className="p-3 text-center">
                                        <Link to={`/item/update/${product._id}`}>
                                            <button className="text-blue-600 hover:text-blue-800">
                                                <FaEdit />
                                            </button>
                                        </Link>
                                    </td>
                                    <td className="p-3 text-center">{new Date(product.createdAt).toLocaleDateString()}</td>
                                    <td className="p-3 text-center">{new Date(product.updatedAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
