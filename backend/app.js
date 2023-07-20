const express = require('express');
const mongoose = require('mongoose');
const csvtojson = require('csvtojson');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const orders = require('./models/Order');
const cors = require("cors");
const ExpressError = require('./utils/ExpressError');
const errorController = require('./errorController');

const dbUrl = 'mongodb://127.0.0.1:27017/ShopKeeperDash';

mongoose.set('strictQuery', true);
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();


app.use(express.json());
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send("hi");
});

app.post('/upload', upload.single('file'), async (req, res) => {
    const jsonArray = await csvtojson().fromFile(req.file.path);
    let arrayToInsert = [];
    for (let i = 0; i < jsonArray.length; i++) {
        let oneRow = {
            orderID: jsonArray[i]["Order ID"],
            customer: jsonArray[i]["Customer"],
            orderDate: jsonArray[i]["Order Date"],
            itemName: jsonArray[i]["Item Name"],
            quantity: jsonArray[i]["Quantity"],
            unitPrice: jsonArray[i]["Unit Price"]
        };
        arrayToInsert.push(oneRow);
    }
    await orders.deleteMany();
    const orderData = await orders.insertMany(arrayToInsert);
    const orderCount = await orders.countDocuments();
    res.status(200).json({ orderData, orderCount });
})

app.get('/all-orders', async (req, res) => {
    const allOrders = await orders.find({});
    res.status(200).json({ allOrders });
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not Found', 404));
})

app.use(errorController);

app.listen(3000, () => {
    console.log("listening on port 3000");
})