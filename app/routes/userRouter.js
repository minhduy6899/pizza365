//khai báo thư viện express
const express = require('express');
const userMiddleware = require('../middlewares/userMiddleware');
const userController = require('../controllers/userController');
//tạo router
const userRouter = express.Router();

const {
  createUser,
  getAllUser, getUserById,
  updateUserById,
  deleteUserById,
  getLimitUser,
  getSkipUser,
  getSortUser,
  getSkipLimitUser,
  getSortSkipLimitUser
} = require('../controllers/userController')

//sủ dụng middle ware
userRouter.use(userMiddleware);

userRouter.get('/users', getAllUser);

userRouter.get('/limit-users', getLimitUser);

userRouter.get('/skip-users', getSkipUser);

userRouter.get('/sort-users', getSortUser);

userRouter.get('/skip-limit-users', getSkipLimitUser);

userRouter.get('/sort-skip-limit-users', getSkipLimitUser);

//create a user
userRouter.post('/users', createUser);

//get a user
userRouter.get('/users/:userId', getUserById)

//update a user
userRouter.put('/users/:userId', updateUserById)

//delete a user
userRouter.delete('/users/:userId', deleteUserById)

module.exports = { userRouter };