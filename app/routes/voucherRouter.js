//khai báo thư viện express
const express = require('express');
const voucherMiddleware = require('../middlewares/voucherMiddleware');
const voucherController = require('../controllers/voucherController');
//tạo router
const voucherRouter = express.Router();

const {
  getAllVouchers,
  getVoucherById,
  createVoucher,
  updateVoucher,
  deleteVoucher,
  getVoucherByVoucherCode
} = require('../controllers/voucherController')

//sủ dụng middle ware
voucherRouter.use(voucherMiddleware);

//get all vouchers
// voucherRouter.get('/vouchers', (request, response) => {
//     console.log("Get all vouchers");
//     response.json({
//         message:'Get All vouchers'
//     })
// });
voucherRouter.get('/vouchers', getAllVouchers);

//get a voucher
voucherRouter.get('/vouchers/:voucherid', getVoucherById)

//create a voucher
voucherRouter.post('/vouchers', createVoucher);

//update a voucher
voucherRouter.put('/vouchers/:voucherid', updateVoucher)

//delete a voucher
voucherRouter.delete('/vouchers/:voucherid', deleteVoucher)

//get a voucher by voucher coe
voucherRouter.get('/devcamp-voucher-api/voucher_detail/:voucherCode', getVoucherByVoucherCode)


module.exports = { voucherRouter };