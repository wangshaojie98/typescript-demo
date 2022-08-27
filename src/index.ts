function log(message: string, userId = 'Not signed in') {
  const time = new Date().toISOString()
  console.log(time, message, userId)
}

log('user clicked on a button', 'da763be')
log('user signed out')


type Context = {
  appId?: string;
  userId?: string;
}

function log1(message: string, context: Context = {}) {
  const time = new Date().toISOString()
  console.log(time, message, context.userId)
}

function sumVariadicSafe(...numbers: number []): number {
  return numbers.reduce((total, cur) => total + cur, 0)
}

interface Console {
  log(message?: any, ...optionalParams: any []): void
}


function* createNumbers(): IterableIterator<number> {
  let n = 0;

  while (1) {
    yield n++
  }
}

let numbers = createNumbers()
console.log(numbers.next())
console.log(numbers.next())
console.log(numbers.next())
console.log(numbers.next())

type sum = (a: number, b: number) => number

/**
 * 调用签名
 */

type Log = (message: string, userId?: string) => void

let log2: Log = (message, userId = 'not signed in') => {
  console.log(message, userId)
}


/**
 * 上下文类型推导
 */
interface TimeFn {
  (index: number): void
}

type TimeFn1 = (index: number) => void

type TimeFn2 = {
  (index: number): void
}
function times(
  fn: TimeFn2,
  n: number
) {
  for (let i = 0; i < n; i++) {
    fn(i)
  }
}

times((n) => console.log(n), 5)

// function timesFn(n) { // Parameter 'n' implicitly has an 'any' type.
//   console.log(n)
// }


/**
 * 多态
 */

// function filter(array, f) {
//   let result = []
//   for (let i = 0; i < array.length; i++) {
//     if (f(result[i])) {
//       result.push(result[i])
//     }
//   }

//   return result
// }

type Filter = {
  (array: number [], f: (item: number) => boolean): number [];
  (array: string [], f: (item: string) => boolean): string [];
  (array: object [], f: (item: object) => boolean): object [];
}

type Filter1 = {
  <T>(array: T [], f: (item: T) => boolean): T []
}
type Filter2 = <T>(array: T [], f: (item: T) => boolean) => T []

function filter3<T>(array: T [], f: (item: T) => boolean): T [] {
  let result = []
  for (let i = 0; i < array.length; i++) {
    if (f(array[i])) {
      result.push(array[i])
    }
  }
  return result
};

interface Filter4 {
  <T>(array: T [], f: (item: T) => boolean): T []
}
let names = [
  { firstName: 'beth' },
  { firstName: 'caitlyn' },
  { firstName: 'xin' },
]

const filter4: Filter4 = (array, f) => {
  let result = []
  for (let i = 0; i < array.length; i++) {
    if (f(array[i])) {
      result.push(array[i])
    }
  }
  return result
}
filter3(names, it => it.firstName === 'xin')
filter4(names, it => it.firstName === 'xin')

// function filter(array, f) {
//   let result = []
//   for (let i = 0; i < array.length; i++) {
//     if (f(result[i])) {
//       result.push(result[i])
//     }
//   }

//   return result
// }


// 类型别名-自动推导
type F1 = <T>(array: T [], f: (it: T) => boolean) => T []
type F2 = {
  <T>(array: T [], f: (it: T) => boolean): T [] 
}

// 类型别名-主动绑定
type F3<T> = (array: T [], f: (it: T) => boolean) => T []
type F4<T> = {
  (array: T [], f: (it: T) => boolean): T [] 
}

const f1: F3<number> = (array, f) => {
  let result = []
  for (let i = 0; i < array.length; i++) {
    if (f(array[i])) {
      result.push(array[i])
    }
  }
  return result
}
const f2: F4<string> = (array, f) => {
  let result = []
  for (let i = 0; i < array.length; i++) {
    if (f(array[i])) {
      result.push(array[i])
    }
  }
  return result
}

// 接口
interface F5 {
  <T>(array: T [], f: (it: T) => boolean): T [] 
}

// 主动绑定
interface F6<T> {
  (array: T [], f: (it: T) => boolean): T [] 
}
// 函数
function f7<T>(array: T [], f: (item: T) => boolean): T [] {
  let result = []
  for (let i = 0; i < array.length; i++) {
    if (f(array[i])) {
      result.push(array[i])
    }
  }
  return result
};


/**
 * 实现一个map
 */
const map = (array: unknown [], fn: (it: unknown) => unknown ): unknown [] => {
  const res = []
  for (let i = 0; i < array.length; i++) {
    res.push(fn(array[i]))
  }
  return res
}

type Map1 = <T, U>(array: T [], fn: (it: T) => U) => U []

const p = new Promise<number>((resolve) => resolve(46))
p.then(res => res * 4)


/**
 * 泛型别名
 */

type MyEvent<T> = {
  target: T,
  type: string
}

type ButtonEvent = MyEvent<HTMLButtonElement>

const myEvent: MyEvent<HTMLButtonElement | null> = {
  target: document.querySelector('#btn'),
  type: 'click'
}

function triggerEvent<T>(event: MyEvent<T>): void {
  console.log(event)
}

triggerEvent({
  target: document.getElementById('btn'),
  type: 'mouseover'
})


/**
 * 树节点
 */

type TreeNode = {
  value: string
}

type LeafNode = TreeNode & {
  isLeaf: true
}

type InnerNode = TreeNode & {
  children: [TreeNode] | [TreeNode, TreeNode]
}

const a: TreeNode = {
  value: 'a'
}

const b: LeafNode = {
  value: 'b',
  isLeaf: true,
}
const c: InnerNode = {
  value: 'c',
  children: [b]
}

function mapNode<T extends TreeNode>(
  node: T,
  f: (value: string) => string
): T {
  return {
    ...node,
    value: f(node.value)
  }
}

let a1 = mapNode(a, _ => _.toLowerCase()) // TreeNode
let b1 = mapNode(b, _ => _.toLowerCase()) // LeafNode
let c1 = mapNode(c, _ => _.toLowerCase()) // InnerNode

/**
 * 受限多态
 */

type HasSides = { numberOfSides: number }
type SidesHaveLength = { sideLength: number }

function logPerimeter<Shape extends HasSides & SidesHaveLength>(s: Shape): Shape {
  console.log(s.numberOfSides * s.sideLength)
  return s
}

type Square = { numberOfSides: number, sideLength: number }
const square: Square = { numberOfSides: 4, sideLength: 3 }
const res = logPerimeter(square)

/**
 * 受限多态模拟剩余参数
 */

// function call(
//   fn: (...args: unknown []) => unknown,
//   ...args: unknown []
// ): unknown {
//   return fn(...args)
// }

function call<T extends unknown [], U>(
  fn: (...args: T ) => U,
  ...args: T
): U {
  return fn(...args)
}

function fill(length: number, value: string): string [] {
  return Array.from({ length }, () => value)
}

console.log('call', call(fill, 19, 'a'))
// console.log('call', call(fill, 19)) // Expected 3 arguments, but got 2.
// console.log('call', call(fill, 19, 'a', 'z')) // Expected 3 arguments, but got 4.


/**
 * 指定泛型默认类型
 */

type MyEventWithDefault<T = HTMLElement | null> = {
  target: T,
  type: string
}

type MyEventWithDefault1<T extends HTMLElement | null = HTMLElement | null> = {
  target: T,
  type: string
}

const btn = document.getElementById('btn')

const btnType: MyEventWithDefault = {
  target: btn,
  type: 'clicl'
}
const btnType1: MyEventWithDefault1 = {
  target: btn,
  type: 'clicl'
}

function is<T>(a: T, b: T): boolean {
  return a === b
}

is('string', 'sss')
// is(true, 'sss') // Argument of type 'string' is not assignable to parameter of type 'boolean'.
is(true, false)
is(42, 42)


function is1<T>(first: T, ...args: [T, ...T []]): boolean {
  
  return args.some(arg => arg === first)
}
// is1(1, 2, '3') // Argument of type 'string' is not assignable to parameter of type 'number'.
is1(1, 2, 3)
// is1(1) // Expected at least 2 arguments, but got 1.
// is1(1, [2], ['3'])