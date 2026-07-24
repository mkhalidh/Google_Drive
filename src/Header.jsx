import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar } from '@mui/material';

import './css/Header.css';

const Header = ({ user, onSignOut, search, onSearchChange }) => {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__mark">V</span>
        <span className="font-display text-xl text-paper-100">Vault</span>
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
        <span className="font-sans text-sm text-ink-500 hidden sm:inline">{user.displayName}</span>
        <Avatar
          src={user.photoURL}
          alt={user.displayName || 'Account'}
          sx={{ width: 32, height: 32 }}
        />
        <button
          onClick={onSignOut}
          className="header__signout"
          aria-label="Sign out"
          title="Sign out"
        >
          <LogoutIcon fontSize="small" />
        </button>
      </div>
    </header>
  )
}

export default Header
