const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Schema.Types.Decimal128,
      get: getValue,
    },
    stocks: Number,
    img_name: String,

    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    variant_set_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "VariantSet",
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    inventory_id: {
      type: Schema.Types.ObjectId,
      ref: "Inventory",
    },
  },
  { timestamps: true, id: true, toJSON: { getters: true } }
);

function getValue(value) {
  if (typeof value !== "undefined") {
    return parseFloat(value.toString());
  }
  return value;
}

ProductSchema.virtual("url").get(function () {
  return `/catalog/product/${this._id}`;
});

module.exports = mongoose.model("Product", ProductSchema);
