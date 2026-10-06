import mongoose, { Document, Schema } from "mongoose";

export interface ITunnel extends Document {
  userId: mongoose.Types.ObjectId;
  tunnelId: string;
  subdomain: string;
  targetPort: number;
  status: "offline" | "online";
}

const tunnelSchema = new Schema<ITunnel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tunnelId: {
      type: String,
      required: true,
      unique: true,
    },

    subdomain: {
      type: String,
      required: true,
      unique: true,
    },

    targetPort: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["offline", "online"],
      default: "offline",
    },
  },
  {
    timestamps: true,
  },
);

export const Tunnel = mongoose.model<ITunnel>("Tunnel", tunnelSchema);
