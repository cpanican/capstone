export default class Webcam {
    constructor (id, constraints) {
        this.__elemId = id;
        this.__constraints = constraints || {
            audio: false,
            video: {
                mandatory: {
                    maxHeight: 480,
                    maxWidth: 800,
                    minHeight: 480,
                    minWidth: 800,
                }
            }
        };
    }
    start = () => {
        const elem = document.getElementById(this.__elemId);
        navigator.webkitGetUserMedia(
            this.__constraints,
            stream => elem.src = window.URL.createObjectURL(stream),
            error => console.error(error)
        );
    }
    stop = () => {
        const elem = document.getElementById(this.__elemId);
        elem.src = null;
    }
}