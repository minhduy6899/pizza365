// defined lybrary
const express = require('express');
const path = require('path')

// import router
const { drinkRouter } = require('./app/routes/drinkRouter');
const { voucherRouter } = require('./app/routes/voucherRouter');
const { userRouter } = require('./app/routes/userRouter');
const { orderRouter } = require('./app/routes/orderRouter');

// defined app nodejs
const app = new express();

// use body json
app.use(express.json());

// user body unicode
app.use(express.urlencoded({
    extended: true
}))

// defined port
const port = 8002;

// connet to database (mongoDB)
const db = require('./config/db');

// defined static file
app.use(express.static(path.join(__dirname, "/views")))

//Connect to DB
db.connect();

// render view
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '/views/Pizza365.html'))

})

app.get('/order-list', (request, response) => {
    response.sendFile(path.join(__dirname, '/views/ListOrder.html'))
})

// use router
app.use('/', drinkRouter);
app.use('/', voucherRouter);
app.use('/', userRouter);
app.use('/', orderRouter);

// listen port
app.listen(port, () => {
    console.log(`App chạy trên cổng ${port}`);
})