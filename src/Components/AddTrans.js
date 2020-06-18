import React, {useState} from 'react';

const AddTrans = () => {
  const [income, toggleIncome] = useState(true);
  return(
    <div className = 'transactions' id={income ? 'income' : 'expense'}>
      {/* <div className='orange-header'>Transactions</div> */}

      <div>
        <div> type </div>

        <div className='input-box' id='trans-type' onClick = {()=>toggleIncome(income ? false : true)}>
          {income ? '+' : '-'}
        </div>
      </div>

      <div>
        amount

        <div id='trans-amount'>
          $
          <input className='trans-input' type='number' placeholder='value'/>
        </div>
      </div>

      {income ? 
        <input className='trans-input' id={income ? 'income' : 'expense'} type='text' placeholder='Description'/>
      :
        <div>dropdown list</div>
      }
      
    </div>
  )
}

export default AddTrans;