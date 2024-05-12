const errorUtil = {};

errorUtil.throw = (code) => {
    throw new Error(JSON.stringify(code));
}


module.exports = {
    errorUtil,
}