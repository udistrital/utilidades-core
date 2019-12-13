import { webSocket } from 'rxjs/webSocket';
import { __spread, __assign } from 'tslib';
import { from, interval, BehaviorSubject, Subject, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MomentModule } from 'ngx-moment';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';
import { Injectable, Component, NgModule, defineInjectable, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ConfiguracionService = /** @class */ (function () {
    function ConfiguracionService(http) {
        this.http = http;
        this.httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('access_token'),
            }),
        };
    }
    /**
     * @param {?} path
     * @return {?}
     */
    ConfiguracionService.prototype.setPath = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        this.path = path;
    };
    /**
     * @param {?} endpoint
     * @return {?}
     */
    ConfiguracionService.prototype.get = /**
     * @param {?} endpoint
     * @return {?}
     */
    function (endpoint) {
        return this.http.get("" + this.path + endpoint, this.httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.hasOwnProperty('Body')) {
                return res['Body'];
            }
            else {
                return res;
            }
        })));
    };
    /**
     * Perform a POST http request
     * @param endpoint service's end-point
     * @param element data to send as JSON
     * @returns Observable<any>
     */
    /**
     * Perform a POST http request
     * @param {?} endpoint service's end-point
     * @param {?} element data to send as JSON
     * @return {?} Observable<any>
     */
    ConfiguracionService.prototype.post = /**
     * Perform a POST http request
     * @param {?} endpoint service's end-point
     * @param {?} element data to send as JSON
     * @return {?} Observable<any>
     */
    function (endpoint, element) {
        return this.http.post("" + this.path + endpoint, element, this.httpOptions);
    };
    /**
     * Perform a PUT http request
     * @param endpoint service's end-point
     * @param element data to send as JSON, With the id to UPDATE
     * @returns Observable<any>
     */
    /**
     * Perform a PUT http request
     * @param {?} endpoint service's end-point
     * @param {?} element data to send as JSON, With the id to UPDATE
     * @return {?} Observable<any>
     */
    ConfiguracionService.prototype.put = /**
     * Perform a PUT http request
     * @param {?} endpoint service's end-point
     * @param {?} element data to send as JSON, With the id to UPDATE
     * @return {?} Observable<any>
     */
    function (endpoint, element) {
        return this.http.put("" + this.path + endpoint + "/" + element.Id, element, this.httpOptions);
    };
    /**
     * Perform a DELETE http request
     * @param endpoint service's end-point
     * @param id element's id for remove
     * @returns Observable<any>
     */
    /**
     * Perform a DELETE http request
     * @param {?} endpoint service's end-point
     * @param {?} id element's id for remove
     * @return {?} Observable<any>
     */
    ConfiguracionService.prototype.delete = /**
     * Perform a DELETE http request
     * @param {?} endpoint service's end-point
     * @param {?} id element's id for remove
     * @return {?} Observable<any>
     */
    function (endpoint, id) {
        return this.http.delete("" + this.path + endpoint + "/" + id, this.httpOptions);
    };
    ConfiguracionService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    /** @nocollapse */
    ConfiguracionService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    /** @nocollapse */ ConfiguracionService.ngInjectableDef = defineInjectable({ factory: function ConfiguracionService_Factory() { return new ConfiguracionService(inject(HttpClient)); }, token: ConfiguracionService, providedIn: "root" });
    return ConfiguracionService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NotioasService = /** @class */ (function () {
    function NotioasService(confService) {
        var _this = this;
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
        var up$ = fromEvent(document, 'mouseup');
        up$.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (_this.activo) {
                if (!((window.innerWidth - 320) < data.pageX && data.pageY > 77 && data.pageY < 798)) {
                    _this.closePanel();
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    NotioasService.prototype.toogleMenuNotify = /**
     * @return {?}
     */
    function () {
        this.menuActivo = !this.menuActivo;
        /** @type {?} */
        var data = { activo: this.menuActivo };
        this.activo.next(data);
        if (this.menuActivo) {
            this.changeStateNoView();
        }
    };
    /**
     * @return {?}
     */
    NotioasService.prototype.closePanel = /**
     * @return {?}
     */
    function () {
        this.menuActivo = false;
        this.activo.next({ activo: this.menuActivo });
    };
    /**
     * @param {?} pathNotificacion
     * @return {?}
     */
    NotioasService.prototype.init = /**
     * @param {?} pathNotificacion
     * @return {?}
     */
    function (pathNotificacion) {
        console.info('...Init lib notificaciones');
        this.NOTIFICACION_SERVICE = pathNotificacion;
        this.connect();
        this.queryNotification();
    };
    /**
     * @return {?}
     */
    NotioasService.prototype.getNotificaciones = /**
     * @return {?}
     */
    function () {
        this.noNotifySubject.next((this.listMessage.filter((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return (data.Estado).toLowerCase() === 'enviada'; }))).length);
        this.arrayMessagesSubject.next(this.listMessage);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    NotioasService.prototype.getNotificacionEstadoUsuario = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return (this.notificacion_estado_usuario.filter((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return data.Id === id; })))[0];
    };
    /**
     * @return {?}
     */
    NotioasService.prototype.send_ping = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // sending ping every 30 seconds
        this.timerPing$.subscribe((/**
         * @return {?}
         */
        function () { return (_this.messagesSubject.next('ping')); }));
    };
    /**
     * @return {?}
     */
    NotioasService.prototype.connect = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var id_token = localStorage.getItem('id_token');
        /** @type {?} */
        var access_token = localStorage.getItem('access_token');
        if (id_token !== null && access_token !== null) {
            this.roles = (JSON.parse(atob(id_token.split('.')[1])).role).filter((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return (data.indexOf('/') === -1); }));
            this.user = JSON.parse(atob(id_token.split('.')[1])).sub;
            if (this.roles.length > 0) {
                // const connWs = `${this.NOTIFICACION_SERVICE}/join?id=${this.user}&profiles=${this.roles}`;
                /** @type {?} */
                var connWs = this.NOTIFICACION_SERVICE + "/join?id=" + access_token;
                this.messagesSubject = webSocket({
                    url: connWs,
                    openObserver: {
                        next: (/**
                         * @return {?}
                         */
                        function () {
                            _this.send_ping();
                        }),
                    },
                });
                this.messagesSubject
                    .pipe(map((/**
                 * @param {?} msn
                 * @return {?}
                 */
                function (msn) {
                    _this.listMessage = __spread([msn], _this.listMessage);
                    _this.noNotifySubject.next((_this.listMessage.filter((/**
                     * @param {?} data
                     * @return {?}
                     */
                    function (data) { return (data.Estado).toLowerCase() === 'enviada'; }))).length);
                    _this.arrayMessagesSubject.next(_this.listMessage);
                    return msn;
                })))
                    .subscribe((/**
                 * @param {?} msg
                 * @return {?}
                 */
                function (msg) { }), (/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) {
                    console.info('websocketError:', err);
                }), (/**
                 * @return {?}
                 */
                function () { return console.info('complete'); }));
            }
        }
    };
    /**
     * @return {?}
     */
    NotioasService.prototype.close = /**
     * @return {?}
     */
    function () {
        this.messagesSubject.unsubscribe();
    };
    /**
     * @param {?} message
     * @return {?}
     */
    NotioasService.prototype.addMessage = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.listMessage = __spread([message], this.listMessage);
        this.noNotifySubject.next((this.listMessage.filter((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return (data.Estado).toLowerCase() === 'enviada'; }))).length);
        this.arrayMessagesSubject.next(this.listMessage);
    };
    /**
     * @return {?}
     */
    NotioasService.prototype.changeStateNoView = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.listMessage.filter((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return (data.Estado).toLowerCase() === 'enviada'; })).length >= 1) {
            this.confService.post('notificacion_estado_usuario/changeStateNoView/' + this.user, {})
                .subscribe((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                _this.listMessage = [];
                _this.queryNotification();
            }));
        }
    };
    /**
     * @param {?} id
     * @param {?} estado
     * @return {?}
     */
    NotioasService.prototype.changeStateToView = /**
     * @param {?} id
     * @param {?} estado
     * @return {?}
     */
    function (id, estado) {
        var _this = this;
        if (estado === 'noleida') {
            /** @type {?} */
            var notificacion = this.getNotificacionEstadoUsuario(id);
            this.confService.get('notificacion_estado_usuario/changeStateToView/' + notificacion.Id)
                .subscribe((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                _this.listMessage = [];
                _this.queryNotification();
            }));
        }
    };
    /**
     * @return {?}
     */
    NotioasService.prototype.queryNotification = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.confService.get('notificacion_estado_usuario?query=Usuario:' + this.user + ',Activo:true&sortby=notificacion&order=asc&limit=-1')
            .subscribe((/**
         * @param {?} resp
         * @return {?}
         */
        function (resp) {
            if (resp !== null) {
                _this.notificacion_estado_usuario = resp;
                from(resp)
                    .subscribe((/**
                 * @param {?} notify
                 * @return {?}
                 */
                function (notify) {
                    if (typeof notify.Notificacion !== 'undefined') {
                        /** @type {?} */
                        var message = {
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
                        _this.addMessage(message);
                    }
                }));
            }
        }));
    };
    NotioasService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    /** @nocollapse */
    NotioasService.ctorParameters = function () { return [
        { type: ConfiguracionService }
    ]; };
    /** @nocollapse */ NotioasService.ngInjectableDef = defineInjectable({ factory: function NotioasService_Factory() { return new NotioasService(inject(ConfiguracionService)); }, token: NotioasService, providedIn: "root" });
    return NotioasService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var catalogo = {
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
var MenuAplicacionesService = /** @class */ (function () {
    function MenuAplicacionesService(configuracionService) {
        var _this = this;
        this.configuracionService = configuracionService;
        this.dataFilterSubject = new BehaviorSubject([]);
        this.eventFilter$ = this.dataFilterSubject.asObservable();
        this.activo = new BehaviorSubject({});
        this.activo$ = this.activo.asObservable();
        this.isLogin = false;
        this.menuActivo = false;
        this.roles = this.getRole();
        /** @type {?} */
        var up$ = fromEvent(document, 'mouseup');
        up$.subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (_this.activo) {
                if (!((window.innerWidth - 320) < data.pageX && data.pageY > 77 && data.pageY < 578)) {
                    _this.closePanel();
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    MenuAplicacionesService.prototype.closePanel = /**
     * @return {?}
     */
    function () {
        this.menuActivo = false;
        this.activo.next({ activo: this.menuActivo });
    };
    /**
     * @return {?}
     */
    MenuAplicacionesService.prototype.getRole = /**
     * @return {?}
     */
    function () {
        if (window.localStorage.getItem('id_token') !== null) {
            this.isLogin = true;
            // tslint:disable-next-line: variable-name
            /** @type {?} */
            var id_token = window.localStorage.getItem('id_token').split('.');
            /** @type {?} */
            var payload = JSON.parse(atob(id_token[1]));
            return payload.role.map((/**
             * @param {?} element
             * @return {?}
             */
            function (element) { return ({ Nombre: element }); }));
        }
        else {
            this.isLogin = false;
            this.dataFilterSubject.next(this.categorias);
        }
    };
    /**
     * @return {?}
     */
    MenuAplicacionesService.prototype.toogleMenuNotify = /**
     * @return {?}
     */
    function () {
        this.menuActivo = !this.menuActivo;
        /** @type {?} */
        var data = { activo: this.menuActivo };
        this.activo.next(data);
    };
    /**
     * @param {?} categorias
     * @return {?}
     */
    MenuAplicacionesService.prototype.init = /**
     * @param {?} categorias
     * @return {?}
     */
    function (categorias) {
        console.info('...Init lib menu');
        console.info(categorias);
        this.categorias = categorias;
        this.dataFilterSubject.next(this.categorias);
        this.getAplication();
    };
    /**
     * @return {?}
     */
    MenuAplicacionesService.prototype.getAplication = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.configuracionService.post('aplicacion_rol/aplicacion_rol', this.roles)
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var nuevasAplicaciones = _this.categorias.map((/**
             * @param {?} categoria
             * @return {?}
             */
            function (categoria) {
                categoria.aplicaciones = categoria.aplicaciones.filter((/**
                 * @param {?} aplicacion
                 * @return {?}
                 */
                function (aplicacion) { return (_this.existe(aplicacion.nombre, data)); }));
                categoria.aplicaciones = categoria.aplicaciones.map((/**
                 * @param {?} app
                 * @return {?}
                 */
                function (app) {
                    return __assign({}, app, { estilo_logo: app.estilo.split('-')[0] });
                }));
                return categoria;
            }));
            nuevasAplicaciones = nuevasAplicaciones.filter((/**
             * @param {?} categoria
             * @return {?}
             */
            function (categoria) { return (categoria.aplicaciones.length > 0); }));
            console.info(nuevasAplicaciones);
            _this.dataFilterSubject.next(nuevasAplicaciones);
        }));
        return this.eventFilter$;
    };
    /**
     * @param {?} nombre
     * @param {?} array
     * @return {?}
     */
    MenuAplicacionesService.prototype.existe = /**
     * @param {?} nombre
     * @param {?} array
     * @return {?}
     */
    function (nombre, array) {
        /** @type {?} */
        var filtro = array.filter((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return (nombre.toLowerCase() === data.Nombre.toLowerCase()); }));
        return filtro.length > 0;
    };
    MenuAplicacionesService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    /** @nocollapse */
    MenuAplicacionesService.ctorParameters = function () { return [
        { type: ConfiguracionService }
    ]; };
    /** @nocollapse */ MenuAplicacionesService.ngInjectableDef = defineInjectable({ factory: function MenuAplicacionesService_Factory() { return new MenuAplicacionesService(inject(ConfiguracionService)); }, token: MenuAplicacionesService, providedIn: "root" });
    return MenuAplicacionesService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var UtilidadesCoreService = /** @class */ (function () {
    function UtilidadesCoreService(confService, notioasService, menuService) {
        this.confService = confService;
        this.notioasService = notioasService;
        this.menuService = menuService;
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    UtilidadesCoreService.prototype.initLib = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var CONFIGURACION_SERVICE = _a.CONFIGURACION_SERVICE, NOTIFICACION_SERVICE = _a.NOTIFICACION_SERVICE, entorno = _a.entorno, notificaciones = _a.notificaciones, menuApps = _a.menuApps;
        this.confService.setPath(CONFIGURACION_SERVICE);
        if (notificaciones) {
            this.notioasService.init(NOTIFICACION_SERVICE);
        }
        if (menuApps) {
            this.menuService.init(catalogo[entorno]);
        }
    };
    UtilidadesCoreService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    /** @nocollapse */
    UtilidadesCoreService.ctorParameters = function () { return [
        { type: ConfiguracionService },
        { type: NotioasService },
        { type: MenuAplicacionesService }
    ]; };
    /** @nocollapse */ UtilidadesCoreService.ngInjectableDef = defineInjectable({ factory: function UtilidadesCoreService_Factory() { return new UtilidadesCoreService(inject(ConfiguracionService), inject(NotioasService), inject(MenuAplicacionesService)); }, token: UtilidadesCoreService, providedIn: "root" });
    return UtilidadesCoreService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var UtilidadesCoreComponent = /** @class */ (function () {
    function UtilidadesCoreComponent() {
    }
    /**
     * @return {?}
     */
    UtilidadesCoreComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    UtilidadesCoreComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-utilidades-core',
                    template: "\n    <p>\n      utilidades-core works!\n    </p>\n  "
                }] }
    ];
    /** @nocollapse */
    UtilidadesCoreComponent.ctorParameters = function () { return []; };
    return UtilidadesCoreComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var UtilidadesCoreModule = /** @class */ (function () {
    function UtilidadesCoreModule() {
    }
    UtilidadesCoreModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [UtilidadesCoreComponent],
                    imports: [],
                    exports: [UtilidadesCoreComponent],
                },] }
    ];
    return UtilidadesCoreModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NotioasComponent = /** @class */ (function () {
    function NotioasComponent(notificacionService, router) {
        var _this = this;
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
        function (notification) {
            _this.notificaciones = notification;
        }));
        this.searchTerm$
            .pipe(debounceTime(700), distinctUntilChanged(), switchMap((/**
         * @param {?} query
         * @return {?}
         */
        function (query) { return _this.searchEntries(query); }))).subscribe((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            _this.notificaciones = response;
        }));
        this.notificacionService.getNotificaciones();
    }
    /**
     * @return {?}
     */
    NotioasComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.notificacionService.activo$
            .subscribe((/**
         * @param {?} isActive
         * @return {?}
         */
        function (isActive) {
            var activo = isActive.activo;
            _this.activo = activo;
        }));
    };
    /**
     * @param {?} term
     * @return {?}
     */
    NotioasComponent.prototype.searchEntries = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        /** @type {?} */
        var array = [];
        array.push(this.notificacionService.listMessage.filter((/**
         * @param {?} notify
         * @return {?}
         */
        function (notify) { return notify.Content.Message.Message.indexOf(term) !== -1 || notify.User.indexOf(term) !== -1; })));
        return array;
    };
    /**
     * @param {?} noti
     * @return {?}
     */
    NotioasComponent.prototype.redirect = /**
     * @param {?} noti
     * @return {?}
     */
    function (noti) {
        this.notificacionService.changeStateToView(noti.Id, noti.Estado);
        console.info(noti);
        /** @type {?} */
        var path_sub = window.location.origin;
        if (noti.Content.Message.Link.indexOf(path_sub) === -1) {
            window.open(noti.Content.Message.Link, '_blank');
        }
        else {
            this.router.navigate([noti.Content.Message.Link.substring(noti.Content.Message.Link.indexOf('#') + 1)]);
        }
    };
    NotioasComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-notioas',
                    template: "<div id=\"menu\" [ngClass]=\"{'aplicaciones_menu_container': true, 'menu_is_active': activo }\">\n  <div class=\"title-notifications\">\n    <p>Notificaciones</p>\n  </div>\n  <div class=\"row\">\n      <div class=\"input-group\">\n        <input type=\"text\" class=\"form-control\" (keyup)=\"searchTerm$.next($event.target.value)\" placeholder=\"Search ...\">\n        <span class=\"input-group-append\">\n        </span>\n      </div>\n    </div>\n    <br>\n    <div class=\"notifications-container\">\n        <div *ngFor=\"let notificacion of notificaciones\" (click)=\"redirect(notificacion)\"\n        [id]=\"notificacion.Estado\" class=\"notification-item\">\n            <div class=\"notifications-image-container\">\n              <div class=\"menu-app\" [id]=\"notificacion.EstiloIcono\"></div>\n            </div>\n            <div class=\"notifications-text-container\" >\n              <p> {{notificacion.Alias}} </p>\n              <p>\n                {{notificacion.Content.Message.Message}}\n              </p>\n              <p>\n                {{notificacion.FechaCreacion | amLocale:'es' | amTimeAgo:true}}\n              </p>\n            </div>\n      </div>\n    </div>\n</div>",
                    styles: ["@import url(https://pruebasassets.portaloas.udistrital.edu.co/logo-stylus.css);.aplicaciones_menu_container p{margin-bottom:11px;margin-top:0}.title-notifications{text-align:center;font-family:\"Open Sans\",sans-serif;font-size:22px}.menu-app{border-radius:7px;border:1px solid;-webkit-box-shadow:0 0 8px #888;box-shadow:0 0 8px #888}#ENVIADA,#enviada,#noleida{background-color:rgba(43,54,67,.1)}.notification-item{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;width:100%;cursor:pointer;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.notifications-image-container{width:25%}.notifications-text-container{width:68%;margin-left:5px}.notifications-text-container p{margin:0;font-family:\"Open Sans\",sans-serif;color:#000;white-space:normal;font-size:15px}.form-control{margin:0 23px;font-family:\"Open Sans\",sans-serif;width:86%}.aplicaciones_menu_container{background:#fff;border:1px solid rgba(0,0,0,.2);color:#000;-webkit-box-shadow:0 2px 10px rgba(48,90,208,.2);box-shadow:0 2px 10px rgba(0,0,0,.2);position:fixed;top:77px;-webkit-border-radius:2px;right:-100vw;border-radius:2px;overflow-y:auto;overflow-x:hidden;height:720px;width:320px;-webkit-transition:.3s;transition:.3s;padding-top:10px;z-index:1}.menu_is_active{right:0}"]
                }] }
    ];
    /** @nocollapse */
    NotioasComponent.ctorParameters = function () { return [
        { type: NotioasService },
        { type: Router }
    ]; };
    return NotioasComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// import { BrowserModule } from '@angular/platform-browser';
var NotioasModule = /** @class */ (function () {
    function NotioasModule() {
    }
    NotioasModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NotioasComponent],
                    imports: [
                        CommonModule,
                        HttpClientModule,
                        // RouterModule.forRoot([]),
                        MomentModule,
                    ],
                    exports: [NotioasComponent],
                },] }
    ];
    return NotioasModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ImplicitAutenticationService = /** @class */ (function () {
    function ImplicitAutenticationService() {
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
    ImplicitAutenticationService.prototype.init = /**
     * @param {?} entorno
     * @return {?}
     */
    function (entorno) {
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
            var m = void 0;
            while (m = regex.exec(queryString)) {
                params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
            }
            // And send the token over to the server
            /** @type {?} */
            var req_1 = new XMLHttpRequest();
            // consider using POST so query isn't logged
            /** @type {?} */
            var query = 'https://' + window.location.host + '?' + queryString;
            req_1.open('GET', query, true);
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
            req_1.onreadystatechange = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                if (req_1.readyState === 4) {
                    if (req_1.status === 200) ;
                    else if (req_1.status === 400) {
                        window.alert('There was an error processing the token.');
                    }
                }
            });
        }
        this.setExpiresAt();
        this.timer();
        this.clearUrl();
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.logout = /**
     * @return {?}
     */
    function () {
        this.logout_url = this.environment.SIGN_OUT_URL;
        this.logout_url += '?id_token_hint=' + window.localStorage.getItem('id_token');
        this.logout_url += '&post_logout_redirect_uri=' + this.environment.SIGN_OUT_REDIRECT_URL;
        this.logout_url += '&state=' + window.localStorage.getItem('state');
        this.clearStorage();
        window.location.replace(this.logout_url);
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.getPayload = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var id_token = window.localStorage.getItem('id_token').split('.');
        return JSON.parse(atob(id_token[1]));
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.logoutValid = /**
     * @return {?}
     */
    function () {
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
        if (window.localStorage.getItem('state') === state) {
            this.clearStorage();
            valid = true;
        }
        else {
            valid = false;
        }
        return valid;
    };
    // el flag es un booleano que define si abra boton de login
    // el flag es un booleano que define si abra boton de login
    /**
     * @param {?} flag
     * @return {?}
     */
    ImplicitAutenticationService.prototype.login = 
    // el flag es un booleano que define si abra boton de login
    /**
     * @param {?} flag
     * @return {?}
     */
    function (flag) {
        if (window.localStorage.getItem('id_token') === 'undefined' || window.localStorage.getItem('id_token') === null || this.logoutValid()) {
            if (!flag) {
                this.getAuthorizationUrl();
            }
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.live = /**
     * @return {?}
     */
    function () {
        if (this.login(true)) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.clearUrl = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var clean_uri = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, clean_uri);
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.getAuthorizationUrl = /**
     * @return {?}
     */
    function () {
        this.params = this.environment;
        if (!this.params.nonce) {
            this.params.nonce = this.generateState();
        }
        if (!this.params.state) {
            this.params.state = this.generateState();
        }
        /** @type {?} */
        var url = this.params.AUTORIZATION_URL + '?' +
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
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.generateState = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var text = ((Date.now() + Math.random()) * Math.random()).toString().replace('.', '');
        return Md5.hashStr(text);
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.setExpiresAt = /**
     * @return {?}
     */
    function () {
        if (window.localStorage.getItem('expires_at') === null || window.localStorage.getItem('expires_at') === undefined || window.localStorage.getItem('expires_at') === 'Invalid Date') {
            /** @type {?} */
            var expires_at = new Date();
            expires_at.setSeconds(expires_at.getSeconds() + parseInt(window.localStorage.getItem('expires_in'), 10) - 60);
            window.localStorage.setItem('expires_at', expires_at.toUTCString());
        }
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.expired = /**
     * @return {?}
     */
    function () {
        return (new Date(window.localStorage.getItem('expires_at')) < new Date());
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.timer = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setInterval((/**
         * @return {?}
         */
        function () {
            if (window.localStorage.getItem('expires_at') !== null) {
                if (_this.expired()) {
                    _this.logout();
                    _this.clearStorage();
                }
            }
            else {
                window.location.reload();
            }
        }), 5000);
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.clearStorage = /**
     * @return {?}
     */
    function () {
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('id_token');
        window.localStorage.removeItem('expires_in');
        window.localStorage.removeItem('state');
        window.localStorage.removeItem('expires_at');
    };
    ImplicitAutenticationService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    /** @nocollapse */
    ImplicitAutenticationService.ctorParameters = function () { return []; };
    /** @nocollapse */ ImplicitAutenticationService.ngInjectableDef = defineInjectable({ factory: function ImplicitAutenticationService_Factory() { return new ImplicitAutenticationService(); }, token: ImplicitAutenticationService, providedIn: "root" });
    return ImplicitAutenticationService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MenuAplicacionesComponent = /** @class */ (function () {
    function MenuAplicacionesComponent(menuService, notioasService, router) {
        this.menuService = menuService;
        this.notioasService = notioasService;
        this.router = router;
    }
    /**
     * @param {?} link
     * @return {?}
     */
    MenuAplicacionesComponent.prototype.redirect = /**
     * @param {?} link
     * @return {?}
     */
    function (link) {
        /** @type {?} */
        var path_sub = window.location.origin;
        if (link.indexOf(path_sub) === -1) {
            window.open(link, '_blank');
        }
        else {
            this.router.navigate([link.substring(link.indexOf('#') + 1)]);
        }
    };
    /**
     * @return {?}
     */
    MenuAplicacionesComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.menuService.activo$
            .subscribe((/**
         * @param {?} isActive
         * @return {?}
         */
        function (isActive) {
            var activo = isActive.activo;
            _this.activo = activo;
        }));
    };
    MenuAplicacionesComponent.decorators = [
        { type: Component, args: [{
                    selector: 'menu-aplicaciones',
                    template: "<div id=\"menu\" [ngClass]=\"{'aplicaciones_menu_container': true, 'menu_is_active': activo }\">\n  <div class=\"container-aplicativos\">\n    <article *ngFor=\"let categoria of menuService.eventFilter$ | async\" class=\"card\">\n      <div class=\"title-app-menu-div\" [ngStyle]=\"{'background-color': categoria.color}\">\n        <h5 class=\"categoria-title\" >{{categoria.nombre}}</h5>\n      </div>\n      <div class=\"app-image-container\">\n        <div *ngFor=\"let aplicacion of categoria.aplicaciones\" class=\"image-application\" (click)=\"redirect(aplicacion.url)\">\n            <img class=\"menu-app\" [id]=\"aplicacion.estilo_logo\">\n        </div>\n      </div>\n    </article>\n  </div>\n</div>",
                    styles: ["@import url(https://pruebasassets.portaloas.udistrital.edu.co/logo-stylus.css);.aplicaciones_menu_container p{margin-bottom:11px;margin-top:0}.title-notifications{text-align:center;font-family:\"Open Sans\",sans-serif;font-size:22px}.menu-app{border-radius:7px;border:1px solid;-webkit-box-shadow:0 0 8px #888;box-shadow:0 0 8px #888}#ENVIADA,#enviada,#noleida{background-color:rgba(43,54,67,.1)}.notification-item{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;width:100%;cursor:pointer;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.notifications-image-container{width:25%}.notifications-text-container{width:68%;margin-left:5px}.notifications-text-container p{margin:0;font-family:\"Open Sans\",sans-serif;color:#000;white-space:normal;font-size:15px}.form-control{margin:0 23px;font-family:\"Open Sans\",sans-serif;width:86%}.title-app-menu-div{text-align:center;margin-bottom:5px}.aplicaciones_menu_container{background:#fff;border:1px solid #d6dae1;color:#000;-webkit-box-shadow:1px 0 17px #888;box-shadow:1px 0 17px #888;position:fixed;top:77px;-webkit-border-radius:2px;right:-100vw;border-radius:2px;overflow-y:auto;overflow-x:hidden;height:560px;width:320px;-webkit-transition:.3s;transition:.3s;z-index:1}.menu_is_active{right:0}.app-image-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:space-evenly;-ms-flex-pack:space-evenly;justify-content:space-evenly;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.image-application{width:30%;margin-bottom:10px;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.categoria-title{color:#fff}"]
                }] }
    ];
    /** @nocollapse */
    MenuAplicacionesComponent.ctorParameters = function () { return [
        { type: MenuAplicacionesService },
        { type: NotioasService },
        { type: Router }
    ]; };
    return MenuAplicacionesComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MenuAplicacionesModule = /** @class */ (function () {
    function MenuAplicacionesModule() {
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
    return MenuAplicacionesModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { UtilidadesCoreService, UtilidadesCoreComponent, UtilidadesCoreModule, NotioasService, NotioasComponent, NotioasModule, MenuAplicacionesService, ImplicitAutenticationService, MenuAplicacionesComponent, MenuAplicacionesModule, ConfiguracionService as ɵa };

//# sourceMappingURL=utilidades-core.js.map