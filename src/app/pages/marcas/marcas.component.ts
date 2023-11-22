import { Component, OnInit } from '@angular/core';
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
  title:string="Gestión de Marcas";
  
  constructor(private marcaService:MarcaService) { }

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
      confirmButtonText: 'Yes, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.marcaService.delete(item.id).subscribe(() => {
          this.marcas = this.marcas.filter(cat => cat != item);
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
