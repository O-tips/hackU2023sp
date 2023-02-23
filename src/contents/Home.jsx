import logo from '../logo.svg';
//import '../App.css';
import React from 'react';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import '../Home.css'
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import { IconButton } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";
import { UserContextProvider, useUserContext } from "../UserContext.tsx";

function Paper(props){
    const [open,setOpen] = React.useState(false);
    const navigate = useNavigate()

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };
    return (
    <div>
        <div class="padding5"></div>
        <Button class="border"
             onClick = {() =>{
                navigate('/Read_pdf')
            }}
        >
        <p class="left">{props.date} {props.paper_id} {props.paper_name}</p>
        </Button>
        <IconButton    
        component={Link}        
        to="/Word_dic">
        <ArticleIcon 
        color="primary"
         />
        </IconButton>
        <IconButton>
        <DeleteIcon color="primary" onClick={handleClickOpen}/>
        </IconButton >
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
        {"削除しますか？"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
            削除した場合元には戻りません。
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>戻る</Button>
        <Button onClick={handleClose} autoFocus>
            削除
        </Button>
        </DialogActions>
        </Dialog>
    </div>        
    )
}

function Home() {
    const [open,setOpen] = React.useState(false);
    const { user, setUser } = useUserContext();
    var array = user.thesis;


    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    /*
    const uploadFile=()=> {
        let formData = new FormData(); 
        formData.append("file", fileupload.files[0]);
        network request using POST method of fetch
        fetch('FASTAPIのURLをはる', {
            method: "POST", 
            body: formData
        }); 
        alert('You have successfully upload the file!');
    }*/

    return (
        <><div className='Fileupload'>
            <p 
            class="padding5"
            >New File</p>
            <Button 
            variant="outlined"
            input hidden
            type="file"
            >
                ファイルを選択
            </Button>
            <Button variant="contained">開く</Button>
            {array.map((val) => 
                <Paper paper_id={val["id"]} date={val["date"]} paper_name={val["name"]}/>
            )}      
        </div>
        </>       
    );
}
export default Home;
