/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Alert, Icon, Button, notification,
} from 'antd';
import { Server } from '../Utilities';

import './DownloadView.css';

export default class DownloadView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      versions: null,
    };
    this.serverConnection = null;
  }

  componentDidMount() {
    this.serverConnection = new Server();
    this.serverConnection.connect();
    this.getVersions();
  }

    getVersions = () => {
      this.setState({
        loading: true,
      });
      this.serverConnection.getVersions().then((v) => {
        this.setState({
          versions: v.versions,
          loading: false,
        });
      });
    }

    checkTime = (i) => {
      if (i < 10) {
        return `0${i}`;
      }
      return i;
    }

    timeString = (v) => {
      const d = new Date();
      d.setTime(v);
      return `${d.toLocaleDateString()} @ ${this.checkTime(d.getHours())}:${this.checkTime(d.getMinutes())}`;
    }

    handleDownloadResponse = (r) => {
      const { downloadComplete } = this.props;
      if (r === true) {
        this.setState({ loading: false });
        notification.success({
          message: 'Downloaded model successfully',
          duration: 2,
        });
        downloadComplete();
      }
    }

    downloadModel = (d) => {
      this.setState({ loading: true });
      if (d) this.serverConnection.getDateModel(d).then(this.handleDownloadResponse);
      else this.serverConnection.getLatestModel().then(this.handleDownloadResponse);
    }

    render() {
      const { className } = this.props;
      const { loading, versions } = this.state;
      return (
        <div className={`${className} download-view-container`}>
          {
                    loading
                      ? <Icon type="loading" />
                      : null
                }
          {
                    loading === false
                      ? versions === null
                        ? (
                          <Alert
                            className="download-alert"
                            closeText="Retry"
                            onClose={this.getVersions}
                            message="Error"
                            description="No model found on server"
                            type="error"
                            showIcon
                          />
                        )
                        : (
                          <Alert
                            className="download-alert"
                            closeText="Refresh"
                            onClose={this.getVersions}
                            message="Success"
                            description="Got model versions"
                            type="success"
                            showIcon
                          />
                        )
                      : null
                }
          <div className="download-version-list">
            {
                        loading === false && versions !== null
                          ? (
                            <Button
                              className="download-version-button latest"
                              type="primary"
                              block
                              onClick={() => this.downloadModel(null)}
                            >
                            Get Latest Version
                            </Button>
                          )
                          : null
                    }
            {
                        loading === false
                          ? versions !== null
                            ? versions.map((v) => (
                              <Button
                                className="download-version-button"
                                block
                                key={`version-select-${v}`}
                                onClick={() => this.downloadModel(v)}
                              >
                                { this.timeString(v) }
                              </Button>
                            ))
                            : null
                          : null
                    }
          </div>
        </div>
      );
    }
}
