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

  setTimeout(() => {

    removeFromDom(
      dialog,
      document.getElementById(dialog.id!)!
    )
  })
}

type A = 3

export {} // 使用模块，防止重复命名报错