const path = require('path');

module.exports = (getRequest, getResponse) => {
    getResponse.sendFile(path.join(__dirname + `/../pages/ROOT_GET.html`));
}