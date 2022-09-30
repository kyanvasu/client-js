// code.bryan: basically TSDX reads this file and map the tsconig aliases to be use on the compile version
module.exports = {
  // ..
  "plugins": [
    [
      "module-resolver",
      {
        "extensions": ['.ts', '.tsx'],
        "root": "./",
        "alias": {
          "core": ["./src/core"],
          "modules": ["./src/modules"],
          "types": ["./src/types"],
          "errors": "./src/errors"
        }
      }
    ]
  ]
}