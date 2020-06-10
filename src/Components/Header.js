import React from 'react';

const Header = (props) => {
// For now, all this does is display "BUDGET". Good times.
    return (
    <div className='header'>
        <div className='icon' id='hamburger'/>
        <header>BUDGET</header>
        <div className='icon' id='add' onClick={()=>props.togAdd(true)}/>
    </div>)
}

export default Header;