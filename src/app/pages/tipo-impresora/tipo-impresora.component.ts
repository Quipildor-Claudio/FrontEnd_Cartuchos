import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoImpresora } from 'src/app/models/tipo-impresora';
import { TipoImpresoraService } from 'src/app/services/tipo-impresora.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-impresora',
  templateUrl: './tipo-impresora.component.html',
  styleUrls: ['./tipo-impresora.component.css']
})
export class TipoImpresoraComponent implements OnInit {
  title: string = "Gestión de Tipos de Impresora";
  tipo_impresoras: any[];
  filterText: any;
  tipo_impresora: TipoImpresora = new TipoImpresora()
  agregandoNuevaImpresoraTipo: boolean;
  editarIndex = -1;
  edicionEnProgreso = false;


  constructor(private tipoImpresoraService: TipoImpresoraService,
    private route: Router,
 ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.tipoImpresoraService.getAll().subscribe(res => this.tipo_impresoras = res);
  }


  delete(item: TipoImpresora): void {
    Swal.fire({
      title: '¿Estás Seguro?',
      text: `Eliminar el tipo de impresora: ${item.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoImpresoraService.delete(item.id).subscribe(() => {
          this.tipo_impresoras = this.tipo_impresoras.filter(cat => cat !== item);
          Swal.fire('Eliminado!', 'El archivo ha sido eliminado', 'success');
        });
      }
    })
  }

  /*Agregar*/

  agregar(): void {
    this.agregandoNuevaImpresoraTipo = true;
    this.tipo_impresora = new TipoImpresora();
  }

  confirmarAgregar(): void {
    if (this.tipo_impresora.descripcion != null) {
      Swal.fire({
        title: '¿Estás Seguro?',
        text: `Agregar Tipo de Impresora: ${this.tipo_impresora.descripcion}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Agregar!'
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
  }

  cancelarAgregar(): void {
    this.agregandoNuevaImpresoraTipo = false;
    this.tipo_impresora = new TipoImpresora();
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
    if (item.descripcion != "") {
      Swal.fire({
        title: '¿Estás Seguro?',
        text: `Modificar el tipo de impresora: ${item.descripcion}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Modificar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.tipoImpresoraService.update(item, item.id).subscribe(() => {
            Swal.fire('Exito', `${item.descripcion} modificada!`, 'success');
            this.editarIndex = -1;
            this.edicionEnProgreso = false;
          })
        }
      });
    }
  }
}


