import React from 'react';

const ListPercent = (props) => {
// All this bad boi does is display the props that <List/> passes to it.
    return (<div className='list-item' id='percent'>
        <div>%{props.allocated}</div>
        <div>{props.name}</div>
        <div>${props.balance}</div>
    </div>)
}
export default ListPercent;