import { Component, OnInit } from '@angular/core';
import { ValoresService } from '../valores.service';
import { DistribucioModule } from '../distribucio/distribucio.module';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  significacion: number = null;
  valorEstadistico: string = null;
  resultado: string = null; // aqui va el intervalo de confianza
  conclusion: string = null; // aqui va si se rechaza o no
  intervaloEstadistico: string = null; // intervalo de aceptacion h0
  conclusionEstadistico: string = null; // se acepta o no h0
  tablas: DistribucioModule = new DistribucioModule(this.servicio);

  constructor(public servicio: ValoresService) { }

  ngOnInit() {
    this.servicio.significacion.subscribe(valor => {
      if(valor != null){
        this.significacion = valor;
      }
    })

    this.servicio.estadistico.subscribe(valor => {
      if(valor != null){
        this.valorEstadistico = valor.toFixed(2);
      }
    })

    this.servicio.resultado.subscribe(intervalo => {
      if(intervalo != null){
        this.resultado = intervalo;
      }
    });

    this.servicio.conclusion.subscribe(respuesta => {
      if(respuesta != null){
        this.conclusion = respuesta;
      }
    })

    this.servicio.resultadoEstadistico.subscribe(intervalo => {
      if(intervalo != null){
        this.intervaloEstadistico = intervalo;
      }
    });

    this.servicio.conclusionEstadistico.subscribe(respuesta => {
      if(respuesta != null){
        this.conclusionEstadistico = respuesta;
      }
    })

  }

  completo(){
    let unBoleano = false;
    if(this.significacion != null){
      if(this.servicio.completo()){
        this.servicio.poner();
        if(!this.servicio.distribucion && this.servicio.tamanio_M <= 21 && this.servicio.tamanio_M >= 2){ // distribucion t y tamaño entre 2-21
          this.servicio.t_valor = this.tablas.devolverT(this.servicio.tamanio_M - 1, this.significacion);
        }
        else if(!this.servicio.distribucion){ // distribucion t y tamaño fuera de 1-21
          this.conclusion = "Error, tamaño muestral permitido entre 2 a 21."
        }
        else if(this.servicio.distribucion && this.servicio.tamanio_M <= 0){ // distribucion z y tamaño menor o igual a 0
          this.conclusion = "Error, tamaño muestral permitido entre 1 en adelante."
        }

        this.servicio.intervalear();
        this.servicio.intervalearEstadistico(this.tablas.devolverEstadistico(this.significacion));

        unBoleano = true;
      }
    }
    return unBoleano;
  }

}
