import { Component, OnInit } from '@angular/core';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {
  marcas:any[];
  title:string="Gestion de Marcas";
  
  constructor(private marcaService:MarcaService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData():void{
      this.marcaService.getAll().subscribe(res=>{
        this.marcas=res;
        console.log(this.marcas);
      });
  }

  delete(item:any){

  }

}
