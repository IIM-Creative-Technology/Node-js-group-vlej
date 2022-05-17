const { model, Schema } = require('mongoose')

const UsersSchema = new Schema(
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
    },
  );
const UserModel = model("UsersSchema", UsersSchema);
module.exports = UserModel;
