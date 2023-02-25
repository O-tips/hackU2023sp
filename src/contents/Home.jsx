import logo from '../logo.svg';
//import '../App.css';
import React,{ useRef, useState, useEffect } from 'react';
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
import {useDropzone} from 'react-dropzone';
import { UserContext, ThesisTypeContext } from './context';
import { useAsyncCallback } from 'react-async-hook';

function Paper(props){
    const [open,setOpen] = React.useState(false);
    const navigate = useNavigate()
    const { word, setWord } = useWordContext();
    const url = "http://localhost:8000/theses/delete";
    // const url = "http://0.0.0.0:8000/theses/delete";


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

const initialState = {
    file: null,
  }

function Home() {
    const inputRef = useRef(null);

    const [formState, setFormState] = useState(initialState)
    const [success, setSuccess] = useState(false)

    const uploadFile = async(file) => {
        if (!file) return
    
        /* アップロード処理に見立てた時間のかかる処理 */
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
        await sleep(5000)
    
        /* アップロード処理が成功したらフォームの状態を
           初期化してsuccessステートをtrueにする */
        setFormState(initialState)
        setSuccess(true)
      }

      const onFileInputChange = async (event) => {
        const file = event.target.files[0]
        await uploadFile(file)
      }
    
      const clickFileUploadButton = () => {
        setSuccess(false)
        inputRef.current.click()
      }
    
      const asyncEvent = useAsyncCallback(onFileInputChange);

    const [open,setOpen] = React.useState(false);
    // const { user, setUser } = useUserContext();
    // var array = React.useState([])
    // array = user.thesis;
    const { word, setWord } = useWordContext();
    const navigate = useNavigate()
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    const [user2, setUser2] = React.useContext(UserContext)
    const [theses, setTheses]= React.useContext(ThesisTypeContext)

    const files = acceptedFiles.map(file => (
    <li>{file.path}</li>
    ));
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
                
                // setTheses(value)
                let tmpArray = []
                for(let i=0;i<value.length;i++){
                    let tmpDict={}
                    tmpDict["name"]=value[i]["name"]
                    tmpDict["id"]=value[i]["id"]
                    tmpDict["date"]=value[i]["date"]
                    tmpDict["url"]=""
                    tmpArray.push(tmpDict)
                }    
                setTheses(tmpArray)
                return tmpArray
                // return tmp_thesis
            })
        } catch (error) {
            console.error(error);
        }
    }

    // async function getThesisUrl(thesis_id){
    //     try{
    //         let tmp_url = "http://localhost:8000/theses/view/pdf?thesis_id=" + thesis_id
    //         const response = await fetch(tmp_url, {
    //             method: 'GET', 
    //         })
    //         return response.json().then(function (value) {
                
    //             // setTheses(value)     
    //             return value
    //             // return tmp_thesis
    //         })
    //     }catch (error) {
    //         console.error(error);
    //     }
    // }

    // async function lst2thesis(lst) {
    //     // [5, 'tmp1.pdf', '2023-02-24T04:01:21']
    //     interface thesistype {
    //         name: string;
    //         date: string;
    //         id: number;
    //     }
    //     const tmp_thesis = new Array();
    //     for (let i = 0; i < lst.length; i++) {
    //         const tmp : thesistype = {
    //             "id" : lst[i][0],
    //             "name" : lst[i][1],
    //             "date" : lst[i][2]
    //         }
    //         tmp_thesis.push(tmp)
    //     } 
    //     return tmp_thesis
    // }
    async function viewThesis(id) {
        try {
            // let url = "https://wordbookapi.herokuapp.com/theses/view"
            // let url = "http://0.0.0.0:8000/theses/view/pdf?"
            let url = "http://localhost:8000/theses/view/pdf?"
            let tmp_url = url + "thesis_id=" + id
            const response = await fetch(tmp_url, {
                method: 'GET'
            })
            .then(response => response.blob()).then(blob => {
                let blobUrl = window.URL.createObjectURL(blob);               
                console.log(blobUrl)

                let newTheses = []
                for(let i=0;i<theses.length;i++){
                    if(theses[i]["id"]!=id){
                        newTheses.push(theses[i])
                    }else{
                        let newThesis = {"name":theses[i]["name"],"id":theses[i]["id"],"date":theses[i]["date"],"url":blobUrl}
                    }
                }
                setTheses(newTheses)
                // anchor.click();
                return 
            }) 
            }catch (error) {
            console.error(error);
            }
    }
    
    useEffect(() => {
        (async() => {
            // user_idに紐づいたthesis_idのリストをとってくる
            let idAndNameAndDateArray = await getThesis(user2["user_id"])
            for (let i = 0;i < idAndNameAndDateArray.length;i++){
                let thesis_id = idAndNameAndDateArray[i]["id"]
                await viewThesis(thesis_id)
            }
            // const thesis_lst = await getThesis(user2["user_id"])
            // await console.log(thesis_lst)
            // user.thesis = await lst2thesis(thesis_lst)
            // await console.log(user.thesis)
        })()
      }, []);


    return (
        <><div className='Fileupload'>
            <p 
            class="padding5"
            >New File</p>

            {/* <Button 
            variant="outlined"
            input hidden
            type="file"
            >
                ファイルを選択
            </Button>
            <Button variant="contained">開く</Button> */}
                  <Button
        onClick={clickFileUploadButton}
        asyncEvent={asyncEvent}
        success={success}
        component="label"
        // text={asyncEvent.loading ? '...' : "Upload File"}
        variant="outlined"
        input hidden
        type="file"
      >
        ファイルを選択
        </Button>
      <input
        hidden
        ref={inputRef}
        type="file"
        onChange={asyncEvent.execute}
      />

            {theses.map((val) => 
                <Paper paper_id={val["id"]} date={val["date"]} paper_name={val["name"]}/>
            )}      
        </div>
        </>  
    );
}
export default Home;
