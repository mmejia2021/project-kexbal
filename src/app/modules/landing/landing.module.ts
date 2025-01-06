import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { LandingRoutingModule } from './landing-routing.module';
import { ParallaxStandaloneDirective } from '@yoozly/ngx-parallax';
import { RouterModule, Routes  } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LandingRoutingModule,
    NgxMaskDirective,
    ParallaxStandaloneDirective,
    RouterModule
  ],
  providers: [
    provideNgxMask(), // Configuración global de la librería
  ]
})
export class LandingModule {


}
