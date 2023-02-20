import logo from '../logo.svg'
import '../App.css';
import '../Read_pdf.css'
import React from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'word', headerName: '単語', width: 160 },
    { field: 'meaning', headerName: '意味', width: 200 },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 90,
    // // },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];
  
  const rows = [
    { id: 1, word:'apple',meaning:'りんご'},
    { id: 2, word:'hypothesis',meaning:'仮説'},
    { id: 3, word:'teacher',meaning:'先生'},
    { id: 4, word:'math',meaning:'数学'},
    { id: 5, word:'cat',meaning:'猫'},
    { id: 6, word:'dog',meaning:'犬'},
    { id: 7, word:'bird',meaning:'鳥'},
    { id: 8, word:'fish',meaning:'魚'},
    { id: 9, word:'rabbit',meaning:'うさぎ'},
    { id: 10, word:'elephant',meaning:'象'},
    { id: 11, word:'tiger',meaning:'虎'},
    { id: 12, word:'horse',meaning:'馬'},
    { id: 13, word:'cow',meaning:'牛'},
    { id: 14, word:'snake',meaning:'蛇'},
    { id: 15, word:'mouse',meaning:'ネズミ'},
    { id: 16, word:'whale',meaning:'クジラ'},
    { id: 17, word:'shark',meaning:'サメ'},
    { id: 18, word:'batterfly',meaning:'チョウ'},
    { id: 19, word:'monkey',meaning:'猿'},
    { id: 20, word:'deer',meaning:'鹿'},

  ];
  
function Read_pdf() {
    return (
        <>
        <div className='flex'>
       {/* 例としてお茶大紹介を掲載 */}
       <iframe src="https://www.ocha.ac.jp/plaza/info/d002661_d/fil/ochadai_guide_2023.pdf" className='image'></iframe >

       <div className='table'>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
    </div>
</>

      );
}

export default Read_pdf;