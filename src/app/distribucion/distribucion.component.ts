import { Component, OnInit } from '@angular/core';
import { ValoresService } from '../valores.service';

@Component({
  selector: 'app-distribucion',
  templateUrl: './distribucion.component.html',
  styleUrls: ['./distribucion.component.css']
})
export class DistribucionComponent implements OnInit {

  constructor(public servicio: ValoresService) { }

  ngOnInit() {
  }

  establecer(valor: number){
    if(valor == 1){
      this.servicio.distribucion = true;
    }
    else if(valor == 0){
      this.servicio.distribucion = false;
    }
  }

}
