import { useState } from 'react'
import './css/sidebar.css'
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from '@mui/base';
import { db } from './firebase';
import { DriveLogo } from './App';

import firebase from 'firebase';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

function formatBytes(bytes) {
  if (!bytes) return "0 B"
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

const navItems = [
  { icon: PeopleOutlineIcon, label: 'Shared with me' },
  { icon: QueryBuilderIcon, label: 'Recent' },
  { icon: StarOutlineIcon, label: 'Starred' },
  { icon: LaptopMacIcon, label: 'Computers' },
  { icon: DeleteOutlineIcon, label: 'Trash' },
]

const Sidebar = ({ user, files }) => {

  const [open, setOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [file, setFile] = useState(null)

  const handleClose = () => {
    setOpen(false);
    setUploadError(null);
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file || !user) return;
    setUploading(true);
    setUploadError(null);

    const fileType = file.type ? file.type.split('/')[0] : 'unknown';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) throw new Error(result.error.message);

        return db.collection("myfiles").add({
          uid: user.uid,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          filename: file.name,
          fileUrl: result.secure_url,
          size: result.bytes || file.size,
          fileType: fileType
        });
      })
      .then(() => {
        setUploading(false);
        setFile(null);
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
        setUploading(false);
        setUploadError("Couldn't upload the file. Check your connection and try again.");
      });
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const totalBytes = files.reduce((sum, f) => sum + (f.data.size || 0), 0)

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className="modal_pop">
          <div className="modal_pop__header">
            <h3 className="font-sans font-medium text-lg text-ink-900">Upload a file</h3>
            <button onClick={handleClose} className="modal_pop__close" aria-label="Close">
              <CloseIcon fontSize="small" />
            </button>
          </div>

          <form onSubmit={handleUpload} className="modal_pop__body">
            {uploading ? (
              <div className="modal_pop__uploading">
                <div className="w-6 h-6 border-2 border-drive-blue border-t-transparent rounded-full animate-spin motion-reduce:animate-none" role="status" aria-label="Uploading" />
                <p className="font-sans text-sm text-ink-500">Uploading…</p>
              </div>
            ) : (
              <>
                <input type="file" onChange={handleChange} className="modal_pop__input" />
                {uploadError && (
                  <p role="alert" className="font-sans text-sm text-drive-red mt-2">{uploadError}</p>
                )}
                <input
                  type="submit"
                  value="Upload"
                  disabled={!file}
                  className="post__submit"
                />
              </>
            )}
          </form>
        </div>
      </Modal>

      <aside className="sidebar">
        <div className="sidebar_btn">
          <button onClick={handleOpen} className="sidebar__new">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z"></path>
            </svg>
            <span>New</span>
          </button>
        </div>

        <nav className="sidebar__options">
          <div className="sidebar__option sidebar__option-active">
            <DriveLogo size={18} />
            <span>My Drive</span>
          </div>
          {navItems.map(({ icon: Icon, label }) => (
            <div className="sidebar__option" key={label}>
              <Icon fontSize="small" />
              <span>{label}</span>
            </div>
          ))}
        </nav>

        <hr className="sidebar__rule" />

        <div className="sidebar__storage">
          <div className="sidebar__storage-label">
            <CloudQueueIcon fontSize="small" />
            <span>Storage</span>
          </div>
          <p className="font-sans text-xs text-ink-500 mt-2">
            {formatBytes(totalBytes)} used · {files.length} {files.length === 1 ? 'file' : 'files'}
          </p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
