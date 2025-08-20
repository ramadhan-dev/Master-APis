const bubbleSort = (data) => {
    const len = data?.length

    for (let index = 0; index < len; index++) {
        for (let j = 0; j < len - index; j++) {

            if (data[j] > data[j + 1]) {
                const tmp = data[j]
                data[j] = data[j + 1]
                data[j + 1] = tmp
            }
        }
    }
    return data
}

// const data = [5, 4, 8, 3, 1, 9];
// console.log(data);
// console.log(bubbleSort(data));


const selectionSort = (data) => {

    const len = data?.length

    for (let index = 0; index < len; index++) {
        
        let minIndex = index


        /**
         * @description Cari index yang memiliki nilai paling kecil
         */
        for (let i = index + 1; i < len; i++) {
            if (data[i] < data[minIndex]) {
                minIndex = i
            }
        }


        /**
         * @description jika nilai terkecil berada di index yang bebeda dengan index data yang di looping, maka ganti posisi datanya
         */
        if(minIndex != index) {
            const tmp = data[index]
            data[index] = data[minIndex]
            data[minIndex] = tmp
        }
        
    }

    return data
}


// const data = [5, 4, 8, 3, 1, 9];
// console.log(data);
// console.log(selectionSort(data));


function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}

// Contoh penggunaan
// console.log(isPowerOfTwo(3)); // Output: true
// console.log(isPowerOfTwo(32)); // Output: false
// console.log(isPowerOfTwo(64)); // Output: false

function countSetBits(n) {
    let count = 0;
    while (n > 0) {
        count += n & 1; // Tambah 1 jika bit paling kanan adalah 1
        n >>= 1; // Geser bit ke kanan
    }
    return count;
}

// // Contoh penggunaan
// console.log(countSetBits(5)); // Output: 2 (biner 5 = 101)
// console.log(countSetBits(7)); // Output: 3 (biner 7 = 111)
// console.log(countSetBits(8)); // Output: 3 (biner 7 = 1000)
// console.log(countSetBits(11)); // Output: 3 (biner 7 = 1011)
// console.log(countSetBits(12)); // Output: 3 (biner 7 = 1100)


function outer() {
    var count = 0;
    return function sss() {
        count++;
        return count;
    };
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 2
console.log(counter()); // 2