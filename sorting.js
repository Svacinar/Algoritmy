const data = [5, 1, 9, 2, 3, 7, 4]

function bubblesort(data) {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j <= data.length; j++) {
            if (data[j] > data[j + 1]) {
                let temp = data[j]
                data[j] = data[j + 1]
                data[j + 1] = temp
            }
        }

    }
    return data
}
bubblesort(data);

const mergeFunction = (leftArray, rightArray) => {
    const result = [];
    let leftIndex = 0
    let rightIndex = 0
    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        if (leftArray[leftIndex] < rightArray[rightIndex]) {
            result.push(leftArray[leftIndex])
            leftIndex++
        } else {
            result.push(rightArray[rightIndex])
            rightIndex++
        }
    }
    return [...result, ...leftArray.slice(leftIndex), ...rightArray.slice(rightIndex)]

}

function mergeSort(data) {
    if (data.length <= 1) {
        return data
    }
    const halfIndex = Math.floor(data.length / 2)
    const leftArray = data.slice(0, halfIndex)
    const rightArray = data.slice(halfIndex)
    return mergeFunction(
        mergeSort(leftArray),
        mergeSort(rightArray)
    )
}
mergeSort(data)


function merger(leftArr, rightArr) {
    return [...leftArr, ...rightArr]
}

function quickSort(data) {
    if (data.length <= 1) {
        return data
    }
    let pivot = data[data.length - 1]
    let leftArr = []
    let rightArr = []
    data.map(element => {
        if (element < pivot) {
            leftArr.push(element)
        } else { rightArr.push(element) }
    })
    if (leftArr.length === 0 || rightArr.length === 0) {
        return data
    }
    return merger(
        quickSort(leftArr),
        quickSort(rightArr)
    )
}
quickSort(data);