import React, { Component } from 'react';
import { Server } from '../Utilities';
import { Alert, Icon, Button } from 'antd';
import './DownloadView.css';

export default class DownloadView extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading : true,
            versions: null
        };
        this.serverConnection = new Server();
    }

    componentDidMount () {
        this.serverConnection.connect();
        this.getVersions();
    }

    getVersions = () => {
        this.setState({
            loading: true
        });
        this.serverConnection.getVersions().then(v => {
            this.setState({
                versions: v.versions,
                loading: false
            });
        });
    }

    checkTime = (i) => {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    timeString = (v) => {
        let d = new Date();
        d.setTime(v);
        return d.toLocaleDateString() + ' @ ' + this.checkTime(d.getHours()) + ':' + this.checkTime(d.getMinutes());
    }

    downloadModel = (d) => {
        if (d) this.serverConnection.getDateModel(d).then(r => console.log(r));
        else this.serverConnection.getLatestModel();
    }

    render () {
        const { className } = this.props;
        const { loading, versions } = this.state;
        return (
            <div className={`${className} download-view-container`}>
                {
                    loading ?
                    <Icon type="loading" /> :
                    null
                }
                {
                    loading === false ?
                        versions === null ?
                        <Alert
                            className="download-alert"
                            closeText="Retry"
                            onClose={this.getVersions}
                            message="Error"
                            description="No model found on server"
                            type="error"
                            showIcon
                        /> :
                        <Alert
                            className="download-alert"
                            closeText="Refresh"
                            onClose={this.getVersions}
                            message="Success"
                            description="Got model versions"
                            type="success"
                            showIcon
                        /> :
                    null
                }
                <div className="download-version-list">
                    <Button
                        className="download-version-button latest"
                        type="primary"
                        block
                        onClick={() => this.downloadModel(null)}
                    >
                        Get Latest Version
                    </Button>
                    {
                        loading === false ?
                            versions !== null ?
                            versions.map((v, i) => 
                                <Button
                                    className="download-version-button"
                                    block
                                    key={`version-select-${i}`}
                                    onClick={() => this.downloadModel(v)}
                                >
                                    { this.timeString(v) }
                                </Button>
                            ):
                            null:
                        null
                    }
                </div>
            </div>
        );
    }
}