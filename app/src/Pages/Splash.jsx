import React from 'react';
import './Splash.css';
import { Typography, Icon } from 'antd';

const Splash = (
  <div className="splash-container">
    <Typography>
      <Typography.Title style={{ fontSize: '6rem' }}>
        <span role="img" aria-label="Hand Emoji">🖐</span>
      </Typography.Title>
    </Typography>
    <Icon type="loading" />
  </div>
);

export default Splash;
