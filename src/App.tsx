import { BrowserRouter,Routes,Route, } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import UserDetailsPage from "./pages/UserDetailsPage";


function App() {
  return (
      <BrowserRouter  basename="/test-task-users-app">
        <Routes>
            <Route path="/" element={<UsersPage />} />
            <Route path="/users" element ={<UsersPage />} />
            <Route  path="/users/:id" element = {<UserDetailsPage />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
