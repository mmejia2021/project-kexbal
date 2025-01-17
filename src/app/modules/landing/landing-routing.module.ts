import { NgModule } from '@angular/core';
import { RouterModule, Routes, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { LandingComponent } from './landing.component';
import { UsComponent } from './pages/us/us.component';
import { HomeComponent } from './pages/home/home.component';
import { MarketplaceComponent } from './pages/marketplace/marketplace.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'nosotros', component: UsComponent },
      { path: 'marketplace', component: MarketplaceComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full'  },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { 
  constructor(scroller: ViewportScroller) {
    scroller.setOffset([0, 100]); // Ajusta el desplazamiento si tienes un navbar fijo
  }
}
