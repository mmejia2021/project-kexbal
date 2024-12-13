import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { LandingRoutingModule } from './landing-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LandingRoutingModule,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask(), // Configuración global de la librería
  ]
})
export class LandingModule {


}
