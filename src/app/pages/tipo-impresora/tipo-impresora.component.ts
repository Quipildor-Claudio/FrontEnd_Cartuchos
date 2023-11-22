import { Component, OnInit } from '@angular/core';
import { TipoImpresora } from 'src/app/models/tipo-impresora';
import { TipoImpresoraService } from 'src/app/services/tipo-impresora.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-impresora',
  templateUrl: './tipo-impresora.component.html',
  styleUrls: ['./tipo-impresora.component.css']
})
export class TipoImpresoraComponent implements OnInit {
  title:string= "Gestión de Tipos de Impresora";
  tipo_impresoras: any[];

  constructor(private tipoImpresoraService:TipoImpresoraService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.tipoImpresoraService.getAll().subscribe(res => this.tipo_impresoras = res);
  }

  delete(item: TipoImpresora): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Eliminar el tipo: ${item.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoImpresoraService.delete(item.id).subscribe(() => {
          this.tipo_impresoras = this.tipo_impresoras.filter(cat => cat != item);
          Swal.fire(
            'Eliminado!',
            'Su archivo ha sido eliminado',
            'success'
          )
        }
        );

      }
    })
  }

}
