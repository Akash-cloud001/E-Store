import React, { useContext, useEffect, useState } from 'react'
import NavBar from './NavBar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

import { nameSplit } from '../helperFunction';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Avatar from '@mui/material/Avatar';


import '../styles/UserProfile.css';
import { InputControl } from './InputControl';
import { UserAuthContext } from '../contexts/Contexts';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';




const UserProfile = () => {
  const { userAvatar, userSignOut, userDbData, updateUserProfile } = useContext(UserAuthContext);
  const [value, setValue] = useState('1');
  const [open, setOpen] = useState(false);
  
  const [notEditable, setNotEditable] = useState(true);
  const [inputErr, setInputErr] = useState(false);
  const [editUserData, setEditUserData] = useState({
    name: userDbData?.name,
    email: userDbData?.email,
    number: userDbData?.number === ''? '': userDbData.number,
    address: userDbData?.address === ''? '': userDbData.address
    // name: 'David',
    // email: 'david@test.com',
  });

// handle User data to auth provider 
  const handleSaveUserDbData = (e)=>{
    e.preventDefault();
    // need to send address & number
    updateUserProfile(editUserData.address, editUserData.number)
    setOpen(false);
    setNotEditable(true);
  }

// For tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

// For Dialog
  const handleOpen = ()=>{
    
    if(editUserData.number.length < 10 || editUserData.address === '' ){
      setInputErr(true)
      setTimeout(()=>{
          setEditUserData((prev)=>({...prev, number:''}))
          setInputErr(false);
      }, 1500);
      return;
    }
    
    for(let i=0 ; i<editUserData.number.length; i++){
      if(editUserData.number[i] >= '0' && editUserData.number[i] <= '9'){
        continue;
      }
      else{
        setInputErr(true)
        setTimeout(()=>{
          setEditUserData((prev)=>({...prev, number:''}))
          setInputErr(false);
      }, 1500);
      return;
      }
    }

    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };


  return (
      <>
        <NavBar />
        <main className='user-main'>
          
          <aside className='user-aside'>
            <p className='user-name'>
              Welcome {editUserData.name} 
            </p> 

            <Avatar {...nameSplit(userAvatar.userName, userAvatar.userColor)} className='user-avatar'/>

            <div className='user-profile-action'>
              {/* TODO create a button which will take user pic and upload it to the firebase */}
              <button>
                Add New Profile 
              </button>
            </div>

            <button className='signout-btn' onClick={()=>{userSignOut()}}>
              Sign Out
            </button>

          </aside>


          <section className='user-section'>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="User-data" centered>
                    <Tab label="Personal Information" value="1" className='user-tablist'/>
                    <Tab label="History" value="2" className='user-tablist'/>
                  </TabList>
                </Box>
                <TabPanel value="1" className='user-section-per-info'>
                  {!inputErr? null :
                  <p className='signin-error'>
                      Invalid or empty field values
                  </p>
                  }
                  <InputControl 
                    name = 'name'
                    id = 'userName'
                    type = 'text'
                    onChange = {event =>{
                      setEditUserData((prev)=>({...prev, name: event.target.value}))
                    }}
                    value = {editUserData.name}
                    disabled 
                  />
                  <InputControl 
                    name = 'email'
                    id = 'userEmail'
                    type = 'email'
                    onChange = {event =>{
                      setEditUserData((prev)=>({...prev, email: event.target.value}))
                    }}
                    value = {editUserData.email}
                    disabled 
                  />
                  <InputControl 
                    name = 'number'
                    id = 'userNumber'
                    type = 'tel'
                    placeholder = 'Enter Your Number'
                    onChange = {event =>{
                      setEditUserData((prev) => ({...prev, number: event.target.value}))
                    }}
                    value ={editUserData.number}
                    disabled = {notEditable}
                  />
                  <InputControl 
                    name = 'address'
                    id = 'userAddress'
                    type = 'text'
                    value = {editUserData.address}
                    placeholder = 'Let us know where you from'
                    onChange = {event =>{
                      setEditUserData((prev)=>({...prev, address: event.target.value}))
                    }}
                    disabled = {notEditable}
                  />

                  <div className='user-section-btn-cont'>
                    <Button 
                      variant='outlined' 
                      color='primary' 
                      size='small' 
                      className='user-section-btn' 
                      disabled = {!notEditable}
                      onClick={()=>{setNotEditable(false)}}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant='outlined' 
                      color='error' 
                      size='small' 
                      className='user-section-btn' 
                      disabled = {notEditable}
                      onClick={()=>{setNotEditable(true)}}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant='outlined' 
                      color='success' 
                      size='small' 
                      className='user-section-btn' 
                      disabled = {notEditable}
                      onClick={handleOpen}
                    >
                      Save
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"You sure to change these fields?"}
                        </DialogTitle>
                        <DialogActions>
                        <Button 
                            className='dialog-btn'
                            size='small' 
                            variant='outlined' 
                            color='error' 
                            onClick={handleClose}
                            >
                                <ClearIcon />
                            </Button>
                        <Button 
                            className='dialog-btn'
                            size='small' 
                            variant='outlined' 
                            color='success' 
                            onClick={handleSaveUserDbData} 
                            autoFocus>
                                <CheckIcon/>
                        </Button>
                        </DialogActions>
                    </Dialog>
                  </div>

                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
              </TabContext>
            </Box>
          </section>
        </main>
        <Footer />
      </>
    )
}

export default UserProfile;