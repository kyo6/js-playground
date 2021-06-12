function fetchRandom() {
  const url =
    "https://www.random.org/decimal-fractions/" +
    "?num=1&dec=10&col=1&format=plain&rnd=new";
  return fetch(url);
}

async function* asyncGenerator() {
  console.log("Start");
  const result = await fetchRandom(); // (A)
  yield "Result: " + (await result.text()); // (B)
  console.log("Done");
}

const ag = asyncGenerator();
ag.next().then(({ value, done }) => {
  console.log(value);
});
