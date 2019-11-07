import React, { useRef } from 'react';
import {
  Carousel, Typography, Button, Icon,
} from 'antd';
import './GettingStarted.css';
import { Webcam } from '../Utilities';
import { DownloadView } from '../Components';

const ipc = window.require('electron').ipcRenderer;

const GettingStarted = () => {
  const gettingStartedWebcam = new Webcam('webcam-video');
  const carouselRef = useRef(null);

  const nextSlide = () => carouselRef.current.next();
  const prevSlide = () => carouselRef.current.prev();
  const createSettings = () => ipc.send('create-settings', {});

  return (
    <Carousel className="getting-started-carousel" ref={carouselRef}>
      <div className="carousel-section" id="one">
        <Typography>
          <Typography.Title>
                        Welcome!
          </Typography.Title>
          <Typography.Title className="title-emoji">
            <span role="img" aria-label="HandEmoji">🤚</span>
          </Typography.Title>
          <Typography.Title level={4}>
                We&apos;re glad to have you try out Hand Signals With Visual Data.
                Just a few steps and then you&apos;ll be ready to replace your trackpad
                with a camera.
          </Typography.Title>
        </Typography>
        <Button
          onClick={nextSlide}
          type="primary"
        >
            Get Started
          <Icon type="right" />
        </Button>
      </div>
      <div className="carousel-section" id="two">
        <Typography>
          <Typography.Title>
                Camera Check
          </Typography.Title>
          <Typography.Title level={4}>
            Let&apos;s take a quick moment to make sure your webcam works.\
            <br />
            You might be asked to grant access to your camera.\
            <br />
            Click on the button below to start the camera.
          </Typography.Title>
        </Typography>
        <video muted autoPlay height="480" width="800" id="webcam-video">
          <track />
        </video>
        <Button.Group>
          <Button
            onClick={prevSlide}
          >
            <Icon type="left" />
                Back
          </Button>
          <Button
            onClick={gettingStartedWebcam.start}
            type="primary"
          >
                Start Webcam
          </Button>
          <Button
            onClick={gettingStartedWebcam.stop}
            type="danger"
          >
                Stop Webcam
          </Button>
          <Button
            onClick={nextSlide}
          >
                Next
            <Icon type="right" />
          </Button>
        </Button.Group>
      </div>
      <div className="carousel-section" id="three">
        <Typography>
          <Typography.Title>
                Downloads
          </Typography.Title>
          <Typography.Title level={4}>
                        We have to download the deep learning model from our server,
                        along with a tool to allow simulating key press and mouse movements.
          </Typography.Title>
        </Typography>
        <DownloadView downloadComplete={nextSlide} className="download-view" />
        <Button.Group>
          <Button
            onClick={prevSlide}
          >
            <Icon type="left" />
                Back
          </Button>
          <Button
            onClick={nextSlide}
          >
                Next
            <Icon type="right" />
          </Button>
        </Button.Group>
      </div>
      <div className="carousel-section" id="three">
        <Typography>
          <Typography.Title>
                        All Done
          </Typography.Title>
          <Typography.Title level={4}>
            You&apos;re ready to customize and use our software.
            <br />
            Click on finish, and start using your webcam instead of your trackpad
          </Typography.Title>
        </Typography>
        <Button.Group>
          <Button
            onClick={prevSlide}
          >
            <Icon type="left" />
                Back
          </Button>
          <Button
            type="primary"
            onClick={createSettings}
          >
                Done
            <Icon type="check" />
          </Button>
        </Button.Group>
      </div>
    </Carousel>
  );
};

export default GettingStarted;
