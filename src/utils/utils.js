const crypto = require("crypto");

const generateReferralCode = (walletAddress) => {
    const hash = crypto.createHash("sha1").update(walletAddress).digest("hex");

    return hash.substring(0, 8);
};

module.exports = { generateReferralCode };
