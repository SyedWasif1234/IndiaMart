import {Routes , Route , Navigate} from "react-router-dom"

import HomePage from "./pages/Home_Page"
import LoginPage from "./pages/Login_Page"
import SignUpPage from "./pages/SignUP_Page"
import {useAuthStore} from "./store/useAuthStore"

const App = () => {
  return (
    <div>
      <Routes>  

         <Route path= "/" element={  <HomePage/> } />
         <Route path= "/SignUp" element={  <SignUpPage/> } />
         <Route path= "/Login" element={  <LoginPage/> } />
        
      </Routes>
    </div>
  )
}

export default App
