/**
 * 结构型变
 */

type ExistingUser = {
  id: number;
  name: string;
}

type NewUser = {
  name: string;
}

function deleteUser(user: { id?: number, name: string }) {
  delete user.id
}

let existingUser: ExistingUser = {
  id: 23,
  name: 'I am user'
}

deleteUser(existingUser)

console.log(existingUser.id)
console.log(existingUser.name)

type LegacyUser = {
  id?: number | string;
  name: string;
}

let legcyUser: LegacyUser = {
  id: 'adfsd',
  name: "aaa"
}

// deleteUser(legcyUser) // LegacyUser的 'string | number | undefined' is not assignable to type 'number | undefined'.

/**
 * 函数型变
 */
class Animal {}
class Bird extends Animal { fly() {} }
class Crow extends Bird { caw() {} }

function chirp(bird: Bird) {
  bird.fly()
  return bird
}

// chirp(new Animal()) 
// Argument of type 'Animal' is not assignable to parameter of type 'Bird'.
// Property 'fly' is missing in type 'Animal' but required in type 'Bird'.
chirp(new Bird())
chirp(new Crow())

function clone(f: (bird: Bird) => Bird): void {
  let parent = new Bird()
  let child = f(parent)
  child.fly()
}

function birdToBird(b: Bird): Bird {
  return b
}
clone(birdToBird)

function birdToCrow(b: Bird): Crow {
  return new Crow()
}
clone(birdToCrow)

function birdToAnimal(b: Bird): Animal {
  return new Animal()
}
// clone(birdToAnimal)
// Argument of type '(b: Bird) => Animal' is not assignable to parameter of type '(bird: Bird) => Bird'.
// Property 'fly' is missing in type 'Animal' but required in type 'Bird'.

function animalToBird(a: Animal): Bird {
  return new Bird()
}
clone(animalToBird)

function crowToBird(a: Crow): Bird {
  a.caw()
  return new Bird()
}
// clone(crowToBird)
// TS2345: Argument of type '(a: Crow) => Bird' is not assignable to parameter of type '(bird: Bird) => Bird'.
// Types of parameters 'a' and 'bird' are incompatible.
// Property 'caw' is missing in type 'Bird' but required in type 'Crow'.