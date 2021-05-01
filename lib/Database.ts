import { EventEmitter } from "events";
import fs from "fs";
import Error from "./Error";
import _ from "lodash";

export default class Database extends EventEmitter {
private dosya: string;
private data: any;
constructor(dataName?:string){
super();
this.dosya = dataName || "./db.json";
this.data = {};
 /*  File Control || Dosya Kontrol  */
if(!fs.existsSync(this.dosya)){
  fs.writeFileSync(this.dosya, "{}", "utf-8");
} else {
  this.bul();
};


};

private bul(){
  const data = JSON.parse(`${fs.readFileSync(this.dosya)}`);
  if(typeof data == "object"){
      this.data = data;
  };
};

private kaydet(){
  fs.writeFileSync(this.dosya, JSON.stringify(this.data, null), "UTF-8");
};


private cevirAnahtar(key:string) {
  if (!key || typeof key != "string") return { key: undefined, target: undefined };
  if (key.includes(".")) {
      let spl = key.split(".");
      let parsed = spl.shift();
      let target = spl.join(".");
      return { key: parsed, target };
  };
  return { key, target: undefined };
};

private getData(key:string, data:any) {
  let parsed = this.cevirAnahtar(key);
  if (parsed.target) data = _.get(data, parsed.target);
  return data;
};



private  setData(key:string, data:any, value:any) {
  let parsed = this.cevirAnahtar(key);
  if (typeof data === "object" && parsed.target) {
      return _.set(data, parsed.target, value);
  } else if (parsed.target) throw new Error("Nesne Olmayan Hedeflenemez!", "BulmaHata");
  return data;
};



/* UTİL BİTİŞ */


get(key:string){
if(!key || typeof key !== "string") throw new Error("Geçersiz Anahtar!", "AnahtarHatası");
let cevir = this.cevirAnahtar(key);
let data = this.data[`${cevir.key}`];
if(!data) return null;
let item;
if (cevir.target) item = this.getData(key, Object.assign({}, data));
else item = data;
return item !== undefined ? item : null;
};

fetch(key:string){
  if(!key || typeof key !== "string") throw new Error("Geçersiz Anahtar!", "AnahtarHatası");
  let cevir = this.cevirAnahtar(key);
  let data = this.data[`${cevir.key}`];
  if(!data) return null;
  let item;
  if (cevir.target) item = this.getData(key, Object.assign({}, data));
  else item = data;
  return item !== undefined ? item : null;
  };


set(key:string,value:any) {
  if(!key || typeof key !== "string") throw new Error("Geçersiz Anahtar!", "AnahtarHatası");
  if(!value) throw new Error("Geçersiz Değer!", "DeğerHatası");
  let cevir = this.cevirAnahtar(key);
  let data = this.data[`${cevir.key}`];
  if(!data) {
   this.data[key] = cevir.target ? this.setData(key, {}, value) : value;
   this.kaydet();
  }else{
    this.data[key] = cevir.target ? this.setData(key, {}, value) : value;
    this.kaydet();
  };

};


has(key:string) {
  if(!key || typeof key !== "string") throw new Error("Geçersiz Anahtar!", "AnahtarHatası");
   return Boolean(this.get(key));
};

all() {
  return Object.keys(this.data).map((key) => {
    return {
        ID:key,
        data: this.get(key)
    }
});
};

deleteAll() {
this.data = {};
this.kaydet();
};

add(key:string, count:number){
  if(!key || typeof key !== "string") throw new Error("Geçersiz Anahtar!", "AnahtarHatası");
  if(!key || typeof key !== "number") throw new Error("Geçersiz Number!", "AnahtarHatası");
  if(!this.get(key)) this.data[key] = 0;
  this.data[key] += count;
  this.kaydet();
};



subtract(key:string, count:number){
  if(!key || typeof key !== "string") throw new Error("Geçersiz Anahtar!", "AnahtarHatası");
  if(!key || typeof key !== "number") throw new Error("Geçersiz Number!", "SayıHatası");
  if(!this.get(key)) this.data[key] = 0;
  this.data[key] -= count;
  this.kaydet();
};


sub(key:string, count:number){
  if(!key || typeof key !== "string") throw new Error("Geçersiz Anahtar!", "AnahtarHatası");
  if(!key || typeof key !== "number") throw new Error("Geçersiz Number!", "SayıHatası");
  if(!this.get(key)) this.data[key] = 0;
  this.data[key] -= count;
  this.kaydet();
};

push(key:string, element:any){
  if(!key || typeof key !== "string") throw new Error("Geçersiz Anahtar!", "AnahtarHatası");
  if(!element) throw new Error("Geçersiz Element!", "ElementHatası");
  if (!this.get(key)) this.data[key] = [];
  this.data[key].push(element);
  this.kaydet();
};

keyArray() {
  const data = this.all();
  return data.map(m => m.ID);
};

valueArray() {
  const data = this.all();
  return data.map(m => m.data);
};


PatrondbToquickdb(quickdb:any) {
  if(!quickdb) throw new Error("Geçersiz QuickDB!", "QuickdbHatası");
  let data = this.all();
  data.forEach((kadir:any) => {
  quickdb.set(kadir.ID,kadir.data)
  });
  return quickdb.all();
};


quickdbToPatrondb(quickdb:any) {
  if(!quickdb) throw new Error("Geçersiz QuickDB!", "QuickdbHatası");
  let data = quickdb.all();
  data.forEach((kadir:any) => {
    this.set(kadir.ID,kadir.data)
    });
    return this.all();
};


eval(code:any) {
return eval(code);
};

type(key:string){
  if(!key || typeof key !== "string") throw new Error("Geçersiz Anahtar!", "AnahtarHatası");
  let fetched = this.get(key);
  if (Array.isArray(fetched)) return "array";
  return typeof fetched;
};

};


