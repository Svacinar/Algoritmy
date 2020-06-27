const {isInputValidated, findPath, returnPath, returnTimeConsumption, getQuickestPath} = require('./index.js');

describe("Test for getQuickest Path", function() {

  test("should return truthy with correct set of nodes", () => {
    expect(getQuickestPath("S","G")).toBeTruthy();
  })

  test("should return false with uncorrect set of nodes", () => {
    expect(getQuickestPath("nesmysl", "G")).toBe(false);
  })

})

describe("Tests for isInputValidated function", function() {
  const junctions = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "S", "L" ]

  test("should return true on succesful verification", () => {
    expect(isInputValidated("S", "G", junctions)).toBe(true);
  })
  test("should return false on non existent nodes", () => {
    expect(isInputValidated("nesmysl1", "nesmysl2", junctions)).toBe(false);
  })

})

describe("Test for returnPath function ", function() {

  test("should return sequence of nodes - path", () => {
    expect(returnPath("S", "G")).toEqual("Your route is S -> B -> H -> G");
  })

})

//refaktorovat cely test - porovnat vytvoreny var se vzorem??
describe("Tests for findPath function", function() {

  test("should function properly", () => {
    expect(findPath("S", "G")).toBeUndefined();
  })

})


describe("Test for returnTimeConsumption function", function() {

  test("should return time consumption in hrs", () => {
    expect(returnTimeConsumption("G")).toEqual("Time consumption is 5 hrs");
  })

})










//validate input

//return valid length

//return valid paths
