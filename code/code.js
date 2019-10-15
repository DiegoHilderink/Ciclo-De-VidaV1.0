

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
  return p;
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


//Modificar para tabla
function mostrarEstadistica(){
  
  document.getElementById("table").rows[0].cells[1].innerHTML = h.humanosEdadFertil()[0];
  document.getElementById("table").rows[1].cells[1].innerHTML = h.humanosEdadFertil()[1];
  document.getElementById("table").rows[2].cells[1].innerHTML = h.probRepro();
  document.getElementById("table").rows[3].cells[1].innerHTML = h.vivos.length;
  document.getElementById("table").rows[4].cells[1].innerHTML = h.muertos.length;
  document.getElementById("table").rows[5].cells[1].innerHTML = nacidos;
  document.getElementById("table").rows[6].cells[1].innerHTML = año;
  
 
}
