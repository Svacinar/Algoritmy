const junctions = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "S", "L" ] //seznam krizovatek

let resultsArray = new Map();   //mapa (krizovatka, [vzdalenost, predchoziNode])

const routes = [
  ["S" , "C", 3],
  ["S" , "A", 7],
  ["S" , "B", 2],
  ["A" , "B", 3],
  ["A" , "D", 4],
  ["B" , "D", 4],
  ["B" , "H", 1],
  ["H" , "F", 3],
  ["D" , "F", 5],
  ["H" , "G", 2],
  ["G" , "E", 2],
  ["C" , "L", 2],
  ["L" , "I", 4],
  ["L" , "J", 4],
  ["J" , "K", 4],
  ["I" , "K", 4],
  ["K" , "E", 5],
  ["E" , "G", 2],
]; //narocnost cesty mezi krizovatkami

let graph = new Map();

function priorityQueue() {
   let queue = [];

   this.print = function() {
    console.log(queue);
    return(queue)
  }
  this.push = function(junction, priority) {
    if(this.isEmpty()) {
      queue.push([junction, priority]);
    } else {
      for (let i = 0; i < queue.length; i++) {
        let added = false;
        if (priority < queue[i][1]) {
          added = true
          queue.splice(i, 0, [junction, priority]);
          break;
        }
        if (!added) {
          queue.push([junction, priority]);
          break;
        }
      }
    }
  }
  this.shift = function() {
    let junction = queue.shift();
    return junction[0];
  }
  this.isEmpty = function() {
    return (queue.length === 0);
  }
  this.length = function() {
    return queue.length;
  }
}

let queue = new priorityQueue();

function addNode(junction) {
  resultsArray.set(junction, [Infinity, null]); //set default value - all junctions are inaccessible
  graph.set(junction, new Map()); //graf - krizovatka a mapa cest kam lze jit + cas
}

//pridat edge mezi obema (undirected)
function addEdge(startJunction, endJunction, weight){
  graph.get(startJunction).set(endJunction,weight);
  graph.get(endJunction).set(startJunction, weight);
}

junctions.forEach(addNode);
routes.forEach(route => addEdge(...route)) //ES6 spread operator - kazdy ze 3 argumentu z routes zvlast

//Funkce pro zobrazeni nejrychlejsi trasy - je volana zevnitr fce findPath
function returnPath(start, end) {
  let path = [];
  path.unshift(resultsArray.get(end)[1]);
  while (path[0] !== start) {
    path.unshift(resultsArray.get(path[0])[1])
  }
  console.log("Your route is " + path.join(" -> ") + " -> " + end);
}

function findPath(start, end) {
  let visited = new Set();  //set - lze vlozit jen unikatni keys
  queue.push(start,0);
  queue.length();
  resultsArray.set(start, [0, null]);

  while (queue.length() > 0 ) {
    debugger;
    const junction = queue.shift();
    visited.add(junction[0]);
    const paths = graph.get(junction[0]);
    for(let path of paths)   {
      const before = resultsArray.get(path[0])[0];
      const after = path[1] + resultsArray.get(junction)[0];
      console.log( before, after)
      if (after < before) {
        resultsArray.set(path[0], [after,junction])
      }
     if(!visited.has(path[0])) {
       queue.push(path[0], resultsArray.get(path[0])[0]);

     }
    }
  }
  returnPath(start, end);
  console.log("Time consumption is " + resultsArray.get(end)[0] + " hrs");
}

findPath("S", "A");
