import React, { useEffect, useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListIcon from '@mui/icons-material/List';
import InfoIcon from '@mui/icons-material/Info';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import './css/data.css'
import { db } from './firebase';

const Data = () => {
    const[files, setFiles]=useState([]);
    useEffect(()=>{
        db.collection("myfiles").onSnapshot(snapshot=>{
            setFiles(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data()
            })))
        })
    },[])

    function formatBytes(bytes,decimal = 2){
        if(bytes===0)return "0 Bytes";
        const k =1024;
        const dm = decimal<0 ? 0 : decimal;
        const size = ['Bytes','KB', 'MB', 'GB', 'TB', 'PB', 'EB',   'ZB', 'YB'];

        const i  = Math.floor(Math.log(bytes)/Math.log(k));

        return parseFloat((bytes / Math.pow(k,i)).toFixed(dm))+ ' '+ size[i];
    }


    // const handleDownload = (fileUrl, filename) => {
    //     // Create a hidden anchor element
    //     const link = document.createElement('a');
    //     link.href = fileUrl;
    //     link.download = filename;
    
    //     // Append the anchor element to the document body
    //     document.body.appendChild(link);
    
    //     // Trigger a click event on the anchor element
    //     link.click();
    
    //     // Remove the anchor element from the document body
    //     document.body.removeChild(link);
    // };
    
  return (


    <div className='data '>
        <div className="data__header ">
            <div className="data__headerLeft">
                <p>My Drive</p>
                <ArrowDropDownIcon/>
            </div>

            <div className="header__Right">
                <ListIcon/>
                <InfoIcon/>
            </div>
        </div>

        <div className="data__contain">
            <div className="data__grid flex items-center justify-center">
                {
                    files.map((file)=>{
                        return(
                <div className="data__file items-center justify-center" key={file.id}>
                    
                    <div className="image-container">
                    {
    ( file.data.fileType != "image") ? (
        <InsertDriveFileIcon />
    ) : (
        <img src={file.data.fileUrl} alt={file.data.filename} className="centered-image" />
    )
}

                    <a href={file.data.fileUrl} target='_blank' download={file.data.filename} >
                        <button>Download here </button></a>

                </div>
                    {/* <InsertDriveFileIcon/> */}
                    <p>{file.data.filename}</p>
                </div>
                        )
                        
                    })
                }

               
            </div>
            <div className="data__list">
                <div className="detailsRow">
                    <p><b>Name</b><ArrowDownwardIcon/></p>
                    <p><b>Owner</b></p>
                    <p><b>Last Modified</b></p>
                    <p><b>File Size</b></p>
                </div>

                {
                    files.map((file)=>{
                        return(
                <div className="detailsRow">

                    <p>
                        <a href={file.data.fileUrl} target='_blank' download={file.data.filename} >
                            
                           { console.log(file.data.fileUrl)}
                           {/* <img src={file.data.fileUrl} alt={file.data.filename}/> */}
                        <InsertDriveFileIcon/>{file.data.filename}
                        </a>
                        </p>
                    <p>Me</p>
                    <p>{new Date(file.data.timestamp?.seconds*1000).toUTCString()}</p>
                    <p>{formatBytes(file.data.size)}</p>
                </div>
                     ) })
                }
                
            </div>
        </div>
        </div>
  )
}

export default Data