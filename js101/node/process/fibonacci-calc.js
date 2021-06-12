function fib(n) {
  if (n < 2) {
    return 1;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
}

process.on('message', (m) => {
  process.send({result: fib(m.input)})
})