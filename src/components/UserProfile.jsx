import React, { useContext, useEffect, useState } from 'react'
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
import { UserAuthContext } from '../contexts/Contexts';

const UserProfile = () => {
  const { userData } = useContext(UserAuthContext);

  const [value, setValue] = useState('1');
  const [userAvatarColor, setUserAvatarColor] = useState('');
  const [editUserData, setEditUserData] = useState({
    // name: userData.displayName,
    // email: userData.email,
    name: 'David',
    email: 'david@test.com',
  });

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
              Welcome {editUserData.name} 
            </p> 

            <Avatar {...nameSplit(editUserData.name)} className='user-avatar'/>

            <div className='user-profile-action'>
              {/* TODO create a button which will take user pic and upload it to the firebase */}
              <button>
                Add New Profile 
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
                    <Tab label="Personal Information" value="1" className='user-tablist'/>
                    <Tab label="History" value="2" className='user-tablist'/>
                  </TabList>
                </Box>
                <TabPanel value="1" className='user-section-per-info'>
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