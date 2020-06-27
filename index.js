import PriorityQueue from './PriorityQueue.js';

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

let queue = new PriorityQueue();

function addNode(junction) {
  resultsArray.set(junction, [Infinity, null]); //set default value - all junctions are inaccessible
  graph.set(junction, new Map()); //graf - krizovatka a mapa cest kam lze jit + cas
}

//pridat edge mezi obema (undirected)
function addEdge(startJunction, endJunction, weight){
  graph.get(startJunction).set(endJunction, weight);
  graph.get(endJunction).set(startJunction, weight);
}

junctions.forEach(addNode);
routes.forEach(route => addEdge(...route)) //ES6 spread operator - kazdy ze 3 argumentu z routes zvlast

function isInputValidated(start, end, junctions) {
  let junctionsContainsStart = junctions.indexOf(start);
  let junctionsContainsEnd = junctions.indexOf(end);
  if (junctionsContainsStart > -1 && junctionsContainsEnd > -1)  {
    return true
  }
  return false;
}

function findPath(start, end) {
  let visitedJunctions = new Set();  //set - lze vlozit jen unikatni keys
  queue.push(start,0);
  resultsArray.set(start, [0, null]);
  while (queue.length() > 0 ) {
    const junction = queue.shift();
    visitedJunctions.add(junction[0]);
    const paths = graph.get(junction[0]);
    for(let path of paths)  {
      const before = resultsArray.get(path[0])[0];
      const after = path[1] + resultsArray.get(junction)[0];
      if (after < before) {
        resultsArray.set(path[0], [after,junction])
      }
     if(!visitedJunctions.has(path[0])) {
       queue.push(path[0], resultsArray.get(path[0])[0]);
     }
    }
  }

}

function returnPath(start, end) {
  let path = [];
  path.unshift(resultsArray.get(end)[1]);
  while (path[0] !== start) {
    path.unshift(resultsArray.get(path[0])[1])
  }
  console.log("Your route is " + path.join(" -> ") + " -> " + end);
  return("Your route is " + path.join(" -> ") + " -> " + end)
}

function returnTimeConsumption(end) {
  let endNode = resultsArray.get(end)[0];
  console.log("Time consumption is " + endNode + " hrs")
  return "Time consumption is " + endNode + " hrs" ;
}

function getQuickestPath(start, end) {
  if (!isInputValidated(start, end, junctions)) {
    console.log("wrong input");
    return false
  }
  findPath(start, end);
  returnPath(start, end);
  returnTimeConsumption(end);
  return  "Function Executed Properly"
}

//getQuickestPath("S","G");

module.exports = {isInputValidated, findPath, returnPath, returnTimeConsumption, getQuickestPath};
