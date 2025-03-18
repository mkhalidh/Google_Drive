import React from 'react'
import logo from '../public/fav.png'
import SearchIcon from '@mui/icons-material/Search';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';

import { Avatar } from '@mui/material';

import AppsIcon from '@mui/icons-material/Apps';


import './css/Header.css';
const Header = ({photoUrl}) => {
  return (
    <>
    <div className="header grid">
      <div className="header__logo flex items-center">
        <img className='w-[40px]' src={logo} alt="google drive logo"  />
        <span className='text-[22px] text-gray-500 ml-[10px]'>Drive</span>
      </div>
      <div className="header__search flex items-center w-[700px] bg-[#F5F5F5] p-[12px] rounded-xl ">
        <SearchIcon/>
        <input type="text" placeholder='Search in Drive' />
        <FormatAlignCenterIcon/>
      </div>
      <div className="header__icons">
        <span className='ic1'><HelpOutlineIcon/>
        <SettingsIcon/></span>
        <span>
          <AppsIcon/>
          <Avatar src={photoUrl}/>
        </span>
      </div>

    </div>
    </>
  )
}

export default Header