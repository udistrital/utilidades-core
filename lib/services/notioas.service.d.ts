import { ConfiguracionService } from './configuracion.service';
import { Subject } from 'rxjs';
export declare class NotioasService {
    private confService;
    NOTIFICACION_SERVICE: string;
    TIME_PING: number;
    messagesSubject: Subject<any>;
    listMessage: any;
    private notificacion_estado_usuario;
    private noNotifySubject;
    noNotify$: import("rxjs").Observable<unknown>;
    private arrayMessagesSubject;
    arrayMessages$: import("rxjs").Observable<unknown>;
    private activo;
    activo$: import("rxjs").Observable<{}>;
    timerPing$: import("rxjs").Observable<number>;
    roles: any;
    user: any;
    menuActivo: Boolean;
    constructor(confService: ConfiguracionService);
    toogleMenuNotify(): void;
    closePanel(): void;
    init(pathNotificacion: string): void;
    getNotificaciones(): void;
    getNotificacionEstadoUsuario(id: any): any;
    send_ping(): void;
    connect(): void;
    close(): void;
    addMessage(message: any): void;
    changeStateNoView(): void;
    changeStateToView(id: any, estado: any): void;
    queryNotification(): void;
}
