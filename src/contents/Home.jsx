import logo from '../logo.svg';
//import '../App.css';
import React from 'react';
import { Button, stepClasses } from '@mui/material';
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
import { WordContextProvider, useWordContext } from "../WordContext.tsx";
import { useState, useEffect }from 'react';

function Paper(props){
    const [open,setOpen] = React.useState(false);
    const navigate = useNavigate()
    const { word, setWord } = useWordContext();
    // const url = "https://wordbookapi.herokuapp.com/theses/delete";
    const url = "http://0.0.0.0:8000/theses/delete";

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const toWordDic=(e)=>{
        e.preventDefault()
        word.thesis_id = props.paper_id
        console.log(word.thesis_id)
        navigate('/Word_dic')
    }
    
    async function deleteThesis(thesis_id){
        const data = {
            "thesis_id": parseInt(thesis_id)
        }
        const response =await fetch(url, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        console.log(response)
    }

    const DecideDeleteTHesis = async (e) => {
        await deleteThesis(props.paper_id)
        setOpen(false);
    }


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
            onClick={toWordDic}>     
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
            <Button onClick={DecideDeleteTHesis} autoFocus>
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
    var array = React.useState([])
    array = user.thesis;
    // const url = "https://wordbookapi.herokuapp.com/users";
    const url = "http://0.0.0.0:8000/users";

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };


    async function getThesis(id) {
        try {
            let tmp_url = url + "/?user_id=" + id
            const tmp_thesis = new Array();
            const response = await fetch(tmp_url, {
                method: 'GET', 
            })
            return response.json().then(function (value) {
                for (let step = 0; step < value.length; step++) {
                    tmp_thesis.push(value[step])
                }       
                return tmp_thesis
            })
        } catch (error) {
            console.error(error);
        }
    }

    async function lst2thesis(lst) {
        // [5, 'tmp1.pdf', '2023-02-24T04:01:21']
        interface thesistype {
            name: string;
            date: string;
            id: number;
        }
        const tmp_thesis = new Array();
        for (let i = 0; i < lst.length; i++) {
            const tmp : thesistype = {
                "id" : lst[i][0],
                "name" : lst[i][1],
                "date" : lst[i][2]
            }
            tmp_thesis.push(tmp)
        } 
        return tmp_thesis
    }
    
    useEffect(() => {
        (async() => {
            const thesis_lst = await getThesis(10)
            await console.log(thesis_lst)
            user.thesis = await lst2thesis(thesis_lst)
            await console.log(user.thesis)
        })()
      }, []);


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
