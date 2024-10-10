import mongoose  from'mongoose';
const transactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    paymentType: {
        type: String,
        required: true,
        enum:["cash","card"]
    },
    location:{
        type: String,
        default: "Unknown"
    }
},{timestamps:true});

const Transaction = mongoose.model('Transaction',transactionSchema);
export default Transaction;



