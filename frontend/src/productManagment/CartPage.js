import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { ToastContainer, toast } from "react-toastify"; // For toast notifications
import 'react-toastify/dist/ReactToastify.css'; // For toast CSS styles
import { generateCSV } from '../utils/csvGenerator'; // Import the CSV generator

const CartPage = ({ cart, setCart }) => {
    const [invoiceData, setInvoiceData] = useState(null); // State to store invoice data
    const location = useLocation();

    const handleRemoveItem = (id) => {
        const updatedCart = cart.filter(item => item._id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleQuantityChange = (id, delta) => {
        const updatedCart = cart.map(item => {
            if (item._id === id) {
                const newQuantity = item.quantity + delta;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }; // Prevent negative quantity
            }
            return item;
        });

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const makePayment = async (token) => {
        const body = {
            token,
            product: {
                name: 'Cart Items',
                price: totalPrice * 100 // Stripe expects amount in cents
            }
        };
        const headers = {
            "Content-Type": "application/json"
        };

        try {
            const response = await fetch("http://localhost:5000/payment", {
                method: "POST",
                headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error("Payment failed");
            }

            // Show success toast
            toast.success("Payment successful!");

            // Set invoice data after payment is successful
            setInvoiceData({
                items: cart,
                total: totalPrice
            });

            // Clear the cart after payment
            setCart([]); // Reset the cart
            localStorage.setItem("cart", JSON.stringify([])); // Update local storage

        } catch (error) {
            console.error(error);
            toast.error("Payment failed.");
        }
    };

    // Function to handle CSV generation and download
    const handleDownloadCSV = () => {
        const csvContent = generateCSV(cart, totalPrice);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'invoice.csv'); // Filename for the downloaded file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Function to add item to cart
    const addToCart = (item) => {
        // Check if the item is already in the cart
        const existingItem = cart.find(cartItem => cartItem._id === item._id);
        if (existingItem) {
            // Alert user if item is already in the cart
            toast.warn("This item is already in your cart!");
            return; // Exit the function to prevent adding the item again
        }

        // If not already in the cart, add it
        const updatedCart = [...cart, { ...item, quantity: 1 }]; // Assuming each item has a quantity
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.success("Item added to cart!");
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map(item => (
                        <div key={item._id} className="flex justify-between items-center p-4 border-b">
                            <div className="flex items-center">
                                <img
                                    src={`http://localhost:5000/Images/${item.image}`}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="ml-4">
                                    <h3 className="text-lg">{item.name}</h3>
                                    <p className="text-gray-600">Price: Rs.{item.price.toFixed(2)}</p>
                                    <p className="text-gray-600">Amount: Rs.{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() => handleQuantityChange(item._id, -1)}
                                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l"
                                >
                                    -
                                </button>
                                <span className="px-4">{item.quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(item._id, 1)}
                                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded-r"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => handleRemoveItem(item._id)}
                                    className="bg-red-500 text-white px-4 py-1 rounded ml-4"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <h3 className="mt-4 font-bold">Total Price: Rs.{totalPrice.toFixed(2)}</h3>

                    {/* Stripe Checkout Button */}
                    <StripeCheckout
                        name="Buy Cart Items"
                        amount={totalPrice * 100} // Stripe expects amount in cents
                        currency='LKR'
                        token={makePayment}
                        stripeKey='pk_test_51Q5kUrKs4ldJ96PWJsuoDCG9WwlLqb5rS6eBXsrdEGMMifKnRIrabnhta1MvPcabDAZEsuf3lK4V3I01d7eUcvWp00o91jsc6s'
                    >
                        <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">
                            Checkout Rs.{totalPrice.toFixed(2)}
                        </button>
                    </StripeCheckout>
                </div>
            )}

            {/* Display the Invoice after payment */}
            {invoiceData && (
                <div className="mt-8 p-4 border border-gray-300 rounded">
                    <h3 className="font-bold">Invoice</h3>
                    <ul>
                        {invoiceData.items.map(item => (
                            <li key={item._id}>
                                {item.name} - Rs.{(item.price * item.quantity).toFixed(2)} (x{item.quantity})
                            </li>
                        ))}
                    </ul>
                    <h4 className="font-bold">Total Amount: Rs.{invoiceData.total.toFixed(2)}</h4>

                    {/* Button to generate and download the CSV invoice */}
                    <button
                        onClick={handleDownloadCSV}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    >
                        Download Invoice
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
