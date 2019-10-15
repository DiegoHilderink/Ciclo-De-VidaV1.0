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
    mostrarHumanos(){
      var cadena = "";
      for (var i = 0; i < h.vivos.length; i++) {
        cadena += "<li>" + h.vivos[i].mostrar() + "</li>";
      }
      document.getElementById('vivos').innerHTML = cadena;
  
      cadena = "";
      for (var i = 0; i < h.muertos.length; i++) {
        cadena += "<li>" + h.muertos[i].mostrar() + "</li>";
      }
      document.getElementById('muertos').innerHTML = cadena;
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