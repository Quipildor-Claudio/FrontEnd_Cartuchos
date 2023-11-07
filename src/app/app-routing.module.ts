import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { ColoresComponent } from './pages/colores/colores.component';
import { TipoCargaComponent } from './pages/tipo-carga/tipo-carga.component';
import { TipoCartuchoComponent } from './pages/tipo-cartucho/tipo-cartucho.component';
import { CartuchoComponent } from './pages/cartucho/cartucho.component';
import { ImpresoraComponent } from './pages/impresora/impresora.component';
import { TipoImpresoraComponent } from './pages/tipo-impresora/tipo-impresora.component';
import { EstadoComponent } from './pages/estado/estado.component';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { HomeComponent } from './pages/home/home.component';
import { FormImpresoraComponent } from './components/form-impresora/form-impresora.component';
import { FormCartuchoComponent } from './components/form-cartucho/form-cartucho.component';

const routes: Routes = [

  
  { path: 'home', component: HomeComponent },

  { path: 'cartuchos', component: CartuchoComponent },
  { path: 'form-cartucho', component: FormCartuchoComponent},
  { path: 'form-cartucho/:id', component: FormCartuchoComponent },


  { path: 'marcas', component: MarcasComponent },
  { path: 'colores', component: ColoresComponent },
  { path: 'tipodecarga', component: TipoCargaComponent },
  { path: 'tipodecartucho', component: TipoCartuchoComponent },

  { path: 'impresoras', component: ImpresoraComponent },
  { path: 'form-impresora', component: FormImpresoraComponent },
  { path: 'form-impresora/:id', component: FormImpresoraComponent },

  { path: 'tipodeimpresoras', component: TipoImpresoraComponent },


  { path: 'estados', component:EstadoComponent },


  { path: 'solicitudes', component: SolicitudComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
