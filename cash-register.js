function checkCashRegister(price, cash, cid) {
    // create an obj that holds currency unit and amount
    const coinsBills = {
        "ONE HUNDRED": 10000,
        "TWENTY": 2000,
        "TEN": 1000,
        "FIVE": 500,
        "ONE": 100,
        "QUARTER": 25,
        "DIME": 10,
        "NICKEL": 5,
        "PENNY": 1
    };

    // calculate change and multiply by 100
    let change = (cash - price) * 100;

    // use reduce method to calculate the values of cid and multiply by 100
    const sumOfCid = cid.reduce((total, item) => total + (item[1] * 100), 0);

    // if change is less than the sum of cid, return insufficient funds
    if (change > sumOfCid) {
        return {status: "INSUFFICIENT_FUNDS", change: []};
    }

    // if change is equal to the sum of cid, return status closed
    if (change === sumOfCid) {
        return {status: "CLOSED", change: cid};
    }

    // if change is less than sum of cid, calculate total change given back
    if (change < sumOfCid) {
        let totalChange = [];
        // for each item in reversed cid, each value is multiplied by 100
        for (let item of cid.reverse()) {
            item[1] *= 100;

            // create a list to hold the change of bills and coins
            let changeList = [item[0], 0];
            // while cid value is greater than 0 and
            // change is greater than or equal to the value of coinsBills obj
            while (item[1] > 0 && change >= coinsBills[item[0]]) {
                // item value will be subtracted from coinsBills value
                item[1] -= coinsBills[item[0]];
                // change will be subtracted from coinsBills value
                change -= coinsBills[item[0]];
                // coinsBills value will be added to our changeList value
                changeList[1] += coinsBills[item[0]];
            }
            // if the changeList value is not 0,
            if (changeList[1] !== 0) {
                // change changeList value back to 0.00 format
                changeList[1] = changeList[1] / 100;
                // changeList item will be pushed to totalChange
                totalChange.push(changeList);
            }
        }
        // if change does not equal 0 after loop, return insufficient funds
        if (change !== 0) {
            return {status: "INSUFFICIENT_FUNDS", change: []};
        // if change is 0, return totalChange
        } else {
            return {status: "OPEN", change: totalChange};
        }
    }
}
