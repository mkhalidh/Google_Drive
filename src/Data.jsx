import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import MovieIcon from '@mui/icons-material/Movie';
import DownloadIcon from '@mui/icons-material/Download';

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
    if (fileType === 'image') return <ImageIcon />
    if (fileType === 'video') return <MovieIcon />
    return <InsertDriveFileIcon />
}

const Data = ({ files, loading, searchActive }) => {
    return (
        <main className="data">
            <div className="data__header">
                <p className="font-display text-2xl text-paper-100">
                    {searchActive ? 'Search results' : 'Your vault'}
                </p>
                <p className="font-mono text-xs text-ink-500">
                    {files.length} {files.length === 1 ? 'item' : 'items'}
                </p>
            </div>

            {loading ? (
                <div className="data__empty">
                    <div className="w-6 h-6 border-2 border-brass-500 border-t-transparent rounded-full animate-spin motion-reduce:animate-none" role="status" aria-label="Loading files" />
                </div>
            ) : files.length === 0 ? (
                <div className="data__empty">
                    <p className="font-display text-xl text-paper-100 mb-2">
                        {searchActive ? 'No files match your search' : 'Your vault is empty'}
                    </p>
                    <p className="font-sans text-sm text-ink-500">
                        {searchActive ? 'Try a different name.' : 'Deposit your first file to begin.'}
                    </p>
                </div>
            ) : (
                <ul className="data__ledger">
                    {files.map((file) => (
                        <li className="ledger-row" key={file.id}>
                            <span className="ledger-row__tag">
                                <FileIcon fileType={file.data.fileType} />
                            </span>
                            <span className="ledger-row__name">{file.data.filename}</span>
                            <span className="ledger-row__meta font-mono">{formatDate(file.data.timestamp)}</span>
                            <span className="ledger-row__meta font-mono">{formatBytes(file.data.size)}</span>
                            <a
                                href={file.data.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                download={file.data.filename}
                                className="ledger-row__download"
                                aria-label={`Download ${file.data.filename}`}
                                title="Download"
                            >
                                <DownloadIcon fontSize="small" />
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}

export default Data
