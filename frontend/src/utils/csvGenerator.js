// utils/csvGenerator.js
export const generateCSV = (cart, totalAmount) => {
    const header = ["Item Name", "Quantity", "Item Amount", "Total Amount", "Paid"];
    const rows = cart.map(item => [
        item.name,
        item.quantity,
        (item.price * item.quantity).toFixed(2),
        totalAmount.toFixed(2),
        "Yes" // You can modify this if you want to change it based on payment status
    ]);

    // Combine header and rows into CSV format
    const csvContent = [header, ...rows].map(e => e.join(",")).join("\n");

    return csvContent;
};
