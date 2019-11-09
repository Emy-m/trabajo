import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValoresService {
  distribucion: boolean = null; // si es false es distribucion T y si es distribucion Z true
  desv_Pob: number = null;
  desv_M: number = null;
  media_Pob: number = null;
  media_M: number = null;
  tamanio_M: number = null;
  significacion: Subject<number> = new Subject<number>();
  z_valor: number = null;
  t_valor: number = null;
  lim_inferior: number;
  lim_superior: number;
  resultado: Subject<string> = new Subject<string>();
  conclusion: Subject<string> = new Subject<string>();
  h_nula: string;
  h_alternativa: string = null;

  constructor() { }

  completo(){
    if(this.distribucion){ // si es distribucion z
      if(this.h_alternativa == null || this.media_M == null || this.media_Pob == null || this.desv_Pob == null || this.tamanio_M == null){
        return false;
      }
      else{
        return true;
      }
    }
    else{ // distribucion t
      if(this.h_alternativa == null || this.media_M == null || this.media_Pob == null || this.desv_M == null || this.tamanio_M == null){
        return false;
      }
      else{
        return true;
      }
    }
  }

  poner(){
    if(this.h_alternativa == "<"){
      this.h_nula = ">=";
    }
    else if(this.h_alternativa == ">"){
      this.h_nula = "<=";
    }
    else if(this.h_alternativa == "!="){
      this.h_nula = "=";
    }
  }

  intervalo(){
    if(this.distribucion){ // distribucion z
      this.lim_inferior = (this.media_M - (this.z_valor * (this.desv_Pob / Math.sqrt(this.tamanio_M))));
      this.lim_superior = (this.media_M + (this.z_valor * (this.desv_Pob / Math.sqrt(this.tamanio_M))));
    }
    else{ // distribucion t
      this.lim_inferior = (this.media_M - (this.t_valor * (this.desv_M / Math.sqrt(this.tamanio_M))));
      this.lim_superior = (this.media_M + (this.t_valor * (this.desv_M / Math.sqrt(this.tamanio_M))));
    }
  }

  concluir(){
    if(this.media_Pob >= this.lim_inferior && this.media_Pob <= this.lim_superior){ // si la media esta dentro del IC.
      this.conclusion.next("Se acepta la Hipotesis nula.");
    }
    else{
      if(this.h_nula == '>=' && this.lim_inferior > this.media_Pob){ // si la media no esta incluida en el IC pero si solo los valores mayores lo estan.
        this.conclusion.next("Se acepta la Hipotesis nula.");
      }
      else if(this.h_nula == '<=' && this.lim_superior < this.media_Pob){ // si la media no esta incluida en el IC pero si solo los valores menores lo estan.
        this.conclusion.next("Se acepta la Hipotesis nula.");
      }
      else{
        this.conclusion.next("Se rechaza la Hipotesis nula.");
      }
    }
  }

  intervalear(){
    this.intervalo();
    this.resultado.next("( " + this.lim_inferior.toFixed(2) + "; " + this.lim_superior.toFixed(2) + " )");
    this.concluir();
  }

}
