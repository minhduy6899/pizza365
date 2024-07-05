// Import thư viện mongoose
const mongoose = require("mongoose");
const Drink = require('../model/drinkModel');

// Create course
const createDrink = (req, res) => {
  // B1: Thu thập dữ liệu từ req
  let body = req.body;

  // B2: Validate dữ liệu
  if (!body.maNuocUong) {
    return res.status(400).json({
      message: "Ma nuoc uong is required!"
    })
  }

  if (!body.tenNuocUong) {
    return res.status(400).json({
      message: "No Drink is invalid!"
    })
  }

  // B3: Gọi model thực hiện các thao tác nghiệp vụ
  let newDrinkData = {
    _id: mongoose.Types.ObjectId(),
    maNuocUong: body.maNuocUong,
    tenNuocUong: body.tenNuocUong,
    donGia: body.donGia,
    ngayTao: body.ngayTao,
    ngayCapNhat: body.ngayCapNhat
  }

  Drink.create(newDrinkData, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(201).json({
      message: "Create successfully",
      newDrink: data
    })
  })
}

// Get all course 
const getAllDrinks = (req, res) => {
  // B1: Thu thập dữ liệu từ req
  // B2: Validate dữ liệu
  // B3: Gọi model thực hiện các thao tác nghiệp vụ
  Drink.find((error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(200).json({
      message: "Get all courses successfully",
      drinks: data
    })
  })
}

// Get course by id
const getDrinkById = (req, res) => {
  // B1: Thu thập dữ liệu từ req
  let drinkid = req.params.drinkid;

  // B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(drinkid)) {
    return res.status(400).json({
      message: "Course ID is invalid!"
    })
  }

  // B3: Gọi model thực hiện các thao tác nghiệp vụ
  Drink.findById(drinkid, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(201).json({
      message: "Get drink successfully",
      course: data
    })
  })
}

// Update course by id
const updateDrink = (req, res) => {
  // B1: Thu thập dữ liệu từ req
  let drinkid = req.params.drinkid;
  let body = req.body;

  // B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(drinkid)) {
    return res.status(400).json({
      message: "Drink ID is invalid!"
    })
  }

  // Bóc tách trường hợp undefied
  if (!body.maNuocUong) {
    return res.status(400).json({
      message: "Ma nuoc uong is required!"
    })
  }

  if (!body.tenNuocUong) {
    return res.status(400).json({
      message: "No Drink is invalid!"
    })
  }

  // B3: Gọi model thực hiện các thao tác nghiệp vụ
  let courseUpdate = {
    maNuocUong: body.maNuocUong,
    tenNuocUong: body.tenNuocUong,
    donGia: body.donGia,
    ngayTao: body.ngayTao,
    ngayCapNhat: body.ngayCapNhat
  };

  Drink.findByIdAndUpdate(drinkid, courseUpdate, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(200).json({
      message: "Update course successfully",
      updatedCourse: data
    })
  })
}

// Delete course by id
const deleteDrink = (req, res) => {
  // B1: Thu thập dữ liệu từ req
  let drinkid = req.params.drinkid;

  // B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(drinkid)) {
    return res.status(400).json({
      message: "Course ID is invalid!"
    })
  }

  // B3: Gọi model thực hiện các thao tác nghiệp vụ
  Drink.findByIdAndDelete(drinkid, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(204).json({
      message: "Delete course successfully"
    })
  })
}

const getDrinkList = (req, res) => {
  // B1: Thu thập dữ liệu từ req
  // B2: Validate dữ liệu
  // B3: Gọi model thực hiện các thao tác nghiệp vụ
  Drink.find((error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(200).json({
      message: "Get all courses successfully",
      drinks: data
    })
  })
}

// Export Course controller thành 1 module
module.exports = {
  createDrink,
  getAllDrinks,
  getDrinkById,
  updateDrink,
  deleteDrink,
  getDrinkList
}
