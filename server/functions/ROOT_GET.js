module.exports = (getRequest, getResponse) => {
    getResponse.status(200).json({alive: true});
}