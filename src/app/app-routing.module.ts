import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { ColoresComponent } from './pages/colores/colores.component';
import { TipoCargaComponent } from './pages/tipo-carga/tipo-carga.component';
import { TipoCartuchoComponent } from './pages/tipo-cartucho/tipo-cartucho.component';
import { CartuchoComponent } from './pages/cartucho/cartucho.component';
import { ImpresoraComponent } from './pages/impresora/impresora.component';
import { TipoImpresoraComponent } from './pages/tipo-impresora/tipo-impresora.component';

const routes: Routes = [
  { path: 'cartuchos', component: CartuchoComponent },
  { path: 'marcas', component: MarcasComponent },
  { path: 'colores', component: ColoresComponent },
  { path: 'tipodecarga', component: TipoCargaComponent },
  { path: 'tipodecartucho', component: TipoCartuchoComponent },

  { path: 'impresoras', component: ImpresoraComponent },
  { path: 'tipodeimpresoras', component: TipoImpresoraComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
