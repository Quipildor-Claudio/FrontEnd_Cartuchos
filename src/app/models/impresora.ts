import { Cartucho } from "./cartucho";
import { Marca } from "./marca";
import { TipoImpresora } from "./tipo-impresora";

export class Impresora {
    id:number;
    modelo:string;
    descripcion:string;
    marca:Marca;
    tipoImpresora:TipoImpresora;
    cartuchos:Cartucho[]=[];
}
