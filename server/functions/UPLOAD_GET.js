module.exports = (getRequest, getResponse) => {
    getResponse.sendFile(__dirname + '/UPLOAD_GET.html');
}