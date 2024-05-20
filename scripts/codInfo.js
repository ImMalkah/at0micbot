const codInfoUrl =
    "https://wzm-ios-loginservice.prod.demonware.net/v1/login/resume/?titleID=7100&client=atvimobile-cod-wzm-ios";

const codInfo = {
    resumeType: "loginFPUnoAccount2FA",
    loginFPUnoAccount2FABody: {
        tfa: {
            oneTimePassword: "",
            loginToken: "",
        },
        version: 1467,
        platform: "ios",
        hardwareType: "ios",
    },
};

module.exports = { codInfoUrl, codInfo };
