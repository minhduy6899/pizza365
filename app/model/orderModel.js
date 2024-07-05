const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
	// _id: {type: Schema.Types.ObjectId, unique:true},
	orderId: { type: String, unique: true },
	duongKinh: { type: String, required: true },
	idLoaiNuocUong: { type: String, required: true },
	idVourcher: { type: String, required: true },
	kichCo: { type: String, required: true },
	loaiPizza: { type: String, required: true },
	loiNhan: { type: String, required: true },
	salad: { type: String, required: true },
	soLuongNuoc: { type: String, required: true },
	suon: { type: Number, required: true },
	thanhTien: { type: Number, required: true },
	soDienThoai: { type: String, required: true },
	trangThai: { type: String, },


	voucher: { type: Schema.Types.ObjectId, ref: "Voucher" },
	drink: { type: Schema.Types.ObjectId, ref: "Drink" },

}, {
	timestamps: true
});

module.exports = mongoose.model('Order', Order);
