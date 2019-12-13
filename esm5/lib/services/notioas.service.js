/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';
import { from, interval, BehaviorSubject, Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./configuracion.service";
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
                if (((data.path
                    .map((/**
                 * @param {?} info
                 * @return {?}
                 */
                function (info) { return (info.localName); })))
                    .filter((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return (data === 'lib-notioas'); }))).length === 0) {
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
                    _this.listMessage = tslib_1.__spread([msn], _this.listMessage);
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
        this.listMessage = tslib_1.__spread([message], this.listMessage);
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
        /** @type {?} */
        var id_token = localStorage.getItem('id_token');
        /** @type {?} */
        var access_token = localStorage.getItem('access_token');
        if (id_token !== null && access_token !== null) {
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
        }
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
    /** @nocollapse */ NotioasService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NotioasService_Factory() { return new NotioasService(i0.ɵɵinject(i1.ConfiguracionService)); }, token: NotioasService, providedIn: "root" });
    return NotioasService;
}());
export { NotioasService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aW9hcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXRpbGlkYWRlcy1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL25vdGlvYXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0QsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUVqQztJQTBCSSx3QkFDWSxXQUFpQztRQUQ3QyxpQkFnQkM7UUFmVyxnQkFBVyxHQUFYLFdBQVcsQ0FBc0I7UUF2QjdDLHlCQUFvQixHQUFHLEVBQUUsQ0FBQztRQUMxQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBTVYsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ2pDLGNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRS9DLHlCQUFvQixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDdEMsbUJBQWMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFekQsV0FBTSxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLFlBQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRTVDLGVBQVUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRy9CLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFNL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLDJCQUEyQixHQUFHLEVBQUUsQ0FBQTs7WUFDL0IsR0FBRyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO1FBQzFDLEdBQUcsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxJQUFTO1lBQ3BCLElBQUksS0FBSSxDQUFDLE1BQU0sRUFBRTtnQkFDYixJQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSTtxQkFDVCxHQUFHOzs7O2dCQUFDLFVBQUMsSUFBUyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUMsQ0FBQztxQkFDNUMsTUFBTTs7OztnQkFBQyxVQUFDLElBQVMsSUFBSSxPQUFBLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQyxFQUF4QixDQUF3QixFQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFDO29CQUM5RCxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7aUJBQ3JCO2FBQ0o7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUVQLENBQUM7Ozs7SUFFRCx5Q0FBZ0I7OztJQUFoQjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDOztZQUM3QixJQUFJLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDNUI7SUFDTCxDQUFDOzs7O0lBRUQsbUNBQVU7OztJQUFWO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7Ozs7SUFFRCw2QkFBSTs7OztJQUFKLFVBQUssZ0JBQXdCO1FBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsZ0JBQWdCLENBQUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELDBDQUFpQjs7O0lBQWpCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07Ozs7UUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLFNBQVMsRUFBekMsQ0FBeUMsRUFBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDOUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckQsQ0FBQzs7Ozs7SUFFRCxxREFBNEI7Ozs7SUFBNUIsVUFBNkIsRUFBRTtRQUMzQixPQUFPLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLE1BQU07Ozs7UUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFkLENBQWMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQzs7OztJQUVELGtDQUFTOzs7SUFBVDtRQUFBLGlCQUdDO1FBRkcsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUzs7O1FBQUMsY0FBTSxPQUFBLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBbkMsQ0FBbUMsRUFBQyxDQUFDO0lBQ3pFLENBQUM7Ozs7SUFFRCxnQ0FBTzs7O0lBQVA7UUFBQSxpQkFxQ0M7O1lBcENTLFFBQVEsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQzs7WUFDM0MsWUFBWSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO1FBQ3pELElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxZQUFZLEtBQUssSUFBSSxFQUFFO1lBQzVDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQyxJQUFTLElBQUssT0FBQSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBMUIsQ0FBMEIsRUFBQyxDQUFDO1lBQy9HLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ3pELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzs7b0JBRWpCLE1BQU0sR0FBTSxJQUFJLENBQUMsb0JBQW9CLGlCQUFZLFlBQWM7Z0JBQ3JFLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO29CQUM3QixHQUFHLEVBQUUsTUFBTTtvQkFDWCxZQUFZLEVBQUU7d0JBQ1YsSUFBSTs7O3dCQUFFOzRCQUNGLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDckIsQ0FBQyxDQUFBO3FCQUNKO2lCQUNKLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsZUFBZTtxQkFDZixJQUFJLENBQ0QsR0FBRzs7OztnQkFBQyxVQUFDLEdBQUc7b0JBQ0osS0FBSSxDQUFDLFdBQVcsb0JBQU8sQ0FBQyxHQUFHLENBQUMsRUFBSyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ25ELEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNOzs7O29CQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLEtBQUssU0FBUyxFQUF6QyxDQUF5QyxFQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDL0csS0FBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ2pELE9BQU8sR0FBRyxDQUFBO2dCQUNkLENBQUMsRUFBQyxDQUNMO3FCQUNBLFNBQVM7Ozs7Z0JBQ04sVUFBQyxHQUFRLElBQU8sQ0FBQzs7OztnQkFDakIsVUFBQSxHQUFHO29CQUNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3pDLENBQUM7OztnQkFDRCxjQUFNLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBeEIsQ0FBd0IsRUFDakMsQ0FBQzthQUNUO1NBRUo7SUFFTCxDQUFDOzs7O0lBRUQsOEJBQUs7OztJQUFMO1FBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDOzs7OztJQUVELG1DQUFVOzs7O0lBQVYsVUFBVyxPQUFPO1FBQ2QsSUFBSSxDQUFDLFdBQVcsb0JBQU8sQ0FBQyxPQUFPLENBQUMsRUFBSyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07Ozs7UUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLFNBQVMsRUFBekMsQ0FBeUMsRUFBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0csSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckQsQ0FBQzs7OztJQUVELDBDQUFpQjs7O0lBQWpCO1FBQUEsaUJBUUM7UUFQRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTTs7OztRQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLEtBQUssU0FBUyxFQUF6QyxDQUF5QyxFQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUN4RixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnREFBZ0QsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztpQkFDbEYsU0FBUzs7OztZQUFDLFVBQUEsR0FBRztnQkFDVixLQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztnQkFDdEIsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDN0IsQ0FBQyxFQUFDLENBQUM7U0FDVjtJQUNMLENBQUM7Ozs7OztJQUVELDBDQUFpQjs7Ozs7SUFBakIsVUFBa0IsRUFBRSxFQUFFLE1BQU07UUFBNUIsaUJBU0M7UUFSRyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7O2dCQUNoQixZQUFZLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEVBQUUsQ0FBQztZQUMxRCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsR0FBRyxZQUFZLENBQUMsRUFBRSxDQUFDO2lCQUNuRixTQUFTOzs7O1lBQUMsVUFBQSxHQUFHO2dCQUNWLEtBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO2dCQUN0QixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUM3QixDQUFDLEVBQUMsQ0FBQztTQUNWO0lBQ0wsQ0FBQzs7OztJQUVELDBDQUFpQjs7O0lBQWpCO1FBQUEsaUJBOEJDOztZQTdCUyxRQUFRLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7O1lBQzNDLFlBQVksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztRQUN6RCxJQUFJLFFBQVEsS0FBSyxJQUFJLElBQUksWUFBWSxLQUFLLElBQUksRUFBRTtZQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLHFEQUFxRCxDQUFDO2lCQUNySSxTQUFTOzs7O1lBQUMsVUFBQyxJQUFTO2dCQUNqQixJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7b0JBQ2YsS0FBSSxDQUFDLDJCQUEyQixHQUFHLElBQUksQ0FBQTtvQkFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDTCxTQUFTOzs7O29CQUFDLFVBQUMsTUFBVzt3QkFDbkIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxZQUFZLEtBQUssV0FBVyxFQUFFOztnQ0FDdEMsT0FBTyxHQUFHO2dDQUNaLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRTtnQ0FDYixJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQ0FDM0QsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztnQ0FDM0QsSUFBSSxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLE1BQU07Z0NBQ3JFLEtBQUssRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxLQUFLO2dDQUNyRSxXQUFXLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsV0FBVztnQ0FDakYsYUFBYSxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO2dDQUMxRCxZQUFZLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQ0FDcEMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUI7NkJBQ3REOzRCQUNELEtBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7eUJBQzVCO29CQUNMLENBQUMsRUFBQyxDQUFDO2lCQUNWO1lBRUwsQ0FBQyxFQUFDLENBQUM7U0FDTjtJQUVMLENBQUM7O2dCQW5MSixVQUFVLFNBQUM7b0JBQ1IsVUFBVSxFQUFFLE1BQU07aUJBQ3JCOzs7O2dCQVJRLG9CQUFvQjs7O3lCQUQ3QjtDQTRMQyxBQXJMRCxJQXFMQztTQWxMWSxjQUFjOzs7SUFDdkIsOENBQTBCOztJQUMxQixtQ0FBa0I7O0lBQ2xCLHlDQUFxQzs7SUFFckMscUNBQXdCOzs7OztJQUN4QixxREFBd0M7Ozs7O0lBRXhDLHlDQUF3Qzs7SUFDeEMsbUNBQXVEOzs7OztJQUV2RCw4Q0FBNkM7O0lBQzdDLHdDQUFpRTs7Ozs7SUFFakUsZ0NBQXlDOztJQUN6QyxpQ0FBNEM7O0lBRTVDLG9DQUFzQzs7SUFDdEMsK0JBQVc7O0lBQ1gsOEJBQVU7O0lBQ1Ysb0NBQW1DOzs7OztJQUkvQixxQ0FBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmFjaW9uU2VydmljZSB9IGZyb20gJy4vY29uZmlndXJhY2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IGZyb20sIGludGVydmFsLCBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHdlYlNvY2tldCB9IGZyb20gJ3J4anMvd2ViU29ja2V0JztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBOb3Rpb2FzU2VydmljZSB7XG4gICAgTk9USUZJQ0FDSU9OX1NFUlZJQ0UgPSAnJztcbiAgICBUSU1FX1BJTkcgPSAzMDAwMDtcbiAgICBwdWJsaWMgbWVzc2FnZXNTdWJqZWN0OiBTdWJqZWN0PGFueT47XG5cbiAgICBwdWJsaWMgbGlzdE1lc3NhZ2U6IGFueTtcbiAgICBwcml2YXRlIG5vdGlmaWNhY2lvbl9lc3RhZG9fdXN1YXJpbzogYW55XG5cbiAgICBwcml2YXRlIG5vTm90aWZ5U3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHVibGljIG5vTm90aWZ5JCA9IHRoaXMubm9Ob3RpZnlTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgcHJpdmF0ZSBhcnJheU1lc3NhZ2VzU3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHVibGljIGFycmF5TWVzc2FnZXMkID0gdGhpcy5hcnJheU1lc3NhZ2VzU3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICAgIHByaXZhdGUgYWN0aXZvID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSk7XG4gICAgcHVibGljIGFjdGl2byQgPSB0aGlzLmFjdGl2by5hc09ic2VydmFibGUoKTtcblxuICAgIHRpbWVyUGluZyQgPSBpbnRlcnZhbCh0aGlzLlRJTUVfUElORyk7XG4gICAgcm9sZXM6IGFueTtcbiAgICB1c2VyOiBhbnk7XG4gICAgcHVibGljIG1lbnVBY3Rpdm86IEJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY29uZlNlcnZpY2U6IENvbmZpZ3VyYWNpb25TZXJ2aWNlLFxuICAgICkge1xuICAgICAgICB0aGlzLmxpc3RNZXNzYWdlID0gW107XG4gICAgICAgIHRoaXMubm90aWZpY2FjaW9uX2VzdGFkb191c3VhcmlvID0gW11cbiAgICAgICAgY29uc3QgdXAkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2V1cCcpO1xuICAgICAgICB1cCQuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2bykge1xuICAgICAgICAgICAgICAgIGlmKCgoZGF0YS5wYXRoXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKGluZm86IGFueSk9PntyZXR1cm4gKGluZm8ubG9jYWxOYW1lKX0pKVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChkYXRhOiBhbnkgKT0+KGRhdGEgPT09ICdsaWItbm90aW9hcycpKSkubGVuZ3RoID09PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHRvb2dsZU1lbnVOb3RpZnkoKSB7XG4gICAgICAgIHRoaXMubWVudUFjdGl2byA9ICF0aGlzLm1lbnVBY3Rpdm87XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7IGFjdGl2bzogdGhpcy5tZW51QWN0aXZvIH1cbiAgICAgICAgdGhpcy5hY3Rpdm8ubmV4dChkYXRhKTtcbiAgICAgICAgaWYgKHRoaXMubWVudUFjdGl2bykge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZU5vVmlldygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNsb3NlUGFuZWwoKSB7XG4gICAgICAgIHRoaXMubWVudUFjdGl2byA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFjdGl2by5uZXh0KHsgYWN0aXZvOiB0aGlzLm1lbnVBY3Rpdm8gfSk7XG4gICAgfVxuXG4gICAgaW5pdChwYXRoTm90aWZpY2FjaW9uOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc29sZS5pbmZvKCcuLi5Jbml0IGxpYiBub3RpZmljYWNpb25lcycpO1xuICAgICAgICB0aGlzLk5PVElGSUNBQ0lPTl9TRVJWSUNFID0gcGF0aE5vdGlmaWNhY2lvbjtcbiAgICAgICAgdGhpcy5jb25uZWN0KCk7XG4gICAgICAgIHRoaXMucXVlcnlOb3RpZmljYXRpb24oKTtcbiAgICB9XG5cbiAgICBnZXROb3RpZmljYWNpb25lcygpIHtcbiAgICAgICAgdGhpcy5ub05vdGlmeVN1YmplY3QubmV4dCgodGhpcy5saXN0TWVzc2FnZS5maWx0ZXIoZGF0YSA9PiAoZGF0YS5Fc3RhZG8pLnRvTG93ZXJDYXNlKCkgPT09ICdlbnZpYWRhJykpLmxlbmd0aClcbiAgICAgICAgdGhpcy5hcnJheU1lc3NhZ2VzU3ViamVjdC5uZXh0KHRoaXMubGlzdE1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGdldE5vdGlmaWNhY2lvbkVzdGFkb1VzdWFyaW8oaWQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm5vdGlmaWNhY2lvbl9lc3RhZG9fdXN1YXJpby5maWx0ZXIoZGF0YSA9PiBkYXRhLklkID09PSBpZCkpWzBdO1xuICAgIH1cblxuICAgIHNlbmRfcGluZygpIHtcbiAgICAgICAgLy8gc2VuZGluZyBwaW5nIGV2ZXJ5IDMwIHNlY29uZHNcbiAgICAgICAgdGhpcy50aW1lclBpbmckLnN1YnNjcmliZSgoKSA9PiAodGhpcy5tZXNzYWdlc1N1YmplY3QubmV4dCgncGluZycpKSk7XG4gICAgfVxuXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgY29uc3QgaWRfdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWRfdG9rZW4nKTtcbiAgICAgICAgY29uc3QgYWNjZXNzX3Rva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc190b2tlbicpO1xuICAgICAgICBpZiAoaWRfdG9rZW4gIT09IG51bGwgJiYgYWNjZXNzX3Rva2VuICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnJvbGVzID0gKEpTT04ucGFyc2UoYXRvYihpZF90b2tlbi5zcGxpdCgnLicpWzFdKSkucm9sZSkuZmlsdGVyKChkYXRhOiBhbnkpID0+IChkYXRhLmluZGV4T2YoJy8nKSA9PT0gLTEpKTtcbiAgICAgICAgICAgIHRoaXMudXNlciA9IEpTT04ucGFyc2UoYXRvYihpZF90b2tlbi5zcGxpdCgnLicpWzFdKSkuc3ViO1xuICAgICAgICAgICAgaWYgKHRoaXMucm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGNvbm5XcyA9IGAke3RoaXMuTk9USUZJQ0FDSU9OX1NFUlZJQ0V9L2pvaW4/aWQ9JHt0aGlzLnVzZXJ9JnByb2ZpbGVzPSR7dGhpcy5yb2xlc31gO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbm5XcyA9IGAke3RoaXMuTk9USUZJQ0FDSU9OX1NFUlZJQ0V9L2pvaW4/aWQ9JHthY2Nlc3NfdG9rZW59YDtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzU3ViamVjdCA9IHdlYlNvY2tldCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogY29ubldzLFxuICAgICAgICAgICAgICAgICAgICBvcGVuT2JzZXJ2ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRfcGluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzU3ViamVjdFxuICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcCgobXNuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0TWVzc2FnZSA9IFsuLi5bbXNuXSwgLi4udGhpcy5saXN0TWVzc2FnZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub05vdGlmeVN1YmplY3QubmV4dCgodGhpcy5saXN0TWVzc2FnZS5maWx0ZXIoZGF0YSA9PiAoZGF0YS5Fc3RhZG8pLnRvTG93ZXJDYXNlKCkgPT09ICdlbnZpYWRhJykpLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheU1lc3NhZ2VzU3ViamVjdC5uZXh0KHRoaXMubGlzdE1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtc25cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAobXNnOiBhbnkpID0+IHsgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCd3ZWJzb2NrZXRFcnJvcjonLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IGNvbnNvbGUuaW5mbygnY29tcGxldGUnKSxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlc1N1YmplY3QudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBhZGRNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5saXN0TWVzc2FnZSA9IFsuLi5bbWVzc2FnZV0sIC4uLnRoaXMubGlzdE1lc3NhZ2VdO1xuICAgICAgICB0aGlzLm5vTm90aWZ5U3ViamVjdC5uZXh0KCh0aGlzLmxpc3RNZXNzYWdlLmZpbHRlcihkYXRhID0+IChkYXRhLkVzdGFkbykudG9Mb3dlckNhc2UoKSA9PT0gJ2VudmlhZGEnKSkubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5hcnJheU1lc3NhZ2VzU3ViamVjdC5uZXh0KHRoaXMubGlzdE1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGNoYW5nZVN0YXRlTm9WaWV3KCkge1xuICAgICAgICBpZiAodGhpcy5saXN0TWVzc2FnZS5maWx0ZXIoZGF0YSA9PiAoZGF0YS5Fc3RhZG8pLnRvTG93ZXJDYXNlKCkgPT09ICdlbnZpYWRhJykubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZlNlcnZpY2UucG9zdCgnbm90aWZpY2FjaW9uX2VzdGFkb191c3VhcmlvL2NoYW5nZVN0YXRlTm9WaWV3LycgKyB0aGlzLnVzZXIsIHt9KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0TWVzc2FnZSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5Tm90aWZpY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VTdGF0ZVRvVmlldyhpZCwgZXN0YWRvKSB7XG4gICAgICAgIGlmIChlc3RhZG8gPT09ICdub2xlaWRhJykge1xuICAgICAgICAgICAgY29uc3Qgbm90aWZpY2FjaW9uID0gdGhpcy5nZXROb3RpZmljYWNpb25Fc3RhZG9Vc3VhcmlvKGlkKTtcbiAgICAgICAgICAgIHRoaXMuY29uZlNlcnZpY2UuZ2V0KCdub3RpZmljYWNpb25fZXN0YWRvX3VzdWFyaW8vY2hhbmdlU3RhdGVUb1ZpZXcvJyArIG5vdGlmaWNhY2lvbi5JZClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdE1lc3NhZ2UgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWVyeU5vdGlmaWNhdGlvbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcXVlcnlOb3RpZmljYXRpb24oKSB7XG4gICAgICAgIGNvbnN0IGlkX3Rva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJyk7XG4gICAgICAgIGNvbnN0IGFjY2Vzc190b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NfdG9rZW4nKTtcbiAgICAgICAgaWYgKGlkX3Rva2VuICE9PSBudWxsICYmIGFjY2Vzc190b2tlbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jb25mU2VydmljZS5nZXQoJ25vdGlmaWNhY2lvbl9lc3RhZG9fdXN1YXJpbz9xdWVyeT1Vc3VhcmlvOicgKyB0aGlzLnVzZXIgKyAnLEFjdGl2bzp0cnVlJnNvcnRieT1ub3RpZmljYWNpb24mb3JkZXI9YXNjJmxpbWl0PS0xJylcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3A6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2FjaW9uX2VzdGFkb191c3VhcmlvID0gcmVzcFxuICAgICAgICAgICAgICAgICAgICBmcm9tKHJlc3ApXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChub3RpZnk6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygbm90aWZ5Lk5vdGlmaWNhY2lvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElkOiBub3RpZnkuSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUeXBlOiBub3RpZnkuTm90aWZpY2FjaW9uLk5vdGlmaWNhY2lvbkNvbmZpZ3VyYWNpb24uVGlwby5JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbnRlbnQ6IEpTT04ucGFyc2Uobm90aWZ5Lk5vdGlmaWNhY2lvbi5DdWVycG9Ob3RpZmljYWNpb24pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXNlcjogbm90aWZ5Lk5vdGlmaWNhY2lvbi5Ob3RpZmljYWNpb25Db25maWd1cmFjaW9uLkFwbGljYWNpb24uTm9tYnJlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWxpYXM6IG5vdGlmeS5Ob3RpZmljYWNpb24uTm90aWZpY2FjaW9uQ29uZmlndXJhY2lvbi5BcGxpY2FjaW9uLkFsaWFzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXN0aWxvSWNvbm86IG5vdGlmeS5Ob3RpZmljYWNpb24uTm90aWZpY2FjaW9uQ29uZmlndXJhY2lvbi5BcGxpY2FjaW9uLkVzdGlsb0ljb25vLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRmVjaGFDcmVhY2lvbjogbmV3IERhdGUobm90aWZ5Lk5vdGlmaWNhY2lvbi5GZWNoYUNyZWFjaW9uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZlY2hhRWRpY2lvbjogbmV3IERhdGUobm90aWZ5LkZlY2hhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVzdGFkbzogbm90aWZ5Lk5vdGlmaWNhY2lvbkVzdGFkby5Db2RpZ29BYnJldmlhY2lvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIl19