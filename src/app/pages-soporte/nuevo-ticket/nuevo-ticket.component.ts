import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nuevo-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nuevo-ticket.component.html',
  styleUrl: './nuevo-ticket.component.css'
})
export class NuevoTicketComponent {
  title:string="Nuevo pedido de Soporte Tecnico";

}
