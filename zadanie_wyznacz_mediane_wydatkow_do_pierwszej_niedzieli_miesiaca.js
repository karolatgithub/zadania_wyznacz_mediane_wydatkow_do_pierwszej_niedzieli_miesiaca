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
    [a[i],a[j]] = [a[j],a[i]];
}

const iterativeQuickSort = (a) => {
    const stack = [{x: 0, y: a.length-1}];
    while(stack.length){
        const range = stack.pop();
        const p = partitionHigh(a, range.x, range.y);
        if(p - 1 > range.x){
            stack.push({x: range.x, y: p - 1});
        }
        if(p + 1 < range.y){
            stack.push({x: p + 1, y: range.y});
        }
    }
}

const partitionHigh = (a, low, high) => {
    const pivot = a[high];
    let i = low;
    for(let j = low; j < high; j++){
        if(a[j] <= pivot){      
            swap(a, i++, j);
        }
    }
    swap(a, i, high);
    return i;
}

const kthSmallest = (a, left=0, right=a.length-1) => {
    const r=right-left;
    const k = (r -(r % 2))>>1;
    while (left <= right) { 
        let pivotIndex = partitionHigh(a, left, right); 
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

const quicksortRecursive = (a, left=0, right=a.length-1, k=[0], first=true) => {
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
     if (left < j) quicksortRecursive(a, left, j, k, false);
     if (i < right) quicksortRecursive(a, i, right, k, false);
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

const heapifyRecursive = (a, n, i) => {
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
        heapifyRecursive(a, n, largest);
    }
}

const heapSortRecursive = (a) => {
    let n = a.length;
    for (let i = ((n - (n % 2))>>1) - 1; i >= 0; i--) {
        heapifyRecursive(a, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        swap(a,0,i);
        heapifyRecursive(a, i, 0);
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

const MIN_MERGE = 32;
  
const minRunLength = (n) => {
    let r = 0;
    while (n >= MIN_MERGE) {
        r |= (n & 1);
        n >>= 1;
    }
    return n + r;
}

const insertionSort = (a,left,right) => {
    let temp, j;
    for(let i = left + 1; i <= right; i++) {
        temp = a[i];
        j = i - 1;
        while (j >= left && a[j] > temp) {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = temp;
    }
}
  
const merge = (a, l, m, r) => {
    const len1 = m - l + 1, len2 = r - m;
    const left = new Array(len1);
    const right = new Array(len2);
    for(let x = 0; x < len1; x++) {
        left[x] = a[l + x];
    }
    for(let x = 0; x < len2; x++) {
        right[x] = a[m + 1 + x];
    }
    let i = 0;
    let j = 0;
    let k = l;
    while (i < len1 && j < len2) {
        if (left[i] <= right[j]) {
            a[k] = left[i];
            i++;
        } else {
            a[k] = right[j];
            j++;
        }
        k++;
    }
    while (i < len1) {
        a[k] = left[i];
        k++;
        i++;
    }
    while (j < len2) {
        a[k] = right[j];
        k++;
        j++;
    }
}

const timSort = (a, n=a.length) => {
    const minRun = minRunLength(MIN_MERGE);
    for(let i = 0; i < n; i += minRun) {
        insertionSort(a, i, Math.min((i + MIN_MERGE - 1), (n - 1)));
    }
    let ss;
    for(let size = minRun; size < n; size = ss) {
        ss=size<<1;
        for(let left = 0; left < n; left += ss) {
            const mid = left + size - 1;
            const right = Math.min((left + ss - 1), (n - 1));
            if(mid < right) {
                merge(a, left, mid, right);
            }
        }
    }
}

const solutionBySortImplementation = (expenses, sortImplementation) => {
    let result = null;
    let expensesByMonths=[];
    for (const [month, days] of Object.entries(expenses)) {
        const firstSunday = getFirstSunday(month);
        if (!firstSunday) continue;

        for (const [day, categories] of Object.entries(days)) {
            if (month+'-'+day > firstSunday) continue;

            for (const [kind, amounts] of Object.entries(categories)) {
                if (['food', 'fuel'].includes(kind) && Array.isArray(amounts)) {
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
        //heapSortRecursive(a);
        //iterativeQuickSort(a);
        //kthSmallest(a);
        heapSortIterative(a);
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
