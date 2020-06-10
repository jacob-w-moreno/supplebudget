// Triggered by changing the allocation of a $ category while editing.
// 1. Sets all dollar balances to 0.
// 2. Updates the specific dollar category's allocation.
// 3. Runs distributeDollar(with a copy of the dollar array and the total).
const editDollar = (index, value) => {
    let dollarCopy = [...dollar];
    dollarCopy[index]["allocated"] = value;
    distributeDollar(dollarCopy, total);
}
// Triggered by editDollar(), which is triggered by changing the allocation of a $ category while editing.
// 1. Distributes the total to the dollar categories.
// 2. Sets 'remainder' to whatever is left over.
// 3. Calls distributePercent(with the remainder) with what's left over.
//     a. This solves the 'one step behind' problem.
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
    return
}
// Triggered in two ways:
//     a. By distributeDollar().
//     b. By changing the allocation of a % category while editing.
// 1. Updates the specific percent category's 'allocated'.
// 2. Runs distributePercent(with 'remaining').
const editPercent = (index, value) => {
    const percentCopy = [...percent];
    percentCopy[index]["allocated"] = value;
    distributePercent(remaining)
}
// Triggered by editPercent().
// 1. Takes the remaining money and distributes it to each percent category based on its percentage.
const distributePercent = (remainder) =>{
    console.log('% remainder:', remainder);
    const percentCopy = [...percent];
    percentCopy.forEach(percent =>{
        percent.balance = remaining;
        percent.balance = +(percent.allocated * 0.01 * remainder).toFixed(0);
    })
    return setPercent(percentCopy);
}