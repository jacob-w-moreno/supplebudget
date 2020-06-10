import React from 'react';

const ListEditDollar = (props) => {
return (<div className='list-item'>
  <div className='edit-box'>
{/* Changing this input triggers editDollar in <Budget/>. */}
    $<input defaultValue = {props.allocated} type='number' onChange={e=>props.editDollar(props.index, +e.target.value)}/>
  </div>
  <div className='edit-box'>
    <input defaultValue = {props.name} onChange = {(e)=>props.changeName(props.index, e.target.value, '$')}/>
  </div>
  <div className='edit-box'>
    $<div>{props.balance}</div>
  </div>
  <div className='edit-box'>
    $<div>{props.oldBalance}</div>
  </div>
</div>)
}
export default ListEditDollar;