import React from 'react';
import Dollar from './Dollar';
import Percent from './Percent';
import DollarEdit from './DollarEdit';
import PercentEdit from './PercentEdit';

const List = (props) => {

// Triggered by "New $/% Category" buttons.
// 1. Adds a new category to the appropriate array.
    const addCategory = (type) => {
        if (type === "$"){
            const dollarCopy = [...props.dollar];
            dollarCopy.push({
                allocated: 0,
                name: 'New $',
                balance: 0,
                oldBalance: 0,
                type: "$"
            })
            props.setDollar(dollarCopy)
        }
        if (type === "%"){
            let percentCopy = [...props.percent];
            percentCopy.push({
                allocated: 0,
                name: 'New %',
                balance: 0,
                oldBalance: 0,
                type: "%"
            })
            props.setPercent(percentCopy)
        }
    }

// Triggered by changing the name of a category while editing.
// 1. Changes the category's name.
    const changeName = (index, value, type) => {
        if (type === '$'){
            let dollarCopy = props.dollar;
            dollarCopy[index].name = value;
            props.setDollar(dollarCopy);
        }
        if (type === '%'){
            let percentCopy = props.percent;
            percentCopy[index].name = value;
            props.setPercent(percentCopy);
        }
    return}





    return(<div id='list'>
        <div className='orange-header'>Categories</div>
        {props. edit ?
            <div id='titles'>
                <span className='title'>Allocated</span>
                <span className='title'>Name</span>
                <span className='title'>New Balance</span>
                <span className='title'>Old Balance</span>
            </div>
            :
            <div id='titles'>
                <span className='title'>Allocated</span>
                <span className='title' id='title-center'>Name</span>
                <span className='title' id='title-right'>Balance</span>
            </div>
        }
{/* There has to be a shorter way to do this... */}
{/* When props.edit is true, it maps over the dollar array and returns the edit version of the list item. Otherwise, it returns the normal version. */}
        {props.dollar.map((category, index) => 
            props.edit ? 
            <DollarEdit
                key={index}
                index={index}
                allocated={category.allocated}
                name={category.name}
                balance={category.balance}
                oldBalance={category.oldBalance}
                editDollar={props.editDollar}
                changeName={changeName}/>
            :
            <Dollar
                key={index}
                allocated={category.allocated}
                name={category.name}
                balance={category.balance}/>
        )}
{/* Clicking this button adds a new % category */}
{/* Only visible when props.edit is true */}
        {props.edit ?
            <button className='add-button' onClick={()=>addCategory("$")}>New $ Category</button>
        :null}
{/* When props.edit is true, it maps over the percent array and returns the edit version of the list item. Otherwise, it returns the normal version. */}
        {props.percent.map((category, index) => 
            props.edit ? 
            <PercentEdit
                key={index}
                index={index}
                allocated={category.allocated}
                name={category.name}
                balance={category.balance}
                oldBalance={category.oldBalance}
                editPercent={props.editPercent}
                changeName={changeName}/>
            :
            <Percent
                key={index}
                allocated={category.allocated}
                name={category.name}
                balance={category.balance}/>
        )}
{/* Clicking this button adds a new % category. */}
{/* Only visible when props.edit is true */}
        {props.edit ? 
            <button className='add-button' onClick={()=>addCategory("%")}>New % Category</button>
        : null}
    </div>)
}
export default List;