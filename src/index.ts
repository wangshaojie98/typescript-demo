/**
 * unknown 类型
 */

let a: unknown = 30
let b = a === 123
// let c = a + 10 // TS2571: Object is of type 'unknown'.

if (typeof a === 'number') {
  let d = a + 10
  console.log(d)
}

console.log(a)

/**
 * number 类型
 */

let oneMillion = 1_000_000 // 等同于1000000
let twoMillion = 2_000_000 // 等同于2000000

console.log({
  oneMillion,
  twoMillion
})


/**
 * 对象
 */

let a1: object = {
  b: 'x'
}
// console.log(a1.b) //Property 'b' does not exist on type 'object'.

let a2 = {
  b: 'x'
}

console.log(a2.b)
const a3: { b: number } = {
  b: 22
}

const a4 = {
  b: 23
}
let i;
// let j = i * 3 // Object is possibly 'undefined'.

const a5: {
  b: number;
  c?: string;
  [key: number]: boolean;
} = {
 b: 3,
 c: 'ss'
}
a5.c = '33'
a5[8] = true


/**
 * 类型别名
 */

type Color = 'red'
let c1: Color = 'red'
// c1 = 'blue' // Type '"blue"' is not assignable to type '"red"'.


/**
 * 并集和交集
 */

type Cat = { name: string, purrs: boolean }
type Dog = { name: string, barks: boolean, wags: boolean }
type CatOrDogOrBoth = Cat | Dog
type CatAndDog = Cat & Dog

const cat1: Cat = { name: 'aa', purrs: true }
const dog1: Dog = { name: 's', barks: true, wags: true }
const cat1_dog1: CatOrDogOrBoth = {
  name: 'aa', purrs: true
}
const cat1_dog2: CatOrDogOrBoth = {
  name: 's', barks: true, wags: true
}
const cat1_dog3: CatOrDogOrBoth = {
  name: 's', barks: true, wags: true, purrs: true
}

const cat1_dog4: CatAndDog = {
  name: 's',
  purrs: true,
  barks: true,
  wags: true
}

/**
 * 枚举类型
 */

enum Language {
  Chinese,
  English,
  Russian
}

console.log(Language)
const g = [3]
g.push(2)
const g1 = [true, true, false]

let h: 3 = 3