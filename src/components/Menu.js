import React,{useState,useContext} from 'react'
import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react'
import { AuthContext } from '../Context/Auth';

function MenuItems() {
  const {logout,user} = useContext(AuthContext)
const pathname = window.location.pathname;
const pathtoActive = pathname=='/'?'home':pathname.substr(1);
const [activeItem, setactiveItem] = useState(pathtoActive);

    
const handleItemClick = (e, { name }) => setactiveItem(name);
const menuItems = user?(
<div >
      <Menu pointing secondary color='teal' >
        <Menu.Item
          name={user.username}
          active
          as={Link}
          to='/'
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            onClick={logout}
            as={Link}
            to='/'
          />

        </Menu.Menu>
      </Menu>
    </div>
): (
  <div >
    <Menu pointing secondary color='teal' >
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />
      
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
        to='/login'
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
        to='/register'
        />
      </Menu.Menu>
    </Menu>
  </div>
)
return menuItems
}

export default MenuItems