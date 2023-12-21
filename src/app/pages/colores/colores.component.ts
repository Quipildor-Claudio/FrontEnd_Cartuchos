import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styleUrls: ['./colores.component.css']
})
export class ColoresComponent implements OnInit {
  title = "Gestion de Colores";
  colores: Color[];
  color: Color = new Color();
  editarIndex = -1;
  agregandoNuevoColor = false;
  edicionEnProgreso = false;
  mostrarAgregar:boolean=true;
  mostrarModificar:boolean=true;

  constructor(private colorService: ColorService, private route: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.colorService.getAll().subscribe(res => this.colores = res);
  }

  delete(item: Color): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Eliminar el color: ${this.color.nombre}}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
    if (confirm(`Eliminar ${item.nombre}`)) {
      this.colorService.delete(item.id).subscribe(() => {
        this.colores = this.colores.filter(cat => cat !== item);
        Swal.fire('Eliminado!', 'Su archivo a sido eliminado', 'success');
      });
    }
    this.route.navigate(['/colores']);
  } 
 })
}

  agregarColor(): void {
    this.agregandoNuevoColor = true;
    this.color = new Color();
    this.mostrarModificar=false;
  }

  confirmarAgregar(): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Agregar el color: ${this.color.nombre}}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Agregar!'
    }).then((result) => {
      if (result.isConfirmed) {
    this.colorService.add(this.color).subscribe(() => {
      Swal.fire('Éxito', `Categoría ${this.color.nombre} Creada!`, 'success');
      this.route.navigate(['/colores']);
      this.agregandoNuevoColor = false;
      this.getData();
      })
      }
    })
  }

  cancelarAgregar(): void {
    this.agregandoNuevoColor = false;
    this.color = new Color();
  }
  getNextId(): number {
    return Math.max(...this.colores.map(c => c.id), 0) + 1;
  }
  
  habilitarModificacion(index: number): void {
    this.editarIndex = index;
    this.edicionEnProgreso = true;
  }

  cancelarModificacion(): void {
    this.editarIndex = -1;
    this.edicionEnProgreso = false;
  }

  update(item: Color): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Modificar el color: ${this.color.nombre}}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Modificar!'
    }).then((result) => {
      if (result.isConfirmed) {
    this.colorService.update(item, item.id).subscribe(() => {
      Swal.fire('Exito', `${item.nombre} Modificada!`, 'success');
      this.route.navigate(['/colores']);
      this.editarIndex = -1;
      this.edicionEnProgreso = false;
    })
  }
});
}
}
 