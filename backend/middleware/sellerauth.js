const jwt = require("jsonwebtoken");
const Shop = require("../model/shop");




exports.isSeller = async (req, res, next) => {
    const { seller_token } = req.cookies || {};

    if (!seller_token) {
        return res.status(401).json({
            success: false,
            message: "Please login to continue",
        });
    }

    try {
        const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

        req.seller = await Shop.findById(decoded.id);

        if (!req.seller) {
            return res.status(401).json({
                success: false,
                message: "Seller not found, please login again",
            });
        }

        return next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token, please login again",
        });
    }
};