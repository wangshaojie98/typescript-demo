/**
 * 会用提取和构造之后，我们可以写出很多类型编程了，但是有时候构造或提取的数组元素不固定、字符串长度不确定、对象层级不确定该怎么办？
 * 用递归解决。
 */
// Promise 复用
/**
 * 取出最深层次的Promise的类型
 */
type DeepPromiseValueType<T> =
  T extends Promise<infer U>
    ? DeepPromiseValueType<U>
    : T
type p1 = DeepPromiseValueType<Promise<Promise<Promise<Record<string, string>>>>>

// 数组类型
/**
 * reverse an array
 */
type ReverseArray<Arr extends unknown []> =
  Arr extends [...infer Rest, infer Last]
    ? [Last, ...ReverseArray<Rest>]
    : []
type p2 = ReverseArray<[1, 2, 3, 4]>


/**
 * Does the array contain an element
 */
type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false);
  
type Includes<Arr extends unknown [], FindItem> =
  Arr extends [infer Item, ...infer Rest]
    ? IsEqual<Item, FindItem>  extends true 
      ? true 
      : Includes<Rest, FindItem>
    : false
type p3 = Includes<[1, 2, 3, 4], 4>
type p4 = Includes<[1, 2, 3, 4], 5>

/**
 * Delete the specified element
 */
type RemoveItem<Arr extends unknown [], SpecifiedItem> =
  Arr extends [infer Item, ...infer Rest]
    ? IsEqual<Item, SpecifiedItem> extends true
      ? [...RemoveItem<Rest, SpecifiedItem>]
      : [Item, ...RemoveItem<Rest, SpecifiedItem>]
    : Arr
type p5 = RemoveItem<[1, 2, 3, 4], 3>
type p5_1 = RemoveItem<[1, 3, 2, 3, 4], 3>
type p5_2 = RemoveItem<[1, 2, 3, 4], 5>


/**
 * Build an array by length
 */
type BuildArray<Length extends number, Elm = unknown, Arr extends unknown [] = []> = 
  Arr['length'] extends Length
    ? Arr
    : BuildArray<Length, Elm, [...Arr, Elm]>
type BuildArrayResult = BuildArray<5>
type BuildArrayResult1 = BuildArray<5, 1>


// 字符串类型
/**
 * Replace all matching elements
 */
type ReplaceAll<Str extends string, Matching extends string, ReplaceMent extends string> =
  Str extends `${infer Prefix}${Matching}${infer Suffix}`
    ? `${Prefix}${ReplaceMent}${ReplaceAll<Suffix, Matching, ReplaceMent>}`
    : Str
type ReplaceAllResult = ReplaceAll<'esModule Webpack Esbuild Swc-loder', 'e', '-'>


/**
 * string type to union type
 */
type StringToUnion<Str extends string> = Str extends '' ? never : Str extends `${infer First}${infer Rest}` ? First | StringToUnion<Rest> : Str
type StringToUnionResult = StringToUnion<'abcde'>


/**
 * reverse a string
 */
type ReverseString<Str extends string, Result extends string = ''> = 
  Str extends `${infer First}${infer Rest}` 
    ? ReverseString<Rest, `${First}${Result}`> 
    : Result;
type ReverseStringResult = ReverseString<'abcde'>


// object type
/**
 * add readonly type to object depth
 */
type DeepReadonly<T extends Record<string, any>> = {
  readonly [Key in keyof T]: 
    T[Key] extends object 
      ? T[Key] extends Function 
        ? T[Key] 
        : DeepReadonly<T[Key]>
      : T[Key]
}

type obj = DeepReadonly<{
  a: {
      b: {
          c: {
              f: () => 'dong',
              d: {
                  e: {
                      guang: string
                  }
              }
          }
      }
  }
}>
type ObjB = obj['a']['b']['c']