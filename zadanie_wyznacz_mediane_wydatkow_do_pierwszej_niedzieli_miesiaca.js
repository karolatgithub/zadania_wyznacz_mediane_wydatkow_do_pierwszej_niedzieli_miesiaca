//solution1: 1ms solution2: 0ms
expenses = {
    "2023-01": {
        "01": {
            "food": [ 22.11, 43, 11.72, 2.2, 36.29, 2.5, 19 ],
            "fuel": [ 210.22 ]
        },
        "09": {
            "food": [ 11.9 ],
            "fuel": [ 190.22 ]
        }
    },
    "2023-03": {
        "07": {
            "food": [ 20, 11.9, 30.20, 11.9 ]
        },
        "04": {
            "food": [ 10.20, 11.50, 2.5 ],
            "fuel": []
        }
    },
    "2023-04": {}
};

const getFirstSunday = (month) => {
    try{
        let dateOfMonth=new Date(month+'-01T00:00:00');
        if(isNaN(dateOfMonth.valueOf())) {
            throw new Error("Invalid month");
        }
        let weekDay=dateOfMonth.getDay();
        if(weekDay !== 0) {
            dateOfMonth.setDate(dateOfMonth.getDate()+7-weekDay);
        }
        let dayOfMonth=dateOfMonth.getDate();
        return month+'-'+(dayOfMonth>9?'':'0')+dayOfMonth;
    } catch (ex) {
        console.error(ex);
        return null;
    }
}

const swap = (a, i, j) => {
    const temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

const getRandomPivot = (low, high) => {
    return Math.floor(Math.random() * (high - low + 1)) + low;
}

const quickSortRecursive = (a, low=0, high=a.length-1) => {
    if (low < high) {
        const pivotIndex = getRandomPivot(low, high);
        const pivotValue = a[pivotIndex];
        swap(a, pivotIndex, high);
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (a[j] < pivotValue) {
                i++;
                swap(a, i, j);
            }
        }
        swap(a, i + 1, high);
        quickSortRecursive(a, low, i);
        quickSortRecursive(a, i + 2, high);
    }
}

const solution1 = (expenses) => {
    let result = null;
    let expensesByMonths=[];
    for(let month in expenses) {
        let firstSunday=getFirstSunday(month);
        if(!firstSunday) {
            continue;
        }
        //console.log("firstSunday:"+firstSunday);
        for(let day in expenses[month]) {
            if(month+'-'+day>firstSunday) {
                continue;
            }
            for(let kind in expenses[month][day]) {
                if('food,fuel'.indexOf(kind)>=0
                    && expenses[month][day][kind] instanceof Array) {
                    for(let expense of expenses[month][day][kind]) {
                         if(typeof expense === 'number') {
                              expensesByMonths.push(expense);
                         }
                    }
                }
            }
        }
    }
    if(expensesByMonths.length>0) {
        quickSortRecursive(expensesByMonths);
        //console.log(expensesByMonths);
        const remainder=expensesByMonths.length % 2;
        if(remainder != 0) {
            result=expensesByMonths[(expensesByMonths.length-remainder)/2];
        } else {
            let i = expensesByMonths.length/2;
            result=(expensesByMonths[i-1]+expensesByMonths[i])/2;
        }
    }
    return result;
}

const numericComparator = (a, b) => {
    return a-b;
}

const solution2 = (expenses) => {
    let result = null;
    let expensesByMonths=[];
    for(let month in expenses) {
        let firstSunday=getFirstSunday(month);
        if(!firstSunday) {
            continue;
        }
        //console.log("firstSunday:"+firstSunday);
        let expensesByMonth=[];
        for(let day in expenses[month]) {
            if(month+'-'+day>firstSunday) {
                continue;
            }
            for(let kind in expenses[month][day]) {
                if('food,fuel'.indexOf(kind)>=0
                    && expenses[month][day][kind] instanceof Array) {
                    for(let expense of expenses[month][day][kind]) {
                         if(typeof expense === 'number') {
                              expensesByMonths.push(expense);
                         }
                    }
                }
            }
        }
    }
    if(expensesByMonths.length>0) {
        quickSortRecursive(expensesByMonths);
        //console.log(expensesByMonths);
        const remainder=expensesByMonths.length % 2;
        if(remainder != 0) {
            result=expensesByMonths[(expensesByMonths.length-remainder)/2];
        } else {
            let i = expensesByMonths.length/2;
            result=(expensesByMonths[i-1]+expensesByMonths[i])/2;
        }
    }
    //console.log(result);
    return result;
}
