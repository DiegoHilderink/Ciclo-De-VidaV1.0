class Persona {
  constructor (nombre, edad, genero, prob, suerte, id){
    this.__edad = edad || 0;
    this.__genero = genero || this.generoRnd();
    this.__nombre = nombre || this.nombreRnd();
    this.__prob = prob || 0;
    this.__suerte = suerte || 0;
    this.__alive = true;
    this.__id = id;
  }

  get nombre () { return this.__nombre; }
  get edad () { return this.__edad; }
  get genero () { return this.__genero; }
  get prob () {  return this.__prob; }
  get suerte () { return this.__suerte; }
  get alive () { return this.__alive; }

  set nombre ( nuevoNombre ){
    this.__nombre = nuevoNombre;
  }
  set edad ( nuevaEdad ){
    this.__edad = nuevaEdad;
  }
  set genero ( nuevoGenero ){
    this.__genero = nuevoGenero;
  }
  set prob ( nuevaProb ){
    this.__prob = nuevaProb;
  }
  set suerte ( nuevaSuerte ){
    this.__suerte = nuevaSuerte;
  }

  set alive ( alive ){
    this.__alive = alive;
  }

  set id ( id ){
    this.__id = id; 
  }

  nombreRnd(){
    if (this.genero == "F"){
      return nombres[0][Math.floor(Math.random()*nombres[0].length)];
    }else{
      return nombres[1][Math.floor(Math.random()*nombres[1].length)];
    }
  }
  generoRnd(){
    return generos[Math.floor(Math.random()*generos.length)];
  }
  suerteRnd(){
    return Math.ceil(Math.random()*this.prob);
  }

  crecer(){
    this.edad++;
    var prob = this.prob;
    this.prob = this.edad/4;
    this.suerte = this.suerteRnd();
  }

  getEdad(){
    return this.edad;
  }

  getNombre(){
    return this.nombre;
  }

  getGenero(){
    return this.genero;
  }

  getAlive(){
    return this.alive;
  }

  getId(){
    return this.id; 
  }

  mostrar(){
    return this.nombre + " - " + this.edad + " - " + this.genero;
  }
}

var nombres = [
  ["Ana","Sara","Juana","Marta","Sofia","Maria",
  "Fatima","Sandra","Violeta","Estrella","Maite",
  "Sonia","Andrea","Lisa","Laura"],
  ["Juan","Dionisio","Paco","Arturo","Eustaquio",
  "Eduardo","Manuel","Sergio","Pepe","Alejandro",
  "Miguel","Jose","Squigy","Carlos","Pancracio",
  "Francisco"]];
var generos = ["F","M"];

var nacidos = 0;
function nacimiento(){
  var p = new Persona();
  nacidos++;
  p.id(nacidos);
  return p;
}

class Humanidad{
  constructor(num){
    this.__vivos = new Array(0);
    this.__muertos = new Array(0);
    this.reproducirse(num);
  }

  get vivos() { return this.__vivos;  }
  get muertos(){  return this.__muertos;  }

  set vivos( nuevoVivos ) {
    this.__vivos = nuevoVivos;
  }
  set muertos(  nuevoMuertos ){
    this.__muertos = nuevoMuertos;
  }

  reproducirse(num){
    var grupo = this.vivos;
    for (var i = 0; i < num; i++) {
      grupo.push(nacimiento());
    }
    this.vivos = grupo;
  }


  //agregar y eliminar rows de la tabla
  agregarFila(aux, i){
    document.getElementById("tabla").insertRow(-1).innerHTML = '<td id='+aux.getId()+'>'+aux.getNombre()+'</td>'+'<td>'+aux.getEdad()+'</td>'+'<td>'+aux.getGenero()+'</td>';
  }

  eliminarFila(aux, i){
    var table = document.getElementById("tabla");
    var rowCount = table.rows.length;
    //console.log(rowCount);
    
    if(rowCount <= 1)
      alert('No se puede eliminar el encabezado');
    else
      table.deleteRow(table.rows[i]);
  }

  mostrarHumanos(){

    for (var i = 0; i < h.vivos.length; i++) {
      if (h.vivos[i].getAlive){
        this.agregarFila(h.vivos[i], i);
      } else{
        this.eliminarFila(h.vivos[i], i);
      }
      
    }

    for (var i = 0; i < h.muertos.length; i++) {
      this.agregarFila(h.muertos[i]);
    }
  }

  humanosEdadFertil(){
    var contador = [0,0];         // Contador de [F-Fertiles, M-Fertiles]

    for (var i=0; i < this.vivos.length; i++) {
      if( this.vivos[i].edad > 14 && this.vivos[i].edad < 45){
        this.vivos[i].genero == "F" ? contador[0]++ : contador[1]++;
      }
    }

    return contador;
  }

  probRepro(){
    var reprProb = this.parejasFertiles()*12.5;
    if (reprProb > 100){  return 100; }
    return reprProb;
  }

  muerte(per){
    var p = this.vivos;
    var cem = this.muertos;

    cem.push(per);
    p.splice(this.vivos.indexOf(per),1);

    this.vivos = p;
    this.muertos = cem;
  }

  parejasFertiles(){
    var pFertiles = this.humanosEdadFertil();
    return Math.min(pFertiles[0],pFertiles[1]);
  }
}

var h = new Humanidad(0);
var p1 = new Persona("Adan",0,"M");
var p2 = new Persona("Eva",0,"F");
var grupo = h.vivos;
grupo.push(p1,p2);
h.vivos = grupo;

var ciclo = setInterval(cicloVital, 1000);

var año = 0;

mostrarEstadistica();

function cicloVital(){
  var milagroDeLaVida = Math.ceil(Math.random()*100);
  var hFertiles = h.humanosEdadFertil();
  for (var i = 0; i < h.vivos.length; i++) {
    h.vivos[i].crecer();

    if(h.vivos[i].suerte > milagroDeLaVida){
      h.vivos[i].alive(false);
      h.muerte(h.vivos[i]);
    }
  }

  if(h.probRepro() > milagroDeLaVida){
    h.reproducirse(1);
  }

  año++;

  h.mostrarHumanos();
  mostrarEstadistica();
}

function mostrarEstadistica(){
  var estadistica = "";
  estadistica = "Hay " + h.humanosEdadFertil()[0] + " mujeres y " + h.humanosEdadFertil()[1] + " hombres en edad fertil";
  estadistica += "</br>Hay una probabilidad de " + h.probRepro() + "% de nacimiento";
  estadistica += "</br>Hay " + h.muertos.length + " fallecidos";
  estadistica += "</br>Hay " + h.vivos.length + " vivos";
  estadistica += "</br>Han nacido " + nacidos + " humanos";
  estadistica += "</br></br><h3>Año " + año;

  document.getElementById('estadisticas').innerHTML = estadistica;
}
