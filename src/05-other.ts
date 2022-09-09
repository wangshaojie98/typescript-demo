/**
 * 解决办法
 */

function formatInut(input: string): string {
  return input
}

function getUserInput(input: string | number) {
  if (isString(input)) return input

  return input
}

function isString(str: any): str is string {
  return typeof str === 'string'
}

let input = getUserInput('string') // string | number
let input1 = getUserInput('string') as string
let input2 = <string>getUserInput('string')

// formatInut(input) // 类型“string | number”的参数不能赋给类型“string”的参数。不能将类型“number”分配给类型“string”。
formatInut(input1)
formatInut(input2)


/**
 * 非空断言
 */
type Dialog = {
  id?: string
}

function removeFromDom(dialog: Dialog, element: Element) {
  element.parentNode?.removeChild(element)

  delete dialog.id
}
function closeDialog(dialog: Dialog) {
  if (!('id' in dialog)) return
 let a =  dialog.id
  setTimeout(() => {

    removeFromDom(
      dialog,
      document.getElementById(dialog.id!)!
    )
  })
}

type VisibleDialog = { id: string }
type DestroyedDialog = {}
type Dialog1 = VisibleDialog | DestroyedDialog

function closeDialog1(dialog: Dialog1) {
  if (!('id' in dialog)) return

  setTimeout(() => {
    removeFromDom(
      dialog,
      document.getElementById(dialog.id)!
    )
  })
}

/**
 * 模拟名义类型
 */

type CompanyID = string & { readonly brand: unique symbol }
type OrderID = string & { readonly brand: unique symbol }
type UserID = string & { readonly brand: unique symbol }
type ID = CompanyID | OrderID | UserID

function queryForUser(id: UserID) {
  console.log(id)
}

function CompanyID(id: string) {
  return id as CompanyID
}

function OrderID(id: string) {
  return id as OrderID
}

function UserID(id: string) {
  return id as UserID
}

let companyId = CompanyID('4k2k5s')
let orderId = OrderID('9994acc1')
let userId = UserID('d21b1dbf')

queryForUser(userId)

/**
 * 安全的扩展原型
 */
declare global {
  interface Array<T> {
    zip<U>(list: U []): [T, U][]
  }
}

Array.prototype.zip = function<T, U>(
  this: T [],
  list: U []
): [T, U] [] {
  return this.map((v, k) => [v, list[k]])
}


/**
 * 练习题
 */
 type P1 = (a: number | string) => string
type P2 = (a: string) => string

function clone(fn: P2) {
  return fn
}

let p1: P1 = (a) => 'a'
clone(p1)


type O = {
  a: {
    b: {
      c: string
    }
  };
}

type O1 = keyof O

type MyExclude<T, U> = T extends U ? never : T

type MyExclusive<T, U> = MyExclude<T, U> | MyExclude<U, T>

type MyE1 = MyExclusive<1 | 2 | 3, 2 | 3 | 4>

export {} // 使用模块，防止重复命名报错