import MaterialTable from 'material-table';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import React from 'react'



function MyTable({data, columns, actions}) {
    console.log("data = = = ", data);
    console.log("columns = ", columns)
    return (
        <div style={{width:'100%'}}>
      
      <MaterialTable 
      data = {data}
      columns = {columns}
      options = {{
        actionsColumnIndex: -1,
          paging:data.length < 10 ? false : true,
          sorting:false,
          pageSize:10,
          pageSizeOptions: [10, 20, 50],
          headerStyle: {
            fontWeight:'bold',
            position:'sticky',
            top:0
          },
            maxBodyHeight:'61vh',
          rowStyle: rowData => ({
            backgroundColor: (rowData.tableData.id % 2 === 0) ? '#c4c4c4 ' : '#e3e3e3',
            color:(rowData.valid === true) ? 'green' : 'red'
          }),
          draggable:false,
          searchFieldAlignment:'left',
          search:true,
          // search:false,
          showTitle:false,
      }}
      
      icons = {{
        Search:SearchIcon,
        ResetSearch:ClearIcon
      }}
      actions = {actions}

      localization = {{
        pagination :{
          labelDisplayedRows: '{from}-{to} prej {count}',
          firstTooltip : 'Faqja E Pare',
          previousTooltip: 'Para',
          nextTooltip :'Pas',
          lastTooltip : 'Faqja E Fundit',
          labelRowsSelect: 'rreshta',
        },
        toolbar :{
          searchTooltip: 'Kerko',
          searchPlaceholder: 'Kerko'
        },
        header: {
          actions: ''
      },
      body: {
        emptyDataSourceMessage: 'Nuk Ka Klient Per Te Treguar',
    }
      }}

      />
    </div>
    )
}

export default MyTable
