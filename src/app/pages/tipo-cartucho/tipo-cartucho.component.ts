import { Component, OnInit } from '@angular/core';
import { TipoCartucho } from 'src/app/models/tipo-cartucho';
import { TipoCartuchoService } from 'src/app/services/tipo-cartucho.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-cartucho',
  templateUrl: './tipo-cartucho.component.html',
  styleUrls: ['./tipo-cartucho.component.css']
})
export class TipoCartuchoComponent implements OnInit {
  title:string= "Gestión de Tipos de Cartuchos";
  tipo_cartuchos: any[];

  constructor(private tipoCartuchoService:TipoCartuchoService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.tipoCartuchoService.getAll().subscribe(res => this.tipo_cartuchos = res);
  }

  delete(item: TipoCartucho): void {
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
        this.tipoCartuchoService.delete(item.id).subscribe(() => {
          this.tipo_cartuchos = this.tipo_cartuchos.filter(cat => cat != item);
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
