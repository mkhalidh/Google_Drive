import { useEffect, useState } from "react"
import Data from "./Data"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { auth, provider, db } from "./firebase"

export function DriveLogo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <polygon points="20,3 3,33 20,23" fill="#1a73e8" />
      <polygon points="3,33 37,33 20,23" fill="#188038" />
      <polygon points="37,33 20,3 20,23" fill="#f9ab00" />
    </svg>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [signInError, setSignInError] = useState(null)
  const [files, setFiles] = useState([])
  const [filesLoading, setFilesLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    return auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
      setAuthReady(true)
    })
  }, [])

  useEffect(() => {
    if (!user) {
      setFiles([])
      return
    }
    setFilesLoading(true)
    return db.collection("myfiles")
      .where("uid", "==", user.uid)
      .onSnapshot((snapshot) => {
        setFiles(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
        setFilesLoading(false)
      })
  }, [user])

  const signIn = () => {
    setSignInError(null)
    auth.signInWithPopup(provider).catch((error) => {
      setSignInError(error.message)
    })
  }

  const signOutOfDrive = () => {
    auth.signOut()
  }

  if (!authReady) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div
          className="w-8 h-8 border-2 border-drive-blue border-t-transparent rounded-full animate-spin motion-reduce:animate-none"
          role="status"
          aria-label="Loading"
        />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
        <DriveLogo size={64} />
        <h1 className="font-sans font-normal text-4xl text-ink-900 mt-6 mb-3">Drive</h1>
        <p className="font-sans text-ink-500 max-w-sm leading-relaxed">
          A private drive. Sign in and everything you upload is yours alone —
          no one else can see it.
        </p>
        <button
          onClick={signIn}
          className="mt-8 font-sans font-medium bg-drive-blue hover:bg-drive-blueHover active:scale-[0.98] text-white px-6 py-3 rounded transition-all shadow-drive focus:outline-none focus-visible:ring-2 focus-visible:ring-drive-blue focus-visible:ring-offset-2"
        >
          Sign in with Google
        </button>
        {signInError && (
          <p role="alert" className="mt-4 text-drive-red text-sm font-sans max-w-sm">
            Couldn&apos;t sign in: {signInError}
          </p>
        )}
      </div>
    )
  }

  const filteredFiles = search.trim()
    ? files.filter((f) => f.data.filename?.toLowerCase().includes(search.trim().toLowerCase()))
    : files

  return (
    <div className="min-h-screen bg-white">
      <Header user={user} onSignOut={signOutOfDrive} search={search} onSearchChange={setSearch} />
      <div className="App">
        <Sidebar user={user} files={files} />
        <Data files={filteredFiles} loading={filesLoading} searchActive={!!search.trim()} />
      </div>
    </div>
  )
}

export default App
