import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { ColoresComponent } from './pages/colores/colores.component';
import { TipoCargaComponent } from './pages/tipo-carga/tipo-carga.component';
import { TipoCartuchoComponent } from './pages/tipo-cartucho/tipo-cartucho.component';
import { CartuchoComponent } from './pages/cartucho/cartucho.component';
import { TipoImpresoraComponent } from './pages/tipo-impresora/tipo-impresora.component';
import { ImpresoraComponent } from './pages/impresora/impresora.component';
import { EstadoComponent } from './pages/estado/estado.component';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { HomeComponent } from './pages/home/home.component';
import { FormImpresoraComponent } from './components/form-impresora/form-impresora.component';
import { FormCartuchoComponent } from './components/form-cartucho/form-cartucho.component';
import { RolComponent } from './pages/rol/rol.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { FormRolComponent } from './components/form-rol/form-rol.component';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';
import { FormSolicitudComponent } from './components/form-solicitud/form-solicitud.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { FormServicioComponent } from './components/form-servicio/form-servicio.component';
import { FormPersonaComponent } from './components/form-persona/form-persona.component';
import { FormEstadoComponent } from './components/form-estado/form-estado.component';
import { SolicitudPdfComponent } from './components/solicitud-pdf/solicitud-pdf.component';


import { InformesComponent } from './pages/informes/informes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { DataTablesModule } from "angular-datatables";
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { CabioContrasenaComponent } from './components/cabio-contrasena/cabio-contrasena.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MarcasComponent,
    ColoresComponent,
    TipoCargaComponent,
    TipoCartuchoComponent,
    CartuchoComponent,
    TipoImpresoraComponent,
    ImpresoraComponent,
    EstadoComponent,
    SolicitudComponent,
    HomeComponent,
    FormImpresoraComponent,
    FormCartuchoComponent,
    RolComponent,
    UsuarioComponent,
    FormRolComponent,
    FormUsuarioComponent,
    FormSolicitudComponent,
    PersonaComponent,
    ServicioComponent,
    FormServicioComponent,
    FormPersonaComponent,
    FormEstadoComponent,
    InformesComponent,
    SolicitudPdfComponent,
    PaginatorComponent,
    AyudaComponent,
    CabioContrasenaComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule,
    BrowserAnimationsModule,
    FilterPipe



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
