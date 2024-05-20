require("dotenv").config();

const codLoginUrl =
    "https://wzm-ios-loginservice.prod.demonware.net/v1/login/uno/?titleID=7100&client=atvimobile-cod-wzm-ios";

const codLogin = {
    platform: "ios",
    hardwareType: "ios",

    auth: {
        email: `${process.env.COD_EMAIL}`,
        password: `${process.env.COD_PASSWORD}`,
    },

    version: 1492,
};

module.exports = { codLoginUrl, codLogin };
