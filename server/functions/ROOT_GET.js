module.exports = (getRequest, getResponse) => {
    getResponse.status(200).send("Server is alive");
}