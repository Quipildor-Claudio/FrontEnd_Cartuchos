import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/app/models/ticket';
import { Equipo } from 'src/app/models/equipo';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-listado-tickets',
  templateUrl: './listado-tickets.component.html',
  styleUrl: './listado-tickets.component.css'
})
export class ListadoTicketsComponent implements OnInit {
  title: string = "Listado de Tickets de Soporte";
  tickets: any[];
  equipo: Equipo;
  user: User;

  constructor(private ticketService: TicketService) {
    this.equipo = new Equipo();
    this.user = new User();
  }

  ngOnInit(): void {
    this.getAllData();

  }

  getAllData(): void {
    this.ticketService.getAll().subscribe(res => {
      this.tickets = res;
      console.log(res);
    });
  }



}
