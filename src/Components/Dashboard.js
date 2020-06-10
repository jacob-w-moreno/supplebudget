import React from 'react';

const Dashboard = (props) => {

// Reduces "dollar" and "percent" to find the totals that are displayed.
const dollarTot = props.dollar.reduce((acc, curr) => acc + curr.balance, 0);
const dollarAll = props.dollar.reduce((acc, curr) => acc + curr.allocated, 0);
const percentTot = props.percent.reduce((acc, curr) => acc + curr.balance, 0);
const percentAll = props.percent.reduce((acc, curr) => acc + curr.allocated, 0);

// All this bad boi displays are the totals that <Budget/> passes to it.
// I do still need to add a way to change the total.
return(
<div id='dashboard'>
  <div className='balances'>
    <span>${dollarTot}</span>
    <div className='line'/>
    <span>${dollarAll}</span>
  </div>
  <div className='circle'>
    ${props.total}
  </div>
  <div className='balances'>
    <span>${percentTot}</span>
    <div className='line'/>
    <span>%{percentAll}</span>
  </div>
</div>
)
}
export default Dashboard;