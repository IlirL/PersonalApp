
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");


//db stuff
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)




const ipc_control = require('./IPC_functions.js')



function create_table_no_exist(){
    db.defaults({
        clients:[
            {
                id:'00000',
                emri:'emri',
                mbiemri:'mbiemri',
                data_prej:'2021.01.01',
                data_deri:'2021.01.01',
                valid:true,
            }
        ],
        client_info:[
            {
                id:'00000',
                payments:[''],
                total_den:'0',
                total_muaj:'0',
            }
        ]
    }).write();
}


let mainWindow;
function createWindow() {
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
    mainWindow = new BrowserWindow({ 
        width:width,
        height:height,
        minWidth:1200,
        minHeight:800,
        show:false,
        devTools:false,
        // frame: false ,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation:false,
            preload: __dirname + '/preload.js'
        }
    });
     

    mainWindow.loadURL(
        isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", ()=>{
    createWindow();
    mainWindow.once('ready-to-show', () => {
        mainWindow.removeMenu();
        mainWindow.show()
      })
    create_table_no_exist();
    // get_data();
    // updateDatabase();   
    ipc_control();
    }
);


app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
    app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
    createWindow();
    }
});
 




