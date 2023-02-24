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
import {useDropzone} from 'react-dropzone';

function Paper(props){
    const [open,setOpen] = React.useState(false);
    const navigate = useNavigate()
    const { word, setWord } = useWordContext();
    // const url = "http://localhost:8000/theses/delete";
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
        const tmp_url = url + "/?thesis_id=" + parseInt(thesis_id)
        const response =await fetch(tmp_url, {
            method: 'DELETE', 
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
    const { word, setWord } = useWordContext();
    const navigate = useNavigate()
    // const url = "http://localhost:8000/users";
    const url = "http://localhost:8000";

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };


    async function upload(e) {
        var pdf_status = 0
        var dic_status = 0

        // pdf
        const pdf_tmp_url = url + "/theses/view/pdf?user_id=" + 10
        let data = new FormData()
        await data.append('thesis', e.target.files[0])
        console.log(e.target.files[0])        
        const pdf_response = await fetch(pdf_tmp_url, {
          method: 'POST',
          body: data
        }).then(response => {
            pdf_status = response["status"]
            return response.blob()
        }).then(blob => {
            let blobUrl = window.URL.createObjectURL(blob);               
            console.log(blobUrl)
            // このbolbUrlをRead_pdfに渡したい
        }) 


        // dic
        const dic_tmp_url = await url + "/theses/view/dict?user_id=" + 10
        const dic_response = await fetch(dic_tmp_url, {
          method: 'POST',
          body: data
        }).then(response => {
            dic_status = response["status"]
            console.log(response);
        })

        console.log(dic_status)
        console.log(pdf_status)

        if(dic_status == 200 && pdf_status == 200){
            await navigate('/Read_pdf')
        }

    }

    async function getThesis(id) {
        try {
            // let tmp_url = url + "/?user_id=" + id
            let tmp_url = url + "users/?user_id=" + id
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
        var l = await lst.length
        console.log(lst)
        for (let i = 0; i < l; i++) {
            const tmp : thesistype = await {
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
            console.log(thesis_lst)
            user.thesis = await lst2thesis(thesis_lst)
        })()
      }, []);


    return (
        <><div className='Fileupload'>
            <p 
            class="padding5"
            >New File</p>

            <input required type='file' onChange={e => upload(e)} />
           
            {array.map((val) => 
                <Paper paper_id={val["id"]} date={val["date"]} paper_name={val["name"]}/>
            )}      
        </div>
        </>  
    );
}
export default Home;
