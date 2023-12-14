import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';
import { Solicitud } from 'src/app/models/solicitud';
import { EstadoService } from 'src/app/services/estado.service';
import { Estado } from 'src/app/models/estado';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  solicitudes: Solicitud[] = [];
  estados: Estado[] = [];
  estado:any;
  filteredSol:Solicitud[] = [];
  filterText:'';

  constructor(
    private solicitudService: SolicitudService,
    private estadoService: EstadoService

  ) { }

  ngOnInit(): void {

    this.getData();
    this.getEstados();
  }

  getData() {
    this.solicitudService.getAll().subscribe(res => {
      this.solicitudes = res

      console.log(this.solicitudes);
    });
  }
  getEstados(): void {
    this.estadoService.getAll().subscribe(res => this.estados = res);
  }



  delete(item): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Eliminar ${item.id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.solicitudService.delete(item.id).subscribe(() => {
          this.solicitudes = this.solicitudes.filter(sol => sol != item);
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
  onEstadoChange(event){
    let est = event.target.value;
    est= est.substring(3);
    this.solicitudService.getBusquedaEstado(est).subscribe(res=>{
      this.solicitudes=res
      console.log(this.solicitudes);
    });
  }

  onChange(val:string){

  }

  comparar(o1: any, o2: any): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }





}
