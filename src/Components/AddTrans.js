import React from 'react';

const AddTrans = (props) => {
return (
<div id='addTrans'>
<div id='addTransInner'>
  <header>ADD TRANSACTION</header>
  <h3>Select a Category</h3>
  <div id='trans-list'>
    {props.dollar.map(category=>
      <div id='trans-item'>
        <span>{category.name}</span>
        <span>${category.balance}</span>
      </div>
    )}
    {props.percent.map(category=>
      <div id='trans-item'>{category.name}</div>
    )}
  </div>
  <h3>Choose an Amount</h3>
  <div id='border'>
    $<input type='number'/>
  </div>
  <button className='button' onClick={()=>props.togAdd(false)}>Cancel</button>
</div>
</div>
)
}
export default AddTrans;