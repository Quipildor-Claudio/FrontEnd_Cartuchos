import { Component, OnInit } from '@angular/core';
import { TipoCarga } from 'src/app/models/tipo-carga';
import { TipoCargaService } from 'src/app/services/tipo-carga.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-carga',
  templateUrl: './tipo-carga.component.html',
  styleUrls: ['./tipo-carga.component.css']
})
export class TipoCargaComponent implements OnInit {
  title:string= "Gestión de Tipos de Cargas";
  tipo_cargas: any[];

  constructor(private TipoCargaService: TipoCargaService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.TipoCargaService.getAll().subscribe(res => this.tipo_cargas = res);
  }

  delete(item: TipoCarga): void {
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
        this.TipoCargaService.delete(item.id).subscribe(() => {
          this.tipo_cargas = this.tipo_cargas.filter(cat => cat != item);
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
