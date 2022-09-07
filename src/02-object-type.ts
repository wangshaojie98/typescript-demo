/**
 * “键入”运算符
 */
type APIResponse = {
  user: {
    userId: string;
    friendList: {
      counts: number;
      friends: {
        firstName: string;
        lastName: string;
      } []
    } 
  }
}

type FriendList = APIResponse['user']['friendList']
type Friend = FriendList['friends'][number]


/**
 * keyof 运算符 获取对象所有键的类型 
 */
type ResponseKeys = keyof APIResponse // "user"

type UserKeys = keyof APIResponse['user'] // "friendList" | "userId"

type FriendListKeys = keyof APIResponse['user']['friendList'] // "friends" | "counts"

function get<O extends object, K extends keyof O>(o: O, k: K): O[K] {
  return o[k]
}
// 此处的extends 可以保持为至少为某种类型
interface Person {
  name: string
}
const student = {
  name: 'wsj',
  class: '2016'
}

get(student, 'name')
// get(student, 'age') // Argument of type '"age"' is not assignable to parameter of type '"name" | "class"'.

type A<K extends Person> = {
  wsj: K;
}

const wsj: A<Person> = {
  wsj: {
    name: 'saf'
  }
}

type Get1 = {
  < 
    O extends object,
    K extends keyof O
  >(o: O, k: K): O[K];
  < 
    O extends object,
    K extends keyof O,
    K1 extends keyof O[K]
  >(o: O, k: K, k1: K1): O[K][K1];
  < 
    O extends object,
    K extends keyof O,
    K1 extends keyof O[K],
    K2 extends keyof O[K][K1]
  >(o: O, k: K, k1: K1, k2: K2): O[K][K1][K2];
}

const get1: Get1 = (obj: any, ...keys: string []) => {
  let res = obj
  keys.forEach(it => obj = obj[it])
  return res
}
const user = {
  age: 24,
  address: {
    province: '河南',
  }
}
get1(wsj, 'wsj')
get1(wsj, 'wsj', 'name')
get1(user, 'address', 'province')
// get1(user, 'address', 'a') //  Argument of type '"a"' is not assignable to parameter of type '"province"'.
// get1(user, 'address', 'province', 'a') 
// 因为 province 这一层是字符串，当查找 a 属性会按照字符串对象去解析，所以报错是字符串的属性和原型内容找不到
// TS2345: Argument of type '"a"' is not assignable to parameter of type 'number | unique symbol | "toString" | "charAt" | "charCodeAt" | "concat" | "indexOf" | "lastIndexOf" | "localeCompare" | "match" | "replace" | "search" | "slice" | "split" | "substring" | ... 34 more ... | "at"'.


/**
 * Record<T, K> 工具类型
 * 将一组T类型作为键，K 类型作为值的映射对象
 */

type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
type Day = Weekday | 'Sat' | 'Sun'

let nextDay: Record<Weekday, Day> = {
  Mon: 'Tue',
  Tue: "Mon",
  Wed: "Mon",
  Thu: "Sun",
  Fri: "Mon"
}

// nextDay = {
//   Mon: 'Fri',
//   Tue: "Mon",
//   Wed: "Mon",
//   Thu: "Sun",
//   Fri: "a"
// }
// Type '"a"' is not assignable to type 'Day'.
let obj = {}
let recordTypes: Record<number | string, string> = {
  'e': '3',
  '2': '3',
  4: '4',
}


/**
 * [K in T]
 * 映射类型, T 是 字符串字面量
 */

let nextDay1: { [K in Weekday ]: Day} = {
  Mon: "Mon",
  Tue: "Mon",
  Wed: "Mon",
  Thu: "Mon",
  Fri: "Mon"
}

type Account = {
  id: number;
  isEmployee: boolean;
  notes: string;
}

type OptionAccount = {
  [K in keyof Account]: Account[K]
}

type OptionAccount1 = {
  [K in keyof Account]?: Account[K]
}

type NullableAccount = {
  [K in keyof Account]: Account[K] | null
}

type ReadonlyAccount = {
  readonly [K in keyof Account]: Account[K]
}

type User1 = {
  name: string,
  age: number
}


type User1Keys = keyof User1
type User1Optional = Partial<User1>
type User1Optional1 = {[K in User1Keys]?: User1[K]}


/**
 * 伴生对象模式
 */
 type Currency = {
  unit: 'USD' | 'EUR' | 'JPY' | 'CNY',
  value: number
}

const Currency = {
  DEFAULT: 'USD',
  from(value: number, unit: Currency['unit'] = 'USD'): Currency {
    return {
      value,
      unit
    }
  }
} as const

const currencyFn = (unit: Currency['unit'] = Currency.DEFAULT) => {
  return {
    unit
  }
}

const Currency1: { 
  readonly DEFAULT: 'USD', 
  from: (value: number, unit: Currency['unit']) => Currency
} = {
  DEFAULT: 'USD',
  from(value, unit = Currency1.DEFAULT) {
    return {
      value,
      unit
    }
  }
}