/**
 * 条件类型
 */

 interface Part {
  id: number;
  name: string;
  subparts: Part[];
  updatePart(newName: string): void;
}
// 因为never类型不会被索引访问返回
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

type R = FunctionPropertyNames<Part> // type R = "updatePart"


type FunctionPropertyNames1<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}

type R1 = FunctionPropertyNames1<Part>
type fnName = R1[keyof R1]


/**
 * inter 关键字
 * 是未知类型的一个占位符的泛型
 */
 interface User {
  id: number
  name: string
  form?: string
}

type Foo = () => User
type MyReturnType<T> = T extends (...args: any) => (infer R) ? R : any
type R2 = MyReturnType<Foo> // User


// 获取构造函数的参数
class TestClass {
  constructor(public name: string, public age: number) {}
}
type B = typeof TestClass
type MyConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer R) => any ? R : never
type R3 = MyConstructorParameters<typeof TestClass>



// tuple转union,比如[string, number] -> string | number
type ElementOf<T> = T extends (infer R) [] ? R : never

type ATuple = [string, number];
type ToUnion = ElementOf<ATuple>;


// union 转 intersection，如：string | number -> string & number
// type UnionToIntersection<U> = 

// type Result = UnionToIntersection<string | number>;


/**
 * Q 内置类型
 * 
 */

// Exclude<T, U> 排除 T 中 U 的类型
type Q1 = number | string;
type Q2 = string
type Q3 = Exclude<Q1, Q2> // number

// Extract<T, U> 计算 T 中能赋值给 U 的类型
type Q4 = number | string
type Q5 = string
type Q6 = Extract<Q4, Q5> // string

// NonNullable<T> 从 T 中排除 null 和 undefined 类型
type Q7 = { 
  a?: number | null;
}
type Q8 = NonNullable<Q7['a']> // number

// ReturnType<F> 计算函数的返回类型
type F = (a: number) => number
type Q9 = ReturnType<F> // number

// InstanceType<C> 计算类构造方法的实例类型
type W = {
  b: number
}

type W1 = {
  new (): W
}

type W2 = InstanceType<W1> // { b: number; }