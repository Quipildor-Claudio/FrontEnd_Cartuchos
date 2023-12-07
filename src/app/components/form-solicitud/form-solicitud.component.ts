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
  solitud:Solicitud = new Solicitud();

  constructor(
    private solicitudService:SolicitudService,
    private estadoService:EstadoService,
    private route: Router,
    public activateRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.solicitudService.getOne(id).subscribe(res=>this.solitud=res);
        console.log(this.solitud);
      }
    }
    );
  }  
  

}
