import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TipoCarga } from 'src/app/models/tipo-carga';
import { TipoCargaService } from 'src/app/services/tipo-carga.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-carga',
  templateUrl: './tipo-carga.component.html',
  styleUrls: ['./tipo-carga.component.css']
})
export class TipoCargaComponent implements OnInit {
  title:string= "Gestion de Tipos de Cargas";
  tipo_cargas: any[];
  @ViewChild('tipoCargaContainer') tipoCargaContainer: ElementRef;
  tipo_carga: TipoCarga= new TipoCarga();
  agregandoNuevaCarga:boolean;
  editarIndex = -1;
  edicionEnProgreso = false;

    
  ngAfterViewInit(): void {
    if (this.agregandoNuevaCarga) {
      this.scrollToAddColor();
    }
  }

  constructor(private tipoService: TipoCargaService, private route: Router) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.tipoService.getAll().subscribe(res => this.tipo_cargas = res);
  }

  delete(item: TipoCarga): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Eliminar la marca: ${this.tipo_carga.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
    if (confirm(`Eliminar ${item.descripcion}`)) {
      this.tipoService.delete(item.id).subscribe(() => {
        this.tipo_cargas = this.tipo_cargas.filter(cat => cat !== item);
        Swal.fire('Eliminado!', 'Su archivo a sido eliminado', 'success');
      });
    }
    this.route.navigate(['/colores']);
  } 
 })
}
/*Agregar*/ 

agregarCarga(): void {
  this.agregandoNuevaCarga = true;
  this.tipo_carga = new TipoCarga();
  setTimeout(() => {
    this.scrollToAddColor();
  },15);
}

confirmarAgregar(): void {
  Swal.fire({
    title: 'Estas Seguro?',
    text: `Agregar el tipo de carga: ${this.tipo_carga.descripcion}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Agregar!'
  }).then((result) => {
    if (result.isConfirmed) {
  this.tipoService.add(this.tipo_carga).subscribe(() => {
    Swal.fire('Éxito', `Categoría ${this.tipo_carga.descripcion} Creada!`, 'success');
    this.route.navigate(['/colores']);
    this.agregandoNuevaCarga = false;
    this.getData();
    })
    }
  })
}

cancelarAgregar(): void {
  this.agregandoNuevaCarga = false;
  this.tipo_carga= new TipoCarga();
}
getNextId(): number {
  return Math.max(...this.tipo_cargas.map(c => c.id), 0) + 1;
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

update(item: TipoCarga): void {
  Swal.fire({
    title: 'Estas Seguro?',
    text: `Modificar el tipo de carga: ${this.tipo_carga.descripcion}}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Modificar!'
  }).then((result) => {
    if (result.isConfirmed) {
  this.tipoService.update(item, item.id).subscribe(() => {
    Swal.fire('Exito', `${item.descripcion} Modificada!`, 'success');
    this.route.navigate(['/colores']);
    this.editarIndex = -1;
    this.edicionEnProgreso = false;
  })
}
});
}
scrollToAddColor(): void {
  if (this.tipoCargaContainer && this.tipoCargaContainer.nativeElement) {
    this.tipoCargaContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }
}
}
