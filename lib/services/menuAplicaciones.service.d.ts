import { ConfiguracionService } from './configuracion.service';
export declare class MenuAplicacionesService {
    private configuracionService;
    private dataFilterSubject;
    eventFilter$: import("rxjs").Observable<any[]>;
    private activo;
    activo$: import("rxjs").Observable<{}>;
    categorias: any;
    isLogin: boolean;
    roles: any;
    menuActivo: Boolean;
    constructor(configuracionService: ConfiguracionService);
    closePanel(): void;
    getRole(): any;
    toogleMenuNotify(): void;
    init(categorias: any): void;
    getAplication(): any;
    existe(nombre: string, array: any): boolean;
}
