import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/services/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  title:string="Gestión de Servicios";
  servicios:Servicio[]=[];
  agregandoNuevoServicio = false;
  editarIndex = -1;
  edicionEnProgreso = false;
  servicio: Servicio = new Servicio();


  constructor(private servicioService:ServicioService, private route: Router)  { 
    
  }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.servicioService.getAll().subscribe(res=>this.servicios=res);
  }

  delete(item: Servicio): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Eliminar la marca: ${this.servicio.nombre}}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
    if (confirm(`Eliminar ${item.nombre}`)) {
      this.servicioService.delete(item.id).subscribe(() => {
        this.servicios = this.servicios.filter(cat => cat !== item);
        Swal.fire('Eliminado!', 'Su archivo a sido eliminado', 'success');
      });
    }
    this.route.navigate(['/tipo_cargas']);
  } 
 })
}
/* Agregar*/ 
agregar(): void {
  this.agregandoNuevoServicio = true;
  this.servicio = new Servicio();
}

confirmarAgregar(): void {
  Swal.fire({
    title: 'Estas Seguro?',
    text: `Agregar el serivicio: ${this.servicio.nombre}}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Agregar!'
  }).then((result) => {
    if (result.isConfirmed) {
    this.servicioService.add(this.servicio).subscribe(() => {
    Swal.fire('Éxito', `Categoría ${this.servicio.nombre} Creada!`, 'success');
    this.route.navigate(['/tipo_cargas']);
    this.agregandoNuevoServicio = false;
    this.getData();
    })
    }
  })
}

cancelarAgregar(): void {
  this.agregandoNuevoServicio = false;
  this.servicio= new Servicio();
}

getNextId(): number {
  return Math.max(...this.servicios.map(c => c.id), 0) + 1;
}
/* Modificar */  

  habilitarModificacion(index: number): void {
    this.editarIndex = index;
    this.edicionEnProgreso = true;
  }

  cancelarModificacion(): void {
    this.editarIndex = -1;
    this.edicionEnProgreso = false;
  }

  update(item: Servicio): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Modificar el servicio: ${this.servicio.nombre}}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Modificar!'
    }).then((result) => {
      if (result.isConfirmed) {
    this.servicioService.update(item, item.id).subscribe(() => {
      Swal.fire('Exito', `${item.nombre} Modificada!`, 'success');
      this.route.navigate(['/tipo_cargas']);
      this.editarIndex = -1;
      this.edicionEnProgreso = false;
    })
  }
});
}
}
 