import React, { useEffect, useState } from 'react'
import NavBar from './NavBar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

import { chooseRandomColor } from '../UserProfileColors';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Avatar from '@mui/material/Avatar';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CheckIcon from '@mui/icons-material/Check';

import '../styles/UserProfile.css';
import { InputControl } from './InputControl';
import { Button } from '@mui/material';

const UserProfile = () => {
  const [value, setValue] = useState('1');

  const [userAvatarColor, setUserAvatarColor] = useState('');
  const [editUserData, setEditUserData] = useState({
    name: 'Akash',
    email: 'test@test.com',
    phoneNumber: '8441816561',
    address: 'ward no 5, Maleta, Dehra Gopipur, Kangra, 177101, Hp, India',
  });

  const [isEditable,  setIsEditable] = useState(true);
  const [open, setOpen] = useState(false);
  
// For Edit Button
  const handleEdit= ()=>{
    setIsEditable(false);
  }
// For Cancel Button
  const handleCancel = ()=>{
    setIsEditable(true);
  }
// For calling method in AuthProvier
  const handleDataChange = ()=>{
    //call method from userAuthProvider and send the values to change in DB
  }

// Dialog open and close methods
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(()=>{
    setUserAvatarColor(chooseRandomColor());
  },[])

// For tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  function nameSplit(userName){
    const splitedName = userName.split(' ', 1);  // split( seperator, limitor ) 
    const firstLetter = splitedName[0].split('',1).at(0);
    return {
      sx:{
        bgcolor : userAvatarColor,
      },
      children : firstLetter,
    }
  }

  return (
      <>
        <NavBar />
        <main className='user-main'>
          
          <aside className='user-aside'>
            <p className='user-name'>
              Welcome Akash 
            </p> 

            <Avatar {...nameSplit('Akash')} className='user-avatar'/>

            <div className='user-profile-action'>
              {/* TODO create a button which will take user pic and upload it to the firebase */}
              <button>

              </button>
            </div>

            <Link className='signout-btn'>
              Sign Out
            </Link>

          </aside>


          <section className='user-section'>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="User-data" centered>
                    <Tab label="Personal Information" value="1" />
                    <Tab label="History" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1" className='user-section-per-info'>
                  <div>
                  <InputControl 
                    name = 'name'
                    id = 'userName'
                    type = 'text'
                    onChange = {event =>{
                      setEditUserData((prev)=>({...prev, name: event.target.value}))
                    }}
                    value = {editUserData.name}
                    disabled = {isEditable}
                  />
                  </div>
                  <InputControl
                    name = 'Email'
                    id = 'userEmail'
                    type = 'email'
                    onChange={event =>
                        setValue((prev) => ({...prev, email: event.target.value}))
                    }
                    value = {editUserData.email}
                    disabled = {isEditable}
                  />
                  <InputControl
                    name = 'Phone Number'
                    id = 'phoneNumber'
                    type = 'tel' 
                    pattern = '[0-9]{10}'
                    onChange = {event =>{
                      setEditUserData((prev)=>({...prev, phoneNumber: event.target.value}))
                    }}
                    value = {editUserData.phoneNumber}
                    disabled = {isEditable}
                  />
                  <InputControl
                    name = 'Address'
                    id = 'address'
                    type = 'text' 
                    placeholder = 'house no, city, district, pincode, State, Country'
                    onChange = {event =>{
                      setEditUserData((prev)=>({...prev, address: event.target.value}))
                    }}
                    value = {editUserData.address}
                    disabled = {isEditable}
                  />
                  <div className='user-section-btn-cont'>

                    <Button variant='outlined' className='user-section-btn' onClick={handleEdit} disabled={!isEditable}>
                      Edit
                    </Button>

                    <Button variant='outlined' color='error' className='user-section-btn' onClick={handleCancel} disabled={isEditable}>
                      Cancel
                    </Button>

                    <Button variant='outlined' color='success' className='user-section-btn' onClick={handleClickOpen} disabled={isEditable}>
                      Save
                    </Button>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                      {"Are you sure you wish to Change Data?"}
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
                          onClick={handleDataChange} 
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