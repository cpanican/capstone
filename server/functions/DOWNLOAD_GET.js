const fs = require('fs');
const path = require('path');

const STATUS_FILE = __dirname+'/../uploads/status.json';

module.exports = (getRequest, getResponse) => {
    const { date } = getRequest.params;
    fs.exists(STATUS_FILE, (exists) => {
        if (exists) {
            fs.readFile(STATUS_FILE, (er, data) => {
                if (er) {
                    getResponse.status(400).send({
                        message: 'Unable to read server status',
                        error: er
                    });
                } else {
                    const status = JSON.parse(data.toString());
                    let lastUpdate = status.lastUpdate;

                    if (date && status.files[date]) lastUpdate = date + '';

                    const fileName = status.files[lastUpdate];
                    const fileOriginalName = fileName.split('-')[0];
                    const fileExtenstion  = '.'+fileName.split('-')[1].split('.')[1];
                    const downloadFileName = fileOriginalName + fileExtenstion;

                    let MODEL_FILE = __dirname + '/../uploads/' + fileName;
                    MODEL_FILE = path.resolve(MODEL_FILE);
                    getResponse.download(MODEL_FILE, downloadFileName);
                }
            });
        } else {
            getResponse.status(404).send({
                message: 'Server status not found. Most likely no model available'
            })
        }
    })
}