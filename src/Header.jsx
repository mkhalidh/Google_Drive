import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Menu, MenuItem, ListItemIcon, Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { DriveLogo } from './App';
import './css/Header.css';

const Header = ({ user, onSignOut, search, onSearchChange }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);

  return (
    <header className="header">
      <div className="header__brand">
        <DriveLogo size={30} />
        <span className="font-sans text-xl text-ink-700">Drive</span>
      </div>

      <div className="header__search">
        <SearchIcon className="text-ink-500" fontSize="small" />
        <input
          type="text"
          placeholder="Search your files"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search your files"
        />
      </div>

      <div className="header__account">
        <button className="header__icon-btn" title="Help" aria-label="Help">
          <HelpOutlineIcon fontSize="small" />
        </button>
        <button className="header__icon-btn" title="Settings" aria-label="Settings">
          <SettingsIcon fontSize="small" />
        </button>
        <button
          onClick={(e) => setMenuAnchor(e.currentTarget)}
          className="header__avatar-btn"
          aria-label="Account menu"
        >
          <Avatar
            src={user.photoURL}
            alt={user.displayName || 'Account'}
            sx={{ width: 32, height: 32 }}
          />
        </button>
        <Menu
          anchorEl={menuAnchor}
          open={!!menuAnchor}
          onClose={() => setMenuAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <div className="header__menu-identity">
            <p className="font-sans text-sm text-ink-900 font-medium">{user.displayName}</p>
            <p className="font-sans text-xs text-ink-500">{user.email}</p>
          </div>
          <Divider />
          <MenuItem onClick={() => { setMenuAnchor(null); onSignOut(); }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Sign out
          </MenuItem>
        </Menu>
      </div>
    </header>
  )
}

export default Header
