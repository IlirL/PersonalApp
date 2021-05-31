const electron = require("electron");
const app = electron.app;
var os = require('os');
var fs = require('fs');
var {dialog} = require('electron');
const {basename} = require('path')
const path = require("path");
const { nanoid } = require("nanoid")
const idlength = 5
const low = require('lowdb')
let FileSync = require('lowdb/adapters/FileSync')
let adapter = new FileSync('db.json')
let db = low(adapter)
const {ipcMain, screen}  = require('electron');
const {send_data_back, updateDatabase, upgrade_our_datas, send_client_info} = require('./SendNewData.js')
const format_dates = require('./DateFormat.js');

let foto_path = '';


function calculate_months(data_prej, data_deri){
    // return Math.ceil((new Date(data_deri).getTime() - new Date(data_prej).getTime()) /  (24*60*60*1000 * 30))
    var days = Math.ceil((new Date(data_deri).getTime() - new Date(data_prej).getTime()) /  (24*60*60*1000));
    if(days >= 0 && days<=45)
        return 1;
    else if(days >45 && days<=75)
    {
        return 2;
    }
    else if(days>75 && days<105)
    {
        return 3;
    }
    else if(days > 170 && days<195)
    {
        return 6;
    }

    else if(days > 350 && days < 380)
    {
        return 12;
    }
    else
    {
        return Math.ceil(days / 30);
    }
}

function edit_person_history(data){
    let current_client = db.get('client_info').find({id:data.id}).value();
    current_client.payments.push(`${format_dates(data.data_prej)} -> ${format_dates(data.data_deri)}`);
    if(data.cmimi)
    {
        current_client.total_den = current_client.total_den + parseInt(data.cmimi)
    }
    db.get('client_info').find({id:data.id}).assign(
        {
            total_den:current_client.total_den, 
            payments:[...current_client.payments],
            total_months:(parseInt(current_client.total_months) + calculate_months(data.data_prej, data.data_deri)).toString(),
        }
        ).write();
}



let ipc_control = () => {
    updateDatabase();
    upgrade_our_datas();
     adapter = new FileSync('db.json')
     db = low(adapter)
    ipcMain.on('send_whole_data', (event) =>{            
        send_data_back(event, '1');
    })

    ipcMain.on('send_threeMonths_data', (event) =>{          
        send_data_back(event, '2');
    })

    ipcMain.on('send_notPaid_data', (event) =>{          
        send_data_back(event, '3');
    })

    ipcMain.on('send_paid_data', (event) =>{          
        send_data_back(event, '4');
    })
    ipcMain.on('send_info_for_client', (event, id) =>{
        console.log('send_info_for_client -> data = ', id)
        send_client_info(event, id);
    })
    ipcMain.on("open-file-dialog-for-file", function(event){
           var copied_foto_url = "";
        if(os.platform() === 'linux' || os.platform() === "win32")
        {
            dialog.showOpenDialog({
                filters:[
                    {name:"Images", extensions: ['jpg', 'png', 'jpeg']},
                ],
                properties:['openFile']
            }).then(result =>{
                if(result.canceled)
                {

                    event.sender.send('status-of-chosen-file', 'Nuk Zgjodhe Foto');
                }
                else{
                    var new_base_name = Date.now().toString();
                    new_base_name = new_base_name.concat(basename(result.filePaths[0]));
                    foto_path = result.filePaths[0];
                    copied_foto_url = path.join(app.getPath('userData'), 'client_photos', new_base_name);
                    fs.copyFile(foto_path, copied_foto_url, (err)=>{
                        if(err){
                            event.sender.send('status-of-chosen-file', 'Nuk Zgjodhe Foto');          
                        }
                        else{
                            event.sender.send('status-of-chosen-file', basename(result.filePaths[0]));
                            
                        }
                    })
                    

                }
                foto_path = copied_foto_url;
            }).catch(err => {
                console.log(err)
                event.sender.send('status-of-chosen-file', 'Nuk Zgjodhe Foto');
            })
        }

        })

        ipcMain.on("open-file-dialog-for-update-file", function(event, path_of_foto){
            var copied_foto_url = path_of_foto;
            console.log("copied_foto_url = ",copied_foto_url)
         if(os.platform() === 'linux' || os.platform() === "win32")
         {
             dialog.showOpenDialog({
                 filters:[
                     {name:"Images", extensions: ['jpg', 'png', 'jpeg']},
                 ],
                 properties:['openFile']
             }).then(result =>{
                 if(result.canceled)
                 {
                     event.sender.send('status-of-chosen-update-file', 'Nuk Zgjodhe Foto');
                    }
                 else{
                     var new_base_name = Date.now().toString();
                     new_base_name = new_base_name.concat(basename(result.filePaths[0]));
                     foto_path = result.filePaths[0];
                     copied_foto_url = path.join(app.getPath('userData'), 'client_photos', new_base_name);
                     fs.copyFile(foto_path, copied_foto_url, (err)=>{
                         if(err){
                             event.sender.send('status-of-chosen-file', 'Nuk Zgjodhe Foto'); 
                             
                         }
                         else{
                             event.sender.send('status-of-chosen-update-file', basename(result.filePaths[0]));    
                         }
                     })
                     
 
                 }
                 foto_path = copied_foto_url;
                 console.log("new foto path = " + foto_path);
             }).catch(err => {
                 console.log(err)                 
                 event.sender.send('status-of-chosen-file', 'Nuk Zgjodhe Foto');
             })
         }
         }
    )



    ipcMain.on('sent_new_user', (event, newClient)=>{
            //updating the clients array
            const current_id  = nanoid(idlength);
            const current_months = calculate_months(newClient.data_prej, newClient.data_deri);
            db.get('clients').chain().push(
                {
                    id:current_id, 
                    ...newClient,
                     months:(current_months)?current_months:0, 
                     foto_path:foto_path,
                     valid:true 
                }
                ).write();  
            foto_path = '';
            
            //updating the clients_info array
            db.get('client_info').chain().push(
                {
                    id:current_id,
                    payments:[`${format_dates(newClient.data_prej)} -> ${format_dates(newClient.data_deri)}`],
                    total_den:(newClient.cmimi) ? parseInt(newClient.cmimi) : 0,
                    total_months:(current_months) ? current_months : 0,
                }
                ).write();

                upgrade_our_datas();
                send_data_back(event, '1'); 
            }
)

    
    ipcMain.on('edit_person', (event, data)=>{
    
        edit_person_history(data);    
        if(foto_path ==='')
        {
            foto_path = db.get('clients').find({id:data.id}).value().foto_path;
        }
        if(foto_path.localeCompare(db.get('clients').find({id:data.id}).value().foto_path)===0){
            //meaning they are equal, so nothing changed
            console.log("We are in localeCompare");
            db.get('clients').remove({id:data.id}).write();
            db.get('clients').push({...data, foto_path:foto_path}).write(); 
        }

        else{
           let current_object = db.get('clients').find({id:data.id}).value(); 
           fs.unlink(current_object.foto_path, (err) => {
                if (err) {
                  console.error(err)
                  return
                }
            }) 
            db.get('clients').remove({id:data.id}).write();
            db.get('clients').push({...data, foto_path:foto_path, changed_foto:false}).write();   
        }
       foto_path = '';
        // send_data_back(event);
        upgrade_our_datas()
        send_data_back(event, '1');
    })
    
    ipcMain.on('Delete_user', (event, data) =>{
    //here we have to delete the user's history
    
        fs.unlink(`${data.foto_path}`, (err) => {
                    if (err) {
                      console.error(err)
                      return
                    }
                })  
        db.get('clients').remove({id:data.id}).write();
        upgrade_our_datas();
        send_data_back(event, '1'); 
        db.get('client_info').remove({id:data.id}).write();
          });

    ipcMain.on('open_register_dialog', (event) =>{
        event.sender.send('opening_register_dialog');
    })
  
    ipcMain.on('open_foto_dialog', (event, foto_path) => {
        event.sender.send('opening_foto_dialog', foto_path);

    })

    ipcMain.on('open_edit_dialog', (event, personChosen) => {
        event.sender.send('opening_edit_dialog', personChosen);
    })

    ipcMain.on('open_delete_dialog', (event, personChosen) =>{
        event.sender.send('opening_delete_dialog', personChosen)
    })

    ipcMain.on('open_client_history', (event, personChosen) =>{
        event.sender.send('opening_client_history', personChosen);
    })
 }


 module.exports = ipc_control;