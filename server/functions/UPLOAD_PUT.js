const fs = require('fs');

const STATUS_FILE = __dirname+'/../uploads/status.json';

module.exports = (getRequest, getResponse) => {
    const { filename } = getRequest.file;
    const dateString = filename.split('-')[1].split('.')[0];
    fs.exists(STATUS_FILE, (exists) => {
        if (exists) {
            fs.readFile(STATUS_FILE, (er, data) => {
                if (er) {
                    getResponse.status(400).send({
                        message: 'Unable to read server status',
                        error: er
                    });
                } else {
                    let status = JSON.parse(data.toString());
                    status.lastUpdate = dateString;
                    status.files[dateString] = filename;
                    status = JSON.stringify(status);
                    fs.writeFile(STATUS_FILE, status, () => {
                        getResponse.end();
                    });
                }
            })
        } else {
            const writeData = JSON.stringify({
                lastUpdate : dateString,
                files : {
                    [dateString] : filename
                }
            });
            fs.writeFile(STATUS_FILE, writeData, () => {
                getResponse.end();
            });
        }
    });
}