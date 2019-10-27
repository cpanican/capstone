## SERVER DOCUMENTATION
----
*__Authored by:__*  
_Ayushya Amitabh_  

----

#### ENDPOINTS

The server defaults to [port 3000](http://localhost:3000).
| Method | URL                                                   | Purpose                                                 |
|--------|-------------------------------------------------------|---------------------------------------------------------|
| GET    | [/](http://localhost:3000/)                           | Checks if server is alive                               |
| GET    | [/upload](http://localhost:3000/upload)               | UI for uploading new model versions                     |
| PUT    | [/upload](http://localhost:3000/upload)               | Uploads file with unique name and updates server status |
| GET    | [/download/list](http://localhost:3000/download/list) | Gets list of available versions and lastest version     |
| GET    | [/download/:date](http://localhost:3000/download/123) | Downloads specific version, latest if date is invalid   |
| GET    | [/download](http://localhost:3000/download/)          | Downloads latest version                                |

 #### SERVER STRUCTURE

.  
+-- index.js                                    - server root  
|   +-- uploads/                                - folder containing uploads  
|   |   +-- status.json                         - maintains model version info  
|   |   +-- {filename}-{datestring}.{extension} - format of saved models
