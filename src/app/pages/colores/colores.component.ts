import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styleUrls: ['./colores.component.css']
})
export class ColoresComponent implements OnInit {
  title = "Gestión de Colores";
  colores: Color[];
  filterText: any;


  @ViewChild('coloresContainer') coloresContainer: ElementRef;
  color: Color = new Color();
  editarIndex = -1;
  agregandoNuevoColor = false;
  edicionEnProgreso = false;
  mostrarAgregar: boolean = true;
  mostrarModificar: boolean = true;


  ngAfterViewInit(): void {
    if (this.agregandoNuevoColor) {
      this.scrollToAddColor();
    }
  }
  constructor(private colorService: ColorService, private route: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.colorService.getAll().subscribe(res => this.colores = res);
  }

  delete(item: Color): void {
    Swal.fire({
      title: ` ${item.nombre}`,
      icon: 'warning',
      text: `Eliminar el color?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.colorService.delete(item.id).subscribe(() => {
          this.colores = this.colores.filter(cat => cat !== item);
          Swal.fire('Eliminado!', 'Su archivo ha sido eliminado', 'success');
        });
      }
    })
  }

  agregarColor(): void {
    this.agregandoNuevoColor = true;
    this.color = new Color();
    this.mostrarModificar = false;
    setTimeout(() => {
      this.scrollToAddColor();
    }, 15);
  }

  confirmarAgregar(): void {
    if (this.color.nombre != null) {
      Swal.fire({
        title: '¿Estás Seguro?',
        text: `Agregar el color: ${this.color.nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Agregar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.colorService.add(this.color).subscribe(() => {
            Swal.fire('Éxito', `Color: ${this.color.nombre}, creada!`, 'success');
            this.agregandoNuevoColor = false;
            this.getData();
          })
        }
      })
    }

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
    if (item.nombre != "") {
      Swal.fire({
        title: '¿Estás Seguro?',
        text: `Modificar el color: ${item.nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Modificar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.colorService.update(item, item.id).subscribe(() => {
            Swal.fire('Éxito', `${item.nombre} modificada!`, 'success');
            this.editarIndex = -1;
            this.edicionEnProgreso = false;
          })
        }
      });
    }

  }

scrollToAddColor(): void {
  if (this.coloresContainer && this.coloresContainer.nativeElement) {
    this.coloresContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }
}
}
 