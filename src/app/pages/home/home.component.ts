import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { EstadoService } from 'src/app/services/estado.service';
import { Estado } from 'src/app/models/estado';
import { Solicitud } from 'src/app/models/solicitud';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  solicitudes:any[];
  constructor(private solicitudService:SolicitudService, private estadoService: EstadoService) { }
  estados: Estado[] = [];
  solicitud: Solicitud = new Solicitud();

  ngOnInit(): void {
    this.getData();
    this.getEstado();
    
  }
  getData(): void{
    this.solicitudService.getAll().subscribe(res=>this.solicitudes=res);
  }
  getEstado(): void{
    this.estadoService.getAll().subscribe(res=>this.estados=res);
  }
  delete(item):void{

  }

}
