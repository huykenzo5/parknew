const express = require('express');
const stripe = require('stripe')('YOUR_SECRET_KEY'); // Thay YOUR_SECRET_KEY bằng secret key của bạn
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/charge', async (req, res) => {
    try {
        const { paymentMethodId } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 2000, // Số tiền cần thanh toán (đơn vị là cents)
            currency: 'usd', // Đơn vị tiền tệ
            payment_method: paymentMethodId,
            confirm: true,
        });

        res.send({ success: true });
    } catch (error) {
        res.send({ success: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});