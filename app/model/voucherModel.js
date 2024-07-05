const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Voucher = new Schema({
	// _id: {type: ObjectId, unique:true},
	maVoucher: { type: String, unique: true, required: true },
	phanTramGiamGia: { type: Number, required: true },
	ghiChu: { type: String, required: false },
	ngayTao: { type: Date, default: Date.now() },
	ngayCapNhat: { type: Date, default: Date.now() },

}, {
	timestamps: true
});

module.exports = mongoose.model('Voucher', Voucher);
