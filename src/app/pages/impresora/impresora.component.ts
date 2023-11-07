import { Component, OnInit } from '@angular/core';
import { Impresora } from 'src/app/models/impresora';
import { ImpresoraService } from 'src/app/services/impresora.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-impresora',
  templateUrl: './impresora.component.html',
  styleUrls: ['./impresora.component.css']
})
export class ImpresoraComponent implements OnInit {
  title: string = "Gestion  de Impresora";
  impresoras: any[];
  constructor(private impresoraService: ImpresoraService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.impresoraService.getAll().subscribe(res => this.impresoras = res);
  }

  delete(item: Impresora): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Eliminar ${item.modelo}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.impresoraService.delete(item.id).subscribe(() => {
          this.impresoras = this.impresoras.filter(cat => cat != item);
          Swal.fire(
            'Eliminado!',
            'Su archivo a sido eliminado',
            'success'
          )
        }
        );

      }
    })
  }


}
