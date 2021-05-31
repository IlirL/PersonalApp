
const low = require('lowdb')
let FileSync = require('lowdb/adapters/FileSync')
let adapter = new FileSync('db.json')
let db = low(adapter)
const format_dates = require('./DateFormat.js')

let data = [];
let data_notPaid = [];
let data_threeMonths = [];
let data_paid = [];
let data_upgrade_db = [];

let update_db = () =>{
    adapter = new FileSync('db.json')
    db = low(adapter)
}

let get_data = () => 
{
data = db.get('clients').value().map(singleClient => singleClient);
update_dateFormat();
}

let get_data_notPaid = ()=>{
    if(data)
    data_notPaid = data.filter(singleData => singleData.valid === false);
}

let get_data_threeMonths = () =>{
    if(data)
    data_threeMonths = data.filter(singleData => singleData.months >= 3 && singleData.valid === true);
}

let get_data_paid = () =>{
    if(data)
    data_paid = data.filter(singleData => singleData.valid === true);
}

let upgrade_our_datas = async() =>{

    update_db();
    get_data();
   await get_data_notPaid();
    await get_data_threeMonths();
    await get_data_paid();
}

function update_dateFormat()
{
    if(!data)
    return;
    const newData = data.map(singleData =>{
        return{
            ...singleData,
            data_prej:format_dates(singleData.data_prej),
            data_deri:format_dates(singleData.data_deri)
        }
    })

    data = [...newData];
}




let send_data_back = (event, type) => {
    if(type === '1')
    {
        //meaning we are sending the whole data
        event.sender.send("sending_whole_data", data)

    }
    else if (type ==='2')
    {
        // meaning we are sending threemonths
        event.sender.send("sending_threeMonths_data", data_threeMonths)
    }
    else if(type ==='3')
    {
        event.sender.send("sending_notPaid_data", data_notPaid);
    }
    else if(type ==='4')
    {
        event.sender.send("sending_paid_data", data_paid);
    }
}

let send_client_info = (event, id) => {
    let current_client = db.get('client_info').find({id:id}).value();
    console.log('current_client = ', current_client);
    event.sender.send('sending_info_for_client',  current_client);
}


let updateDatabase = () =>{
    const today_date = Date.now();
    data_upgrade_db = db.get('clients').value().map(singleClient => singleClient);
    if(data_upgrade_db){
    data_upgrade_db.forEach(data_in_db =>{
        if(today_date > Date.parse(data_in_db.data_deri))
        {          
           db.get('clients').find({id: data_in_db.id}).assign({valid:false}).write();   
        }
    })
}  
}

module.exports = {send_data_back, updateDatabase, upgrade_our_datas, send_client_info};