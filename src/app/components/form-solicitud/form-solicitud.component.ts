import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from 'src/app/models/estado';
import { Solicitud } from 'src/app/models/solicitud';
import { EstadoService } from 'src/app/services/estado.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-solicitud',
  templateUrl: './form-solicitud.component.html',
  styleUrls: ['./form-solicitud.component.css']
})
export class FormSolicitudComponent implements OnInit {
  title:string="Autorizaciones de Solicitudes";
  estados:Estado[];
  solicitud:Solicitud = new Solicitud();

  constructor(
    private solicitudService:SolicitudService,
    private estadoService:EstadoService,
    private route: Router,
    public activateRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.cargar();
    this.getEstados();
  }

  cargar(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.solicitudService.getOne(id).subscribe(res=>this.solicitud=res);
        console.log(this.solicitud);
      }
    }
    );
  }  
  getEstados():void{
    this.estadoService.getAll().subscribe(res=>this.estados=res);
  }

  create():void{
      console.log(this.solicitud);
      this.solicitudService.update(this.solicitud,this.solicitud.id).subscribe(res => {
        Swal.fire(
          'Exito',
          `Solicitud ${res.id}  Actualizada !`,
          'success'
        )
        this.route.navigate(['/home']);
      });  
  }
  comparar(o1: any, o2: any): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
