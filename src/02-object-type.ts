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

get1(wsj, 'wsj')
get1(wsj, 'wsj', 'name')
// get1(wsj, 'wsj1') // TS2345: Argument of type '"wsj1"' is not assignable to parameter of type '"wsj"'.
