import { getColums, getCellStyle } from './utils.js'
import './02-object-type'
/**
 * 结构型变
 */
console.log(getColums('asfsdf'))
type ExistingUser = {
  id: number;
  name: string;
};

type NewUser = {
  name: string;
};

function deleteUser(user: { id?: number; name: string }) {
  delete user.id;
}

let existingUser: ExistingUser = {
  id: 23,
  name: "I am user",
};

deleteUser(existingUser);

console.log(existingUser.id);
console.log(existingUser.name);

type LegacyUser = {
  id?: number | string;
  name: string;
};

let legcyUser: LegacyUser = {
  id: "adfsd",
  name: "aaa",
};

// deleteUser(legcyUser) // LegacyUser的 'string | number | undefined' is not assignable to type 'number | undefined'.

/**
 * 函数型变
 */
class Animal {}
class Bird extends Animal {
  fly() {}
}
class Crow extends Bird {
  caw() {}
}

function chirp(bird: Bird) {
  bird.fly();
  return bird;
}

// chirp(new Animal())
// Argument of type 'Animal' is not assignable to parameter of type 'Bird'.
// Property 'fly' is missing in type 'Animal' but required in type 'Bird'.
chirp(new Bird());
chirp(new Crow());

function clone(f: (bird: Bird) => Bird): void {
  let parent = new Bird();
  let child = f(parent);
  child.fly();
}

function birdToBird(b: Bird): Bird {
  return b;
}
clone(birdToBird);

function birdToCrow(b: Bird): Crow {
  return new Crow();
}
clone(birdToCrow);

function birdToAnimal(b: Bird): Animal {
  return new Animal();
}
// clone(birdToAnimal)
// Argument of type '(b: Bird) => Animal' is not assignable to parameter of type '(bird: Bird) => Bird'.
// Property 'fly' is missing in type 'Animal' but required in type 'Bird'.

function animalToBird(a: Animal): Bird {
  return new Bird();
}
clone(animalToBird);

function crowToBird(a: Crow): Bird {
  a.caw();
  return new Bird();
}
// clone(crowToBird)
// TS2345: Argument of type '(a: Crow) => Bird' is not assignable to parameter of type '(bird: Bird) => Bird'.
// Types of parameters 'a' and 'bird' are incompatible.
// Property 'caw' is missing in type 'Bird' but required in type 'Crow'.
let sa1 = 123;
function say() {}

/**
 * 细化
 */
type Unit = "cm" | "px" | "%";
let unit: Unit[] = ["cm", "px", "%"];

function parseUnit(value: string): Unit | null {
  const res = unit.find((it) => value.endsWith(it));
  return res || null;
}

type Width = {
  unit: Unit;
  value: number;
};

function parseWidth(width: number | string | null | undefined): Width | null {
  if (width == null) return null;

  if (typeof width === "number") {
    return {
      unit: "px",
      value: width,
    };
  }

  let unit = parseUnit(width);
  if (unit) {
    return {
      unit,
      value: parseFloat(width),
    };
  }

  return null;
}

/**
 * 辨别并集类型-无法识别的情况
 */

type UserTextEvent = { value: string; target: HTMLInputElement };
type UserMouseEvent = { value: [number, number]; target: HTMLElement };

type UserEvent = UserTextEvent | UserMouseEvent;
function handle(event: UserEvent) {
  if (typeof event.value === "string") {
    console.log(event);
    return {
      value: event.value,
      target: event.target, // (property) target: HTMLInputElement | HTMLElement
    };
  }
}


/**
 * 辨别并集类型
 */

 type UserTextEvent1 = { value: string; target: HTMLInputElement, type: 'TextEvent' };
 type UserMouseEvent1 = { value: [number, number]; target: HTMLElement, type: 'MouseEvent' };
 
 type UserEvent1 = UserTextEvent1 | UserMouseEvent1;
 function handle1(event: UserEvent1) {
   if (event.type === "TextEvent") {
     console.log(event);
     return {
       value: event.value,
       target: event.target, // HTMLInputElement
     };
   }
 }