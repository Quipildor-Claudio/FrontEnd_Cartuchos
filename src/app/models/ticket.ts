import { Equipo } from "./equipo";
import { User } from "./user";

export class Ticket {
    id:number;
    tecnico_asignado:string;
    problema_reportado:string;
    observacion:string;
    derivado:string;
    usuario:User;
    equipos:Equipo[]=[];
    fecha_solicitud:string;
    fecha_atencion:string;
    fecha_salida;
    
}
