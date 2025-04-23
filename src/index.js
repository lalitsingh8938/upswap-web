import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



// const express = require("express");
// const Razorpay = require("razorpay");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json()); // To parse JSON bodies

// // Razorpay instance
// const razorpay = new Razorpay({
//   key_id: "rzp_live_vChMTg5Zq6WCJI", // your actual Razorpay key
//   key_secret: "38oUstLbpNupiDQJmYwesPU7",    // your Razorpay secret key
// });

// // Route to create order
// app.post("/api/create-order", async (req, res) => {
//   const { amount, currency, receipt } = req.body;

//   try {
//     const options = {
//       amount: amount, // amount in paise
//       currency,
//       receipt,
//     };

//     const order = await razorpay.orders.create(options);
//     return res.json(order);
//   } catch (err) {
//     console.error("Error creating Razorpay order", err);
//     return res.status(500).json({ error: "Failed to create order" });
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });
