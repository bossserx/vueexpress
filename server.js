// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/api/products', (req, res) => {
  const products = [
    { id: 1, name: 'Artisan hein xl soft', price: 2690,  image: 'https://m.media-amazon.com/images/I/81AMJJkFYkL._AC_UF894,1000_QL80_.jpg', },
    { id: 2, name: 'Artisan zero xl soft', price: 2790 ,  image: 'https://m.media-amazon.com/images/I/71yQr-cZOeL.jpg',},
    { id: 3, name: 'Product 3', price: 17.49 ,  image: 'https://speedcom.co.th/uploads/cache/img_1280x1280/uploads/images/product_1689064785123.jpg',},
    { id: 4, name: 'Product 4', price: 18.49 ,  image: 'https://via.placeholder.com/150',},
    { id: 5, name: 'Product 5', price: 19.49 ,  image: 'https://via.placeholder.com/150',},
    { id: 6, name: 'Product 6', price: 20.49 ,  image: 'https://via.placeholder.com/150',},
    { id: 7, name: 'Product 7', price: 21.49 ,  image: 'https://via.placeholder.com/150',},
    // Add more products as needed
  ];

  res.json(products);
});

app.post('/api/buyproduct', async (req, res) => {
  try {
    console.log('Received data:', req.body);
    const name = req.body.name;
    const price = req.body.price;
    const fname = req.body.fname;
    const phone = req.body.phone;
    const address = req.body.address
    const add2 = address.split(" ").join("");
 
    
    console.log('here'+add2)
    console.log('Name:', name);
    console.log('Price:', price);
    console.log('Fname:', fname);
    console.log('Phone:', phone);
    console.log('Address:', address);

    const lineNotifyToken = 'kOHOeTejvHHZRDVdwhao5WOSsZw4rkXj5R1J4oa787Q';
    const message = `มีรายการสั่งซื้อใหม่ โปรดเข้าไปยืนยันการชำระเงิน

      Detail
      Name: ${name}
      Price: ${price}
      Fname: ${fname}
      Phone: ${phone}
      Address: https://www.google.com/maps/search/?api=1&query=${add2}`;

    await axios.post(
      'https://notify-api.line.me/api/notify',
      { message },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${lineNotifyToken}`,
        },
      }
    );

    res.json({
      success: true,
      message: 'Purchase successful. Notification sent to LINE Notify.',
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
