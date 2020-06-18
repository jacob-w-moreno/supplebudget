import React, {useState, useEffect} from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
import List from './List';
import AddTrans from './AddTrans';
import axios from 'axios';

const Budget = (props) => {
  useEffect(()=>{
    getCategories();
  }, [])

  const [dollar, setDollar] = useState([]);
  const [percent, setPercent] = useState([]);
  const [edit, togEdit] = useState(false);
  const [add, togAdd] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [total, setTotal] = useState(3000);

// Triggered by useEffect() upon rendering.
// 1. Runs an axios call to get all of the categories.
// 2. Runs setDollar(with the dollar categories) and setPercent(with the percent categories).
  const getCategories = () => {
    console.log('running');
    axios.get('/api/categories')
      .then(res =>{
        console.log(res.data.dollar);
        setDollar(res.data.dollar);
        setPercent(res.data.percent)
      })
      .catch(console.log('FAIL: getCat'))
  }
// Triggered by the "SAVE NEW" button.
// 1. Runs an axios call to save all of the categories to the server.
//   a. It saves the new balances.
  const saveNew = () => {
    axios.put('/api/categories', {dollar, percent})
      .then(res => {
        setDollar(res.data.dollar);
        setPercent(res.data.percent);
      })
      .catch(console.log('FAIL: saveNew'));
  }
// Triggered by the "SAVE OLD" button.
// 1. Runs an axios call to save all of the categories to the server.
//   a. It saves the old balances.
  const saveOld = () => {
    axios.put('/api/oldcategories', {dollar, percent})
      .then(res => {
        setDollar(res.data.dollar);
        setPercent(res.data.percent);
      })
      .catch(console.log('FAIL: saveOld'))
  }
// Triggered by changing the allocation of a $ category while editing.
// 1. Sets all dollar balances to 0.
// 2. Updates the specific dollar category's allocation.
// 3. Runs distributeDollar(a copy of 'dollar', 'total').
  const editDollar = (index, value) => {
    let dollarCopy = [...dollar];
    dollarCopy[index]["allocated"] = value;
    distributeDollar(dollarCopy, total);
  }
// Triggered by changing the allocation of a % category while editing.
//      a. <List/> => <PercentEdit/> => input.
// 1. Updates the specific percent category's allocation.
// 2. Runs distributePercent('remaining').
  const editPercent = (index, value) => {
    const percentCopy = [...percent];
    percentCopy[index]["allocated"] = value;
    distributePercent(remaining)
  }
// Triggered in 2 ways:
//    a. By clicking the "EDIT" button.
//    b. By editDollar().
// 1. Distributes the total to the dollar categories.
// 2. Sets 'remainder' to whatever is left over.
// 3. Calls distributePercent(what's left over).
  const distributeDollar = (dollarCopy, totalCopy) => {
    let remainder = totalCopy;
    dollarCopy.forEach(dollar => dollar.balance = 0);
    for(let i=0; i<dollarCopy.length; i++){
      if (dollarCopy[i].balance < dollarCopy[i].allocated) {
        let difference = (dollarCopy[i].allocated - dollarCopy[i].balance)
        if(difference < remainder) {
          console.log('IF')
          remainder -= difference;
          dollarCopy[i].balance = dollarCopy[i].allocated;
        }
        else {
          console.log('ELSE')
          dollarCopy[i].balance += remainder;
          remainder = 0;
          setRemaining(0);
          setDollar(dollarCopy);
        }
      }
    }
    setRemaining(remainder);
    distributePercent(remainder);
    setDollar(dollarCopy)
  return}
// Triggered in 2 ways:
//   a. By distributeDollar().
//   b. By editPercent().
// 1. Takes the remaining money and distributes it to each percent category based on the category's percentage.
  const distributePercent = (remainder) =>{
    console.log('% remainder:', remainder);
    const percentCopy = [...percent];
    percentCopy.forEach(percent =>{
      percent.balance = remaining;
      percent.balance = +(percent.allocated * 0.01 * remainder).toFixed(0);
    })
    return setPercent(percentCopy);
  }

  return(<div id='budget'>

    <Header
      togAdd={togAdd}
    />

    <Dashboard
      dollar={dollar}
      percent={percent}
      total={total}
    />

    {dollar.length ===0 && percent.length === 0 && !edit ?
      <div id='no-budget'>You don't have any categories yet... Click on the "EDIT" button below to start budgeting.</div>
    :
      <List
        dollar={dollar}
        setDollar={setDollar}
        percent={percent}
        setPercent={setPercent}
        remaining={remaining}
        editDollar={editDollar}
        editPercent={editPercent}
        edit={edit}
      />
    }
    {edit ?
      <div id='column'>
        <button className='button' onClick={()=>{
          togEdit(false);
          saveOld();
        }}>SAVE OLD BALANCE</button>
        <button className='button' onClick={()=>{
          togEdit(false);
          saveNew();
        }}>SAVE NEW BALANCE</button>
        <button className='button' onClick={()=>togEdit(false)}>CANCEL</button>
      </div>
    :
      <button className='button' onClick={()=>{
        const dollarCopy = [...dollar];
        togEdit(true);
        distributeDollar(dollarCopy, total)
      }}>
        EDIT
      </button>
    }
    <span>{remaining}</span>
  </div>)
}
export default Budget;