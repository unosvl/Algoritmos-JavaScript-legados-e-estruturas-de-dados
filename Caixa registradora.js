const currencyUnit = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
};

function checkCashRegister(price, cash, cid) {
    let change = cash - price;
    let totalCid = 0;
    for (let element of cid) {
        totalCid += element[1];
    }
    totalCid = totalCid.toFixed(2);

    if (Number(totalCid) < change) {
        return {status: "INSUFFICIENT_FUNDS", change: []};
    } else if (Number(totalCid) === change) {
        return {status: "CLOSED", change: cid};
    } else {
        let changeArray = [];
        for (let i = cid.length - 1; i >= 0; i--) {
            const currency = cid[i][0];
            const unitValue = currencyUnit[currency];
            let unitAmount = cid[i][1];
            let count = 0;
            while (change >= unitValue && unitAmount > 0) {
                change -= unitValue;
                change = change.toFixed(2);
                unitAmount -= unitValue;
                count++;
            }
            if (count > 0) {
                changeArray.push([currency, count * unitValue]);
            }
        }

        if (change === '0.00') {
            return {status: "OPEN", change: changeArray};
        } else {
            return {status: "INSUFFICIENT_FUNDS", change: []};
        }
    }
}

// Test cases
console.log(checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]));
console.log(checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]));
console.log(checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
]));
console.log(checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 1],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
]));
console.log(checkCashRegister(19.5, 20, [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
]));