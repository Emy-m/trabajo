import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignificacionComponent } from './significacion/significacion.component';
import { IngresoComponent } from './ingreso/ingreso.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { DistribucionComponent } from './distribucion/distribucion.component';

@NgModule({
  declarations: [
    AppComponent,
    SignificacionComponent,
    IngresoComponent,
    ResultadosComponent,
    DistribucionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
