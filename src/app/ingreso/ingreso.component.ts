import { Component, OnInit } from '@angular/core';
import { ValoresService } from '../valores.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  significacion: number = null;

  constructor(public servicio: ValoresService) { }

  ngOnInit() {
    this.servicio.significacion.subscribe(valor => {
      if(valor != null){
        this.significacion = valor;
      }
    })
  }

  esZ(){ // devuelve true si es Z, false de lo contrario
    return this.servicio.distribucion;
  }

}
