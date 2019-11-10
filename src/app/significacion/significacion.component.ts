import { Component, OnInit } from '@angular/core';
import { ValoresService } from '../valores.service';
import { AppComponent } from '../app.component'

import { DistribucioModule } from '../distribucio/distribucio.module'

@Component({
  selector: 'app-significacion',
  templateUrl: './significacion.component.html',
  styleUrls: ['./significacion.component.css']
})
export class SignificacionComponent implements OnInit {

  tablas: DistribucioModule = new DistribucioModule(this.servicio);

  constructor(public servicio: ValoresService) { }

  ngOnInit() {
    
  }

  significar(valor: number){
    if(this.servicio.distribucion){ // si es distribucion z
      if(valor == 0.05){
        this.servicio.z_valor = 1.96;
      }
      else if(valor == 0.01){
        this.servicio.z_valor = 2.5758;
      }
      else if(valor == 0.1){
        this.servicio.z_valor = 1.6449;
      }
      else if(valor == 0.02){
        this.servicio.z_valor = 2.3263;
      }
    }
  
    this.servicio.significacion.next(valor);

    if(this.servicio.completo()){
      this.servicio.intervalear();
      this.servicio.intervalearEstadistico(this.tablas.devolverEstadistico(valor));
    }
  }
  
}
