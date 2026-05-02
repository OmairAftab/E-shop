const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    // options for cookies
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true   // ✅ fixed
    };

    res.status(statusCode)
        .cookie("token", token, options)  // ✅ cookie before json
        .json({
            success: true,
            token,
            user,
        })
}

module.exports = sendToken