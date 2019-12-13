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
    /** @nocollapse */ NotioasService.ngInjectableDef = i0.defineInjectable({ factory: function NotioasService_Factory() { return new NotioasService(i0.inject(i1.ConfiguracionService)); }, token: NotioasService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aW9hcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXRpbGlkYWRlcy1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL25vdGlvYXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0QsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUVqQztJQTBCSSx3QkFDWSxXQUFpQztRQUQ3QyxpQkFjQztRQWJXLGdCQUFXLEdBQVgsV0FBVyxDQUFzQjtRQXZCN0MseUJBQW9CLEdBQUcsRUFBRSxDQUFDO1FBQzFCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFNVixvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDakMsY0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFL0MseUJBQW9CLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUN0QyxtQkFBYyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV6RCxXQUFNLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsWUFBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFNUMsZUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFHL0IsZUFBVSxHQUFZLEtB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QUVyQyxxQ0FBd0I7Ozs7O0lBQ3hCLHFEQUF3Qzs7Ozs7SUFFeEMseUNBQXdDOztJQUN4QyxtQ0FBdUQ7Ozs7O0lBRXZELDhDQUE2Qzs7SUFDN0Msd0NBQWlFOzs7OztJQUVqRSxnQ0FBeUM7O0lBQ3pDLGlDQUE0Qzs7SUFFNUMsb0NBQXNDOztJQUN0QywrQkFBVzs7SUFDWCw4QkFBVTs7SUFDVixvQ0FBbUM7Ozs7O0lBSS9CLHFDQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZ3VyYWNpb25TZXJ2aWNlIH0gZnJvbSAnLi9jb25maWd1cmFjaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgZnJvbSwgaW50ZXJ2YWwsIEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgd2ViU29ja2V0IH0gZnJvbSAncnhqcy93ZWJTb2NrZXQnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE5vdGlvYXNTZXJ2aWNlIHtcbiAgICBOT1RJRklDQUNJT05fU0VSVklDRSA9ICcnO1xuICAgIFRJTUVfUElORyA9IDMwMDAwO1xuICAgIHB1YmxpYyBtZXNzYWdlc1N1YmplY3Q6IFN1YmplY3Q8YW55PjtcblxuICAgIHB1YmxpYyBsaXN0TWVzc2FnZTogYW55O1xuICAgIHByaXZhdGUgbm90aWZpY2FjaW9uX2VzdGFkb191c3VhcmlvOiBhbnlcblxuICAgIHByaXZhdGUgbm9Ob3RpZnlTdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcbiAgICBwdWJsaWMgbm9Ob3RpZnkkID0gdGhpcy5ub05vdGlmeVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBwcml2YXRlIGFycmF5TWVzc2FnZXNTdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcbiAgICBwdWJsaWMgYXJyYXlNZXNzYWdlcyQgPSB0aGlzLmFycmF5TWVzc2FnZXNTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgcHJpdmF0ZSBhY3Rpdm8gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KTtcbiAgICBwdWJsaWMgYWN0aXZvJCA9IHRoaXMuYWN0aXZvLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgdGltZXJQaW5nJCA9IGludGVydmFsKHRoaXMuVElNRV9QSU5HKTtcbiAgICByb2xlczogYW55O1xuICAgIHVzZXI6IGFueTtcbiAgICBwdWJsaWMgbWVudUFjdGl2bzogQm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjb25mU2VydmljZTogQ29uZmlndXJhY2lvblNlcnZpY2UsXG4gICAgKSB7XG4gICAgICAgIHRoaXMubGlzdE1lc3NhZ2UgPSBbXTtcbiAgICAgICAgdGhpcy5ub3RpZmljYWNpb25fZXN0YWRvX3VzdWFyaW8gPSBbXVxuICAgICAgICBjb25zdCB1cCQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZXVwJyk7XG4gICAgICAgIHVwJC5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZvKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoKHdpbmRvdy5pbm5lcldpZHRoIC0gMzIwICkgPCBkYXRhLnBhZ2VYICYmIGRhdGEucGFnZVkgPiA3NyAmJiBkYXRhLnBhZ2VZIDwgNzk4ICkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHRvb2dsZU1lbnVOb3RpZnkoKSB7XG4gICAgICAgIHRoaXMubWVudUFjdGl2byA9ICF0aGlzLm1lbnVBY3Rpdm87XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7IGFjdGl2bzogdGhpcy5tZW51QWN0aXZvIH1cbiAgICAgICAgdGhpcy5hY3Rpdm8ubmV4dChkYXRhKTtcbiAgICAgICAgaWYgKHRoaXMubWVudUFjdGl2bykge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZU5vVmlldygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNsb3NlUGFuZWwoKSB7XG4gICAgICAgIHRoaXMubWVudUFjdGl2byA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFjdGl2by5uZXh0KHsgYWN0aXZvOiB0aGlzLm1lbnVBY3Rpdm8gfSk7XG4gICAgfVxuXG4gICAgaW5pdChwYXRoTm90aWZpY2FjaW9uOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc29sZS5pbmZvKCcuLi5Jbml0IGxpYiBub3RpZmljYWNpb25lcycpO1xuICAgICAgICB0aGlzLk5PVElGSUNBQ0lPTl9TRVJWSUNFID0gcGF0aE5vdGlmaWNhY2lvbjtcbiAgICAgICAgdGhpcy5jb25uZWN0KCk7XG4gICAgICAgIHRoaXMucXVlcnlOb3RpZmljYXRpb24oKTtcbiAgICB9XG5cbiAgICBnZXROb3RpZmljYWNpb25lcygpIHtcbiAgICAgICAgdGhpcy5ub05vdGlmeVN1YmplY3QubmV4dCgodGhpcy5saXN0TWVzc2FnZS5maWx0ZXIoZGF0YSA9PiAoZGF0YS5Fc3RhZG8pLnRvTG93ZXJDYXNlKCkgPT09ICdlbnZpYWRhJykpLmxlbmd0aClcbiAgICAgICAgdGhpcy5hcnJheU1lc3NhZ2VzU3ViamVjdC5uZXh0KHRoaXMubGlzdE1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGdldE5vdGlmaWNhY2lvbkVzdGFkb1VzdWFyaW8oaWQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm5vdGlmaWNhY2lvbl9lc3RhZG9fdXN1YXJpby5maWx0ZXIoZGF0YSA9PiBkYXRhLklkID09PSBpZCkpWzBdO1xuICAgIH1cblxuICAgIHNlbmRfcGluZygpIHtcbiAgICAgICAgLy8gc2VuZGluZyBwaW5nIGV2ZXJ5IDMwIHNlY29uZHNcbiAgICAgICAgdGhpcy50aW1lclBpbmckLnN1YnNjcmliZSgoKSA9PiAodGhpcy5tZXNzYWdlc1N1YmplY3QubmV4dCgncGluZycpKSk7XG4gICAgfVxuXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgY29uc3QgaWRfdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWRfdG9rZW4nKTtcbiAgICAgICAgY29uc3QgYWNjZXNzX3Rva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc190b2tlbicpO1xuICAgICAgICBpZiAoaWRfdG9rZW4gIT09IG51bGwgJiYgYWNjZXNzX3Rva2VuICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnJvbGVzID0gKEpTT04ucGFyc2UoYXRvYihpZF90b2tlbi5zcGxpdCgnLicpWzFdKSkucm9sZSkuZmlsdGVyKChkYXRhOiBhbnkpID0+IChkYXRhLmluZGV4T2YoJy8nKSA9PT0gLTEpKTtcbiAgICAgICAgICAgIHRoaXMudXNlciA9IEpTT04ucGFyc2UoYXRvYihpZF90b2tlbi5zcGxpdCgnLicpWzFdKSkuc3ViO1xuICAgICAgICAgICAgaWYgKHRoaXMucm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGNvbm5XcyA9IGAke3RoaXMuTk9USUZJQ0FDSU9OX1NFUlZJQ0V9L2pvaW4/aWQ9JHt0aGlzLnVzZXJ9JnByb2ZpbGVzPSR7dGhpcy5yb2xlc31gO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbm5XcyA9IGAke3RoaXMuTk9USUZJQ0FDSU9OX1NFUlZJQ0V9L2pvaW4/aWQ9JHthY2Nlc3NfdG9rZW59YDtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzU3ViamVjdCA9IHdlYlNvY2tldCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogY29ubldzLFxuICAgICAgICAgICAgICAgICAgICBvcGVuT2JzZXJ2ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRfcGluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzU3ViamVjdFxuICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcCgobXNuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0TWVzc2FnZSA9IFsuLi5bbXNuXSwgLi4udGhpcy5saXN0TWVzc2FnZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub05vdGlmeVN1YmplY3QubmV4dCgodGhpcy5saXN0TWVzc2FnZS5maWx0ZXIoZGF0YSA9PiAoZGF0YS5Fc3RhZG8pLnRvTG93ZXJDYXNlKCkgPT09ICdlbnZpYWRhJykpLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheU1lc3NhZ2VzU3ViamVjdC5uZXh0KHRoaXMubGlzdE1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtc25cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAobXNnOiBhbnkpID0+IHsgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCd3ZWJzb2NrZXRFcnJvcjonLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IGNvbnNvbGUuaW5mbygnY29tcGxldGUnKSxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlc1N1YmplY3QudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBhZGRNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5saXN0TWVzc2FnZSA9IFsuLi5bbWVzc2FnZV0sIC4uLnRoaXMubGlzdE1lc3NhZ2VdO1xuICAgICAgICB0aGlzLm5vTm90aWZ5U3ViamVjdC5uZXh0KCh0aGlzLmxpc3RNZXNzYWdlLmZpbHRlcihkYXRhID0+IChkYXRhLkVzdGFkbykudG9Mb3dlckNhc2UoKSA9PT0gJ2VudmlhZGEnKSkubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5hcnJheU1lc3NhZ2VzU3ViamVjdC5uZXh0KHRoaXMubGlzdE1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGNoYW5nZVN0YXRlTm9WaWV3KCkge1xuICAgICAgICBpZiAodGhpcy5saXN0TWVzc2FnZS5maWx0ZXIoZGF0YSA9PiAoZGF0YS5Fc3RhZG8pLnRvTG93ZXJDYXNlKCkgPT09ICdlbnZpYWRhJykubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZlNlcnZpY2UucG9zdCgnbm90aWZpY2FjaW9uX2VzdGFkb191c3VhcmlvL2NoYW5nZVN0YXRlTm9WaWV3LycgKyB0aGlzLnVzZXIsIHt9KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0TWVzc2FnZSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5Tm90aWZpY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VTdGF0ZVRvVmlldyhpZCwgZXN0YWRvKSB7XG4gICAgICAgIGlmIChlc3RhZG8gPT09ICdub2xlaWRhJykge1xuICAgICAgICAgICAgY29uc3Qgbm90aWZpY2FjaW9uID0gdGhpcy5nZXROb3RpZmljYWNpb25Fc3RhZG9Vc3VhcmlvKGlkKTtcbiAgICAgICAgICAgIHRoaXMuY29uZlNlcnZpY2UuZ2V0KCdub3RpZmljYWNpb25fZXN0YWRvX3VzdWFyaW8vY2hhbmdlU3RhdGVUb1ZpZXcvJyArIG5vdGlmaWNhY2lvbi5JZClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdE1lc3NhZ2UgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWVyeU5vdGlmaWNhdGlvbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcXVlcnlOb3RpZmljYXRpb24oKSB7XG4gICAgICAgIHRoaXMuY29uZlNlcnZpY2UuZ2V0KCdub3RpZmljYWNpb25fZXN0YWRvX3VzdWFyaW8/cXVlcnk9VXN1YXJpbzonICsgdGhpcy51c2VyICsgJyxBY3Rpdm86dHJ1ZSZzb3J0Ynk9bm90aWZpY2FjaW9uJm9yZGVyPWFzYyZsaW1pdD0tMScpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXNwOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhY2lvbl9lc3RhZG9fdXN1YXJpbyA9IHJlc3BcbiAgICAgICAgICAgICAgICAgICAgZnJvbShyZXNwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgobm90aWZ5OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5vdGlmeS5Ob3RpZmljYWNpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZDogbm90aWZ5LklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHlwZTogbm90aWZ5Lk5vdGlmaWNhY2lvbi5Ob3RpZmljYWNpb25Db25maWd1cmFjaW9uLlRpcG8uSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250ZW50OiBKU09OLnBhcnNlKG5vdGlmeS5Ob3RpZmljYWNpb24uQ3VlcnBvTm90aWZpY2FjaW9uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVzZXI6IG5vdGlmeS5Ob3RpZmljYWNpb24uTm90aWZpY2FjaW9uQ29uZmlndXJhY2lvbi5BcGxpY2FjaW9uLk5vbWJyZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFsaWFzOiBub3RpZnkuTm90aWZpY2FjaW9uLk5vdGlmaWNhY2lvbkNvbmZpZ3VyYWNpb24uQXBsaWNhY2lvbi5BbGlhcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVzdGlsb0ljb25vOiBub3RpZnkuTm90aWZpY2FjaW9uLk5vdGlmaWNhY2lvbkNvbmZpZ3VyYWNpb24uQXBsaWNhY2lvbi5Fc3RpbG9JY29ubyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZlY2hhQ3JlYWNpb246IG5ldyBEYXRlKG5vdGlmeS5Ob3RpZmljYWNpb24uRmVjaGFDcmVhY2lvbiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGZWNoYUVkaWNpb246IG5ldyBEYXRlKG5vdGlmeS5GZWNoYSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFc3RhZG86IG5vdGlmeS5Ob3RpZmljYWNpb25Fc3RhZG8uQ29kaWdvQWJyZXZpYWNpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgfVxuXG59XG4iXX0=