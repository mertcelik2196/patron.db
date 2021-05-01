import Patron from "../dist";
let db = new Patron.Database();

let a = 31;


console.log(db.has(`selam_${a}.mute`))
console.log(db.has(`e`))

console.log(db.all())