/**
 * 构造篇
 */


// infer 是局部变量
// type 是类型别名

/**
 * 数组类型
 */

/**
 * 传入一个数组，数组推入一个元素，返回元组类型
 */
type Push<Arr extends unknown [], Item> = [...Arr, Item]
type a1 = Push<[1, 2, 3], 4>

/**
 * 在数组前面添加一个元素
 */
type Unshift<T extends unknown [], U> = [U, ...T]
type a2 = Unshift<[1, 2, 3], 0>

/**
 * 合并两个数组，按照下标顺序配对成二元组
 */
type Zip<One extends unknown[], Other extends unknown[]> = 
  One extends [infer OneFirst, ...infer OneRest] 
    ? Other extends [infer OtherFirst, ...infer OtherRest]
      ? [[OneFirst, OtherFirst], ...Zip<OneRest, OtherRest>]
      : []
    : []
type a3 = Zip<[1, 2, 3], ['a', 'b', 'c']>



// type IsTwoTuple<T> = T extends [infer A, ...unknown []] ? (A extends unknown [] ? true : false) : false
// type IsOneTuple<T> = T extends [infer A, ...unknown []] ? (A extends unknown [] ? false : true) : true
// type b1 = IsOneTuple<[1, 2, 3]>
// type b2 = IsTwoTuple<[[1, 2, 3]]>

// type MyConcatZip<
//   T extends [unknown [], ...unknown []]
// > = 
// T extends [infer RestFirst, ...infer RestOther] 
//   ? IsOneTuple<RestFirst> extends true
//     ? IsTwoTuple<RestOther> extends true
//       ? [...RestFirst, ...MyConcatZip<RestOther>]
//       : [...RestOther]
//     : []
//   :[]

// type a4 = MyConcatZip<[[1, 2, 3], ['a', 'b', 'c'], ['d', 'e']]>
// type MyConcat = {
//   <
//     T extends [unknown [], ...unknown []],
//   >(...args: T) : MyConcatZip<T>
// }
// const myConcat1: MyConcat = (...args: [unknown [], ...unknown []]) => {
//   const firstArr = args[0]
//   const rest = args.slice(1)
//   return firstArr.concat(...rest)
// }
function myConcat<T, U extends any [] = T []>(firstArr: T [], ...args: U []): T [] | U {
  return firstArr.concat(...args)
}
const myConcatRes = myConcat([1, 2, 3], ['a'])

/**
 * 转换首字符大写
 * 利用内置类型 Uppercase
 */
type CapitalizeStr<Str extends string> = Str extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : Str
type s1 = CapitalizeStr<'absss'>


/**
 * CamelCase
 * SnakeCase to CamelCase
 */
type CamelCase<Str extends string> = Str extends `${infer First}_${infer Second}${infer Rest}` ? `${First}${CapitalizeStr<Second>}${CamelCase<Rest>}` : Str
type s2 = CamelCase<'ab_cd_ef'>


/**
 * 删除某个子串
 */
type DropSubStr<Str extends string, SubStr extends string> = 
  Str extends `${infer Prefix}${SubStr}${infer Suffix}`
    ? DropSubStr<`${Prefix}${Suffix}`, SubStr>
    : Str
type s3 = DropSubStr<'abcccddcccsc', 'c'>


/**
 * 在已有的函数参数类型加一个类型
 */
type AppendArgument<Fn extends Function, Arg> = 
  Fn extends (...args: infer Args) => infer ReturnType
    ? (...args: [...Args, Arg]) => ReturnType
    : Fn
type f1 = AppendArgument<(name: string) => boolean, number>


/**
 * 索引类型的重新构造
 * 除了可以对 Value 做修改，也可以对 Key 做修改，使用 as，这叫做重映射：
 */

/**
 * 将索引类型的value重复三次
 */
type MappingRepeat3Value<Obj extends object> = {
  [key in keyof Obj]: [Obj[key], Obj[key], Obj[key]]
} 
type f2 = MappingRepeat3Value<{a: 'a', b: 'b'}>

/**
 * 将索引类型 Key 大写
 */
type UppercaseMappingKey<Obj extends object> = {
  [key in keyof Obj as Uppercase<(key & string)>]: Obj[key]
}

type f3 = UppercaseMappingKey<{abc: 'a', bac: 'b'}>

/**
 * 过滤属性通过值的类型
 * 如果原来索引的值 Obj[Key] 是 ValueType 类型，索引依然为之前的索引 Key，否则索引设置为 never，never 的索引会在生成新的索引类型时被去掉。
 */
type FilterByValueType<Obj extends Record<string, any>, FilterType> = 
  { // as (Obj[Key] extends FilterType ? Key : never)
    [Key in keyof Obj as (Obj[Key] extends FilterType ? Key : never)]: Obj[Key]
  }
interface Person {
  name: string;
  age: number;
  hobby: string [];
}
type f4 = FilterByValueType<Person, number | string>