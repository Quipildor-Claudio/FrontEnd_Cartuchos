import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoImpresora } from 'src/app/models/tipo-impresora';
import { TipoImpresoraService } from 'src/app/services/tipo-impresora.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-impresora',
  templateUrl: './tipo-impresora.component.html',
  styleUrls: ['./tipo-impresora.component.css']
})
export class TipoImpresoraComponent implements OnInit {
  title:string= "Gestion de Tipos de Impresora";
  tipo_impresoras: any[];
  tipo_impresora: TipoImpresora= new TipoImpresora()
  agregandoNuevaImpresoraTipo:boolean;
  editarIndex = -1;
  edicionEnProgreso = false;

  constructor(private tipoImpresoraService:TipoImpresoraService, private route: Router) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.tipoImpresoraService.getAll().subscribe(res => this.tipo_impresoras = res);
  }

  delete(item: TipoImpresora): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Eliminar el tipo de impresora: ${item.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
    if (confirm(`Eliminar ${item.descripcion}`)) {
      this.tipoImpresoraService.delete(item.id).subscribe(() => {
        this.tipo_impresoras = this.tipo_impresoras.filter(cat => cat !== item);
        Swal.fire('Eliminado!', 'Su archivo a sido eliminado', 'success');
      });
    }
  } 
 })
}

/*Agregar*/ 

agregar(): void {
  this.agregandoNuevaImpresoraTipo = true;
  this.tipo_impresora = new TipoImpresora();
}

confirmarAgregar(): void {
  Swal.fire({
    title: 'Estas Seguro?',
    text: `Agregar Tipo de Impresora: ${this.tipo_impresora.descripcion}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Agregar!'
  }).then((result) => {
    if (result.isConfirmed) {
  this.tipoImpresoraService.add(this.tipo_impresora).subscribe(() => {
    Swal.fire('Éxito', `Tipo de Impresora ${this.tipo_impresora.descripcion} Creada!`, 'success');
    this.agregandoNuevaImpresoraTipo = false;
    this.getData();
    })
    }
  })
}

cancelarAgregar(): void {
  this.agregandoNuevaImpresoraTipo = false;
  this.tipo_impresora= new TipoImpresora();
}
getNextId(): number {
  return Math.max(...this.tipo_impresoras.map(c => c.id), 0) + 1;
}

/*Modificar*/

habilitarModificacion(index: number): void {
  this.editarIndex = index;
  this.edicionEnProgreso = true;
}

cancelarModificacion(): void {
  this.editarIndex = -1;
  this.edicionEnProgreso = false;
}

update(item: TipoImpresora): void {
  Swal.fire({
    title: 'Estas Seguro?',
    text: `Modificar el Tipo de Impresora: ${item.descripcion}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Modificar!'
  }).then((result) => {
    if (result.isConfirmed) {
  this.tipoImpresoraService.update(item, item.id).subscribe(() => {
    Swal.fire('Exito', `${item.descripcion} Modificada!`, 'success');
    this.editarIndex = -1;
    this.edicionEnProgreso = false;
  })
}
});
}
}


