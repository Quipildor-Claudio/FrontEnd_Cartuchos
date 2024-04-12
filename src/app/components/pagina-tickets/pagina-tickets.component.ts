import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-pagina-tickets',
  standalone: false,
  templateUrl: './pagina-tickets.component.html',
  styleUrl: './pagina-tickets.component.css'
})
export class PaginaTicketsComponent implements OnInit {
  title:string="Soporte Computos";
    tickets: any;
  constructor(private ticketService: TicketService) {

  }

  ngOnInit(): void {
    this.getData();

  }
  getData(): void {
    this.ticketService.getAll().subscribe(res => {
      this.tickets =res;
      console.log(res);
    }
    );
  }
  delete(item:any):void{

  }

}
