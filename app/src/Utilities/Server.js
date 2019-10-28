const SERVER_STATUS = {
    DEAD : 'DEAD',
    ALIVE : 'ALIVE',
    CHECKING : 'CHECKING'
};

const ENDPOINTS = {
    ALIVE : {
        url : '',
        method : 'GET'
    },
    DOWNLOAD : {
        url : 'download',
        method : 'GET'
    },
    DOWNLOAD_LIST : {
        url : 'download/list',
        method : 'GET'
    },
    DOWNLOAD_DATE : {
        url : (d) => `download/${d}`,
        method : 'GET'
    }
};

const SERVER_HOST = {
    DEV : 'http://localhost:3030/',
    PUB : 'http://localhost:3030/'
};

export default class Server {
    constructor (listener) {
        this.__listener = listener || function (val) {};
        this.__status = SERVER_STATUS.CHECKING;
        this.__url = process.env.NODE_ENV === 'development' ?  SERVER_HOST.DEV : SERVER_HOST.PUB;
    }

    set __status (val) {
        this._status = val;
        this.__listener(val);
    }

    get __status () {
        return this._status;
    }

    listen = (listener) => {
        this.__listener = listener;
    }

    isAlive = () =>
        fetch(this.__url + ENDPOINTS.ALIVE.url, {
            method: ENDPOINTS.ALIVE.method
        }).then(res => res.json())
        .then(res => res.alive);

    connect = () => {
        this.isAlive()
        .then(alive => {
            this.__status = (alive === true) ? SERVER_STATUS.ALIVE : SERVER_STATUS.DEAD;
        })
    }

    getVersions = () => 
        fetch(this.__url + ENDPOINTS.DOWNLOAD_LIST.url, {
            method: ENDPOINTS.DOWNLOAD_LIST.method
        }).then(res => res.status === 200 ? res.json() : null)
        .then(res => res);
}