import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValoresService } from '../valores.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DistribucioModule { 
  
  // tabla de valores glib 1-20 bilateral
  tabla = [
    // 0.1
    [6.3138, 2.92, 2.3534, 2.1318, 2.015, 1.9432, 1.8946, 1.8595, 1.8331, 1.8125, 1.7959, 1.7823, 1.7709, 1.7613, 1.7531, 1.7459, 1.7396, 1.7341, 1.7291, 1.7247],
    // 0.05
    [12.7062, 4.3027, 3.1824, 2.7764, 2.5706, 2.4469, 2.3646, 2.306, 2.2622, 2.2281, 2.201, 2.1788, 2.1604, 2.1448, 2.1314, 2.1199, 2.1098, 2.1009, 2.093, 2.086],
    // 0.02
    [31.8205, 6.9646, 4.5407, 3.7469, 3.3649, 3.1427, 2.998, 2.8965, 2.8214, 2.7638, 2.7181, 2.681, 2.6503, 2.6245, 2.6025, 2.5835, 2.5669, 2.5524, 2.5395, 2.528],
    // 0.01
    [63.6567, 9.9248, 5.8409, 4.6041, 4.0321, 3.7074, 3.4995, 3.3554, 3.2498, 3.1693, 3.1058, 3.0545, 3.0123, 2.9768, 2.9467, 2.9208, 2.8982, 2.8784, 2.8609, 2.8453]
  ]
  

  //0.1, 0.05, 0.02, 0.01
  bilateralTablaZ = [1.6449, 1.96, 2.3263, 2.5758]
  unilateralTablaZ = [1.2816, 1.6449, 2.0537, 2.3263]

  unilateralTablaT = [
    //0.1
    [3.0777, 1.8856, 1.6377, 1.5332, 1.4759, 1.4398, 1.4149, 1.3968, 1.383, 1.3722, 1.3634, 1.3562, 1.3502, 1.345, 1.3406, 1.3368, 1.3334, 1.3304, 1.3277, 1.3253],
    //0.05
    [6.3138, 2.92, 2.3534, 2.1318, 2.015, 1.9432, 1.8946, 1.8595, 1.8331, 1.8125, 1.7959, 1.7823, 1.7709, 1.7613, 1.7531, 1.7459, 1.7396, 1.7341, 1.7291, 1.7247],
    //0.02
    [15.8945, 4.8487, 3.4819, 2.9985, 2.7565, 2.6122, 2.5168, 2.449, 2.3984, 2.3593, 2.3281, 2.3027, 2.2816, 2.2638, 2.2485, 2.2354, 2.2238, 2.2137, 2.2047, 2.1967],
    //0.01
    [31.8205, 6.9646, 4.5407, 3.7469, 3.3649, 3.1427, 2.998, 2.8965, 2.8214, 2.7638, 2.7181, 2.681, 2.6503, 2.6245, 2.6025, 2.5835, 2.5669, 2.5524, 2.5395, 2.528]
  ]

  constructor(public servicio: ValoresService) { }

  devolverT(glib: number, significacion: number){
    if(significacion == 0.1){
      return this.tabla[0][glib - 1];
    }
    else if(significacion == 0.05){
      return this.tabla[1][glib - 1];
    }
    else if(significacion == 0.02){
      return this.tabla[2][glib - 1];
    }
    else if(significacion == 0.01){
      return this.tabla[3][glib - 1];
    }
  }

  devolverEstadistico(significacion: number){ // devuelve el valor para calcular el intervalo de aceptacion o rechazo del estadistico
    if(this.servicio.distribucion){  // distribucion z
      if(this.servicio.lateralidad){ // es bilateral
        if(significacion == 0.1){
          return this.bilateralTablaZ[0];
        }
        else if(significacion == 0.05){
          return this.bilateralTablaZ[1];
        }
        else if(significacion == 0.02){
          return this.bilateralTablaZ[2];
        }
        else if(significacion == 0.01){
          return this.bilateralTablaZ[3];
        }
      }
      else{ // es unilateral
        if(significacion == 0.1){
          return this.unilateralTablaZ[0];
        }
        else if(significacion == 0.05){
          return this.unilateralTablaZ[1];
        }
        else if(significacion == 0.02){
          return this.unilateralTablaZ[2];
        }
        else if(significacion == 0.01){
          return this.unilateralTablaZ[3];
        }
      }
    }
    else{ // es distribucion t
      let posGlibEnArreglo = this.servicio.tamanio_M - 2;
      if(this.servicio.lateralidad){ // es bilateral, la misma tabla
        if(significacion == 0.1){
          return this.tabla[0][posGlibEnArreglo];
        }
        else if(significacion == 0.05){
          return this.tabla[1][posGlibEnArreglo];
        }
        else if(significacion == 0.02){
          return this.tabla[2][posGlibEnArreglo];
        }
        else if(significacion == 0.01){
          return this.tabla[3][posGlibEnArreglo];
        }
      }
      else{ // es unilateral
        if(significacion == 0.1){
          return this.unilateralTablaT[0][posGlibEnArreglo];
        }
        else if(significacion == 0.05){
          return this.unilateralTablaT[1][posGlibEnArreglo];
        }
        else if(significacion == 0.02){
          return this.unilateralTablaT[2][posGlibEnArreglo];
        }
        else if(significacion == 0.01){
          return this.unilateralTablaT[3][posGlibEnArreglo];
        }
      }
    }
  }

}
