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

const partition = (a, low, high) => { 
    let pivot = a[high]; 
    let i = (low - 1); 
    for (let j = low; j <= high - 1; j++) { 
        if (a[j] <= pivot) { 
            i++; 
            swap(a, i, j);
        } 
    } 
    swap(a, i + 1, high);
    return (i + 1); 
} 
       
const kthSmallest = (a, left=0, right=a.length-1) => {
    const r=right-left;
    const k = (r -(r % 2))>>1;
    while (left <= right) { 
        let pivotIndex = partition(a, left, right); 
        if (pivotIndex == k - 1) {
            return a[pivotIndex]; 
        } else if (pivotIndex > k - 1) {
            right = pivotIndex - 1; 
        } else {
            left = pivotIndex + 1; 
        } 
    } 
    return -1; 
}

const quicksortRecurrency = (a, left=0, right=a.length-1, k=[0], first=true) => {
    ++k[0];
    let i = left, j = right;
    const pivot = a[(left + right - ((left + right) % 2)) / 2];
    do {
        while (a[i] < pivot && i < right) i++;
        while (a[j] > pivot && j > left) j--;
        if (i <= j) {
             swap(a, i, j);
             i++;
             j--;
        }
     } while (i <= j);
     if (left < j) quicksortRecurrency(a, left, j, k, false);
     if (i < right) quicksortRecurrency(a, i, right, k, false);
     if(first) {
        console.log(k[0]);
     }
}

const insertionSort = (a) => {
    for (let i = 1; i < a.length; i++) {
        const key = a[i];
        let j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            j = j - 1;
        }
        a[j + 1] = key;
    }
}

const heapifyRecurrency = (a, n, i) => {
    let largest = i;
    const d=i<<1;
    let l = d + 1; 
    let r = d + 2; 
    if (l < n && a[l] > a[largest]) {
        largest = l;
    }
    if (r < n && a[r] > a[largest]) {
        largest = r;
    }
    if (largest !== i) {
        swap(a, i, largest);
        heapifyRecurrency(a, n, largest);
    }
}

const heapSortRecurrency = (a) => {
    let n = a.length;
    for (let i = ((n - (n % 2))>>1) - 1; i >= 0; i--) {
        heapifyRecurrency(a, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        swap(a,0,i);
        heapifyRecurrency(a, i, 0);
    }
}

const heapifyIterative = (a, heapSize, k) => {
    while (true) {
        let smallest = k;
        const q = k<<1;
        const l = q + 1;
        const r = q + 2;
        if (l < heapSize && a[l] < a[k]) {
            smallest = l;
        } else {
            smallest = k;
        }
        if (r < heapSize && a[r] < a[smallest]) {
            smallest = r;
        }
        if (smallest != k) {
            swap(a, k, smallest);
            k = smallest;
        } else {
            return;
        }
    }
}

const buildHeapIterative = (a) => {
    const q = a.length - 2;
    const o = (q - (q%2)) >> 1;
    for (let k=o; k>=-1; k--) {
        heapifyIterative(a, a.length, k);
    }
}

const heapSortIterative = (a) => {
    buildHeapIterative(a);
    let heapSize = a.length;
    for (let i=a.length-1; i>=0; i--) {
        swap(a, 0, --heapSize);
        heapifyIterative(a, heapSize, 0);
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
        //heapSortRecurrency(a);
        heapSortIterative(a);
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
