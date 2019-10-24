const path = require('path');

module.exports = (postRequest, postResponse) => {
    const gotSecret = postRequest.body.secret;
    console.log(gotSecret);
    postResponse.sendFile(path.join(__dirname + `/../pages/ROOT_POST.html`))
}