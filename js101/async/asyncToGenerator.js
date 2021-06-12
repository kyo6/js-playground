function asyncToGenerator(genFunc) {
  return function () {
    const gen = genFunc.apply(this, arguments);
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let generatorResult;
        try {
          generatorResult = gen[key](arg);
        } catch (err) {
          return reject(err);
        }
        const { value, done } = generatorResult;
        if (done) {
          return resolve(value);
        } else {
          return Promise.resolve(value).then(
            (val) => {
              step("next", val);
            },
            (err) => {
              step("throw", err);
            }
          );
        }
      }
      step("next");
    });
  };
}
var gen = asyncToGenerator(testG);
gen().then((res) => console.log(res));
