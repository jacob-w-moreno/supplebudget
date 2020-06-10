let dollar = [
    {id: 1, name: 'Loan', type: '$', balance: 400, oldBalance: 400, allocated: 400},
    {id: 2, name: 'Gas', type: '$', balance: 45, oldBalance: 45, allocated: 45},
    {id: 3, name: 'Overflow', type: '$', balance: 1800, oldBalance: 1800, allocated: 1800}
];
let percent = [

];
let id = 7;

module.exports = {
    readCategories: (req, res) => {
        res.status(200).send({dollar, percent});
    },
    updateNew: (req, res) => {
        let id=0
        req.body.dollar.forEach(element =>{
            let newBalance = element.balance;
            element.oldBalance = newBalance;
        })
        req.body.percent.forEach(element =>{
            let newBalance = element.balance;
            element.oldBalance = newBalance;
        })
        dollar = req.body.dollar;
        percent = req.body.percent;
        res.status(200).send({dollar, percent});
    },
    updateOld: (req, res) => {
        req.body.dollar.forEach(element =>{
            let oldBalance = element.oldBalance;
            element.balance = oldBalance;
        })
        req.body.percent.forEach(element =>{
            let oldBalance = element.oldBalance;
            element.balance = oldBalance;
        })
        dollar = req.body.dollar;
        percent = req.body.percent;
        res.status(200).send({dollar, percent});
    }
}