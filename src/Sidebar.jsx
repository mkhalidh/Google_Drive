import {React, useState} from 'react'
import './css/sidebar.css'
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { Modal } from '@mui/base';
import { db, storage } from './firebase';

import firebase from 'firebase';

const Sidebar = () => {

  const [open, setOpen] = useState(close)
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState(null)
  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (e)=>{
    if(e.target.files[0]){
        setFile(e.target.files[0])
    }
  }

  const handleUpload = (e)=>{
    event.preventDefault();
    setUploading(true);

    storage.ref(`files/${file.name}`).put(file).then(snapshot => {
      storage.ref("files").child(file.name).getDownloadURL().then(url => {
          // Extract general file type
          const fileType = file.type ? file.type.split('/')[0] : 'unknown'; // Get the first part of the MIME type
  
          // Add metadata to Firestore
          db.collection("myfiles").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              filename: file.name,
              fileUrl: url,
              size: snapshot._delegate.bytesTransferred,
              fileType: fileType
          })
          setUploading(false)
        setFile(null)
        setOpen(false)
          .then(() => {
              console.log("File metadata added to Firestore successfully!");
          }).catch((error) => {
              console.error("Error adding file metadata to Firestore: ", error);
          });
      }).catch((error) => {
          console.error("Error getting download URL: ", error);
      });
  }).catch((error) => {
      console.error("Error uploading file: ", error);
  });
  
  

    // storage.ref(`files/${file.name}`).put(file).then(snapshot=>{
    //   storage.ref("files").child(file.name).getDownloadURL().then(url=>{
    //     db.collection("myfiles").add({
    //       timestamp:firebase.firestore.FieldValue.serverTimestamp(),
    //       filename:file.name,
    //       fileUrl:url,
    //       size:snapshot._delegate.bytesTransferred,
          
    //     })
    //     setUploading(false)
    //     setFile(null)
    //     setOpen(false)
    //   })
    // })
  }

  const handleOpen = () => {
    setOpen(true);
  }
  return (
    <>
    <Modal open={open} onClose={{handleClose}} className=''>
      <div className="modal_pop">
        <form action="">
          <div className="close" onClick={handleClose}>X</div>
          <div className="modalHeading">
            <h3><b>Select the file you want to upload</b></h3>
          </div>

          <div className="modalBody">
            {
              uploading ? (<p className='uploading'>Uploading</p>) : (
                <>
            <input type="file" onChange={handleChange} className='mt-1' />
            <input type="submit" className='post__submit' onClick={handleUpload} />
            </>
              )
            }
          </div>
        </form>
      </div>
    </Modal>
    <div className='sidebar'> 
      <div className="sidebar_btn">
      <button onClick={handleOpen} class="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
    <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24" focusable="false">
        <path d="M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z"></path>
    </svg>
    <span>New </span>
</button>

  
      </div>

      <div className="sidebar__options sidebar__options-active">
          <div className="sidebar__option sidebar__option-Active">
            <MobileScreenShareIcon/>
            <span className='text-[#1366d2] '><b>My Drive</b></span>
          </div>

          <div className="sidebar__option">
            <DevicesIcon/>
            <span>Computers</span>
          </div>

          <div className="sidebar__option">
            <PeopleOutlineIcon/>
            <span>Share with me</span>
          </div>

          <div className="sidebar__option">
            <QueryBuilderIcon/>
            <span>Recent</span>
          </div>

          <div className="sidebar__option">
            <MobileScreenShareIcon/>
            <span>My Drive</span>
          </div>

          <div className="sidebar__option">
            <StarOutlineIcon/>
            <span>Starred</span>
          </div>

          <div className="sidebar__option">
            <DeleteOutlineIcon/>
            <span>Trash</span>
          </div>

      </div>
      <hr className='w-[320px]'/>
      <div className="sidebar__options">
          <div className="sidebar__option">
            <CloudQueueIcon/>
            <span>Storage</span>
          </div>
          <div className="progress_bar">
            <progress size="tiny" value="50" max="100"/>
            <span>6.45 Gb of 15 Gb is used</span>
          </div>
          </div>
    </div>
    </>
  )
}

export default Sidebar