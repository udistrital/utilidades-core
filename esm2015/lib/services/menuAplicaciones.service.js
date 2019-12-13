/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';
import { BehaviorSubject, fromEvent } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./configuracion.service";
export class MenuAplicacionesService {
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
/** @nocollapse */ MenuAplicacionesService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function MenuAplicacionesService_Factory() { return new MenuAplicacionesService(i0.ɵɵinject(i1.ConfiguracionService)); }, token: MenuAplicacionesService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudUFwbGljYWNpb25lcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXRpbGlkYWRlcy1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL21lbnVBcGxpY2FjaW9uZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRCxPQUFPLEVBQUcsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBTW5ELE1BQU0sT0FBTyx1QkFBdUI7Ozs7SUFZaEMsWUFBb0Isb0JBQTBDO1FBQTFDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFYdEQsc0JBQWlCLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0MsaUJBQVksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEQsV0FBTSxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLFlBQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRzVDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFVCxlQUFVLEdBQVksS0FBSyxDQUFDO1FBRy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOztjQUN0QixHQUFHLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7UUFFMUMsR0FBRyxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDYixJQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7Z0JBQUMsQ0FBQyxJQUFTLEVBQUMsRUFBRSxHQUFDLE9BQU8sQ0FB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Qix3Q0FBVzs7SUFDWCw2Q0FBbUM7Ozs7O0lBRXZCLHVEQUFrRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZ3VyYWNpb25TZXJ2aWNlIH0gZnJvbSAnLi9jb25maWd1cmFjaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgIEJlaGF2aW9yU3ViamVjdCwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTWVudUFwbGljYWNpb25lc1NlcnZpY2Uge1xuICAgIHByaXZhdGUgZGF0YUZpbHRlclN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcbiAgICBwdWJsaWMgZXZlbnRGaWx0ZXIkID0gdGhpcy5kYXRhRmlsdGVyU3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICAgIHByaXZhdGUgYWN0aXZvID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSk7XG4gICAgcHVibGljIGFjdGl2byQgPSB0aGlzLmFjdGl2by5hc09ic2VydmFibGUoKTtcblxuICAgIGNhdGVnb3JpYXM6IGFueTtcbiAgICBpc0xvZ2luID0gZmFsc2U7XG4gICAgcm9sZXM6IGFueTtcbiAgICBwdWJsaWMgbWVudUFjdGl2bzogQm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWd1cmFjaW9uU2VydmljZTogQ29uZmlndXJhY2lvblNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5yb2xlcyA9IHRoaXMuZ2V0Um9sZSgpO1xuICAgICAgICBjb25zdCB1cCQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZXVwJyk7XG5cbiAgICAgICAgdXAkLnN1YnNjcmliZSgoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5hY3Rpdm8pIHtcbiAgICAgICAgICAgICAgICBpZigoKGRhdGEucGF0aC5tYXAoKGluZm86IGFueSk9PntyZXR1cm4gKGluZm8ubG9jYWxOYW1lKX0pKS5maWx0ZXIoKGRhdGE6IGFueSApPT4oZGF0YSA9PT0gJ21lbnUtYXBsaWNhY2lvbmVzJykpKS5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAgICAgXG4gICAgY2xvc2VQYW5lbCgpIHtcbiAgICAgICAgdGhpcy5tZW51QWN0aXZvID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWN0aXZvLm5leHQoeyBhY3Rpdm86IHRoaXMubWVudUFjdGl2byB9KTtcbiAgICB9XG5cbiAgICBnZXRSb2xlKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gW107XG4gICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJykgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2dpbiA9IHRydWU7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHZhcmlhYmxlLW5hbWVcbiAgICAgICAgICAgIGNvbnN0IGlkX3Rva2VuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZF90b2tlbicpLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gSlNPTi5wYXJzZShhdG9iKGlkX3Rva2VuWzFdKSk7XG4gICAgICAgICAgICByZXR1cm4gcGF5bG9hZC5yb2xlLm1hcCgoZWxlbWVudCkgPT4gKHsgTm9tYnJlOiBlbGVtZW50IH0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2dpbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5kYXRhRmlsdGVyU3ViamVjdC5uZXh0KHRoaXMuY2F0ZWdvcmlhcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9vZ2xlTWVudU5vdGlmeSgpIHtcbiAgICAgICAgdGhpcy5tZW51QWN0aXZvID0gIXRoaXMubWVudUFjdGl2bztcbiAgICAgICAgY29uc3QgZGF0YSA9IHsgYWN0aXZvOiB0aGlzLm1lbnVBY3Rpdm8gfVxuICAgICAgICB0aGlzLmFjdGl2by5uZXh0KGRhdGEpO1xuICAgIH1cblxuICAgIGluaXQoY2F0ZWdvcmlhczogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbygnLi4uSW5pdCBsaWIgbWVudScpO1xuICAgICAgICB0aGlzLmNhdGVnb3JpYXMgPSBjYXRlZ29yaWFzO1xuICAgICAgICB0aGlzLmRhdGFGaWx0ZXJTdWJqZWN0Lm5leHQodGhpcy5jYXRlZ29yaWFzKTtcbiAgICAgICAgdGhpcy5nZXRBcGxpY2F0aW9uKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFwbGljYXRpb24oKTogYW55IHtcbiAgICAgICAgY29uc3QgaWRfdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWRfdG9rZW4nKTtcbiAgICAgICAgY29uc3QgYWNjZXNzX3Rva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc190b2tlbicpO1xuICAgICAgICBpZiAoaWRfdG9rZW4gIT09IG51bGwgJiYgYWNjZXNzX3Rva2VuICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuY29uZmlndXJhY2lvblNlcnZpY2UucG9zdCgnYXBsaWNhY2lvbl9yb2wvYXBsaWNhY2lvbl9yb2wnLCB0aGlzLnJvbGVzKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG51ZXZhc0FwbGljYWNpb25lcyA9IHRoaXMuY2F0ZWdvcmlhcy5tYXAoKGNhdGVnb3JpYTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3JpYS5hcGxpY2FjaW9uZXMgPSBjYXRlZ29yaWEuYXBsaWNhY2lvbmVzLmZpbHRlcigoYXBsaWNhY2lvbjogYW55KSA9PiAodGhpcy5leGlzdGUoYXBsaWNhY2lvbi5ub21icmUsIGRhdGEpKSk7XG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3JpYS5hcGxpY2FjaW9uZXMgPSBjYXRlZ29yaWEuYXBsaWNhY2lvbmVzLm1hcCgoYXBwOiBhbnkpID0+IHtyZXR1cm4gey4uLmFwcCwgLi4ue2VzdGlsb19sb2dvOiBhcHAuZXN0aWxvLnNwbGl0KCctJylbMF19fVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhdGVnb3JpYTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBudWV2YXNBcGxpY2FjaW9uZXMgPSBudWV2YXNBcGxpY2FjaW9uZXMuZmlsdGVyKChjYXRlZ29yaWEpID0+IChjYXRlZ29yaWEuYXBsaWNhY2lvbmVzLmxlbmd0aCA+IDApKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8obnVldmFzQXBsaWNhY2lvbmVzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFGaWx0ZXJTdWJqZWN0Lm5leHQobnVldmFzQXBsaWNhY2lvbmVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEZpbHRlciQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleGlzdGUobm9tYnJlOiBzdHJpbmcsIGFycmF5OiBhbnkpIHtcbiAgICAgICAgY29uc3QgZmlsdHJvID0gYXJyYXkuZmlsdGVyKChkYXRhOiBhbnkpID0+IChub21icmUudG9Mb3dlckNhc2UoKSA9PT0gZGF0YS5Ob21icmUudG9Mb3dlckNhc2UoKSkpO1xuICAgICAgICByZXR1cm4gZmlsdHJvLmxlbmd0aCA+IDA7XG4gICAgfVxuXG59XG4iXX0=