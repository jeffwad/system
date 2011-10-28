/*
  @name:         main2 tests

  @description:  specs for main 2

  @author:       Simon Jefford
  
*/
var main2 = require("/app/main2").main2;

describe("main2", function() {

  beforeEach(function() {

  });

  it("main2 should equal fucked it", function() {
    
    expect(main2).toEqual("fucked it");

  });

});