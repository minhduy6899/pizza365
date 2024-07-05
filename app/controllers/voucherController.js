const Voucher = require('../model/voucherModel');// Import thư viện mongoose
const mongoose = require("mongoose");

// Create course
const createVoucher = (req, res) => {
  // B1: Thu thập dữ liệu từ req
  let body = req.body;

  // B2: Validate dữ liệu
  if (!body.maVoucher) {
    return res.status(400).json({
      message: "Ma nuoc uong is required!"
    })
  }

  if (!body.phanTramGiamGia) {
    return res.status(400).json({
      message: "No Voucher is invalid!"
    })
  }

  // B3: Gọi model thực hiện các thao tác nghiệp vụ
  let newVoucherData = {
    _id: mongoose.Types.ObjectId(),
    maVoucher: body.maVoucher,
    phanTramGiamGia: body.phanTramGiamGia,
    ghiChu: body.ghiChu,
  }

  Voucher.create(newVoucherData, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(201).json({
      message: "Create successfully",
      newVoucher: data
    })
  })
}

// Get all course 
const getAllVouchers = (req, res) => {
  // B1: Thu thập dữ liệu từ req
  // B2: Validate dữ liệu
  // B3: Gọi model thực hiện các thao tác nghiệp vụ
  Voucher.find((error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(200).json({
      message: "Get all courses successfully",
      Vouchers: data
    })
  })
}

// Get course by id
const getVoucherById = (req, res) => {
  // B1: Thu thập dữ liệu từ req
  let Voucherid = req.params.voucherid;

  // B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(Voucherid)) {
    return res.status(400).json({
      message: "Course ID is invalid!"
    })
  }

  // B3: Gọi model thực hiện các thao tác nghiệp vụ
  Voucher.findById(Voucherid, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(201).json({
      message: "Get Voucher successfully",
      course: data
    })
  })
}

const getVoucherByVoucherCode = (req, res) => {
  // B1: Thu thập dữ liệu từ req
  let voucherCode = req.params.voucherCode;

  // B2: Validate dữ liệu
  if (!voucherCode) {
    return res.status(400).json({
      message: "voucherCode is not exist!"
    })
  }

  // B3: Gọi model thực hiện các thao tác nghiệp vụ
  Voucher.find({ maVoucher: voucherCode }, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(201).json({
      message: "Get Voucher successfully",
      data: data
    })
  })
}

// Update course by id
const updateVoucher = (req, res) => {
  // B1: Thu thập dữ liệu từ req
  let Voucherid = req.params.voucherid;
  let body = req.body;

  // B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(Voucherid)) {
    return res.status(400).json({
      message: "Voucher ID is invalid!"
    })
  }

  // Bóc tách trường hợp undefied
  if (!body.maVoucher) {
    return res.status(400).json({
      message: "Ma nuoc uong is required!"
    })
  }

  if (!body.phanTramGiamGia) {
    return res.status(400).json({
      message: "No Voucher is invalid!"
    })
  }

  // B3: Gọi model thực hiện các thao tác nghiệp vụ
  let voucherUpdate = {
    maVoucher: body.maVoucher,
    phanTramGiamGia: body.phanTramGiamGia,
    ghiChu: body.ghiChu,
    ngayTao: body.ngayTao,
    ngayCapNhat: body.ngayCapNhat,
  };

  Voucher.findByIdAndUpdate(Voucherid, voucherUpdate, (error, data) => {
    if (error) {
      return res.status(500).json({
        message: error.message
      })
    }

    return res.status(200).json({
      message: "Update course successfully",
      updatedVoucher: data
    })
  })
}

// Delete course by id
const deleteVoucher = (req, res) => {
  // B1: Thu thập dữ liệu từ req
  let Voucherid = req.params.Voucherid;

  // B2: Validate dữ liệu
  if (!mongoose.Types.ObjectId.isValid(Voucherid)) {
    return res.status(400).json({
      message: "Course ID is invalid!"
    })
  }

  // B3: Gọi model thực hiện các thao tác nghiệp vụ
  Voucher.findByIdAndDelete(Voucherid, (error, data) => {
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

// Export Course controller thành 1 module
module.exports = {
  createVoucher,
  getAllVouchers,
  getVoucherById,
  updateVoucher,
  deleteVoucher,
  getVoucherByVoucherCode
}
