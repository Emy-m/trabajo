import { Component, OnInit } from '@angular/core';
import { ValoresService } from './valores.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public servicio: ValoresService) { }

  ngOnInit() {

  }

  distro(){
    return this.servicio.distribucion;
  }


}
