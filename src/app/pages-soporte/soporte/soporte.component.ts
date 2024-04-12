import { Component, OnInit } from '@angular/core';
import { Equipo } from 'src/app/models/equipo';
import { Ticket } from 'src/app/models/ticket';
import { EquipoService } from 'src/app/services/equipo.service';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  styleUrl: './soporte.component.css'
})
export class SoporteComponent implements OnInit{
  
  titulo: string = "Soporte Técnico";
  equipo: Equipo = new Equipo();
  ticket: Ticket = new Ticket();
  equipoService : EquipoService;
  equipos :  Equipo [] = [];
  ngOnInit(): void {
  }
  
  getEquipos(): void {
    this.equipoService.getAll().subscribe(res => this.equipos = res);
  }
}

