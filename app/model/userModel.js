const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
	// _id: {type: ObjectId, unique:true},
	hoTen: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	diaChi: { type: String, required: true },
	soDienThoai: { type: String, required: true, unique: true },
	orders: [{
		type: mongoose.Types.ObjectId,
		ref: "Order"
	}],
}, {
	timestamps: true
});

module.exports = mongoose.model('User', User);
