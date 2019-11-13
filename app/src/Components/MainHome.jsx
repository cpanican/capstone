import React from 'react';
import {
  Typography, Button,
} from 'antd';
import './MainHome.css';

const MainHome = () => (
  <div className="main-home-container">
    <Typography>
      <Typography.Title style={{ fontSize: '6rem' }}>
        <span className="hand-emoji" role="img" aria-label="hand emoji">🖐</span>
      </Typography.Title>
    </Typography>
    <span className="button-bar">
      <Button shape="round" icon="right-circle" size="large">
            Start
      </Button>
      <Button shape="round" icon="video-camera" size="large">
            Test
      </Button>
      <Button shape="round" icon="setting" size="large">
            Settings
      </Button>
    </span>
  </div>
);

export default MainHome;
