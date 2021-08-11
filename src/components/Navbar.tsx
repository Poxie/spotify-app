import { NavLink } from 'react-router-dom';
import { Flex } from './Flex';
import './Navbar.scss';

export const Navbar = () => {
    return(
        <div className="navbar">
            <Flex className="navbar-container">
                <NavLink to={'/'} exact>
                    Home
                </NavLink>
                <NavLink to={'/profile'}>
                    Profile
                </NavLink>
                <NavLink to={'/explore'}>
                    Explore
                </NavLink>
            </Flex>
        </div>
    )
}