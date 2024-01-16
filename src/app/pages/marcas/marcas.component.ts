import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Marca } from 'src/app/models/marca';
import { MarcaService } from 'src/app/services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {
  marcas:any[];
  title:string="Gestion de Marcas";
  marca: Marca = new Marca();
  agregandoNuevaMarca = false;
  @ViewChild('marcasContainer') marcasContainer: ElementRef;
  editarIndex = -1;
  edicionEnProgreso = false;
    
  
  ngAfterViewInit(): void {
    if (this.agregandoNuevaMarca) {
      this.scrollToAddColor();
    }
  }

  constructor(private marcaService:MarcaService , private route: Router) { }

  ngOnInit(): void {
    this.getData();
  }
  getData():void{
      this.marcaService.getAll().subscribe(res=> this.marcas=res );
  }

  delete(item: Marca): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Eliminar la marca: ${item.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
    if (confirm(`Eliminar ${item.nombre}`)) {
      this.marcaService.delete(item.id).subscribe(() => {
        this.marcas = this.marcas.filter(cat => cat !== item);
        Swal.fire('Eliminado!', 'Su archivo a sido eliminado', 'success');
      });
    }
  } 
 })
}

agregar(): void {
  this.agregandoNuevaMarca = true;
  this.marca = new Marca();
  setTimeout(() => {
    this.scrollToAddColor();
  },15);
}

confirmarAgregar(): void {
  Swal.fire({
    title: 'Estas Seguro?',
    text: `Agregar la marca: ${this.marca.nombre}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Agregar!'
  }).then((result) => {
    if (result.isConfirmed) {
    this.marcaService.add(this.marca).subscribe(() => {
    Swal.fire('Éxito', `Categoría ${this.marca.nombre} Creada!`, 'success');
    this.agregandoNuevaMarca = false;
    this.getData();
    })
    }
  })
}

cancelarAgregar(): void {
  this.agregandoNuevaMarca = false;
  this.marca = new Marca();
}

getNextId(): number {
  return Math.max(...this.marcas.map(c => c.id), 0) + 1;
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

  update(item: Marca): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Modificar Marca: ${this.marca.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Modificar!'
    }).then((result) => {
      if (result.isConfirmed) {
    this.marcaService.update(item, item.id).subscribe(() => {
      Swal.fire('Exito', `${item.nombre} Modificada!`, 'success');
      this.editarIndex = -1;
      this.edicionEnProgreso = false;
    })
  }
});
}
scrollToAddColor(): void {
  if (this.marcasContainer && this.marcasContainer.nativeElement) {
    this.marcasContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }
}
}