const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Drink = new Schema({
	// _id: {type: ObjectId, unique:true},
	maNuocUong: { type: String, unique: true, required: true },
	tenNuocUong: { type: String, required: true },
	donGia: { type: Number, required: true },
	ngayTao: { type: Date, default: Date.now() },
	ngayCapNhat: { type: Date, default: Date.now() },
}, {
	timestamps: true
});

module.exports = mongoose.model('Drink', Drink);
