// import { transform } from 'babel-core'

// transform('console.log("hello world" + "!")', {
//   plugins: [
//     {
//       visitor: {
//         StringLiteral() {
//           console.log('found a string!')
//         }
//       }
//     }
//   ]
// });
// console.log(exports)
// console.log(module)
// console.log(require)
Object.defineProperty(exports, "__esModule", {
  value: true,
});
console.log(require.main === module);
console.log(require.main.filename)

console.log(arguments)