import { Servicio } from "./servicio";

export class Persona {
    id:number;
    apellido:string;
    nombre:string;
    dni:string;
    servicio:Servicio= new Servicio();
}
