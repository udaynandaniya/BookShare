
import mongoose from "mongoose"

const bookSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
    },
    sellerEmail: {
      type: String,
      required: true,
    },
    sellerContact: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    standard: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
      enum: ["excellent", "good", "fair", "poor"],
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
      trim: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    location: {
      type: String,
      required: true,
    },
    
    views: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Book = mongoose.models.Book || mongoose.model("Book", bookSchema)
