class Persona {
    constructor (nombre, edad, genero, prob, suerte){
      this.__edad = edad || 0;
      this.__genero = genero || this.generoRnd();
      this.__nombre = nombre || this.nombreRnd();
      this.__prob = prob || 0;
      this.__suerte = suerte || 0;
    }
  
    get nombre () { return this.__nombre; }
    get edad () { return this.__edad; }
    get genero () { return this.__genero; }
    get prob () {  return this.__prob; }
    get suerte () { return this.__suerte; }
  
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
  
    mostrar(){
      return this.nombre + " - " + this.edad + " - " + this.genero;
    }
  }