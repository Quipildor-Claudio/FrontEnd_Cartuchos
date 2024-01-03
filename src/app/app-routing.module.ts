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
import { RolComponent } from './pages/rol/rol.component';
import { FormRolComponent } from './components/form-rol/form-rol.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';
import { FormSolicitudComponent } from './components/form-solicitud/form-solicitud.component';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { FormServicioComponent } from './components/form-servicio/form-servicio.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { FormPersonaComponent } from './components/form-persona/form-persona.component';
import { FormEstadoComponent } from './components/form-estado/form-estado.component';
import { InformesComponent } from './pages/informes/informes.component';
<<<<<<< HEAD
import { SolicitudPdfComponent } from './components/solicitud-pdf/solicitud-pdf.component';
=======
import { LoginComponent } from './auth/login/login.component';
>>>>>>> e6adb4282e53ea8712ed509139f159e2a8f82d9d

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component:LoginComponent},

  { path: 'home', component: HomeComponent },

  { path: 'cartuchos', component: CartuchoComponent },
  { path: 'form-cartucho', component: FormCartuchoComponent },
  { path: 'form-cartucho/:id', component: FormCartuchoComponent },

  { path: 'impresoras', component: ImpresoraComponent },
  { path: 'form-impresora', component: FormImpresoraComponent },
  { path: 'form-impresora/:id', component: FormImpresoraComponent },

  { path: 'roles', component: RolComponent },
  { path: 'form-rol', component: FormRolComponent },
  { path: 'form-rol/:id', component: FormRolComponent },

  { path: 'usuarios', component: UsuarioComponent },
  { path: 'form-usuario', component: FormUsuarioComponent },
  { path: 'form-usuario/:id', component: FormUsuarioComponent },

  { path: 'personas', component: PersonaComponent },
  { path: 'form-persona', component: FormPersonaComponent },
  { path: 'form-persona/:id', component: FormPersonaComponent },

  { path: 'solicitudes', component: SolicitudComponent },
  { path: 'solicitudes/:id', component: SolicitudComponent },
  
  { path: 'solicitud-pdf', component: SolicitudPdfComponent },
  { path: 'solicitud-pdf/:id', component: SolicitudPdfComponent },


  { path: 'form-solicitud', component: FormSolicitudComponent },
  { path: 'form-solicitud/:id', component: FormSolicitudComponent },

  { path: 'servicios', component: ServicioComponent },
  { path: 'form-servicio', component: FormServicioComponent },
  { path: 'form-servicio/:id', component: FormServicioComponent },


  { path: 'tipodeimpresoras', component: TipoImpresoraComponent },
  { path: 'marcas', component: MarcasComponent },
  { path: 'colores', component: ColoresComponent },
  { path: 'tipodecarga', component: TipoCargaComponent },
  { path: 'tipodecartucho', component: TipoCartuchoComponent },

  { path: 'estados', component: EstadoComponent },

  { path: 'form-estado', component: FormEstadoComponent },
  { path: 'form-estado/:id', component: FormEstadoComponent },


  { path: 'informes', component: InformesComponent },







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
