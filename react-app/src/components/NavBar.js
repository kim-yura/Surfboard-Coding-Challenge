
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/session';

const NavBar = () => {
  const sessionUser = useSelector(state => {
    return state.session.user || ''
  });

  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {sessionUser ?
          <li id='logout-button' onClick={onLogout}>
            Logout
          </li> :
          <>
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
          </>
        }
      </ul>
    </nav>
  );
}

export default NavBar;
