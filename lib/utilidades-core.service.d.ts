import { ConfiguracionService } from './services/configuracion.service';
import { NotioasService } from './services/notioas.service';
import { MenuAplicacionesService } from './services/menuAplicaciones.service';
export declare class UtilidadesCoreService {
    private confService;
    private notioasService;
    private menuService;
    constructor(confService: ConfiguracionService, notioasService: NotioasService, menuService: MenuAplicacionesService);
    initLib({ CONFIGURACION_SERVICE, NOTIFICACION_SERVICE, entorno, notificaciones, menuApps }: {
        CONFIGURACION_SERVICE: any;
        NOTIFICACION_SERVICE: any;
        entorno: any;
        notificaciones: any;
        menuApps: any;
    }): void;
}
