import { Cartucho } from "./cartucho";
import { Estado } from "./estado";
import { Impresora } from "./impresora";

export class Solicitud {
    id: number;
    descripcion: string;
    observacion: string;
    justificacion: string;
    cantidad: number;
    impresora:Impresora;
    cartuchos: Cartucho[] = [];
    estado: Estado;
    fecha_creacion: string;
    fecha_actualizacion: string;

}
