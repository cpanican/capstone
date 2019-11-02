const fs = require('fs');
const path = require('path');

const STATUS_FILE = __dirname+'/../uploads/status.json';

module.exports = (getRequest, getResponse) => {
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
                    const updates = [];
                    Object.keys(status.files).forEach((key) => {
                        updates.push(parseInt(key));
                    });
                    updates.sort((a,b) => a-b);
                    getResponse.status(200).send({
                        versions : updates,
                        lastUpdate: status.lastUpdate
                    });
                }
            });
        } else {
            getResponse.status(404).send({
                message: 'Server status not found. Most likely no model available'
            });
        }
    })
}