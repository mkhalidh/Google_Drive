import Data from "./Data"
import Header from "./Header"
// import Side from "./Side"
import Sidebar from "./Sidebar"

// import { auth, provider } from "./firebase"



function App() {
//  const [user, setUser]=useState(null);

//  const signIn = () =>{

//     auth.signInWithPopup(provider).then(({user})=>{
//       setUser(user)
//     }).catch(error=>{
//       alert(error.message)
//     })
//  }
  return (
    <>
    {/* <a href="./About.jsx">About</a> */}
    {/* {
      user ? ( */}
        {/* <> */}
        <Header />
        {/* photoUrl={user.photoUrl} */}
        <div className="App">
          {/* <Side/> */}
        <Sidebar/>
        <Data/>
        </div>
        {/* </> */}
      {/* ):(
        <div className="loginWrap">
          <img src={logo} alt="" />
          <button onClick={signIn}>Login to Google Drive Clone</button>
        </div>
      )
    } */}
   
    </>
    
  )
}

export default App
