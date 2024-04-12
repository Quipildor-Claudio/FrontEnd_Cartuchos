import { Equipo } from "./equipo";
import { User } from "./user";

export class Ticket{
    id:number;
    tec_asignado:string;
    problem_report:string;
    observacion:string;
    diagnostico:string;
    derivado:string;
    fecha_solicitud:Date;
    fecha_atencion:Date;
    fecha_salida:Date;
    equipo:Equipo;
    usuario:User;

}