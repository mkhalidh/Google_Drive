import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import MovieIcon from '@mui/icons-material/Movie';
import DownloadIcon from '@mui/icons-material/Download';
import ListIcon from '@mui/icons-material/List';

import './css/data.css'

function formatBytes(bytes, decimal = 1) {
    if (!bytes) return "0 B"
    const k = 1024
    const dm = decimal < 0 ? 0 : decimal
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

function formatDate(timestamp) {
    if (!timestamp?.seconds) return '—'
    return new Date(timestamp.seconds * 1000).toLocaleDateString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric'
    })
}

function FileIcon({ fileType }) {
    if (fileType === 'image') return <ImageIcon style={{ color: '#188038' }} />
    if (fileType === 'video') return <MovieIcon style={{ color: '#d93025' }} />
    return <InsertDriveFileIcon style={{ color: '#1a73e8' }} />
}

const Data = ({ files, loading, searchActive }) => {
    return (
        <main className="data">
            <div className="data__header">
                <p className="font-sans text-lg text-ink-900">
                    {searchActive ? 'Search results' : 'My Drive'}
                </p>
                <div className="data__header-right">
                    <span className="font-sans text-xs text-ink-500">
                        {files.length} {files.length === 1 ? 'item' : 'items'}
                    </span>
                    <ListIcon fontSize="small" className="text-ink-500" />
                </div>
            </div>

            {loading ? (
                <div className="data__empty">
                    <div className="w-6 h-6 border-2 border-drive-blue border-t-transparent rounded-full animate-spin motion-reduce:animate-none" role="status" aria-label="Loading files" />
                </div>
            ) : files.length === 0 ? (
                <div className="data__empty">
                    <p className="font-sans text-lg text-ink-700 mb-2">
                        {searchActive ? 'No files match your search' : 'No files in My Drive'}
                    </p>
                    <p className="font-sans text-sm text-ink-500">
                        {searchActive ? 'Try a different name.' : 'Click New to upload your first file.'}
                    </p>
                </div>
            ) : (
                <>
                    <div className="data__list-head">
                        <span></span>
                        <span>Name</span>
                        <span>Last modified</span>
                        <span>File size</span>
                        <span></span>
                    </div>
                    <ul className="data__list">
                        {files.map((file) => (
                            <li className="file-row" key={file.id}>
                                <span className="file-row__icon">
                                    <FileIcon fileType={file.data.fileType} />
                                </span>
                                <span className="file-row__name">{file.data.filename}</span>
                                <span className="file-row__meta">{formatDate(file.data.timestamp)}</span>
                                <span className="file-row__meta">{formatBytes(file.data.size)}</span>
                                <a
                                    href={file.data.fileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    download={file.data.filename}
                                    className="file-row__download"
                                    aria-label={`Download ${file.data.filename}`}
                                    title="Download"
                                >
                                    <DownloadIcon fontSize="small" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </main>
    )
}

export default Data
