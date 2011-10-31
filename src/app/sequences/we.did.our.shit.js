var sequence          = require("/lib/core/sequence"),
  doSomeShit          = require("/app/commands/doSomeShit"),
  doSomeMoreShit      = require("/app/commands/doSomeMoreShit"),
  doSomeDifferentShit = require("/app/commands/doSomeDifferentShit"),
  seq;

seq = object.create(sequence).init({
  execute: {
    "doSomeShit": {
      100: {
        execute: {
          doSomeMoreShit: {
            100: {
              event: "we.did.some.shit"
            }
          }   
        }
      },
      200: {
        execute: {
          doSomeDifferentShit: {
            100: {
              event: "we.did.some.different.shit"
            }                  
          }   
        }
      },
      300: {
        undo: {
          doSomeShit: {
            100: {
              event: "we.undid.our.shit"
            }
          }
        }
      },
      400: {
          event: "we.have.no.shit.left.to.do"
      }
    }
  }
});

seq.on("seriously.do.some.shit");
seq.once("only.do.this.shit.once");