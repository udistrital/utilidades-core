import { Injectable, ɵɵdefineInjectable, ɵɵinject, Component, NgModule } from '@angular/core';
import { HttpHeaders, HttpClient, HttpClientModule } from '@angular/common/http';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, BehaviorSubject, interval, fromEvent, from } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';
import { Md5 } from 'ts-md5';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ConfiguracionService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }),
        };
    }
    /**
     * @param {?} path
     * @return {?}
     */
    setPath(path) {
        this.path = path;
    }
    /**
     * @param {?} endpoint
     * @return {?}
     */
    get(endpoint) {
        return this.http.get(`${this.path}${endpoint}`, this.httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            if (res.hasOwnProperty('Body')) {
                return res['Body'];
            }
            else {
                return res;
            }
        })));
    }
    /**
     * Perform a POST http request
     * @param {?} endpoint service's end-point
     * @param {?} element data to send as JSON
     * @return {?} Observable<any>
     */
    post(endpoint, element) {
        return this.http.post(`${this.path}${endpoint}`, element, this.httpOptions);
    }
    /**
     * Perform a PUT http request
     * @param {?} endpoint service's end-point
     * @param {?} element data to send as JSON, With the id to UPDATE
     * @return {?} Observable<any>
     */
    put(endpoint, element) {
        return this.http.put(`${this.path}${endpoint}/${element.Id}`, element, this.httpOptions);
    }
    /**
     * Perform a DELETE http request
     * @param {?} endpoint service's end-point
     * @param {?} id element's id for remove
     * @return {?} Observable<any>
     */
    delete(endpoint, id) {
        return this.http.delete(`${this.path}${endpoint}/${id}`, this.httpOptions);
    }
}
ConfiguracionService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */
ConfiguracionService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ ConfiguracionService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ConfiguracionService_Factory() { return new ConfiguracionService(ɵɵinject(HttpClient)); }, token: ConfiguracionService, providedIn: "root" });
if (false) {
    /** @type {?} */
    ConfiguracionService.prototype.httpOptions;
    /** @type {?} */
    ConfiguracionService.prototype.path;
    /**
     * @type {?}
     * @private
     */
    ConfiguracionService.prototype.http;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NotioasService {
    /**
     * @param {?} confService
     */
    constructor(confService) {
        this.confService = confService;
        this.NOTIFICACION_SERVICE = '';
        this.TIME_PING = 30000;
        this.noNotifySubject = new Subject();
        this.noNotify$ = this.noNotifySubject.asObservable();
        this.arrayMessagesSubject = new Subject();
        this.arrayMessages$ = this.arrayMessagesSubject.asObservable();
        this.activo = new BehaviorSubject({});
        this.activo$ = this.activo.asObservable();
        this.timerPing$ = interval(this.TIME_PING);
        this.menuActivo = false;
        this.listMessage = [];
        this.notificacion_estado_usuario = [];
        /** @type {?} */
        const up$ = fromEvent(document, 'mouseup');
        up$.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (this.activo) {
                if (((data.path
                    .map((/**
                 * @param {?} info
                 * @return {?}
                 */
                (info) => { return (info.localName); })))
                    .filter((/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => (data === 'lib-notioas')))).length === 0) {
                    this.closePanel();
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    toogleMenuNotify() {
        this.menuActivo = !this.menuActivo;
        /** @type {?} */
        const data = { activo: this.menuActivo };
        this.activo.next(data);
        if (this.menuActivo) {
            this.changeStateNoView();
        }
    }
    /**
     * @return {?}
     */
    closePanel() {
        this.menuActivo = false;
        this.activo.next({ activo: this.menuActivo });
    }
    /**
     * @param {?} pathNotificacion
     * @return {?}
     */
    init(pathNotificacion) {
        console.info('...Init lib notificaciones');
        this.NOTIFICACION_SERVICE = pathNotificacion;
        this.connect();
        this.queryNotification();
    }
    /**
     * @return {?}
     */
    getNotificaciones() {
        this.noNotifySubject.next((this.listMessage.filter((/**
         * @param {?} data
         * @return {?}
         */
        data => (data.Estado).toLowerCase() === 'enviada'))).length);
        this.arrayMessagesSubject.next(this.listMessage);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getNotificacionEstadoUsuario(id) {
        return (this.notificacion_estado_usuario.filter((/**
         * @param {?} data
         * @return {?}
         */
        data => data.Id === id)))[0];
    }
    /**
     * @return {?}
     */
    send_ping() {
        // sending ping every 30 seconds
        this.timerPing$.subscribe((/**
         * @return {?}
         */
        () => (this.messagesSubject.next('ping'))));
    }
    /**
     * @return {?}
     */
    connect() {
        /** @type {?} */
        const id_token = localStorage.getItem('id_token');
        /** @type {?} */
        const access_token = localStorage.getItem('access_token');
        if (id_token !== null && access_token !== null) {
            this.roles = (JSON.parse(atob(id_token.split('.')[1])).role).filter((/**
             * @param {?} data
             * @return {?}
             */
            (data) => (data.indexOf('/') === -1)));
            this.user = JSON.parse(atob(id_token.split('.')[1])).sub;
            if (this.roles.length > 0) {
                // const connWs = `${this.NOTIFICACION_SERVICE}/join?id=${this.user}&profiles=${this.roles}`;
                /** @type {?} */
                const connWs = `${this.NOTIFICACION_SERVICE}/join?id=${access_token}`;
                this.messagesSubject = webSocket({
                    url: connWs,
                    openObserver: {
                        next: (/**
                         * @return {?}
                         */
                        () => {
                            this.send_ping();
                        }),
                    },
                });
                this.messagesSubject
                    .pipe(map((/**
                 * @param {?} msn
                 * @return {?}
                 */
                (msn) => {
                    this.listMessage = [...[msn], ...this.listMessage];
                    this.noNotifySubject.next((this.listMessage.filter((/**
                     * @param {?} data
                     * @return {?}
                     */
                    data => (data.Estado).toLowerCase() === 'enviada'))).length);
                    this.arrayMessagesSubject.next(this.listMessage);
                    return msn;
                })))
                    .subscribe((/**
                 * @param {?} msg
                 * @return {?}
                 */
                (msg) => { }), (/**
                 * @param {?} err
                 * @return {?}
                 */
                err => {
                    console.info('websocketError:', err);
                }), (/**
                 * @return {?}
                 */
                () => console.info('complete')));
            }
        }
    }
    /**
     * @return {?}
     */
    close() {
        this.messagesSubject.unsubscribe();
    }
    /**
     * @param {?} message
     * @return {?}
     */
    addMessage(message) {
        this.listMessage = [...[message], ...this.listMessage];
        this.noNotifySubject.next((this.listMessage.filter((/**
         * @param {?} data
         * @return {?}
         */
        data => (data.Estado).toLowerCase() === 'enviada'))).length);
        this.arrayMessagesSubject.next(this.listMessage);
    }
    /**
     * @return {?}
     */
    changeStateNoView() {
        if (this.listMessage.filter((/**
         * @param {?} data
         * @return {?}
         */
        data => (data.Estado).toLowerCase() === 'enviada')).length >= 1) {
            this.confService.post('notificacion_estado_usuario/changeStateNoView/' + this.user, {})
                .subscribe((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                this.listMessage = [];
                this.queryNotification();
            }));
        }
    }
    /**
     * @param {?} id
     * @param {?} estado
     * @return {?}
     */
    changeStateToView(id, estado) {
        if (estado === 'noleida') {
            /** @type {?} */
            const notificacion = this.getNotificacionEstadoUsuario(id);
            this.confService.get('notificacion_estado_usuario/changeStateToView/' + notificacion.Id)
                .subscribe((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                this.listMessage = [];
                this.queryNotification();
            }));
        }
    }
    /**
     * @return {?}
     */
    queryNotification() {
        /** @type {?} */
        const id_token = localStorage.getItem('id_token');
        /** @type {?} */
        const access_token = localStorage.getItem('access_token');
        if (id_token !== null && access_token !== null) {
            this.confService.get('notificacion_estado_usuario?query=Usuario:' + this.user + ',Activo:true&sortby=notificacion&order=asc&limit=-1')
                .subscribe((/**
             * @param {?} resp
             * @return {?}
             */
            (resp) => {
                if (resp !== null) {
                    this.notificacion_estado_usuario = resp;
                    from(resp)
                        .subscribe((/**
                     * @param {?} notify
                     * @return {?}
                     */
                    (notify) => {
                        if (typeof notify.Notificacion !== 'undefined') {
                            /** @type {?} */
                            const message = {
                                Id: notify.Id,
                                Type: notify.Notificacion.NotificacionConfiguracion.Tipo.Id,
                                Content: JSON.parse(notify.Notificacion.CuerpoNotificacion),
                                User: notify.Notificacion.NotificacionConfiguracion.Aplicacion.Nombre,
                                Alias: notify.Notificacion.NotificacionConfiguracion.Aplicacion.Alias,
                                EstiloIcono: notify.Notificacion.NotificacionConfiguracion.Aplicacion.EstiloIcono,
                                FechaCreacion: new Date(notify.Notificacion.FechaCreacion),
                                FechaEdicion: new Date(notify.Fecha),
                                Estado: notify.NotificacionEstado.CodigoAbreviacion,
                            };
                            this.addMessage(message);
                        }
                    }));
                }
            }));
        }
    }
}
NotioasService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */
NotioasService.ctorParameters = () => [
    { type: ConfiguracionService }
];
/** @nocollapse */ NotioasService.ngInjectableDef = ɵɵdefineInjectable({ factory: function NotioasService_Factory() { return new NotioasService(ɵɵinject(ConfiguracionService)); }, token: NotioasService, providedIn: "root" });
if (false) {
    /** @type {?} */
    NotioasService.prototype.NOTIFICACION_SERVICE;
    /** @type {?} */
    NotioasService.prototype.TIME_PING;
    /** @type {?} */
    NotioasService.prototype.messagesSubject;
    /** @type {?} */
    NotioasService.prototype.listMessage;
    /**
     * @type {?}
     * @private
     */
    NotioasService.prototype.notificacion_estado_usuario;
    /**
     * @type {?}
     * @private
     */
    NotioasService.prototype.noNotifySubject;
    /** @type {?} */
    NotioasService.prototype.noNotify$;
    /**
     * @type {?}
     * @private
     */
    NotioasService.prototype.arrayMessagesSubject;
    /** @type {?} */
    NotioasService.prototype.arrayMessages$;
    /**
     * @type {?}
     * @private
     */
    NotioasService.prototype.activo;
    /** @type {?} */
    NotioasService.prototype.activo$;
    /** @type {?} */
    NotioasService.prototype.timerPing$;
    /** @type {?} */
    NotioasService.prototype.roles;
    /** @type {?} */
    NotioasService.prototype.user;
    /** @type {?} */
    NotioasService.prototype.menuActivo;
    /**
     * @type {?}
     * @private
     */
    NotioasService.prototype.confService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const catalogo = {
    test: [
        {
            nombre: 'GAIA - Gestión Administrativa',
            color: '#8E2825',
            aplicaciones: [
                {
                    nombre: 'AGORA',
                    url: 'https://www.google.com',
                    estilo: 'agora-info',
                    descripcion: 'Banco de proveedores que apoya procesos de cotización y contratación',
                },
                {
                    nombre: 'ARGO',
                    url: 'https://www.google.com',
                    estilo: 'argo-info',
                    descripcion: 'Apoyo en la gestión de procesos precontractuales, contractuales y de compras',
                },
                {
                    nombre: 'ARKA',
                    url: 'https://www.google.com',
                    estilo: 'arka-info',
                    descripcion: 'Gestión de los movimientos de almacén e inventarios apoyando los procesos relacionados a bienes',
                },
                {
                    nombre: 'CUMPLIDOS',
                    url: 'https://pruebascumplidos.portaloas.udistrital.edu.co',
                    estilo: 'cumplidos-info',
                    descripcion: 'Apoyo de procesos postcontractuales tanto para docentes de vinculacion especial como CPS',
                },
                {
                    nombre: 'RESOLUCIONES',
                    url: 'https://pruebasresoluciones.portaloas.udistrital.edu.co',
                    estilo: 'resoluciones-info',
                    descripcion: 'Gestión del vinculo contractual de los docentes de vinculación especial apoyando procesos de RRHH',
                },
                {
                    nombre: 'OIKOS',
                    url: 'https://www.google.com',
                    estilo: 'oikos-info',
                    descripcion: 'Registro y definición de las dependencias y espacios físicos de la universidad distrital',
                },
                {
                    nombre: 'SISIFO',
                    url: 'https://www.google.com',
                    estilo: 'sisifo-info',
                    descripcion: 'Sistema de gestion de planes de mejoramiento para los procesos académico administrativos',
                },
                {
                    nombre: 'TEMIS',
                    url: 'https://www.google.com',
                    estilo: 'temis-info',
                    descripcion: 'Apoyo en la definición y cálculo de las cuotas partes pensionales con entidades externas',
                },
                {
                    nombre: 'PERSEO',
                    url: 'https://www.google.com',
                    estilo: 'perseo-info',
                    descripcion: 'Permitir el desarrollo de procesos electorales dentro de la universidad de forma digital',
                },
            ],
        },
        {
            nombre: 'URANO - Gestión Académica',
            color: '#15485E',
            aplicaciones: [
                {
                    nombre: 'JANO',
                    url: 'https://www.google.com',
                    estilo: 'jano-info',
                    descripcion: 'Apoyo en el desarrollo de concursos de mérito para ocupar plazas de planta docente',
                },
                {
                    nombre: 'KYRON',
                    url: 'https://www.google.com',
                    estilo: 'kyron-info',
                    descripcion: 'Registro y consolidación de información de producción académica de docentes de planta',
                },
                {
                    nombre: 'POLUX',
                    url: 'https://www.google.com',
                    estilo: 'polux-info',
                    descripcion: 'Apoya la gestion de trabajos de grado'
                },
                {
                    nombre: 'SGA',
                    url: 'https://pruebassga.portaloas.udistrital.edu.co',
                    estilo: 'sga-info',
                    descripcion: 'Apoya el desarrollo de la misión de la universidad, así como diversos procesos administrativos',
                },
                {
                    nombre: 'CAMPUS',
                    url: 'https://www.google.com',
                    estilo: 'campus-info',
                    descripcion: 'Campus Virtual para postgrados',
                },
                {
                    nombre: 'SICIUD',
                    url: 'https://www.google.com',
                    estilo: 'siciud-info',
                    descripcion: 'Una breve descripción acerca de sisiud',
                },
            ],
        },
        {
            nombre: 'NIX - Gestión Financiera',
            color: '#DE9E0F',
            aplicaciones: [
                {
                    nombre: 'KRONOS',
                    url: 'https://pruebaspresupuesto.portaloas.udistrital.edu.co',
                    estilo: 'kronos-info',
                    descripcion: 'Apoyar el libre desarrollo de los procesos financieros y reporte de información a entes de control',
                },
                {
                    nombre: 'TITAN',
                    url: 'https://www.google.com',
                    estilo: 'titan-info',
                    descripcion: 'Construir las diferentes nóminas y pago de honorarios de los compromisos contractuales',
                },
            ],
        },
        {
            nombre: 'ATHENEA - Analíticos',
            color: '#397A18',
            aplicaciones: [
                {
                    nombre: 'SPAGOBI',
                    url: 'https://www.google.com',
                    estilo: 'spagobi-info',
                    descripcion: 'Una breve descripción acerca de spagobi',
                },
                {
                    nombre: 'CIRENE',
                    url: 'https://www.google.com',
                    estilo: 'cirene-info',
                    descripcion: 'Una breve descripción acerca de cirene',
                },
                {
                    nombre: 'APEA',
                    url: 'https://www.google.com',
                    estilo: 'apea-info',
                    descripcion: 'Una breve descripción acerca de apea',
                },
            ],
        },
    ],
    prod: [
        {
            nombre: 'GAIA - Gestión Administrativa',
            color: '#8E2825',
            aplicaciones: [
                {
                    nombre: 'AGORA',
                    url: 'https://www.google.com',
                    estilo: 'agora-info',
                    descripcion: 'Banco de proveedores que apoya procesos de cotización y contratación',
                },
                {
                    nombre: 'ARGO',
                    url: 'https://www.google.com',
                    estilo: 'argo-info',
                    descripcion: 'Apoyo en la gestión de procesos precontractuales, contractuales y de compras',
                },
                {
                    nombre: 'ARKA',
                    url: 'https://www.google.com',
                    estilo: 'arka-info',
                    descripcion: 'Gestión de los movimientos de almacén e inventarios apoyando los procesos relacionados a bienes',
                },
                {
                    nombre: 'CUMPLIDOS',
                    url: 'https://pruebascumplidos.portaloas.udistrital.edu.co',
                    estilo: 'cumplidos-info',
                    descripcion: 'Apoyo de procesos postcontractuales tanto para docentes de vinculacion especial como CPS',
                },
                {
                    nombre: 'RESOLUCIONES',
                    url: 'https://pruebasresoluciones.portaloas.udistrital.edu.co',
                    estilo: 'resoluciones-info',
                    descripcion: 'Gestión del vinculo contractual de los docentes de vinculación especial apoyando procesos de RRHH',
                },
                {
                    nombre: 'OIKOS',
                    url: 'https://www.google.com',
                    estilo: 'oikos-info',
                    descripcion: 'Registro y definición de las dependencias y espacios físicos de la universidad distrital',
                },
                {
                    nombre: 'SISIFO',
                    url: 'https://www.google.com',
                    estilo: 'sisifo-info',
                    descripcion: 'Sistema de gestion de planes de mejoramiento para los procesos académico administrativos',
                },
                {
                    nombre: 'TEMIS',
                    url: 'https://www.google.com',
                    estilo: 'temis-info',
                    descripcion: 'Apoyo en la definición y cálculo de las cuotas partes pensionales con entidades externas',
                },
                {
                    nombre: 'PERSEO',
                    url: 'https://www.google.com',
                    estilo: 'perseo-info',
                    descripcion: 'Permitir el desarrollo de procesos electorales dentro de la universidad de forma digital',
                },
            ],
        },
        {
            nombre: 'URANO - Gestión Académica',
            color: '#15485E',
            aplicaciones: [
                {
                    nombre: 'JANO',
                    url: 'https://www.google.com',
                    estilo: 'jano-info',
                    descripcion: 'Apoyo en el desarrollo de concursos de mérito para ocupar plazas de planta docente',
                },
                {
                    nombre: 'KYRON',
                    url: 'https://www.google.com',
                    estilo: 'kyron-info',
                    descripcion: 'Registro y consolidación de información de producción académica de docentes de planta',
                },
                {
                    nombre: 'POLUX',
                    url: 'https://www.google.com',
                    estilo: 'polux-info',
                    descripcion: 'Apoya la gestion de trabajos de grado'
                },
                {
                    nombre: 'SGA',
                    url: 'https://pruebassga.portaloas.udistrital.edu.co',
                    estilo: 'sga-info',
                    descripcion: 'Apoya el desarrollo de la misión de la universidad, así como diversos procesos administrativos',
                },
                {
                    nombre: 'CAMPUS',
                    url: 'https://www.google.com',
                    estilo: 'campus-info',
                    descripcion: 'Campus Virtual para postgrados',
                },
                {
                    nombre: 'SICIUD',
                    url: 'https://www.google.com',
                    estilo: 'siciud-info',
                    descripcion: 'Una breve descripción acerca de sisiud',
                },
            ],
        },
        {
            nombre: 'NIX - Gestión Financiera',
            color: '#DE9E0F',
            aplicaciones: [
                {
                    nombre: 'KRONOS',
                    url: 'https://pruebaspresupuesto.portaloas.udistrital.edu.co',
                    estilo: 'kronos-info',
                    descripcion: 'Apoyar el libre desarrollo de los procesos financieros y reporte de información a entes de control',
                },
                {
                    nombre: 'TITAN',
                    url: 'https://www.google.com',
                    estilo: 'titan-info',
                    descripcion: 'Construir las diferentes nóminas y pago de honorarios de los compromisos contractuales',
                },
            ],
        },
        {
            nombre: 'ATHENEA - Analíticos',
            color: '#397A18',
            aplicaciones: [
                {
                    nombre: 'SPAGOBI',
                    url: 'https://www.google.com',
                    estilo: 'spagobi-info',
                    descripcion: 'Una breve descripción acerca de spagobi',
                },
                {
                    nombre: 'CIRENE',
                    url: 'https://www.google.com',
                    estilo: 'cirene-info',
                    descripcion: 'Una breve descripción acerca de cirene',
                },
                {
                    nombre: 'APEA',
                    url: 'https://www.google.com',
                    estilo: 'apea-info',
                    descripcion: 'Una breve descripción acerca de apea',
                },
            ],
        },
    ],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MenuAplicacionesService {
    /**
     * @param {?} configuracionService
     */
    constructor(configuracionService) {
        this.configuracionService = configuracionService;
        this.dataFilterSubject = new BehaviorSubject([]);
        this.eventFilter$ = this.dataFilterSubject.asObservable();
        this.activo = new BehaviorSubject({});
        this.activo$ = this.activo.asObservable();
        this.isLogin = false;
        this.menuActivo = false;
        this.roles = this.getRole();
        /** @type {?} */
        const up$ = fromEvent(document, 'mouseup');
        up$.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (this.activo) {
                if (((data.path.map((/**
                 * @param {?} info
                 * @return {?}
                 */
                (info) => { return (info.localName); }))).filter((/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => (data === 'menu-aplicaciones')))).length === 0) {
                    this.closePanel();
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    closePanel() {
        this.menuActivo = false;
        this.activo.next({ activo: this.menuActivo });
    }
    /**
     * @return {?}
     */
    getRole() {
        /** @type {?} */
        const data = [];
        if (window.localStorage.getItem('id_token') !== null) {
            this.isLogin = true;
            // tslint:disable-next-line: variable-name
            /** @type {?} */
            const id_token = window.localStorage.getItem('id_token').split('.');
            /** @type {?} */
            const payload = JSON.parse(atob(id_token[1]));
            return payload.role.map((/**
             * @param {?} element
             * @return {?}
             */
            (element) => ({ Nombre: element })));
        }
        else {
            this.isLogin = false;
            this.dataFilterSubject.next(this.categorias);
        }
    }
    /**
     * @return {?}
     */
    toogleMenuNotify() {
        this.menuActivo = !this.menuActivo;
        /** @type {?} */
        const data = { activo: this.menuActivo };
        this.activo.next(data);
    }
    /**
     * @param {?} categorias
     * @return {?}
     */
    init(categorias) {
        console.info('...Init lib menu');
        this.categorias = categorias;
        this.dataFilterSubject.next(this.categorias);
        this.getAplication();
    }
    /**
     * @return {?}
     */
    getAplication() {
        /** @type {?} */
        const id_token = localStorage.getItem('id_token');
        /** @type {?} */
        const access_token = localStorage.getItem('access_token');
        if (id_token !== null && access_token !== null) {
            this.configuracionService.post('aplicacion_rol/aplicacion_rol', this.roles)
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                /** @type {?} */
                let nuevasAplicaciones = this.categorias.map((/**
                 * @param {?} categoria
                 * @return {?}
                 */
                (categoria) => {
                    categoria.aplicaciones = categoria.aplicaciones.filter((/**
                     * @param {?} aplicacion
                     * @return {?}
                     */
                    (aplicacion) => (this.existe(aplicacion.nombre, data))));
                    categoria.aplicaciones = categoria.aplicaciones.map((/**
                     * @param {?} app
                     * @return {?}
                     */
                    (app) => {
                        return Object.assign({}, app, { estilo_logo: app.estilo.split('-')[0] });
                    }));
                    return categoria;
                }));
                nuevasAplicaciones = nuevasAplicaciones.filter((/**
                 * @param {?} categoria
                 * @return {?}
                 */
                (categoria) => (categoria.aplicaciones.length > 0)));
                console.info(nuevasAplicaciones);
                this.dataFilterSubject.next(nuevasAplicaciones);
            }));
            return this.eventFilter$;
        }
    }
    /**
     * @param {?} nombre
     * @param {?} array
     * @return {?}
     */
    existe(nombre, array) {
        /** @type {?} */
        const filtro = array.filter((/**
         * @param {?} data
         * @return {?}
         */
        (data) => (nombre.toLowerCase() === data.Nombre.toLowerCase())));
        return filtro.length > 0;
    }
}
MenuAplicacionesService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */
MenuAplicacionesService.ctorParameters = () => [
    { type: ConfiguracionService }
];
/** @nocollapse */ MenuAplicacionesService.ngInjectableDef = ɵɵdefineInjectable({ factory: function MenuAplicacionesService_Factory() { return new MenuAplicacionesService(ɵɵinject(ConfiguracionService)); }, token: MenuAplicacionesService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    MenuAplicacionesService.prototype.dataFilterSubject;
    /** @type {?} */
    MenuAplicacionesService.prototype.eventFilter$;
    /**
     * @type {?}
     * @private
     */
    MenuAplicacionesService.prototype.activo;
    /** @type {?} */
    MenuAplicacionesService.prototype.activo$;
    /** @type {?} */
    MenuAplicacionesService.prototype.categorias;
    /** @type {?} */
    MenuAplicacionesService.prototype.isLogin;
    /** @type {?} */
    MenuAplicacionesService.prototype.roles;
    /** @type {?} */
    MenuAplicacionesService.prototype.menuActivo;
    /**
     * @type {?}
     * @private
     */
    MenuAplicacionesService.prototype.configuracionService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UtilidadesCoreService {
    /**
     * @param {?} confService
     * @param {?} notioasService
     * @param {?} menuService
     */
    constructor(confService, notioasService, menuService) {
        this.confService = confService;
        this.notioasService = notioasService;
        this.menuService = menuService;
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    initLib({ CONFIGURACION_SERVICE, NOTIFICACION_SERVICE, entorno, notificaciones, menuApps }) {
        this.confService.setPath(CONFIGURACION_SERVICE);
        if (notificaciones) {
            this.notioasService.init(NOTIFICACION_SERVICE);
        }
        if (menuApps) {
            this.menuService.init(catalogo[entorno]);
        }
    }
}
UtilidadesCoreService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */
UtilidadesCoreService.ctorParameters = () => [
    { type: ConfiguracionService },
    { type: NotioasService },
    { type: MenuAplicacionesService }
];
/** @nocollapse */ UtilidadesCoreService.ngInjectableDef = ɵɵdefineInjectable({ factory: function UtilidadesCoreService_Factory() { return new UtilidadesCoreService(ɵɵinject(ConfiguracionService), ɵɵinject(NotioasService), ɵɵinject(MenuAplicacionesService)); }, token: UtilidadesCoreService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    UtilidadesCoreService.prototype.confService;
    /**
     * @type {?}
     * @private
     */
    UtilidadesCoreService.prototype.notioasService;
    /**
     * @type {?}
     * @private
     */
    UtilidadesCoreService.prototype.menuService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UtilidadesCoreComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
UtilidadesCoreComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-utilidades-core',
                template: `
    <p>
      utilidades-core works!
    </p>
  `
            }] }
];
/** @nocollapse */
UtilidadesCoreComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UtilidadesCoreModule {
}
UtilidadesCoreModule.decorators = [
    { type: NgModule, args: [{
                declarations: [UtilidadesCoreComponent],
                imports: [],
                exports: [UtilidadesCoreComponent],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NotioasComponent {
    /**
     * @param {?} notificacionService
     * @param {?} router
     */
    constructor(notificacionService, router) {
        this.notificacionService = notificacionService;
        this.router = router;
        this.searchTerm$ = new Subject();
        this.activo = false;
        this.notificaciones = [];
        this.notificacionService.arrayMessages$
            .subscribe((/**
         * @param {?} notification
         * @return {?}
         */
        (notification) => {
            this.notificaciones = notification;
        }));
        this.searchTerm$
            .pipe(debounceTime(700), distinctUntilChanged(), switchMap((/**
         * @param {?} query
         * @return {?}
         */
        query => this.searchEntries(query)))).subscribe((/**
         * @param {?} response
         * @return {?}
         */
        response => {
            this.notificaciones = response;
        }));
        this.notificacionService.getNotificaciones();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.notificacionService.activo$
            .subscribe((/**
         * @param {?} isActive
         * @return {?}
         */
        (isActive) => {
            const { activo } = isActive;
            this.activo = activo;
        }));
    }
    /**
     * @param {?} term
     * @return {?}
     */
    searchEntries(term) {
        /** @type {?} */
        const array = [];
        array.push(this.notificacionService.listMessage.filter((/**
         * @param {?} notify
         * @return {?}
         */
        (notify) => notify.Content.Message.Message.indexOf(term) !== -1 || notify.User.indexOf(term) !== -1)));
        return array;
    }
    /**
     * @param {?} noti
     * @return {?}
     */
    redirect(noti) {
        this.notificacionService.changeStateToView(noti.Id, noti.Estado);
        console.info(noti);
        /** @type {?} */
        const path_sub = window.location.origin;
        if (noti.Content.Message.Link.indexOf(path_sub) === -1) {
            window.open(noti.Content.Message.Link, '_blank');
        }
        else {
            this.router.navigate([noti.Content.Message.Link.substring(noti.Content.Message.Link.indexOf('#') + 1)]);
        }
    }
}
NotioasComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-notioas',
                template: "<div id=\"menu\" [ngClass]=\"{'aplicaciones_menu_container': true, 'menu_is_active': activo }\">\n  <div class=\"title-notifications\">\n    <p>Notificaciones</p>\n  </div>\n  <div class=\"row\">\n      <div class=\"input-group\">\n        <input type=\"text\" class=\"form-control\" (keyup)=\"searchTerm$.next($event.target.value)\" placeholder=\"Search ...\">\n        <span class=\"input-group-append\">\n        </span>\n      </div>\n    </div>\n    <br>\n    <div class=\"notifications-container\">\n        <div *ngFor=\"let notificacion of notificaciones\" (click)=\"redirect(notificacion)\"\n        [id]=\"notificacion.Estado\" class=\"notification-item\">\n            <div class=\"notifications-image-container\">\n              <div class=\"menu-app\" [id]=\"notificacion.EstiloIcono\"></div>\n            </div>\n            <div class=\"notifications-text-container\" >\n              <p> {{notificacion.Alias}} </p>\n              <p>\n                {{notificacion.Content.Message.Message}}\n              </p>\n              <p>\n                {{notificacion.FechaCreacion | amLocale:'es' | amTimeAgo:true}}\n              </p>\n            </div>\n      </div>\n    </div>\n</div>",
                styles: ["@import url(https://pruebasassets.portaloas.udistrital.edu.co/logo-stylus.css);.aplicaciones_menu_container p{margin-bottom:11px;margin-top:0}.title-notifications{text-align:center;font-family:\"Open Sans\",sans-serif;font-size:22px}.menu-app{border-radius:7px;border:1px solid;box-shadow:0 0 8px #888}#ENVIADA,#enviada,#noleida{background-color:rgba(43,54,67,.1)}.notification-item{display:flex;flex-direction:row;width:100%;cursor:pointer;align-items:center;justify-content:center}.notifications-image-container{width:25%}.notifications-text-container{width:68%;margin-left:5px}.notifications-text-container p{margin:0;font-family:\"Open Sans\",sans-serif;color:#000;white-space:normal;font-size:15px}.form-control{margin:0 23px;font-family:\"Open Sans\",sans-serif;width:86%}.aplicaciones_menu_container{background:#fff;border:1px solid rgba(0,0,0,.2);color:#000;box-shadow:0 2px 10px rgba(0,0,0,.2);position:fixed;top:77px;-webkit-border-radius:2px;right:-100vw;border-radius:2px;overflow-y:auto;overflow-x:hidden;height:calc(-171px + 100vh);width:318px;transition:.3s;padding-top:10px;z-index:1}.menu_is_active{right:0}@media screen and (max-width:1159px){.aplicaciones_menu_container{height:calc(-175px + 100vh)}}@media screen and (max-width:1132px){.aplicaciones_menu_container{height:calc(-180px + 100vh)}}@media screen and (max-width:823px){.aplicaciones_menu_container{height:calc(-193px + 100vh)}}@media screen and (max-width:768px){.aplicaciones_menu_container{height:calc(-217px + 100vh)}}@media screen and (max-width:620px){.aplicaciones_menu_container{height:calc(-280px + 100vh)}}@media screen and (max-width:529px){.aplicaciones_menu_container{height:calc(-298px + 100vh)}}@media screen and (max-width:330px){.aplicaciones_menu_container{height:calc(-288px + 100vh)}}"]
            }] }
];
/** @nocollapse */
NotioasComponent.ctorParameters = () => [
    { type: NotioasService },
    { type: Router }
];
if (false) {
    /** @type {?} */
    NotioasComponent.prototype.searchTerm$;
    /** @type {?} */
    NotioasComponent.prototype.notificaciones;
    /** @type {?} */
    NotioasComponent.prototype.activo;
    /** @type {?} */
    NotioasComponent.prototype.notificacionService;
    /**
     * @type {?}
     * @private
     */
    NotioasComponent.prototype.router;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// import { BrowserModule } from '@angular/platform-browser';
class NotioasModule {
}
NotioasModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NotioasComponent],
                imports: [
                    CommonModule,
                    HttpClientModule,
                    RouterModule.forRoot([]),
                    MomentModule,
                ],
                exports: [NotioasComponent],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImplicitAutenticationService {
    constructor() {
        this.bearer = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'authorization': 'Bearer ' + window.localStorage.getItem('access_token'),
            }),
        };
    }
    /**
     * @param {?} entorno
     * @return {?}
     */
    init(entorno) {
        this.environment = entorno;
        if (window.localStorage.getItem('access_token') === null ||
            window.localStorage.getItem('access_token') === undefined) {
            /** @type {?} */
            var params = {};
            /** @type {?} */
            var queryString = location.hash.substring(1);
            /** @type {?} */
            var regex = /([^&=]+)=([^&]*)/g;
            /** @type {?} */
            let m;
            while (m = regex.exec(queryString)) {
                params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
            }
            // And send the token over to the server
            /** @type {?} */
            const req = new XMLHttpRequest();
            // consider using POST so query isn't logged
            /** @type {?} */
            const query = 'https://' + window.location.host + '?' + queryString;
            req.open('GET', query, true);
            if (params['id_token'] !== null && params['id_token'] !== undefined) {
                window.localStorage.setItem('access_token', params['access_token']);
                //if token setear
                window.localStorage.setItem('id_token', params['id_token']);
                window.localStorage.setItem('expires_in', params['expires_in']);
                window.localStorage.setItem('state', params['state']);
            }
            else {
                this.clearStorage();
            }
            req.onreadystatechange = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        // window.location = params.state;
                    }
                    else if (req.status === 400) {
                        window.alert('There was an error processing the token.');
                    }
                    else {
                    }
                }
            });
        }
        this.setExpiresAt();
        this.timer();
        this.clearUrl();
    }
    /**
     * @return {?}
     */
    logout() {
        this.logout_url = this.environment.SIGN_OUT_URL;
        this.logout_url += '?id_token_hint=' + window.localStorage.getItem('id_token');
        this.logout_url += '&post_logout_redirect_uri=' + this.environment.SIGN_OUT_REDIRECT_URL;
        this.logout_url += '&state=' + window.localStorage.getItem('state');
        this.clearStorage();
        window.location.replace(this.logout_url);
    }
    /**
     * @return {?}
     */
    getPayload() {
        /** @type {?} */
        const id_token = window.localStorage.getItem('id_token').split('.');
        return JSON.parse(atob(id_token[1]));
    }
    /**
     * @return {?}
     */
    logoutValid() {
        /** @type {?} */
        var state;
        /** @type {?} */
        var valid = true;
        /** @type {?} */
        var queryString = location.search.substring(1);
        /** @type {?} */
        var regex = /([^&=]+)=([^&]*)/g;
        /** @type {?} */
        var m;
        while (!!(m = regex.exec(queryString))) {
            state = decodeURIComponent(m[2]);
        }
        console.info("state: " + state);
        if (window.localStorage.getItem('state') === state) {
            this.clearStorage();
            valid = true;
        }
        else {
            valid = false;
        }
        return valid;
    }
    // el flag es un booleano que define si abra boton de login
    /**
     * @param {?} flag
     * @return {?}
     */
    login(flag) {
        if (window.localStorage.getItem('id_token') === 'undefined' || window.localStorage.getItem('id_token') === null || this.logoutValid()) {
            if (!flag) {
                this.getAuthorizationUrl();
            }
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * @return {?}
     */
    live() {
        if (this.login(true)) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @return {?}
     */
    clearUrl() {
        /** @type {?} */
        const clean_uri = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, clean_uri);
    }
    /**
     * @return {?}
     */
    getAuthorizationUrl() {
        this.params = this.environment;
        if (!this.params.nonce) {
            this.params.nonce = this.generateState();
        }
        if (!this.params.state) {
            this.params.state = this.generateState();
        }
        /** @type {?} */
        let url = this.params.AUTORIZATION_URL + '?' +
            'client_id=' + encodeURIComponent(this.params.CLIENTE_ID) + '&' +
            'redirect_uri=' + encodeURIComponent(this.params.REDIRECT_URL) + '&' + // + window.location.href + '&' para redirect con regex
            'response_type=' + encodeURIComponent(this.params.RESPONSE_TYPE) + '&' +
            'scope=' + encodeURIComponent(this.params.SCOPE) + '&' +
            'state_url=' + encodeURIComponent(window.location.hash);
        if (this.params.nonce) {
            url += '&nonce=' + encodeURIComponent(this.params.nonce);
        }
        url += '&state=' + encodeURIComponent(this.params.state);
        window.location.replace(url);
        return url;
    }
    /**
     * @return {?}
     */
    generateState() {
        /** @type {?} */
        const text = ((Date.now() + Math.random()) * Math.random()).toString().replace('.', '');
        return Md5.hashStr(text);
    }
    /**
     * @return {?}
     */
    setExpiresAt() {
        if (window.localStorage.getItem('expires_at') === null || window.localStorage.getItem('expires_at') === undefined || window.localStorage.getItem('expires_at') === 'Invalid Date') {
            /** @type {?} */
            const expires_at = new Date();
            expires_at.setSeconds(expires_at.getSeconds() + parseInt(window.localStorage.getItem('expires_in'), 10) - 60);
            window.localStorage.setItem('expires_at', expires_at.toUTCString());
        }
    }
    /**
     * @return {?}
     */
    expired() {
        return (new Date(window.localStorage.getItem('expires_at')) < new Date());
    }
    /**
     * @return {?}
     */
    timer() {
        setInterval((/**
         * @return {?}
         */
        () => {
            if (window.localStorage.getItem('expires_at') !== null) {
                if (this.expired()) {
                    this.logout();
                    this.clearStorage();
                }
            }
            else {
                window.location.reload();
            }
        }), 5000);
    }
    /**
     * @return {?}
     */
    clearStorage() {
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('id_token');
        window.localStorage.removeItem('expires_in');
        window.localStorage.removeItem('state');
        window.localStorage.removeItem('expires_at');
    }
}
ImplicitAutenticationService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */
ImplicitAutenticationService.ctorParameters = () => [];
/** @nocollapse */ ImplicitAutenticationService.ngInjectableDef = ɵɵdefineInjectable({ factory: function ImplicitAutenticationService_Factory() { return new ImplicitAutenticationService(); }, token: ImplicitAutenticationService, providedIn: "root" });
if (false) {
    /** @type {?} */
    ImplicitAutenticationService.prototype.environment;
    /** @type {?} */
    ImplicitAutenticationService.prototype.logout_url;
    /** @type {?} */
    ImplicitAutenticationService.prototype.bearer;
    /** @type {?} */
    ImplicitAutenticationService.prototype.params;
    /** @type {?} */
    ImplicitAutenticationService.prototype.payload;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MenuAplicacionesComponent {
    /**
     * @param {?} menuService
     * @param {?} notioasService
     * @param {?} router
     */
    constructor(menuService, notioasService, router) {
        this.menuService = menuService;
        this.notioasService = notioasService;
        this.router = router;
        this.categorias = [];
        this.menuService.eventFilter$
            .subscribe((/**
         * @param {?} categorias
         * @return {?}
         */
        (categorias) => {
            this.categorias = categorias;
        }));
    }
    /**
     * @param {?} link
     * @return {?}
     */
    redirect(link) {
        /** @type {?} */
        const path_sub = window.location.origin;
        if (link.indexOf(path_sub) === -1) {
            window.open(link, '_blank');
        }
        else {
            this.router.navigate([link.substring(link.indexOf('#') + 1)]);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.menuService.activo$
            .subscribe((/**
         * @param {?} isActive
         * @return {?}
         */
        (isActive) => {
            const { activo } = isActive;
            this.activo = activo;
        }));
    }
}
MenuAplicacionesComponent.decorators = [
    { type: Component, args: [{
                selector: 'menu-aplicaciones',
                template: "<div id=\"menu\" [ngClass]=\"{'aplicaciones_menu_container': true, 'menu_is_active': activo }\">\n  <div class=\"container-aplicativos\">\n    <article *ngFor=\"let categoria of categorias\" class=\"card\">\n      <div class=\"title-app-menu-div\" [ngStyle]=\"{'background-color': categoria.color}\">\n        <h5 class=\"categoria-title\" >{{categoria.nombre}}</h5>\n      </div>\n      <div class=\"app-image-container\">\n        <div *ngFor=\"let aplicacion of categoria.aplicaciones\" class=\"image-application\" (click)=\"redirect(aplicacion.url)\">\n            <img class=\"menu-app\" [id]=\"aplicacion.estilo_logo\">\n        </div>\n      </div>\n    </article>\n  </div>\n</div>",
                styles: ["@import url(https://pruebasassets.portaloas.udistrital.edu.co/logo-stylus.css);.aplicaciones_menu_container p{margin-bottom:11px;margin-top:0}.title-notifications{text-align:center;font-family:\"Open Sans\",sans-serif;font-size:22px}.menu-app{border-radius:7px;border:1px solid;box-shadow:0 0 8px #888}#ENVIADA,#enviada,#noleida{background-color:rgba(43,54,67,.1)}.notification-item{display:flex;flex-direction:row;width:100%;cursor:pointer;align-items:center;justify-content:center}.notifications-image-container{width:25%}.notifications-text-container{width:68%;margin-left:5px}.notifications-text-container p{margin:0;font-family:\"Open Sans\",sans-serif;color:#000;white-space:normal;font-size:15px}.form-control{margin:0 23px;font-family:\"Open Sans\",sans-serif;width:86%}.title-app-menu-div{text-align:center;margin-bottom:5px;font-size:21px;font-family:\"Open Sans\",sans-serif}.aplicaciones_menu_container{background:#fff;border:1px solid #d6dae1;color:#000;box-shadow:1px 0 17px #888;position:fixed;top:77px;-webkit-border-radius:2px;right:-100vw;border-radius:2px;overflow-y:auto;overflow-x:hidden;height:560px;width:320px;transition:.3s;z-index:1}.menu_is_active{right:0}.app-image-container{display:flex;justify-content:space-evenly;flex-wrap:wrap;align-items:center}.image-application{width:30%;margin-bottom:10px;display:flex;flex-wrap:wrap;justify-content:center}.categoria-title{color:#fff}"]
            }] }
];
/** @nocollapse */
MenuAplicacionesComponent.ctorParameters = () => [
    { type: MenuAplicacionesService },
    { type: NotioasService },
    { type: Router }
];
if (false) {
    /** @type {?} */
    MenuAplicacionesComponent.prototype.activo;
    /** @type {?} */
    MenuAplicacionesComponent.prototype.categorias;
    /** @type {?} */
    MenuAplicacionesComponent.prototype.menuService;
    /** @type {?} */
    MenuAplicacionesComponent.prototype.notioasService;
    /**
     * @type {?}
     * @private
     */
    MenuAplicacionesComponent.prototype.router;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MenuAplicacionesModule {
}
MenuAplicacionesModule.decorators = [
    { type: NgModule, args: [{
                declarations: [MenuAplicacionesComponent],
                imports: [
                    CommonModule,
                ],
                exports: [MenuAplicacionesComponent],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ImplicitAutenticationService, MenuAplicacionesComponent, MenuAplicacionesModule, MenuAplicacionesService, NotioasComponent, NotioasModule, NotioasService, UtilidadesCoreComponent, UtilidadesCoreModule, UtilidadesCoreService, ConfiguracionService as ɵa };
//# sourceMappingURL=utilidades-core.js.map
