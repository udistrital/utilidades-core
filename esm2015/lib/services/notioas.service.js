/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';
import { from, interval, BehaviorSubject, Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./configuracion.service";
export class NotioasService {
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
/** @nocollapse */ NotioasService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NotioasService_Factory() { return new NotioasService(i0.ɵɵinject(i1.ConfiguracionService)); }, token: NotioasService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aW9hcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXRpbGlkYWRlcy1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL25vdGlvYXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBS2pDLE1BQU0sT0FBTyxjQUFjOzs7O0lBdUJ2QixZQUNZLFdBQWlDO1FBQWpDLGdCQUFXLEdBQVgsV0FBVyxDQUFzQjtRQXZCN0MseUJBQW9CLEdBQUcsRUFBRSxDQUFDO1FBQzFCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFNVixvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDakMsY0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFL0MseUJBQW9CLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUN0QyxtQkFBYyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV6RCxXQUFNLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsWUFBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFNUMsZUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFHL0IsZUFBVSxH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QkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7OztZQVJRLG9CQUFvQjs7Ozs7SUFVekIsOENBQTBCOztJQUMxQixtQ0FBa0I7O0lBQ2xCLHlDQUFxQzs7SUFFckMscUNBQXdCOzs7OztJQUN4QixxREFBd0M7Ozs7O0lBRXhDLHlDQUF3Qzs7SUFDeEMsbUNBQXVEOzs7OztJQUV2RCw4Q0FBNkM7O0lBQzdDLHdDQUFpRTs7Ozs7SUFFakUsZ0NBQXlDOztJQUN6QyxpQ0FBNEM7O0lBRTVDLG9DQUFzQzs7SUFDdEMsK0JBQVc7O0lBQ1gsOEJBQVU7O0lBQ1Ysb0NBQW1DOzs7OztJQUkvQixxQ0FBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmFjaW9uU2VydmljZSB9IGZyb20gJy4vY29uZmlndXJhY2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IGZyb20sIGludGVydmFsLCBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHdlYlNvY2tldCB9IGZyb20gJ3J4anMvd2ViU29ja2V0JztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBOb3Rpb2FzU2VydmljZSB7XG4gICAgTk9USUZJQ0FDSU9OX1NFUlZJQ0UgPSAnJztcbiAgICBUSU1FX1BJTkcgPSAzMDAwMDtcbiAgICBwdWJsaWMgbWVzc2FnZXNTdWJqZWN0OiBTdWJqZWN0PGFueT47XG5cbiAgICBwdWJsaWMgbGlzdE1lc3NhZ2U6IGFueTtcbiAgICBwcml2YXRlIG5vdGlmaWNhY2lvbl9lc3RhZG9fdXN1YXJpbzogYW55XG5cbiAgICBwcml2YXRlIG5vTm90aWZ5U3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHVibGljIG5vTm90aWZ5JCA9IHRoaXMubm9Ob3RpZnlTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgcHJpdmF0ZSBhcnJheU1lc3NhZ2VzU3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHVibGljIGFycmF5TWVzc2FnZXMkID0gdGhpcy5hcnJheU1lc3NhZ2VzU3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICAgIHByaXZhdGUgYWN0aXZvID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSk7XG4gICAgcHVibGljIGFjdGl2byQgPSB0aGlzLmFjdGl2by5hc09ic2VydmFibGUoKTtcblxuICAgIHRpbWVyUGluZyQgPSBpbnRlcnZhbCh0aGlzLlRJTUVfUElORyk7XG4gICAgcm9sZXM6IGFueTtcbiAgICB1c2VyOiBhbnk7XG4gICAgcHVibGljIG1lbnVBY3Rpdm86IEJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY29uZlNlcnZpY2U6IENvbmZpZ3VyYWNpb25TZXJ2aWNlLFxuICAgICkge1xuICAgICAgICB0aGlzLmxpc3RNZXNzYWdlID0gW107XG4gICAgICAgIHRoaXMubm90aWZpY2FjaW9uX2VzdGFkb191c3VhcmlvID0gW11cbiAgICAgICAgY29uc3QgdXAkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2V1cCcpO1xuICAgICAgICB1cCQuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2bykge1xuICAgICAgICAgICAgICAgIGlmKCgoZGF0YS5wYXRoXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKGluZm86IGFueSk9PntyZXR1cm4gKGluZm8ubG9jYWxOYW1lKX0pKVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChkYXRhOiBhbnkgKT0+KGRhdGEgPT09ICdsaWItbm90aW9hcycpKSkubGVuZ3RoID09PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHRvb2dsZU1lbnVOb3RpZnkoKSB7XG4gICAgICAgIHRoaXMubWVudUFjdGl2byA9ICF0aGlzLm1lbnVBY3Rpdm87XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7IGFjdGl2bzogdGhpcy5tZW51QWN0aXZvIH1cbiAgICAgICAgdGhpcy5hY3Rpdm8ubmV4dChkYXRhKTtcbiAgICAgICAgaWYgKHRoaXMubWVudUFjdGl2bykge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZU5vVmlldygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNsb3NlUGFuZWwoKSB7XG4gICAgICAgIHRoaXMubWVudUFjdGl2byA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFjdGl2by5uZXh0KHsgYWN0aXZvOiB0aGlzLm1lbnVBY3Rpdm8gfSk7XG4gICAgfVxuXG4gICAgaW5pdChwYXRoTm90aWZpY2FjaW9uOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc29sZS5pbmZvKCcuLi5Jbml0IGxpYiBub3RpZmljYWNpb25lcycpO1xuICAgICAgICB0aGlzLk5PVElGSUNBQ0lPTl9TRVJWSUNFID0gcGF0aE5vdGlmaWNhY2lvbjtcbiAgICAgICAgdGhpcy5jb25uZWN0KCk7XG4gICAgICAgIHRoaXMucXVlcnlOb3RpZmljYXRpb24oKTtcbiAgICB9XG5cbiAgICBnZXROb3RpZmljYWNpb25lcygpIHtcbiAgICAgICAgdGhpcy5ub05vdGlmeVN1YmplY3QubmV4dCgodGhpcy5saXN0TWVzc2FnZS5maWx0ZXIoZGF0YSA9PiAoZGF0YS5Fc3RhZG8pLnRvTG93ZXJDYXNlKCkgPT09ICdlbnZpYWRhJykpLmxlbmd0aClcbiAgICAgICAgdGhpcy5hcnJheU1lc3NhZ2VzU3ViamVjdC5uZXh0KHRoaXMubGlzdE1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGdldE5vdGlmaWNhY2lvbkVzdGFkb1VzdWFyaW8oaWQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm5vdGlmaWNhY2lvbl9lc3RhZG9fdXN1YXJpby5maWx0ZXIoZGF0YSA9PiBkYXRhLklkID09PSBpZCkpWzBdO1xuICAgIH1cblxuICAgIHNlbmRfcGluZygpIHtcbiAgICAgICAgLy8gc2VuZGluZyBwaW5nIGV2ZXJ5IDMwIHNlY29uZHNcbiAgICAgICAgdGhpcy50aW1lclBpbmckLnN1YnNjcmliZSgoKSA9PiAodGhpcy5tZXNzYWdlc1N1YmplY3QubmV4dCgncGluZycpKSk7XG4gICAgfVxuXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgY29uc3QgaWRfdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWRfdG9rZW4nKTtcbiAgICAgICAgY29uc3QgYWNjZXNzX3Rva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc190b2tlbicpO1xuICAgICAgICBpZiAoaWRfdG9rZW4gIT09IG51bGwgJiYgYWNjZXNzX3Rva2VuICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnJvbGVzID0gKEpTT04ucGFyc2UoYXRvYihpZF90b2tlbi5zcGxpdCgnLicpWzFdKSkucm9sZSkuZmlsdGVyKChkYXRhOiBhbnkpID0+IChkYXRhLmluZGV4T2YoJy8nKSA9PT0gLTEpKTtcbiAgICAgICAgICAgIHRoaXMudXNlciA9IEpTT04ucGFyc2UoYXRvYihpZF90b2tlbi5zcGxpdCgnLicpWzFdKSkuc3ViO1xuICAgICAgICAgICAgaWYgKHRoaXMucm9sZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGNvbm5XcyA9IGAke3RoaXMuTk9USUZJQ0FDSU9OX1NFUlZJQ0V9L2pvaW4/aWQ9JHt0aGlzLnVzZXJ9JnByb2ZpbGVzPSR7dGhpcy5yb2xlc31gO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbm5XcyA9IGAke3RoaXMuTk9USUZJQ0FDSU9OX1NFUlZJQ0V9L2pvaW4/aWQ9JHthY2Nlc3NfdG9rZW59YDtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzU3ViamVjdCA9IHdlYlNvY2tldCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogY29ubldzLFxuICAgICAgICAgICAgICAgICAgICBvcGVuT2JzZXJ2ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRfcGluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzU3ViamVjdFxuICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcCgobXNuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0TWVzc2FnZSA9IFsuLi5bbXNuXSwgLi4udGhpcy5saXN0TWVzc2FnZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub05vdGlmeVN1YmplY3QubmV4dCgodGhpcy5saXN0TWVzc2FnZS5maWx0ZXIoZGF0YSA9PiAoZGF0YS5Fc3RhZG8pLnRvTG93ZXJDYXNlKCkgPT09ICdlbnZpYWRhJykpLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheU1lc3NhZ2VzU3ViamVjdC5uZXh0KHRoaXMubGlzdE1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtc25cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAobXNnOiBhbnkpID0+IHsgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCd3ZWJzb2NrZXRFcnJvcjonLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IGNvbnNvbGUuaW5mbygnY29tcGxldGUnKSxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlc1N1YmplY3QudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBhZGRNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5saXN0TWVzc2FnZSA9IFsuLi5bbWVzc2FnZV0sIC4uLnRoaXMubGlzdE1lc3NhZ2VdO1xuICAgICAgICB0aGlzLm5vTm90aWZ5U3ViamVjdC5uZXh0KCh0aGlzLmxpc3RNZXNzYWdlLmZpbHRlcihkYXRhID0+IChkYXRhLkVzdGFkbykudG9Mb3dlckNhc2UoKSA9PT0gJ2VudmlhZGEnKSkubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5hcnJheU1lc3NhZ2VzU3ViamVjdC5uZXh0KHRoaXMubGlzdE1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGNoYW5nZVN0YXRlTm9WaWV3KCkge1xuICAgICAgICBpZiAodGhpcy5saXN0TWVzc2FnZS5maWx0ZXIoZGF0YSA9PiAoZGF0YS5Fc3RhZG8pLnRvTG93ZXJDYXNlKCkgPT09ICdlbnZpYWRhJykubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZlNlcnZpY2UucG9zdCgnbm90aWZpY2FjaW9uX2VzdGFkb191c3VhcmlvL2NoYW5nZVN0YXRlTm9WaWV3LycgKyB0aGlzLnVzZXIsIHt9KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0TWVzc2FnZSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5Tm90aWZpY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VTdGF0ZVRvVmlldyhpZCwgZXN0YWRvKSB7XG4gICAgICAgIGlmIChlc3RhZG8gPT09ICdub2xlaWRhJykge1xuICAgICAgICAgICAgY29uc3Qgbm90aWZpY2FjaW9uID0gdGhpcy5nZXROb3RpZmljYWNpb25Fc3RhZG9Vc3VhcmlvKGlkKTtcbiAgICAgICAgICAgIHRoaXMuY29uZlNlcnZpY2UuZ2V0KCdub3RpZmljYWNpb25fZXN0YWRvX3VzdWFyaW8vY2hhbmdlU3RhdGVUb1ZpZXcvJyArIG5vdGlmaWNhY2lvbi5JZClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdE1lc3NhZ2UgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWVyeU5vdGlmaWNhdGlvbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcXVlcnlOb3RpZmljYXRpb24oKSB7XG4gICAgICAgIGNvbnN0IGlkX3Rva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJyk7XG4gICAgICAgIGNvbnN0IGFjY2Vzc190b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NfdG9rZW4nKTtcbiAgICAgICAgaWYgKGlkX3Rva2VuICE9PSBudWxsICYmIGFjY2Vzc190b2tlbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jb25mU2VydmljZS5nZXQoJ25vdGlmaWNhY2lvbl9lc3RhZG9fdXN1YXJpbz9xdWVyeT1Vc3VhcmlvOicgKyB0aGlzLnVzZXIgKyAnLEFjdGl2bzp0cnVlJnNvcnRieT1ub3RpZmljYWNpb24mb3JkZXI9YXNjJmxpbWl0PS0xJylcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3A6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2FjaW9uX2VzdGFkb191c3VhcmlvID0gcmVzcFxuICAgICAgICAgICAgICAgICAgICBmcm9tKHJlc3ApXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChub3RpZnk6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygbm90aWZ5Lk5vdGlmaWNhY2lvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElkOiBub3RpZnkuSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUeXBlOiBub3RpZnkuTm90aWZpY2FjaW9uLk5vdGlmaWNhY2lvbkNvbmZpZ3VyYWNpb24uVGlwby5JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbnRlbnQ6IEpTT04ucGFyc2Uobm90aWZ5Lk5vdGlmaWNhY2lvbi5DdWVycG9Ob3RpZmljYWNpb24pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXNlcjogbm90aWZ5Lk5vdGlmaWNhY2lvbi5Ob3RpZmljYWNpb25Db25maWd1cmFjaW9uLkFwbGljYWNpb24uTm9tYnJlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWxpYXM6IG5vdGlmeS5Ob3RpZmljYWNpb24uTm90aWZpY2FjaW9uQ29uZmlndXJhY2lvbi5BcGxpY2FjaW9uLkFsaWFzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXN0aWxvSWNvbm86IG5vdGlmeS5Ob3RpZmljYWNpb24uTm90aWZpY2FjaW9uQ29uZmlndXJhY2lvbi5BcGxpY2FjaW9uLkVzdGlsb0ljb25vLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRmVjaGFDcmVhY2lvbjogbmV3IERhdGUobm90aWZ5Lk5vdGlmaWNhY2lvbi5GZWNoYUNyZWFjaW9uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZlY2hhRWRpY2lvbjogbmV3IERhdGUobm90aWZ5LkZlY2hhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVzdGFkbzogbm90aWZ5Lk5vdGlmaWNhY2lvbkVzdGFkby5Db2RpZ29BYnJldmlhY2lvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIl19