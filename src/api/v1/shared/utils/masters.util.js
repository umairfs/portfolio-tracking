const mastersUtil = {};

// check if object is empty
mastersUtil.isEmptyObject = (obj) => {
    return !Object.keys(obj).length;
}

module.exports = {
    mastersUtil,
};