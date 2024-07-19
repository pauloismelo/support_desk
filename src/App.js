
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Body from './components/layout/Body';
import Footer from './components/layout/Footer';
import Header from './components/layout/header';
import { AuthProvider, useAuth } from './hooks/useAuth';

import Home from './components/Content/Home';
import Users from './components/Content/Users/Users';
import UserAdd from './components/Content/Users/UserAdd';
import UserEdit from './components/Content/Users/UserEdit';

import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './components/layout/Login';
import TicketAdd from './components/Content/Ticket/TicketAdd';
import Tickets from './components/Content/Ticket/Tickets';




function App() {
  
    
  
  return (

    <AuthProvider>
      <BrowserRouter>
            <Header/>
            <Body customClass="min_height">
              
                <Routes>
                    
                    <Route exact path='/' element={
                      <ProtectedRoute>
                          <Home  user={ProtectedRoute.user}/>
                      </ProtectedRoute>
                      }/>
                    <Route path='/users' element={
                      <ProtectedRoute>
                      <Users/>
                      </ProtectedRoute>}/>
                    
                    <Route path='/users/add' element={
                      <ProtectedRoute>
                      <UserAdd/>
                      </ProtectedRoute>
                      }/>
                    <Route path='/user/edit/:id' element={
                      <ProtectedRoute>
                      <UserEdit/>
                      </ProtectedRoute>
                      }/>
                    <Route path='/tickets' element={
                      <ProtectedRoute>
                      <Tickets/>
                      </ProtectedRoute>}/>
                    <Route path='/tickets/add' element={
                      <ProtectedRoute>
                      <TicketAdd/>
                      </ProtectedRoute>}/>

                    <Route path='login' element={
                      <Login/>
                      }/>
              
                </Routes>
              
            </Body>
            <Footer/>
      </BrowserRouter>
    </AuthProvider>
    
    
  );
}

export default App;
