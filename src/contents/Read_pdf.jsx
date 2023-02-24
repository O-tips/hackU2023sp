import logo from '../logo.svg'
import '../App.css';
import '../Read_pdf.css'
import React from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { WordContextProvider, useWordContext } from "../WordContext.tsx";
import axios from 'axios';

import { UserContext, ThesisTypeContext} from './context';

// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'word', headerName: '単語', width: 160 },
//     { field: 'meaning', headerName: '意味', width: 200 },
//    //Iconbutton表示のためのrenderCellを定義
//     {
//         field: 'delete',
//         headerName: '削除',
//         width: 70,
//         renderCell: (params) => (
//           <IconButton>
//             <DeleteIcon onClick={handleClickOpen}/>
//           </IconButton>
//           <Dialog
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//           >
//           <DialogTitle id="alert-dialog-title">
//           {"削除しますか？"}
//           </DialogTitle>
//           <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//               削除した場合元には戻りません。
//           </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//           <Button onClick={handleClose}>戻る</Button>
//           <Button onClick={handleClose} autoFocus>
//               削除
//           </Button>
//           </DialogActions>
//           </Dialog>

//         ),
        
//       },
//   ];
  
  const rows = [
    { id: 1, word:'vocabulary',meaning:'語彙'},
    { id: 2, word:'assist',meaning:'補助する'},
    { id: 3, word:'extract',meaning:'抽出する'},
    { id: 4, word:'display',meaning:'展示する、表示する'},
    { id: 5, word:'elementary',meaning:'初等の'},
    { id: 6, word:'relatively',meaning:'比較的'},
    { id: 7, word:'additionally',meaning:'さらに'},
    { id: 8, word:'format',meaning:'書式、形式'},
    { id: 9, word:'press',meaning:'押す'},
    { id: 10, word:'remove',meaning:'取り除く'},
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
  
function Read_pdf(){
    const [open,setOpen] = React.useState(false);
    const { word, setWord } = useWordContext();
    const [latestThesis, setLatestThesis] = React.useContext(ThesisTypeContext);
    var array = word.words;  

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    async function viewThesis(id) {
        try {
            // let url = "https://wordbookapi.herokuapp.com/theses/view"
            let url = "http://0.0.0.0:8000/theses/view/pdf?"
            let tmp_url = url + "thesis_id=" + id
            const response = await fetch(tmp_url, {
                method: 'GET'
            })
            .then(response => response.blob()).then(blob => {
                let blobUrl = window.URL.createObjectURL(blob);               
                console.log(blobUrl)
                setLatestThesis(blobUrl)
                // anchor.click();
                
            }) 
            }catch (error) {
            console.error(error);
            }
    }

    React.useEffect(() => {
        (async() => {
            // GETの関数
            const url = await viewThesis(14);
            console.log(url)
        })()
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'word', headerName: '単語', width: 160 },
        { field: 'meaning', headerName: '意味', width: 200 },
       //Iconbutton表示のためのrenderCellを定義
        {
            field: 'delete',
            headerName: '削除',
            width: 70,
            renderCell: (params) => (
                //<>
              <IconButton>
                    <DeleteIcon color='primary'/>
                </IconButton>
            ),
            
          },
      ];

    
    return(
    <>
        <div className='flex'>
            {/* 例としてお茶大紹介を掲載 */}
             {/* <iframe src="https://www.ocha.ac.jp/plaza/info/d002661_d/fil/ochadai_guide_2023.pdf" className='image'></iframe > */}
             <iframe src={latestThesis} className='image'></iframe >
        <div className='table_button'>
            <div className='table'>
                <DataGrid
                    // rows={rows}
                    rows={array}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />

             </div>
             <Button 
        variant="contained" 
        className='addbutton'
        onClick={handleClickOpen}
        >
          単語を追加
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
            {"新しい単語を追加しますか？"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                英単語と意味を入力してください
            </DialogContentText>
            <TextField id="outlined-basic" label="英単語" variant="outlined" />
            <TextField id="outlined-basic" label="意味" variant="outlined" />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>戻る</Button>
            <Button 
            onClick={handleClose} 
            autoFocus
            variant="contained" 
            >
                追加
            </Button>
            </DialogActions>
            </Dialog>
         <Button variant="contained" className='addbutton'>PDFを追加</Button>
        </div>
        </div>
    </>


      );
}

export default Read_pdf;