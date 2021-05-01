![Image](https://img.shields.io/npm/v/patron.db?color=%2351F9C0&label=patron.db) 
![Image](https://img.shields.io/npm/dt/patron.db.svg?color=%2351FC0&maxAge=3600) 
#
![Image](https://nodei.co/npm/patron.db.png?downloads=true&downloadRank=true&stars=true)
<br>


## Yüklemek İçin
```npm
npm install patron.db
```
<br>

## Nasıl Kullanılır? 💫

# JavaScript 
```js
const Patron = require("patron.db");
const db = new Patron.Database();
const quickdb = require("quick.db");
//const db = new Patron.Database("./database.json");

db.set("Hello","World");

db.get("Hello");

db.fetch("Hello");

db.has("Hello");

db.push("World","Patron 1 Numara");

db.type("World");

db.all();

db.valueArray();

db.keyArray();

db.eval("this.all()");

db.add("Number",15);

db.subtract("Number",3)

db.deleteAll();

db.PatrondbToquickdb(quickdb);

db.quickdbToPatrondb(quickdb);
```
<div align="center">

[![Image](https://cdn.discordapp.com/attachments/838063860928872469/838123752423686164/unknown.png)](https://discord.gg/FXWkSJYm)
</div>
