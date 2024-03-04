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
  title: string = "Gestión de Tipos de Cargas";
  tipo_cargas: any[];
  filterText; any;
  @ViewChild('tipoCargaContainer') tipoCargaContainer: ElementRef;
  tipo_carga: TipoCarga = new TipoCarga();
  agregandoNuevaCarga: boolean;
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
      title: '¿Estás Seguro?',
      text: `Eliminar el Tipo de Carga: ${item.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoService.delete(item.id).subscribe(() => {
          this.tipo_cargas = this.tipo_cargas.filter(cat => cat !== item);
          Swal.fire('Eliminado!', 'Su archivo ha sido eliminado', 'success');
        });
      }
    })
  }
  /*Agregar*/

  agregarCarga(): void {
    this.agregandoNuevaCarga = true;
    this.tipo_carga = new TipoCarga();
    setTimeout(() => {
      this.scrollToAddColor();
    }, 15);
  }

  confirmarAgregar(): void {
    if (this.tipo_carga.descripcion != null) {
      Swal.fire({
        title: '¿Estás Seguro?',
        text: `Agregar el Tipo de Carga: ${this.tipo_carga.descripcion}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Agregar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.tipoService.add(this.tipo_carga).subscribe(() => {
            Swal.fire('Éxito', `Tipo de Carga: ${this.tipo_carga.descripcion}, creada!`, 'success');
            this.agregandoNuevaCarga = false;
            this.getData();
          })
        }
      })
    }
  }

  cancelarAgregar(): void {
    this.agregandoNuevaCarga = false;
    this.tipo_carga = new TipoCarga();
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
    if (item.descripcion != "") {
      Swal.fire({
        title: '¿Estás Seguro?',
        text: `Modificar el Tipo de Carga: ${item.descripcion}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Modificar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.tipoService.update(item, item.id).subscribe((res) => {
            Swal.fire('Exito', `${item.descripcion} modificada!`, 'success');
            this.editarIndex = -1;
            this.edicionEnProgreso = false;
          })
        }
      });
    }
  }
  scrollToAddColor(): void {
    if (this.tipoCargaContainer && this.tipoCargaContainer.nativeElement) {
      this.tipoCargaContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }
}
