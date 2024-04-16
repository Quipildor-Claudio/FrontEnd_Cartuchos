import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Equipo } from 'src/app/models/equipo';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-nuevo-ticket',

  templateUrl: './nuevo-ticket.component.html',
  styleUrl: './nuevo-ticket.component.css'
})
export class NuevoTicketComponent implements OnInit {
  title: string = "Nuevo pedido de Soporte Tecnico";
  ticket: Ticket;
  equipo:Equipo;
  user:User;

  constructor(private ticketService: TicketService, private authService: AuthService) {
    this.ticket = new Ticket();
    this.equipo= new Equipo();
    this.user= new User();

  }
  ngOnInit(): void {

  }

}
