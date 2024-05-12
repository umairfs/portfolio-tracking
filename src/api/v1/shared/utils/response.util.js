const responseUtil = {};

responseUtil.json = (data, req, res) => {
    res.status(200).send(data);
};


module.exports = {
    responseUtil,
};
