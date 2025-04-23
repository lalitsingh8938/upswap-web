fetch("http://localhost:5000/api/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: 50000,           // ₹500.00 (Razorpay takes paisa)
      currency: "INR",
      receipt: "receipt_001",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Razorpay Order:", data);
      // Initialize Razorpay checkout here...
    });
  