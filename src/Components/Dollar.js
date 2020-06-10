import React from 'react';

const ListItem = (props) => {
// All this bad boi does is display the props that <List/> passes to it.
return (<div className='list-item'>
  <div>${props.allocated}</div>
  <div>{props.name}</div>
  <div>${props.balance}</div>
</div>)
}
export default ListItem;