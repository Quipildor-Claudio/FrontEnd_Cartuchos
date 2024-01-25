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
import { SolicitudPdfComponent } from './components/solicitud-pdf/solicitud-pdf.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component:LoginComponent},

  { path: 'home', component: HomeComponent ,canActivate:[authGuard]},
  { path: 'home/page/:page', component: HomeComponent ,canActivate:[authGuard]},


  { path: 'solicitudes/page/:page', component: HomeComponent ,canActivate:[authGuard]},

  { path: 'cartuchos', component: CartuchoComponent,canActivate:[authGuard] },
  { path: 'form-cartucho', component: FormCartuchoComponent ,canActivate:[authGuard]},
  { path: 'form-cartucho/:id', component: FormCartuchoComponent,canActivate:[authGuard] },

  { path: 'impresoras', component: ImpresoraComponent ,canActivate:[authGuard]},
  { path: 'form-impresora', component: FormImpresoraComponent ,canActivate:[authGuard]},
  { path: 'form-impresora/:id', component: FormImpresoraComponent ,canActivate:[authGuard]},

  { path: 'roles', component: RolComponent ,canActivate:[authGuard]},
  { path: 'form-rol', component: FormRolComponent ,canActivate:[authGuard]},
  { path: 'form-rol/:id', component: FormRolComponent ,canActivate:[authGuard]},

  { path: 'usuarios', component: UsuarioComponent ,canActivate:[authGuard]},
  { path: 'form-usuario', component: FormUsuarioComponent,canActivate:[authGuard] },
  { path: 'form-usuario/:id', component: FormUsuarioComponent ,canActivate:[authGuard]},

  { path: 'personas', component: PersonaComponent ,canActivate:[authGuard]},
  { path: 'form-persona', component: FormPersonaComponent ,canActivate:[authGuard]},
  { path: 'form-persona/:id', component: FormPersonaComponent ,canActivate:[authGuard]},

  { path: 'solicitudes', component: SolicitudComponent,canActivate:[authGuard] },
  { path: 'solicitudes/:id', component: SolicitudComponent ,canActivate:[authGuard]},
  
  { path: 'solicitud-pdf', component: SolicitudPdfComponent ,canActivate:[authGuard]},
  { path: 'solicitud-pdf/:id', component: SolicitudPdfComponent ,canActivate:[authGuard]},


  { path: 'form-solicitud', component: FormSolicitudComponent ,canActivate:[authGuard]},
  { path: 'form-solicitud/:id', component: FormSolicitudComponent ,canActivate:[authGuard]},

  { path: 'servicios', component: ServicioComponent ,canActivate:[authGuard]},
  { path: 'form-servicio', component: FormServicioComponent ,canActivate:[authGuard]},
  { path: 'form-servicio/:id', component: FormServicioComponent ,canActivate:[authGuard]},


  { path: 'tipodeimpresoras', component: TipoImpresoraComponent ,canActivate:[authGuard]},
  { path: 'marcas', component: MarcasComponent ,canActivate:[authGuard]},
  { path: 'colores', component: ColoresComponent ,canActivate:[authGuard]},
  { path: 'tipodecarga', component: TipoCargaComponent ,canActivate:[authGuard]},
  { path: 'tipodecartucho', component: TipoCartuchoComponent ,canActivate:[authGuard]},

  { path: 'estados', component: EstadoComponent ,canActivate:[authGuard]},

  { path: 'form-estado', component: FormEstadoComponent ,canActivate:[authGuard]},
  { path: 'form-estado/:id', component: FormEstadoComponent ,canActivate:[authGuard]},


  { path: 'informes', component: InformesComponent ,canActivate:[authGuard]},







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
