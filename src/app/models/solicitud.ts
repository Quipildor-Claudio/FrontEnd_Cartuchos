import { Cartucho } from "./cartucho";
import { Estado } from "./estado";

export class Solicitud {
    id:number;
    descripcion:string;
    observacion:string;
    justificacion:string;
    cantidad:number;
    cartuchos:Cartucho[]=[];
    estado:Estado;
   fecha_creacion:string;
   fecha_actualizacion:string;
   
}
