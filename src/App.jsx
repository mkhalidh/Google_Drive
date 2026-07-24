import { useEffect, useState } from "react"
import Data from "./Data"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { auth, provider, db } from "./firebase"

function VaultDial() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <circle cx="28" cy="28" r="26" stroke="#C9A15A" strokeWidth="1.5" />
      <circle cx="28" cy="28" r="4" fill="#C9A15A" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const x1 = 28 + Math.cos(angle) * 20
        const y1 = 28 + Math.sin(angle) * 20
        const x2 = 28 + Math.cos(angle) * 23
        const y2 = 28 + Math.sin(angle) * 23
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C9A15A" strokeWidth="1.5" />
        )
      })}
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

  const signOutOfVault = () => {
    auth.signOut()
  }

  if (!authReady) {
    return (
      <div className="min-h-screen bg-graphite-950 flex items-center justify-center">
        <div
          className="w-8 h-8 border-2 border-brass-500 border-t-transparent rounded-full animate-spin motion-reduce:animate-none"
          role="status"
          aria-label="Loading"
        />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-graphite-950 flex flex-col items-center justify-center px-6 text-center">
        <VaultDial />
        <h1 className="font-display text-5xl text-paper-100 mt-6 mb-3">Vault</h1>
        <p className="font-sans text-ink-500 max-w-sm leading-relaxed">
          A private drive. Sign in and everything you deposit is yours alone —
          no one else can see it.
        </p>
        <button
          onClick={signIn}
          className="mt-8 font-sans font-medium bg-brass-500 hover:bg-brass-400 active:scale-[0.98] text-graphite-950 px-6 py-3 rounded-sm tracking-wide transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-300 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-950"
        >
          Sign in with Google
        </button>
        {signInError && (
          <p role="alert" className="mt-4 text-rust-500 text-sm font-sans">
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
    <div className="min-h-screen bg-graphite-950">
      <Header user={user} onSignOut={signOutOfVault} search={search} onSearchChange={setSearch} />
      <div className="App">
        <Sidebar user={user} files={files} />
        <Data files={filteredFiles} loading={filesLoading} searchActive={!!search.trim()} />
      </div>
    </div>
  )
}

export default App
