import { useState } from 'react'
import './css/sidebar.css'
import AllInboxIcon from '@mui/icons-material/AllInbox';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from '@mui/base';
import { db, storage } from './firebase';

import firebase from 'firebase';

function formatBytes(bytes) {
  if (!bytes) return "0 B"
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

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

    const storagePath = `files/${user.uid}/${file.name}`;

    storage.ref(storagePath).put(file).then(snapshot => {
      storage.ref(storagePath).getDownloadURL().then(url => {
        const fileType = file.type ? file.type.split('/')[0] : 'unknown';

        db.collection("myfiles").add({
          uid: user.uid,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          filename: file.name,
          fileUrl: url,
          size: snapshot._delegate.bytesTransferred,
          fileType: fileType
        }).then(() => {
          setUploading(false)
          setFile(null)
          setOpen(false)
        }).catch((error) => {
          console.error("Error adding file metadata to Firestore: ", error);
          setUploading(false);
          setUploadError("Saved the file but couldn't record it. Try again.");
        });
      }).catch((error) => {
        console.error("Error getting download URL: ", error);
        setUploading(false);
        setUploadError("Upload finished but the file link failed. Try again.");
      });
    }).catch((error) => {
      console.error("Error uploading file: ", error);
      setUploading(false);
      setUploadError("Couldn't reach your vault. Check your connection and try again.");
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
            <h3 className="font-display text-lg text-paper-100">Deposit a file</h3>
            <button onClick={handleClose} className="modal_pop__close" aria-label="Close">
              <CloseIcon fontSize="small" />
            </button>
          </div>

          <form onSubmit={handleUpload} className="modal_pop__body">
            {uploading ? (
              <div className="modal_pop__uploading">
                <div className="w-6 h-6 border-2 border-brass-500 border-t-transparent rounded-full animate-spin motion-reduce:animate-none" role="status" aria-label="Uploading" />
                <p className="font-sans text-sm text-ink-500">Depositing…</p>
              </div>
            ) : (
              <>
                <input type="file" onChange={handleChange} className="modal_pop__input" />
                {uploadError && (
                  <p role="alert" className="font-sans text-sm text-rust-500 mt-2">{uploadError}</p>
                )}
                <input
                  type="submit"
                  value="Deposit"
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
          <button onClick={handleOpen} className="sidebar__deposit">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z"></path>
            </svg>
            <span>Deposit a file</span>
          </button>
        </div>

        <div className="sidebar__options">
          <div className="sidebar__option sidebar__option-active">
            <AllInboxIcon fontSize="small" />
            <span>My Vault</span>
          </div>
        </div>

        <hr className="sidebar__rule" />

        <div className="sidebar__storage">
          <div className="sidebar__storage-label">
            <CloudQueueIcon fontSize="small" />
            <span>Storage</span>
          </div>
          <p className="font-mono text-xs text-ink-500 mt-2">
            {files.length} {files.length === 1 ? 'file' : 'files'} · {formatBytes(totalBytes)} deposited
          </p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
