//khai báo thư viện express
const express = require('express');
const { drinkMiddleware } = require('../middlewares/drinkMiddleware');
// const Drink = require('../model/drinkModel');
const drinkController = require('../controllers/drinkController');
//tạo router
const drinkRouter = express.Router();

const { getAllDrinks, getDrinkById, createDrink, updateDrink, deleteDrink, getDrinkList } = require('../controllers/drinkController')


//sủ dụng middle ware
drinkRouter.use(drinkMiddleware);

//get all drinks
drinkRouter.get('/drinks', getAllDrinks);

//get a drink
drinkRouter.get('/drinks/:drinkid', getDrinkById)

//create a drink
drinkRouter.post('/drinks', createDrink);

//update a drink
drinkRouter.put('/drinks/:drinkid', updateDrink)

//delete a course
drinkRouter.delete('/drinks/:drinkid', deleteDrink)

//get all drinks
drinkRouter.get('/devcamp-pizza365/drinks', getDrinkList);

module.exports = { drinkRouter };