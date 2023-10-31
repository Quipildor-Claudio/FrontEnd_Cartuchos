import { Component, OnInit } from '@angular/core';
import { ImpresoraService } from 'src/app/services/impresora.service';

@Component({
  selector: 'app-impresora',
  templateUrl: './impresora.component.html',
  styleUrls: ['./impresora.component.css']
})
export class ImpresoraComponent implements OnInit {
  title: string = "Gestion  de Impresora";
  impresoras: any[];
  constructor(private impresoraService: ImpresoraService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.impresoraService.getAll().subscribe(res => this.impresoras = res);
  }

  delete(item: any): void {

  }


}
