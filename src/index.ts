function getPropValue<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}


// type First<T extends unknown []> = T extends [infer A, ...infer B] ? A : never
type First<Tuple extends unknown[]> = Tuple[0] extends undefined ? never : Tuple[0]
type r1 = First<[1]>

type r2 = 2 & '1' // 交叉类型：同一类型合并，不用类型舍弃变成 never

type p = Promise<'wsk'>
type GetValueType<T> = T extends Promise<infer Value> ? Value : never;
type r3 = GetValueType<p>

// First
type GetFirst<T extends unknown []> = T extends [infer A, ...unknown[]] ? A : never
type r4 = GetFirst<[1, 23]>

// Last
type GetLast<T extends unknown[]> = T extends [...unknown [], infer Last] ? Last : never
type r5 = GetLast<[1, 2, 3]>

// without last
type GetWithoutLast<T extends unknown []> = 
  T extends [] 
  ? [] 
  : T extends [...infer Rest, unknown] ? Rest : never
type r6 = GetWithoutLast<[1]>

// withoutFirst
type GetWithoutFirst<T extends unknown []> =
  T extends []
    ? []
    : T extends [unknown, ...infer Rest] ? Rest : never

type r7 = GetWithoutFirst<[1, 2, 3]>

/**
 * 字符串
 */
type GetStartsWith<Str extends string, Prefix extends string> = 
  Str extends `${Prefix}${string}` ? true : false;

type r8 = GetStartsWith<'abc', 'ab'>
type r8_1 = GetStartsWith<'abc', 'b'>

// Replace
type MyReplace<
  Str extends string,
  Match extends string,
  ReplaceMent extends string
> = Str extends `${infer Prefix}${Match}${infer Suffix}` 
    ? `${Prefix}${ReplaceMent}${Suffix}`
    : Str;

type r9 = MyReplace<'wsj study what', 'what', 'typescript'>

// trimRight
type TrimRight<Str extends string> = Str extends `${infer Rest}${' ' | '\n' | '\t'}` ? TrimRight<Rest> : Str
type t1 = TrimRight<'askasf      '>

type TrimLeft<Str extends string> = Str extends `${' ' | '\n' | '\t'}${infer Rest}` ? TrimLeft<Rest> : Str
type t2 = TrimLeft<'   aaas'>

type Trim<Str extends string> = TrimRight<TrimLeft<Str>>
type t3 = Trim<'   asdf  sss   '>


/**
 * 函数
 */
// get function parameters
type GetParameters<Fn extends Function> = Fn extends (...args: infer P) => unknown ? P : never
type f1 = GetParameters<(name: string, age: number) => string>

// get return type
// note: args not set unknown
type GetReturnType<Fn extends Function> = Fn extends (...args: any []) => infer P ? P : never
type f2 = GetReturnType<(name: string) => string>

// get this type
class Dog {
  name: string;
  constructor(name: string) {
    this.name = name
  }

  say(this: Dog) {
    return `Hello, I am a ${this.name}!`
  }
}

const dog = new Dog('dog')
dog.say()

type GetThisParametersType<
  T extends (...args: any) => unknown
> = 
  T extends (this: infer ThisType, ...args: any []) => unknown  ? ThisType : never

type t4 = GetThisParametersType<typeof dog.say>

/**
 * Constructor
 */

// get instance type
type GetInstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer InstanceType ? InstanceType : any
type t5 = GetInstanceType<typeof Dog>
interface Person {
  name: string;
}

interface PersonConstructor {
  new (name: string): Person
}

type t6 = GetInstanceType<PersonConstructor>

// get constructor parameters
type GetConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : any
type t7 = GetConstructorParameters<PersonConstructor>
type t8 = GetConstructorParameters<typeof Dog>

// get ref of props
type GetRefProps<P> = 
  'ref' extends keyof P
  ? P extends { ref?: infer R | undefined } ? R : never
  : never;

type t9 = GetRefProps<{ref: 1}>
type t9_1 = GetRefProps<{ b: 2}>
