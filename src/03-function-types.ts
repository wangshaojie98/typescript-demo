console.log('*************函数类型进阶***********')
const a = [1, true]

/**
 * 改善元组的类型推到
 */

function myTube<T extends unknown []>(...ts: T): T {
  return ts
}

const b = myTube(1, true)


/**
 * 自定义的类型防护措施
 */

function isString(a: unknown): boolean {
  return typeof a === 'string'
}

// function parseInputByError(input: string | number) {
//   let formattedInput: string;

//   if (isString(input)) {
//     formattedInput = input.toUpperCase() // Property 'toUpperCase' does not exist on type 'string | number'.
//   }
// }

function isString1(a: unknown): a is string {
  return typeof a === 'string'
}

function parseInput(input: string | number) {
  let formattedInput: string;

  if (isString1(input)) {
    formattedInput = input.toUpperCase()
  }
}