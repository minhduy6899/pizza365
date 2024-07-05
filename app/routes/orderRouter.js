//khai báo thư viện express
const express = require('express');
const orderMiddleware = require('../middlewares/orderMiddleware');
const orderController = require('../controllers/orderController');
const { createOrderOfUser, getAllOrderOfUser, getOrderById, updateOrderById, deleteOrderById, orderHandle, updateOrderStatus } = require('../controllers/orderController');
//tạo router
const orderRouter = express.Router();

//sủ dụng middle ware
orderRouter.use(orderMiddleware);

// Get all order
orderRouter.get('/orders', getAllOrderOfUser);

//get a order
orderRouter.get('/orders/:orderId', getOrderById)

//create a order
orderRouter.post('orders', createOrderOfUser);

//update a order
orderRouter.put('/orders/:orderId', updateOrderById)

//delete a order
orderRouter.delete('orders/:orderId', deleteOrderById)

//create order by userId
orderRouter.post('/devcamp-pizza365/orders', orderHandle)

//update order status by userId
orderRouter.put('/devcamp-pizza365/orders/:orderId', updateOrderStatus)

module.exports = { orderRouter };

