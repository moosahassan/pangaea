import React from 'react';
import './Navigation.scss';
import NavigationLink from "./NavigationLink";


  
const Navigation = ({  }) => <nav className='comp-navigation'>
  <ul>
    <NavigationLink name={'Lumin'} url={'/'} />
    <NavigationLink name={'Shop'} url={'/'} />
    <NavigationLink name={'Learn'} url={'/'} />
    <NavigationLink name={'Account'} url={'/'} />
  </ul>

</nav>

export default Navigation;
