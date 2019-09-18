class Algorithm {
  //Helper function to generate a delay
  delayed = (function() {
    let queue = [];

    function processQueue() {
      if (queue.length > 0) {
        setTimeout(function() {
          queue.shift().cb();
          processQueue();
        }, queue[0].delay);
      }
    }

    return function(delay, cb) {
      queue.push({ delay: delay, cb: cb });

      if (queue.length === 1) {
        processQueue();
      }
    };
  })();

  validateInput = val => {
    let temp = "";
    let arr = [];
    let j = 0;
    val = val.trim();
    val += " ";
    if (val.length === 0) return false;
    else {
      for (let i = 0; i < val.length; i++) {
        if (val.charAt(i) !== " " && val.charAt(i) !== "\n") {
          if (isNaN(parseInt(val.charAt(i)))) return false;
          else temp += val.charAt(i).toString();
        } else {
          if (temp === "") continue;
          temp = parseInt(temp);
          if (isNaN(temp)) return false;
          else {
            arr[j++] = temp;
            temp = "";
          }
        }
      }
    }
    return arr;
  };

  insertionSort = (array, ref) => {
    let arr = [...array];
    let i,
      key,
      j,
      k = 0;
    let n = arr.length;
    let operation = [];

    for (i = 1; i < n; i++) {
      key = arr[i];
      j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        operation[k++] = { i: j + 1, j: j };
        j = j - 1;
      }
      arr[j + 1] = key;
      operation[k++] = { i: j + 1, key: key };
    }

    arr = [...array];

    for (i = 0; i < operation.length; i++) {
      this.delayed(
        100,
        (i => {
          return () => {
            if (undefined === operation[i].key) {
              let temp = arr[operation[i].j];
              arr[operation[i].j] = arr[operation[i].i];
              arr[operation[i].i] = temp;
              let index = operation[i].j;
              ref.setState({ arr, index });
            } else {
              arr[operation[i].i] = operation[i].key;
              let index = operation[i].j;
              ref.setState({ index });
            }
          };
        })(i)
      );
    }
  };

  quickSort = (array, ref) => {
    let arr = [...array];
    let k = 0,
      operation = [];

    const partition = (arr, l, h) => {
      let x = arr[h];
      let i = l - 1;

      for (let j = l; j <= h - 1; j++) {
        if (arr[j] <= x) {
          i++;
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          operation[k++] = { i: i, j: j };
        }
      }
      let temp = arr[i + 1];
      arr[i + 1] = arr[h];
      arr[h] = temp;
      operation[k++] = { i: i + 1, j: h };
      return i + 1;
    };

    const qSort = (A, l, h) => {
      if (l < h) {
        /* Partitioning index */
        let p = partition(A, l, h);
        qSort(A, l, p - 1);
        qSort(A, p + 1, h);
      }
    };
    qSort(arr, 0, arr.length - 1);

    arr = [...array];
    for (let i = 0; i < operation.length; i++) {
      this.delayed(
        100,
        (i => {
          return () => {
            let temp = arr[operation[i].j];
            arr[operation[i].j] = arr[operation[i].i];
            arr[operation[i].i] = temp;
            let index = operation[i].j;
            ref.setState({ arr, index });
          };
        })(i)
      );
    }
  };

  mergeSort = (arr, ref) => {
    console.log(arr);
    let operation = [],
      t = 0;

    const Merge = (arr, l, m, r) => {
      let array = [...arr];
      let i, j, k;
      let n1 = m - l + 1;
      let n2 = r - m;

      let L = [],
        R = [];

      for (i = 0; i < n1; i++) L[i] = array[l + i];
      for (j = 0; j < n2; j++) R[j] = array[m + 1 + j];

      i = 0;
      j = 0;
      k = l;
      while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
          array[k] = L[i];
          // operation[t++] = { i: k, value: arr[k] };
          i++;
        } else {
          array[k] = R[j];
          // operation[t++] = { i: k, value: arr[k] };
          j++;
        }
        k++;
      }

      while (i < n1) {
        array[k] = L[i];
        //operation[t++] = { i: k, value: arr[k] };
        i++;
        k++;
      }

      while (j < n2) {
        array[k] = R[j];
        //operation[t++] = { i: k, value: arr[k] };
        j++;
        k++;
      }
    };

    const mSort = (A, l, r) => {
      if (l < r) {
        let m = l + (r - l) / 2;
        mSort(A, l, m);
        mSort(A, m + 1, r);
        Merge(A, l, m, r);
      }
    };
    console.log(arr);
    mSort(arr, 0, arr.length - 1);
  };

  selectionSort = (array, ref) => {
    let arr = [...array];
    let n = arr.length;
    let i, j, min_idx;
    let operation = [];
    let k = 0;

    for (i = 0; i < n - 1; i++) {
      min_idx = i;
      for (j = i + 1; j < n; j++) {
        if (arr[j] < arr[min_idx]) {
          min_idx = j;
          operation[k++] = { i: i, j: min_idx, swap: false };
        }
      }
      let temp = arr[min_idx];
      arr[min_idx] = arr[i];
      arr[i] = temp;
      operation[k++] = { i: i, j: min_idx, swap: true };
    }

    arr = [...array];

    for (i = 0; i < operation.length; i++) {
      this.delayed(
        100,
        (i => {
          return () => {
            if (operation[i].swap) {
              let temp = arr[operation[i].j];
              arr[operation[i].j] = arr[operation[i].i];
              arr[operation[i].i] = temp;
              let index = operation[i].j;
              ref.setState({ arr, index });
            } else {
              let index = operation[i].j;
              ref.setState({ index });
            }
          };
        })(i)
      );
    }
  };

  bubbleSort = (arr, ref) => {
    let len = arr.length;

    for (let i = 0; i < len - 1; i += 1) {
      for (let j = 1; j < len - i; j += 1) {
        // add function to the queue, shadowing i/j with an IIFE:
        this.delayed(100, () => {
          if (arr[j - 1] > arr[j]) {
            let temp = arr[j - 1];
            arr[j - 1] = arr[j];
            arr[j] = temp;
          }
          let index = j;
          ref.setState({ arr, index });
        });
      }
    }
  };
}

export default Algorithm;
