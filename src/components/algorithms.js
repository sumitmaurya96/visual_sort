import { isUndefined } from "util";

class Algorithm {
  constructor() {
    this.color = {
      indexA: 0,
      indexB: 0,
      indexRangeOfSorted: []
    };
  }
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
    let state = ref.getState();
    if (state.loopControls.isSorting) {
      state.loopControls = { isSorting: true, breakSort: true };
      ref.setState({ loopControls: state.loopControls });
    }
    state.loopControls = { isSorting: true, breakSort: false };
    ref.setState({ loopControls: state.loopControls });

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
        operation[k++] = { i: j + 1, j: j, sorted: i };
        j = j - 1;
      }
      arr[j + 1] = key;
      operation[k++] = { i: j + 1, key: key, sorted: i };
    }

    operation[k] = { i: j + 1, key: "last", sorted: i };

    arr = [...array];

    for (i = 0; i < operation.length; i++) {
      this.delayed(
        state.speed,
        (i => {
          return () => {
            if (state.loopControls.breakSort) {
              ref.setState({
                loopControls: { isSorting: false, breakSort: false }
              });
              clearTimeout();
              return;
            }
            if (isUndefined(operation[i].key)) {
              let temp = arr[operation[i].j];
              arr[operation[i].j] = arr[operation[i].i];
              arr[operation[i].i] = temp;
              this.color.indexA = operation[i].i;
              this.color.indexB = operation[i].j;
              this.color.indexRangeOfSorted = {
                range: 1,
                from: 0,
                to: operation[i].sorted
              };
              ref.setState({ arr, color: this.color });
            } else if (operation[i].key === "last") {
              this.color.indexRangeOfSorted = {
                range: 0,
                from: -1,
                to: -1
              };
              this.color.indexA = -1;
              this.color.indexB = -1;
              ref.setState({ arr, color: this.color });
            } else {
              arr[operation[i].i] = operation[i].key;
              this.color.indexA = operation[i].i;
              this.color.indexB = operation[i].j;
              this.color.indexRangeOfSorted = {
                range: 1,
                from: 0,
                to: operation[i].sorted
              };
              ref.setState({ arr, color: this.color });
            }
          };
        })(i)
      );
    }
  };

  quickSort = (array, ref) => {
    let state = ref.getState();
    if (state.loopControls.isSorting) {
      state.loopControls = { isSorting: true, breakSort: true };
      ref.setState({ loopControls: state.loopControls });
    }
    state.loopControls = { isSorting: true, breakSort: false };
    ref.setState({ loopControls: state.loopControls });

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
        state.speed,
        (i => {
          return () => {
            if (state.loopControls.breakSort) {
              ref.setState({
                loopControls: { isSorting: false, breakSort: false }
              });
              clearTimeout();
              return;
            }
            let temp = arr[operation[i].j];
            arr[operation[i].j] = arr[operation[i].i];
            arr[operation[i].i] = temp;
            this.color.indexA = operation[i].i;
            this.color.indexB = operation[i].j;
            this.color.indexRangeOfSorted = {
              range: 1,
              from: -1,
              to: -1
            };
            ref.setState({ arr, color: this.color });
          };
        })(i)
      );
    }
  };

  selectionSort = (array, ref) => {
    let state = ref.getState();
    if (state.loopControls.isSorting) {
      state.loopControls = { isSorting: true, breakSort: true };
      ref.setState({ loopControls: state.loopControls });
    }
    state.loopControls = { isSorting: true, breakSort: false };
    ref.setState({ loopControls: state.loopControls });

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
        }
        operation[k++] = {
          i: i,
          j: j,
          min_idx: min_idx,
          swap: false,
          sorted: i
        };
      }
      let temp = arr[min_idx];
      arr[min_idx] = arr[i];
      arr[i] = temp;
      operation[k++] = { i: i, j: j, min_idx: min_idx, swap: true, sorted: i };
    }

    operation[k++] = { i: i, j: j, min_idx: min_idx, swap: false, sorted: i };
    operation[k++] = { i: -1, j: -1, min_idx: -1, swap: false, sorted: -1 };

    arr = [...array];

    for (i = 0; i < operation.length; i++) {
      this.delayed(
        state.speed,
        (i => {
          return () => {
            if (state.loopControls.breakSort) {
              ref.setState({
                loopControls: { isSorting: false, breakSort: false }
              });
              clearTimeout();
              return;
            }
            if (operation[i].swap === true) {
              let temp = arr[operation[i].min_idx];
              arr[operation[i].min_idx] = arr[operation[i].i];
              arr[operation[i].i] = temp;
              this.color.indexA = operation[i].min_idx;
              this.color.indexB = operation[i].j;
              this.color.indexRangeOfSorted = {
                range: 1,
                from: 0,
                to: operation[i].sorted
              };
              ref.setState({ arr, color: this.color });
            } else {
              this.color.indexA = operation[i].min_idx;
              this.color.indexB = operation[i].j;
              this.color.indexRangeOfSorted = {
                range: 1,
                from: 0,
                to: operation[i].sorted
              };
              ref.setState({ arr, color: this.color });
            }
          };
        })(i)
      );
    }
  };

  bubbleSort = (array, ref) => {
    let state = ref.getState();
    if (state.loopControls.isSorting) {
      state.loopControls = { isSorting: true, breakSort: true };
      ref.setState({ loopControls: state.loopControls });
    }
    state.loopControls = { isSorting: true, breakSort: false };
    ref.setState({ loopControls: state.loopControls });

    let arr = [...array],
      k = 0;
    let len = arr.length;
    let operation = [];

    let i, j;

    for (i = 0; i < len - 1; i += 1) {
      for (j = 0; j < len - i; j += 1) {
        if (arr[j - 1] > arr[j]) {
          let temp = arr[j - 1];
          arr[j - 1] = arr[j];
          arr[j] = temp;
          operation[k++] = { sorted: i, i: j - 1, j: j, swap: true };
        } else operation[k++] = { sorted: i, i: j - 1, j: j, swap: false };
      }
    }

    operation[k++] = { sorted: len, i: -1, j: -1, swap: false };
    operation[k] = { sorted: len, i: -1, j: -1, swap: "last" };

    arr = [...array];
    for (let i = 0; i < operation.length; i++) {
      this.delayed(
        state.speed,
        (i => {
          return () => {
            if (state.loopControls.breakSort) {
              ref.setState({
                loopControls: { isSorting: false, breakSort: false }
              });
              clearTimeout();
              return;
            }
            if (operation[i].swap === true) {
              let temp = arr[operation[i].j];
              arr[operation[i].j] = arr[operation[i].i];
              arr[operation[i].i] = temp;
              this.color.indexA = operation[i].i;
              this.color.indexB = operation[i].j;
              this.color.indexRangeOfSorted = {
                range: 1,
                from: arr.length - operation[i].sorted,
                to: arr.length
              };
              ref.setState({ arr, color: this.color });
            } else if (operation[i].swap === false) {
              this.color.indexRangeOfSorted = {
                range: 1,
                from: arr.length - operation[i].sorted,
                to: arr.length
              };
              this.color.indexA = operation[i].i;
              this.color.indexB = operation[i].j;
              ref.setState({ arr, color: this.color });
            } else {
              this.color.indexRangeOfSorted = {
                range: 0,
                from: -1,
                to: -1
              };
              this.color.indexA = -1;
              this.color.indexB = -1;
              ref.setState({ arr, color: this.color });
            }
          };
        })(i)
      );
    }
  };
}

export default Algorithm;
