const orderModel = require('../model/orderModel');
const userModel = require('../model/userModel');
const drinkModel = require('../model/drinkModel');
const voucherModel = require('../model/voucherModel');


// const orderModel = require("../models/orderModel");
// const UserModel = require("../models/UserModel");

const mongoose = require("mongoose");

// randome ordercode
const randomOrderCode = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

const orderHandle = (request, response) => {
  console.log("da vao day");
  console.log(request.body);
  // B1: Chuẩn bị dữ liệu
  let email = request.body.email;
  const bodyRes = request.body
  console.log(email);

  let drink = request.body.drink

  // Random 1 giá trị xúc xắc bất kỳ
  let dice = Math.floor(Math.random() * 6 + 1);
  // B2: Validate dữ liệu từ request body
  if (!bodyRes.email) {
    return response.status(400).json({
      status: "Error 400: Bad request",
      message: "email is required"
    })
  }

  if (!bodyRes.hoTen) {
    return response.status(400).json({
      status: "Error 400: Bad request",
      message: "hoTen is required"
    })
  }

  if (!bodyRes.diaChi) {
    return response.status(400).json({
      status: "Error 400: Bad request",
      message: "diaChi is required"
    })
  }
  if (!bodyRes.duongKinh) {
    return response.status(400).json({
      status: "Error 400: Bad request",
      message: "duongKinh is required"
    })
  }

  if (!bodyRes.idLoaiNuocUong) {
    return response.status(400).json({
      status: "Error 400: Bad request",
      message: "fullname is required"
    })
  }

  if (!bodyRes.idLoaiNuocUong) {
    return response.status(400).json({
      status: "Error 400: Bad request",
      message: "address is required"
    })
  }

  if (!bodyRes.kichCo) {
    return response.status(400).json({
      status: "Error 400: Bad request",
      message: "kichCo is required"
    })
  }

  // Sử dụng userModel tìm kiếm bằng email
  userModel.findOne({ email: email }, (errorFindUser, userExist) => {
    if (errorFindUser) {
      return response.status(500).json({
        status: "Error 500: Internal server errori",
        message: errorFindUser.message
      })
    } else {
      if (!userExist) {
        // Nếu user không tồn tại trong hệ thống
        // Tạo user mới
        console.log('toi luc tao user');
        console.log(request.body);
        userModel.create({
          _id: mongoose.Types.ObjectId(),
          email: request.body.email,
          hoTen: request.body.hoTen,
          diaChi: request.body.diaChi,
          soDienThoai: request.body.soDienThoai,
        }, (errCreateUser, userCreated) => {
          if (errCreateUser) {
            return response.status(500).json({
              status: "Error 500: Internal server error",
              message: errCreateUser.message
            })
          } else {
            console.log('da qua loi 500 lay id user de tao order');
            console.log(userCreated);
            //B1: Chuẩn bị dữ liệu
            let UserId = userCreated._id;
            console.log(UserId);
            let requestBody = request.body;
            //B2: Validate dữ liệu
            if (!mongoose.Types.ObjectId.isValid(UserId)) {
              return response.status(400).json({
                status: "Error 400: Bad Request",
                message: "User ID is invalid"
              })
            }
            console.log('toi luc tao order');
            //B3: Thao tác với cơ sở dữ liệu
            let newOrderInput = {
              _id: mongoose.Types.ObjectId(),
              orderId: randomOrderCode(9),
              duongKinh: requestBody.duongKinh,
              idLoaiNuocUong: requestBody.idLoaiNuocUong,
              idVourcher: requestBody.idVourcher,
              kichCo: requestBody.kichCo,
              loaiPizza: requestBody.loaiPizza,
              loiNhan: requestBody.loiNhan,
              salad: requestBody.salad,
              soLuongNuoc: requestBody.soLuongNuoc,
              suon: requestBody.suon,
              thanhTien: requestBody.thanhTien,
              soDienThoai: requestBody.soDienThoai,
              trangThai: "open",
            }

            orderModel.create(newOrderInput, (error, data) => {
              if (error) {
                return response.status(500).json({
                  status: "Error 500: Internal server error",
                  message: error.message
                })
              } else {
                userModel.findByIdAndUpdate(UserId,
                  {
                    $push: { orders: data._id }
                  },
                  (err, updatedUser) => {
                    if (err) {
                      return response.status(500).json({
                        status: "Error 500: Internal server error",
                        message: err.message
                      })
                    } else {
                      return response.status(201).json({
                        status: "Create Order Success",
                        data: data
                      })
                    }
                  }
                )
              }
            })

          }
        })
      } else {
        console.log("co email");
        // Nếu user đã tồn tại trong hệ thống
        //B1: Chuẩn bị dữ liệu
        let userId = userExist._id
        let requestBody = request.body;
        //B2: Validate dữ liệu

        //B3: Thao tác với cơ sở dữ liệu
        let newOrderInput = {
          _id: mongoose.Types.ObjectId(),
          orderId: randomOrderCode(9),
          duongKinh: requestBody.duongKinh,
          idLoaiNuocUong: requestBody.idLoaiNuocUong,
          idVourcher: requestBody.idVourcher,
          kichCo: requestBody.kichCo,
          loaiPizza: requestBody.loaiPizza,
          loiNhan: requestBody.loiNhan,
          salad: requestBody.salad,
          soLuongNuoc: requestBody.soLuongNuoc,
          suon: requestBody.suon,
          thanhTien: requestBody.suon,
          soDienThoai: requestBody.soDienThoai,
          trangThai: "open",
        }

        orderModel.create(newOrderInput, (error, data) => {
          if (error) {
            return response.status(500).json({
              status: "Error 500: Internal server error",
              message: error.message
            })
          } else {
            userModel.findByIdAndUpdate(userId,
              {
                $push: { orders: data._id }
              },
              (err, updatedUser) => {
                if (err) {
                  return response.status(500).json({
                    status: "Error 500: Internal server error",
                    message: err.message
                  })
                } else {
                  return response.status(201).json({
                    status: "Create Order Success",
                    data: data
                  })
                }
              }
            )
          }
        })
      }
    }
  })
}



const createOrderOfUser = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let UserId = request.params.userId;
  let requestBody = request.body;
  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(UserId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "User ID is invalid"
    })
  }

  if (!requestBody.orderCode) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Rate is invalid"
    })
  }

  //B3: Thao tác với cơ sở dữ liệu
  let newOrderInput = {
    _id: mongoose.Types.ObjectId(),
    email: request.body.email,
    hoTen: request.body.hoTen,
    diaChi: request.body.diaChi,
    soDienThoai: request.body.soDienThoai,
  }

  orderModel.create(newOrderInput, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      userModel.findByIdAndUpdate(UserId,
        {
          $push: { orders: data._id }
        },
        (err, updatedUser) => {
          if (err) {
            return response.status(500).json({
              status: "Error 500: Internal server error",
              message: err.message
            })
          } else {
            return response.status(201).json({
              status: "Create Order Success",
              data: data
            })
          }
        }
      )
    }
  })
}

const getAllOrderOfUser = (request, response) => {
  // B1: Chuẩn bị dữ liệu
  // B2: Validate dữ liệu
  // B3: Thao tác với cơ sở dữ liệu
  userModel.find()
    .populate("orders")
    .exec((error, data) => {
      if (error) {
        return response.status(500).json({
          status: "Error 500: Internal server error",
          message: error.message
        })
      } else {
        return response.status(200).json({
          status: "Get data success",
          data: data
        })
      }
    })
}

const getOrderById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let OrderId = request.params.orderId;
  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(OrderId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Order ID is not valid"
    })
  }
  //B3: Thao tác với cơ sở dữ liệu
  userModel.find({
    path: 'orders',
    match: { orderId: { $eq: OrderId } },
    // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
    select: 'name -_id'
  })
    .populate("orders")
    .exec((error, data) => {
      if (error) {
        return response.status(500).json({
          status: "Error 500: Internal server error",
          message: error.message
        })
      } else {
        return response.status(200).json({
          status: "Success: Get Order success",
          data: data
        })
      }
    })
}

const updateOrderById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let OrderId = request.params.orderId;
  let bodyRequest = request.body;

  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(OrderId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Order ID is not valid"
    })
  }
  //B3: Thao tác với cơ sở dữ liệu
  let OrderUpdate = {
    email: request.body.email,
    hoTen: request.body.hoTen,
    diaChi: request.body.diaChi,
    soDienThoai: request.body.soDienThoai,
  }

  orderModel.findByIdAndUpdate(OrderId, OrderUpdate, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Update Order success",
        data: data
      })
    }
  })
}

const updateOrderStatus = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let OrderId = request.params.orderId;
  let bodyRequest = request.body;

  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(OrderId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Order ID is not valid"
    })
  }

  //B3: Thao tác với cơ sở dữ liệu
  let OrderUpdate = {
    trangThai: bodyRequest.trangThai,
  }

  console.log(OrderUpdate);
  orderModel.findByIdAndUpdate(OrderId, OrderUpdate, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Update Order success",
        data: data
      })
    }
  })
}

const deleteOrderById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let UserId = request.params.userId;
  console.log(UserId);
  let OrderId = request.params.orderId;
  console.log(OrderId);
  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(UserId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "User ID is not valid"
    })
  }

  if (!mongoose.Types.ObjectId.isValid(OrderId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Order ID is not valid"
    })
  }

  //B3: Thao tác với cơ sở dữ liệu
  orderModel.findByIdAndDelete(OrderId, (error) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      // Sau khi xóa xong 1 Order khỏi collection cần xóa thêm OrderID trong User đang chứa nó
      userModel.findByIdAndUpdate(UserId,
        {
          $pull: { orders: OrderId }
        },
        (err, updatedUser) => {
          if (err) {
            return response.status(500).json({
              status: "Error 500: Internal server error",
              message: err.message
            })
          } else {
            return response.status(204).json({
              status: "Success: Delete Order success"
            })
          }
        })
    }
  })
}

module.exports = {
  createOrderOfUser: createOrderOfUser,
  getAllOrderOfUser: getAllOrderOfUser,
  getOrderById: getOrderById,
  updateOrderById: updateOrderById,
  deleteOrderById: deleteOrderById,
  orderHandle: orderHandle,
  updateOrderStatus: updateOrderStatus
}