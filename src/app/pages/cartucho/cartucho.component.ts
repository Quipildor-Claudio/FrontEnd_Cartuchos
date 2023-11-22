import { Component, OnInit } from '@angular/core';
import { Cartucho } from 'src/app/models/cartucho';
import { CartuchoService } from 'src/app/services/cartucho.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cartucho',
  templateUrl: './cartucho.component.html',
  styleUrls: ['./cartucho.component.css']
})
export class CartuchoComponent implements OnInit {
  title:string= "Gestion de Cartuchos";
  cartuchos: any[];
  constructor(private cartuchoService:CartuchoService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.cartuchoService.getAll().subscribe(res => this.cartuchos = res);
  }

  delete(item:Cartucho):void {
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
        this.cartuchoService.delete(item.id).subscribe(() => {
          this.cartuchos = this.cartuchos.filter(cat => cat != item);
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