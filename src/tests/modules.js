/*
  @name:         modules

  @description:  add spec files here

  @author:       Simon Jefford
  
*/

//  unit tests
require("/tests/unit");
require("/tests/ui");
require("/tests/integration");


//  do not delete
var jasmineEnv, trivialReporter, currentWindowOnload;

function execJasmine() {
  jasmineEnv.execute();
}

jasmineEnv = jasmine.getEnv();
jasmineEnv.updateInterval = 1000;

trivialReporter = new jasmine.TrivialReporter();

jasmineEnv.addReporter(trivialReporter);

jasmineEnv.specFilter = function(spec) {
  return trivialReporter.specFilter(spec);
};

currentWindowOnload = window.onload;

window.onload = function() {
  if (currentWindowOnload) {
    currentWindowOnload();
  }
  execJasmine();
};

