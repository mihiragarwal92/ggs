import { Schema, model } from "mongoose";

const mySchema = new Schema({
   Email: {
      type: String,
   },
   Name: {
      type: String,
   },
   CreditScore: {
      type: Number,
   },
   CreditLines: {
      type: Number,
   },
   MaskedPhoneNumber: {
      type: String,
   },
});

const User = model("User", mySchema);

export default User;
