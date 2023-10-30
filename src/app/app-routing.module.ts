import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { ColoresComponent } from './pages/colores/colores.component';

const routes: Routes = [
  { path: 'marcas', component: MarcasComponent },
  { path: 'colores', component: ColoresComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
