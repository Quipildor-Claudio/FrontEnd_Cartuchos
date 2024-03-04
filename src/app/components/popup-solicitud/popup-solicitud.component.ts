import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EstadoService } from 'src/app/services/estado.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Estado } from 'src/app/models/estado';
import { Solicitud } from 'src/app/models/solicitud';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-popup-solicitud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-solicitud.component.html',
  styleUrl: './popup-solicitud.component.css'
})
export class PopupSolicitudComponent implements OnInit {
  title:any;
  estados:Estado[];
  solitud:Solicitud = new Solicitud();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private ref:MatDialogRef<PopupSolicitudComponent>,
    private estaService:EstadoService,
    private solicitudService:SolicitudService


  ) { }


ngOnInit(): void {
  this.title= this.data.title;
  this.solitud= this.data.data;
  console.log(this.data);
}
formChanged():void{
  
}

closepopup() {
  this.ref.close('Closed using function');
}

comparar(o1: any, o2: any): boolean {
  if (o1 === undefined && o2 === undefined) {
    return true;
  }

  return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
}
  

}


