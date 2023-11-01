import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  title:string="Solicitudes"
  solicitudes:any[];

  constructor(private solicitudService:SolicitudService) { }

  ngOnInit(): void {
   
  }
  


}
