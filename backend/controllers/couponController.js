import mongoose from "mongoose";
import couponModel from "../models/couponModel.js";

export async function createCoupon(req, res) {
  try {
    const {
      code,
      discount,
      isPercentage,
      expiryDate,
      isActive,
      applicableProducts,
      minimumPurchaseAmount,
      usageLimit,
      usedCount,
    } = req.body;

    // Convert code to uppercase
    const upperCaseCode = code.toUpperCase();

    // Check if a coupon with the same code already exists
    const existingCoupon = await couponModel.findOne({ code: upperCaseCode });

    if (existingCoupon)
      return res
        .status(400)
        .json({ error: "A coupon with this code already exists" });

    const coupon = new couponModel({
      code: upperCaseCode,
      discount,
      isPercentage,
      expiryDate,
      isActive,
      applicableProducts,
      minimumPurchaseAmount,
      usageLimit,
      usedCount,
    });

    const createdCoupon = await coupon.save();

    res.status(201).json(createdCoupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function listCoupons(req, res) {
  const coupons = await couponModel.find({}).sort({ createdAt: -1 });
  res.json(coupons);
}

export async function reActivate(req, res) {
  try {
    let { couponID } = req.body;

    couponID = new mongoose.Types.ObjectId(couponID);

    const coupon = await couponModel.find({ _id: couponID });

    let whatToDo = coupon[0].isActive ? false : true;

    let updatedCoupon = await couponModel.findByIdAndUpdate(
      couponID,
      {
        $set: {
          isActive: whatToDo,
        },
      },
      { new: true }
    );

    res.json(updatedCoupon);
  } catch (err) {
    res.json({ error: err.message });
  }
}
