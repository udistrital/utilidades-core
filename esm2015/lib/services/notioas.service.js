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
                if (!((window.innerWidth - 320) < data.pageX && data.pageY > 77 && data.pageY < 798)) {
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
NotioasService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */
NotioasService.ctorParameters = () => [
    { type: ConfiguracionService }
];
/** @nocollapse */ NotioasService.ngInjectableDef = i0.defineInjectable({ factory: function NotioasService_Factory() { return new NotioasService(i0.inject(i1.ConfiguracionService)); }, token: NotioasService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aW9hcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXRpbGlkYWRlcy1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL25vdGlvYXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBS2pDLE1BQU0sT0FBTyxjQUFjOzs7O0lBdUJ2QixZQUNZLFdBQWlDO1FBQWpDLGdCQUFXLEdBQVgsV0FBVyxDQUFzQjtRQXZCN0MseUJBQW9CLEdBQUcsRUFBRSxDQUFDO1FBQzFCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFNVixvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDakMsY0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFL0MseUJBQW9CLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUN0QyxtQkFBYyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV6RCxXQUFNLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsWUFBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFNUMsZUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFHL0IsZUFBVSxH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O0lBQ1Ysb0NBQW1DOzs7OztJQUkvQixxQ0FBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmFjaW9uU2VydmljZSB9IGZyb20gJy4vY29uZmlndXJhY2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IGZyb20sIGludGVydmFsLCBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHdlYlNvY2tldCB9IGZyb20gJ3J4anMvd2ViU29ja2V0JztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBOb3Rpb2FzU2VydmljZSB7XG4gICAgTk9USUZJQ0FDSU9OX1NFUlZJQ0UgPSAnJztcbiAgICBUSU1FX1BJTkcgPSAzMDAwMDtcbiAgICBwdWJsaWMgbWVzc2FnZXNTdWJqZWN0OiBTdWJqZWN0PGFueT47XG5cbiAgICBwdWJsaWMgbGlzdE1lc3NhZ2U6IGFueTtcbiAgICBwcml2YXRlIG5vdGlmaWNhY2lvbl9lc3RhZG9fdXN1YXJpbzogYW55XG5cbiAgICBwcml2YXRlIG5vTm90aWZ5U3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHVibGljIG5vTm90aWZ5JCA9IHRoaXMubm9Ob3RpZnlTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgcHJpdmF0ZSBhcnJheU1lc3NhZ2VzU3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgcHVibGljIGFycmF5TWVzc2FnZXMkID0gdGhpcy5hcnJheU1lc3NhZ2VzU3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICAgIHByaXZhdGUgYWN0aXZvID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSk7XG4gICAgcHVibGljIGFjdGl2byQgPSB0aGlzLmFjdGl2by5hc09ic2VydmFibGUoKTtcblxuICAgIHRpbWVyUGluZyQgPSBpbnRlcnZhbCh0aGlzLlRJTUVfUElORyk7XG4gICAgcm9sZXM6IGFueTtcbiAgICB1c2VyOiBhbnk7XG4gICAgcHVibGljIG1lbnVBY3Rpdm86IEJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY29uZlNlcnZpY2U6IENvbmZpZ3VyYWNpb25TZXJ2aWNlLFxuICAgICkge1xuICAgICAgICB0aGlzLmxpc3RNZXNzYWdlID0gW107XG4gICAgICAgIHRoaXMubm90aWZpY2FjaW9uX2VzdGFkb191c3VhcmlvID0gW11cbiAgICAgICAgY29uc3QgdXAkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2V1cCcpO1xuICAgICAgICB1cCQuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2bykge1xuICAgICAgICAgICAgICAgIGlmICghKCh3aW5kb3cuaW5uZXJXaWR0aCAtIDMyMCApIDwgZGF0YS5wYWdlWCAmJiBkYXRhLnBhZ2VZID4gNzcgJiYgZGF0YS5wYWdlWSA8IDc5OCApKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICB0b29nbGVNZW51Tm90aWZ5KCkge1xuICAgICAgICB0aGlzLm1lbnVBY3Rpdm8gPSAhdGhpcy5tZW51QWN0aXZvO1xuICAgICAgICBjb25zdCBkYXRhID0geyBhY3Rpdm86IHRoaXMubWVudUFjdGl2byB9XG4gICAgICAgIHRoaXMuYWN0aXZvLm5leHQoZGF0YSk7XG4gICAgICAgIGlmICh0aGlzLm1lbnVBY3Rpdm8pIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGVOb1ZpZXcoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjbG9zZVBhbmVsKCkge1xuICAgICAgICB0aGlzLm1lbnVBY3Rpdm8gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hY3Rpdm8ubmV4dCh7IGFjdGl2bzogdGhpcy5tZW51QWN0aXZvIH0pO1xuICAgIH1cblxuICAgIGluaXQocGF0aE5vdGlmaWNhY2lvbjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbygnLi4uSW5pdCBsaWIgbm90aWZpY2FjaW9uZXMnKTtcbiAgICAgICAgdGhpcy5OT1RJRklDQUNJT05fU0VSVklDRSA9IHBhdGhOb3RpZmljYWNpb247XG4gICAgICAgIHRoaXMuY29ubmVjdCgpO1xuICAgICAgICB0aGlzLnF1ZXJ5Tm90aWZpY2F0aW9uKCk7XG4gICAgfVxuXG4gICAgZ2V0Tm90aWZpY2FjaW9uZXMoKSB7XG4gICAgICAgIHRoaXMubm9Ob3RpZnlTdWJqZWN0Lm5leHQoKHRoaXMubGlzdE1lc3NhZ2UuZmlsdGVyKGRhdGEgPT4gKGRhdGEuRXN0YWRvKS50b0xvd2VyQ2FzZSgpID09PSAnZW52aWFkYScpKS5sZW5ndGgpXG4gICAgICAgIHRoaXMuYXJyYXlNZXNzYWdlc1N1YmplY3QubmV4dCh0aGlzLmxpc3RNZXNzYWdlKTtcbiAgICB9XG5cbiAgICBnZXROb3RpZmljYWNpb25Fc3RhZG9Vc3VhcmlvKGlkKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5ub3RpZmljYWNpb25fZXN0YWRvX3VzdWFyaW8uZmlsdGVyKGRhdGEgPT4gZGF0YS5JZCA9PT0gaWQpKVswXTtcbiAgICB9XG5cbiAgICBzZW5kX3BpbmcoKSB7XG4gICAgICAgIC8vIHNlbmRpbmcgcGluZyBldmVyeSAzMCBzZWNvbmRzXG4gICAgICAgIHRoaXMudGltZXJQaW5nJC5zdWJzY3JpYmUoKCkgPT4gKHRoaXMubWVzc2FnZXNTdWJqZWN0Lm5leHQoJ3BpbmcnKSkpO1xuICAgIH1cblxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIGNvbnN0IGlkX3Rva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJyk7XG4gICAgICAgIGNvbnN0IGFjY2Vzc190b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NfdG9rZW4nKTtcbiAgICAgICAgaWYgKGlkX3Rva2VuICE9PSBudWxsICYmIGFjY2Vzc190b2tlbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5yb2xlcyA9IChKU09OLnBhcnNlKGF0b2IoaWRfdG9rZW4uc3BsaXQoJy4nKVsxXSkpLnJvbGUpLmZpbHRlcigoZGF0YTogYW55KSA9PiAoZGF0YS5pbmRleE9mKCcvJykgPT09IC0xKSk7XG4gICAgICAgICAgICB0aGlzLnVzZXIgPSBKU09OLnBhcnNlKGF0b2IoaWRfdG9rZW4uc3BsaXQoJy4nKVsxXSkpLnN1YjtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBjb25uV3MgPSBgJHt0aGlzLk5PVElGSUNBQ0lPTl9TRVJWSUNFfS9qb2luP2lkPSR7dGhpcy51c2VyfSZwcm9maWxlcz0ke3RoaXMucm9sZXN9YDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb25uV3MgPSBgJHt0aGlzLk5PVElGSUNBQ0lPTl9TRVJWSUNFfS9qb2luP2lkPSR7YWNjZXNzX3Rva2VufWA7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlc1N1YmplY3QgPSB3ZWJTb2NrZXQoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IGNvbm5XcyxcbiAgICAgICAgICAgICAgICAgICAgb3Blbk9ic2VydmVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kX3BpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlc1N1YmplY3RcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAoKG1zbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdE1lc3NhZ2UgPSBbLi4uW21zbl0sIC4uLnRoaXMubGlzdE1lc3NhZ2VdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9Ob3RpZnlTdWJqZWN0Lm5leHQoKHRoaXMubGlzdE1lc3NhZ2UuZmlsdGVyKGRhdGEgPT4gKGRhdGEuRXN0YWRvKS50b0xvd2VyQ2FzZSgpID09PSAnZW52aWFkYScpKS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlNZXNzYWdlc1N1YmplY3QubmV4dCh0aGlzLmxpc3RNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbXNuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgKG1zZzogYW55KSA9PiB7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnd2Vic29ja2V0RXJyb3I6JywgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiBjb25zb2xlLmluZm8oJ2NvbXBsZXRlJyksXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZXNTdWJqZWN0LnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgYWRkTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubGlzdE1lc3NhZ2UgPSBbLi4uW21lc3NhZ2VdLCAuLi50aGlzLmxpc3RNZXNzYWdlXTtcbiAgICAgICAgdGhpcy5ub05vdGlmeVN1YmplY3QubmV4dCgodGhpcy5saXN0TWVzc2FnZS5maWx0ZXIoZGF0YSA9PiAoZGF0YS5Fc3RhZG8pLnRvTG93ZXJDYXNlKCkgPT09ICdlbnZpYWRhJykpLmxlbmd0aCk7XG4gICAgICAgIHRoaXMuYXJyYXlNZXNzYWdlc1N1YmplY3QubmV4dCh0aGlzLmxpc3RNZXNzYWdlKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VTdGF0ZU5vVmlldygpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdE1lc3NhZ2UuZmlsdGVyKGRhdGEgPT4gKGRhdGEuRXN0YWRvKS50b0xvd2VyQ2FzZSgpID09PSAnZW52aWFkYScpLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZTZXJ2aWNlLnBvc3QoJ25vdGlmaWNhY2lvbl9lc3RhZG9fdXN1YXJpby9jaGFuZ2VTdGF0ZU5vVmlldy8nICsgdGhpcy51c2VyLCB7fSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdE1lc3NhZ2UgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWVyeU5vdGlmaWNhdGlvbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlU3RhdGVUb1ZpZXcoaWQsIGVzdGFkbykge1xuICAgICAgICBpZiAoZXN0YWRvID09PSAnbm9sZWlkYScpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vdGlmaWNhY2lvbiA9IHRoaXMuZ2V0Tm90aWZpY2FjaW9uRXN0YWRvVXN1YXJpbyhpZCk7XG4gICAgICAgICAgICB0aGlzLmNvbmZTZXJ2aWNlLmdldCgnbm90aWZpY2FjaW9uX2VzdGFkb191c3VhcmlvL2NoYW5nZVN0YXRlVG9WaWV3LycgKyBub3RpZmljYWNpb24uSWQpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RNZXNzYWdlID0gW107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVlcnlOb3RpZmljYXRpb24oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHF1ZXJ5Tm90aWZpY2F0aW9uKCkge1xuICAgICAgICB0aGlzLmNvbmZTZXJ2aWNlLmdldCgnbm90aWZpY2FjaW9uX2VzdGFkb191c3VhcmlvP3F1ZXJ5PVVzdWFyaW86JyArIHRoaXMudXNlciArICcsQWN0aXZvOnRydWUmc29ydGJ5PW5vdGlmaWNhY2lvbiZvcmRlcj1hc2MmbGltaXQ9LTEnKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzcDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3AgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYWNpb25fZXN0YWRvX3VzdWFyaW8gPSByZXNwXG4gICAgICAgICAgICAgICAgICAgIGZyb20ocmVzcClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKG5vdGlmeTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBub3RpZnkuTm90aWZpY2FjaW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWQ6IG5vdGlmeS5JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cGU6IG5vdGlmeS5Ob3RpZmljYWNpb24uTm90aWZpY2FjaW9uQ29uZmlndXJhY2lvbi5UaXBvLklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29udGVudDogSlNPTi5wYXJzZShub3RpZnkuTm90aWZpY2FjaW9uLkN1ZXJwb05vdGlmaWNhY2lvbiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVc2VyOiBub3RpZnkuTm90aWZpY2FjaW9uLk5vdGlmaWNhY2lvbkNvbmZpZ3VyYWNpb24uQXBsaWNhY2lvbi5Ob21icmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbGlhczogbm90aWZ5Lk5vdGlmaWNhY2lvbi5Ob3RpZmljYWNpb25Db25maWd1cmFjaW9uLkFwbGljYWNpb24uQWxpYXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFc3RpbG9JY29ubzogbm90aWZ5Lk5vdGlmaWNhY2lvbi5Ob3RpZmljYWNpb25Db25maWd1cmFjaW9uLkFwbGljYWNpb24uRXN0aWxvSWNvbm8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGZWNoYUNyZWFjaW9uOiBuZXcgRGF0ZShub3RpZnkuTm90aWZpY2FjaW9uLkZlY2hhQ3JlYWNpb24pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRmVjaGFFZGljaW9uOiBuZXcgRGF0ZShub3RpZnkuRmVjaGEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXN0YWRvOiBub3RpZnkuTm90aWZpY2FjaW9uRXN0YWRvLkNvZGlnb0FicmV2aWFjaW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgIH1cblxufVxuIl19