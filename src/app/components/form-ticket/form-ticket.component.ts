import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MarcaService } from 'src/app/services/marca.service';
import { Ticket } from 'src/app/models/ticket';
import { Equipo } from 'src/app/models/equipo';
import { Marca } from 'src/app/models/marca';

@Component({
  selector: 'app-form-ticket',
  standalone: false,
  templateUrl: './form-ticket.component.html',
  styleUrl: './form-ticket.component.css'
})
export class FormTicketComponent implements OnInit {
  title: string = "NUEVO PEDIDO DE SOPORTE";
  user: any;
  newTicket: Ticket;
  equipo:Equipo;
  marcas:Marca[]=[];

  constructor(private userService: UserService,
    private authService: AuthService,
    private marcaService: MarcaService) {

    this.newTicket = new Ticket();
    this.equipo =  new Equipo();

  }

  ngOnInit(): void {
    this.getUsuario();
    this.getMarcas();

  }


  getUsuario(): void {
    let name = this.authService.getUserSession();
    this.userService.getUserbyName(name.username).subscribe(res => {
      this.user = res;
    });
  }
  create():void{
    this.newTicket.equipos.push(this.equipo);
    this.newTicket.usuario= this.user;
    console.log(this.newTicket);

  }

  getMarcas(): void {
    this.marcaService.getAll().subscribe(res => this.marcas = res);
  }
  comparar(o1: any, o2: any): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
