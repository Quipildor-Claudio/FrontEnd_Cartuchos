import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TipoCartucho } from 'src/app/models/tipo-cartucho';
import { TipoCartuchoService } from 'src/app/services/tipo-cartucho.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-cartucho',
  templateUrl: './tipo-cartucho.component.html',
  styleUrls: ['./tipo-cartucho.component.css']
})
export class TipoCartuchoComponent implements OnInit {
  title: string = "Gestión de Tipos de Cartuchos";
  tipo_cartuchos: any[];
  tipo_cartucho: TipoCartucho = new TipoCartucho();
  filterText: any;
  agregandoNuevoCartuchoTipo: boolean;
  editarIndex = -1;
  edicionEnProgreso = false;
  @ViewChild('tipoCartuchoContainer') tipoCartuchoContainer: ElementRef;

  ngAfterViewInit(): void {
    if (this.agregandoNuevoCartuchoTipo) {
      this.scrollToAddColor();
    }
  }

  constructor(
    private tipoCartuchoService: TipoCartuchoService,
    public route: Router) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.tipoCartuchoService.getAll().subscribe(res => this.tipo_cartuchos = res);
  }

  delete(item: TipoCartucho): void {
    Swal.fire({
      title: '¿Estás Seguro?',
      text: `Eliminar el tipo de cartucho: ${this.tipo_cartucho.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoCartuchoService.delete(item.id).subscribe(() => {
          this.tipo_cartuchos = this.tipo_cartuchos.filter(cat => cat !== item);
          Swal.fire('Eliminado!', 'Su archivo ha sido eliminado', 'success');
        });
      }
    })
  }

  /*Agregar*/

  agregar(): void {
    this.agregandoNuevoCartuchoTipo = true;
    this.tipo_cartucho = new TipoCartucho();
    setTimeout(() => {
      this.scrollToAddColor();
    }, 15);
  }

  confirmarAgregar(): void {
    if (this.tipo_cartucho.descripcion != null) {
      Swal.fire({
        title: '¿Estás Seguro?',
        text: `Agregar el tipo de cartucho: ${this.tipo_cartucho.descripcion}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Agregar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.tipoCartuchoService.add(this.tipo_cartucho).subscribe(() => {
            Swal.fire('Éxito', `Tipo de cartucho: ${this.tipo_cartucho.descripcion}, creada!`, 'success');
            this.agregandoNuevoCartuchoTipo = false;
            this.getData();
          })
        }
      })
    }
  }

  cancelarAgregar(): void {
    this.agregandoNuevoCartuchoTipo = false;
    this.tipo_cartucho = new TipoCartucho();
  }
  getNextId(): number {
    return Math.max(...this.tipo_cartuchos.map(c => c.id), 0) + 1;
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

  update(item: TipoCartucho): void {
    if (item.descripcion !="") {
      Swal.fire({
        title: '¿Estás Seguro?',
        text: `Modificar el tipo de cartucho: ${item.descripcion}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Modificar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.tipoCartuchoService.update(item, item.id).subscribe(() => {
            Swal.fire('Exito', `${item.descripcion} modificada!`, 'success');
            this.editarIndex = -1;
            this.edicionEnProgreso = false;
          })
        }
      });
    }

  }
  scrollToAddColor(): void {
    if (this.tipoCartuchoContainer && this.tipoCartuchoContainer.nativeElement) {
      this.tipoCartuchoContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }
}