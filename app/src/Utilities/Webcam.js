export default class Webcam {
  constructor(id, constraints) {
    this.elemId = id;
    this.constraints = constraints || {
      audio: false,
      video: {
        mandatory: {
          maxHeight: 480,
          maxWidth: 800,
          minHeight: 480,
          minWidth: 800,
        },
      },
    };
  }

    start = () => {
      const elem = document.getElementById(this.elemId);
      navigator.webkitGetUserMedia(
        this.constraints,
        (stream) => {
          elem.src = window.URL.createObjectURL(stream);
        },
        // eslint-disable-next-line no-console
        (error) => console.error(error),
      );
    }

    stop = () => {
      const elem = document.getElementById(this.elemId);
      elem.src = null;
    }
}
