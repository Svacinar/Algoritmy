class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  print() {
    console.log(this.queue);
    return(this.queue)
  }
  push(junction, priority) {
    let added = false;
    if(this.isEmpty()) {
      this.queue.push([junction, priority]);
    } else {
      for (let i = 0; i < this.queue.length; i++) {
        if (priority < this.queue[i][1]) {
          added = true
          this.queue.splice(i, 0, [junction, priority]);
          break;
        }
      }

      if (!added) {
        this.queue.push([junction, priority]);
       }
    }
  }
  shift() {
    let junction = this.queue.shift();
    return junction[0];
  }
  isEmpty() {
    return (this.queue.length === 0);
  }
  length() {
    return this.queue.length;
  }
}

module.exports = PriorityQueue;
