
import './App.css';
import {  Route, Routes } from 'react-router-dom';

import Login from './Pages/Login';
import Layout from './Components/Layout';
import Register from './Pages/Register';
import IndexPage from './Pages/IndexPage';
import CreatePost from './Pages/CreatePost';
import { UserContextProvider } from './UserContext';
import PostPage from './Pages/PostPage';
import EditPost from './Pages/EditPost';

// require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);


function App() {
  
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage/>}/>
          <Route path='/edit/:id' element={<EditPost/>}/>
        </Route>
      </Routes>      
    </UserContextProvider>
  );
}

export default App;
