// Import User model vào controller
const userModel = require('../model/userModel');

// Khai báo thư viện mongoose 
const mongoose = require("mongoose");
const orderModel = require('../model/orderModel');

const createUser = (request, response) => {
  // B1: Thu thập dữ liệu
  let bodyRequest = request.body;

  // B2: Kiểm tra dữ liệu
  if (!bodyRequest.fullName) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "fullName is required"
    })
  }

  if (!bodyRequest.email) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "No Student is not valid"
    })
  }

  // B3: Thao tác với cơ sở dữ liệu
  let createUser = {
    _id: mongoose.Types.ObjectId(),
    email: bodyRequest.email,
    hoTen: bodyRequest.hoTen,
    diaChi: bodyRequest.diaChi,
    soDienThoai: bodyRequest.soDienThoai,
    // fullName: bodyRequest.fullName,
    // email: bodyRequest.email,
    // address: bodyRequest.address,
    // phone: bodyRequest.phone,
  }

  userModel.create(createUser, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(201).json({
        status: "Success: User created",
        data: data
      })
    }
  })
}

const getAllUser = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  //B2: Validate dữ liệu
  //B3: Thao tác với cơ sở dữ liệu
  userModel.find((error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Get Users success",
        data: data
      })
    }
  })
}

const getLimitUser = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  const limit = request.query.limit
  //B2: Validate dữ liệu
  //B3: Thao tác với cơ sở dữ liệu
  userModel.find().limit(limit).exec((error, data) => {
    if (error || !limit) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Get Users success",
        data: data
      })
    }
  })
}

const getSkipUser = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let skip = request.query.skip
  //B2: Validate dữ liệu
  //B3: Thao tác với cơ sở dữ liệu
  userModel.find().skip(skip).exec((error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Get Users success",
        data: data
      })
    }
  })
}

const getSortUser = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let sort = request.query.sort
  //B2: Validate dữ liệu
  //B3: Thao tác với cơ sở dữ liệu
  userModel.find().sort({ fullName: sort }).exec((error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Get Users success",
        data: data
      })
    }
  })
}

const getSkipLimitUser = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let skip = request.query.skip
  let limit = request.query.limit
  //B2: Validate dữ liệu
  //B3: Thao tác với cơ sở dữ liệu
  userModel.find().skip(skip).limit(limit).exec((error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Get Users success",
        data: data
      })
    }
  })
}

const getSortSkipLimitUser = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let skip = request.query.skip
  let limit = request.query.limit
  let sort = request.query.sort
  //B2: Validate dữ liệu
  //B3: Thao tác với cơ sở dữ liệu
  userModel.find().sort(sort).skip(skip).limit(limit).exec((error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Get Users success",
        data: data
      })
    }
  })
}

const getUserById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let UserId = request.params.userId;
  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(UserId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "User ID is not valid"
    })
  }
  //B3: Thao tác với cơ sở dữ liệu
  userModel.findById(UserId, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Get User success",
        data: data
      })
    }
  })
}

const updateUserById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let UserId = request.params.userId;
  let bodyRequest = request.body;

  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(UserId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "User ID is not valid"
    })
  }
  //B3: Thao tác với cơ sở dữ liệu
  let UserUpdate = {
    email: bodyRequest.email,
    hoTen: bodyRequest.hoTen,
    diaChi: bodyRequest.diaChi,
    soDienThoai: bodyRequest.soDienThoai,
  }

  userModel.findByIdAndUpdate(UserId, UserUpdate, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Update User success",
        data: data
      })
    }
  })
}

const deleteUserById = (request, response) => {
  //B1: Chuẩn bị dữ liệu
  let UserId = request.params.userId;
  console.log(UserId);
  //B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(UserId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "User ID is not valid"
    })
  }
  //B3: Thao tác với cơ sở dữ liệu
  orderModel.findByIdAndDelete(UserId, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Delete User success"
      })
    }
  })
}

// Export controller thành 1 module là 1 object gồm các hàm trong controller
module.exports = {
  createUser: createUser,
  getAllUser: getAllUser,
  getUserById: getUserById,
  updateUserById: updateUserById,
  deleteUserById: deleteUserById,
  getLimitUser: getLimitUser,
  getSkipUser: getSkipUser,
  getSortUser: getSortUser,
  getSkipLimitUser: getSkipLimitUser,
  getSortSkipLimitUser: getSortSkipLimitUser
}