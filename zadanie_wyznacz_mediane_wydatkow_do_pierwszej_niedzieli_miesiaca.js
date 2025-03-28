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

const partitionHigh = (a, low, high) => {
    const pivot = a[high];
    let i = low;
    for(let j = low; j < high; j++){
        if(a[j] <= pivot){      
            swap(a, i, j);
            i++;
        }
    }
    swap(a, i, high);
    return i;
}

const iterativeQuickSort = (a, start=0, end=a.length-1) => {
    const stack = [{x: start, y: end}];
    while(stack.length){
        const range = stack.pop();
        const x=range.x, y=range.y;
        const p = partitionHigh(a, x, y);
        if(p - 1 > x){
            stack.push({x: x, y: p - 1});
        }
        if(p + 1 < y){
            stack.push({x: p + 1, y: y});
        }
    }
}

const solutionBySortImplementation = (expenses, sortImplementation) => {
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
        sortImplementation(expensesByMonths);
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

const solution1 = (expenses) => {
    return solutionBySortImplementation(expenses, function(a) {
        iterativeQuickSort(a);
        //console.log('quickSortIterative');
        //console.log(a);
    });
}

const solution2 = (expenses) => {
    return solutionBySortImplementation(expenses, function(a) {
        a.sort(numericComparator);
        //console.log('sort');
        //console.log(a);
    });
}
