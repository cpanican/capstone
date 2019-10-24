const path = require('path');

module.exports = (postRequest, postResponse) => {
    console.log(postRequest.query);
    postResponse.sendFile(path.join(__dirname + `/../pages/ROOT_POST.html`))
}