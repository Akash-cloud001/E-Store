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

const UserProfile = () => {
  const { userData, userAvatarColor, userSignOut, userDbData } = useContext(UserAuthContext);
  const [value, setValue] = useState('1');
  
  const [editUserData, setEditUserData] = useState({
    name: userDbData?.name,
    email: userDbData?.email,
    number: userDbData?.number,
    address: userDbData?.address
    // name: 'David',
    // email: 'david@test.com',
  });



// For tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <>
        <NavBar />
        <main className='user-main'>
          
          <aside className='user-aside'>
            <p className='user-name'>
              Welcome {editUserData.name} 
            </p> 

            <Avatar {...nameSplit(editUserData.name, userAvatarColor)} className='user-avatar'/>

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
                    onChange = {event =>{
                      setEditUserData((prev) => ({...prev, number: event.target.value}))
                    }}
                    value ={editUserData.number}
                    
                  />
                  <InputControl 
                    name = 'address'
                    id = 'userAddress'
                    type = 'text'
                    value = {editUserData.address}
                    onChange = {event =>{
                      setEditUserData((prev)=>({...prev, address: event.target.value}))
                    }}
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