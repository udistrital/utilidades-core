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
                if (!((window.innerWidth - 320) < data.pageX && data.pageY > 77 && data.pageY < 578)) {
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
        console.info(categorias);
        this.categorias = categorias;
        this.dataFilterSubject.next(this.categorias);
        this.getAplication();
    }
    /**
     * @return {?}
     */
    getAplication() {
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
/** @nocollapse */ MenuAplicacionesService.ngInjectableDef = i0.defineInjectable({ factory: function MenuAplicacionesService_Factory() { return new MenuAplicacionesService(i0.inject(i1.ConfiguracionService)); }, token: MenuAplicacionesService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudUFwbGljYWNpb25lcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXRpbGlkYWRlcy1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL21lbnVBcGxpY2FjaW9uZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRCxPQUFPLEVBQUcsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBTW5ELE1BQU0sT0FBTyx1QkFBdUI7Ozs7SUFZaEMsWUFBb0Isb0JBQTBDO1FBQTFDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFYdEQsc0JBQWlCLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0MsaUJBQVksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEQsV0FBTSxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLFlBQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRzVDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFVCxlQUFVLEdBQVksS0FBSyxDQUFDO1FBRy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOztjQUN0QixHQUFHLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7UUFFMUMsR0FBRyxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDYixJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENB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TyxTQUFTLENBQUM7WUFDckIsQ0FBQyxFQUFDO1lBQ0Ysa0JBQWtCLEdBQUcsa0JBQWtCLENBQUMsTUFBTTs7OztZQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFDbkcsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNwRCxDQUFDLEVBQUMsQ0FBQztRQUNQLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDOzs7Ozs7SUFFRCxNQUFNLENBQUMsTUFBYyxFQUFFLEtBQVU7O2NBQ3ZCLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTTs7OztRQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUM7UUFDaEcsT0FBTyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7WUFsRkosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7O1lBTlEsb0JBQW9COzs7Ozs7OztJQVF6QixvREFBb0Q7O0lBQ3BELCtDQUE0RDs7Ozs7SUFFNUQseUNBQXlDOztJQUN6QywwQ0FBNEM7O0lBRTVDLDZDQUFnQjs7SUFDaEIsMENBQWdCOztJQUNoQix3Q0FBVzs7SUFDWCw2Q0FBbUM7Ozs7O0lBRXZCLHVEQUFrRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZ3VyYWNpb25TZXJ2aWNlIH0gZnJvbSAnLi9jb25maWd1cmFjaW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgIEJlaGF2aW9yU3ViamVjdCwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTWVudUFwbGljYWNpb25lc1NlcnZpY2Uge1xuICAgIHByaXZhdGUgZGF0YUZpbHRlclN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcbiAgICBwdWJsaWMgZXZlbnRGaWx0ZXIkID0gdGhpcy5kYXRhRmlsdGVyU3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICAgIHByaXZhdGUgYWN0aXZvID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSk7XG4gICAgcHVibGljIGFjdGl2byQgPSB0aGlzLmFjdGl2by5hc09ic2VydmFibGUoKTtcblxuICAgIGNhdGVnb3JpYXM6IGFueTtcbiAgICBpc0xvZ2luID0gZmFsc2U7XG4gICAgcm9sZXM6IGFueTtcbiAgICBwdWJsaWMgbWVudUFjdGl2bzogQm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWd1cmFjaW9uU2VydmljZTogQ29uZmlndXJhY2lvblNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5yb2xlcyA9IHRoaXMuZ2V0Um9sZSgpO1xuICAgICAgICBjb25zdCB1cCQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZXVwJyk7XG5cbiAgICAgICAgdXAkLnN1YnNjcmliZSgoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5hY3Rpdm8pIHtcbiAgICAgICAgICAgICAgICBpZiAoISgod2luZG93LmlubmVyV2lkdGggLSAzMjAgKSA8IGRhdGEucGFnZVggJiYgZGF0YS5wYWdlWSA+IDc3ICYmIGRhdGEucGFnZVkgPCA1NzggKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAgICAgXG4gICAgY2xvc2VQYW5lbCgpIHtcbiAgICAgICAgdGhpcy5tZW51QWN0aXZvID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWN0aXZvLm5leHQoeyBhY3Rpdm86IHRoaXMubWVudUFjdGl2byB9KTtcbiAgICB9XG5cbiAgICBnZXRSb2xlKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gW107XG4gICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJykgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2dpbiA9IHRydWU7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHZhcmlhYmxlLW5hbWVcbiAgICAgICAgICAgIGNvbnN0IGlkX3Rva2VuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZF90b2tlbicpLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gSlNPTi5wYXJzZShhdG9iKGlkX3Rva2VuWzFdKSk7XG4gICAgICAgICAgICByZXR1cm4gcGF5bG9hZC5yb2xlLm1hcCgoZWxlbWVudCkgPT4gKHsgTm9tYnJlOiBlbGVtZW50IH0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2dpbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5kYXRhRmlsdGVyU3ViamVjdC5uZXh0KHRoaXMuY2F0ZWdvcmlhcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9vZ2xlTWVudU5vdGlmeSgpIHtcbiAgICAgICAgdGhpcy5tZW51QWN0aXZvID0gIXRoaXMubWVudUFjdGl2bztcbiAgICAgICAgY29uc3QgZGF0YSA9IHsgYWN0aXZvOiB0aGlzLm1lbnVBY3Rpdm8gfVxuICAgICAgICB0aGlzLmFjdGl2by5uZXh0KGRhdGEpO1xuICAgIH1cblxuICAgIGluaXQoY2F0ZWdvcmlhczogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbygnLi4uSW5pdCBsaWIgbWVudScpO1xuICAgICAgICBjb25zb2xlLmluZm8oY2F0ZWdvcmlhcyk7XG5cbiAgICAgICAgdGhpcy5jYXRlZ29yaWFzID0gY2F0ZWdvcmlhcztcbiAgICAgICAgdGhpcy5kYXRhRmlsdGVyU3ViamVjdC5uZXh0KHRoaXMuY2F0ZWdvcmlhcyk7XG4gICAgICAgIHRoaXMuZ2V0QXBsaWNhdGlvbigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBcGxpY2F0aW9uKCk6IGFueSB7XG5cbiAgICAgICAgdGhpcy5jb25maWd1cmFjaW9uU2VydmljZS5wb3N0KCdhcGxpY2FjaW9uX3JvbC9hcGxpY2FjaW9uX3JvbCcsIHRoaXMucm9sZXMpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbnVldmFzQXBsaWNhY2lvbmVzID0gdGhpcy5jYXRlZ29yaWFzLm1hcCgoY2F0ZWdvcmlhOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcmlhLmFwbGljYWNpb25lcyA9IGNhdGVnb3JpYS5hcGxpY2FjaW9uZXMuZmlsdGVyKChhcGxpY2FjaW9uOiBhbnkpID0+ICh0aGlzLmV4aXN0ZShhcGxpY2FjaW9uLm5vbWJyZSwgZGF0YSkpKTtcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcmlhLmFwbGljYWNpb25lcyA9IGNhdGVnb3JpYS5hcGxpY2FjaW9uZXMubWFwKChhcHA6IGFueSkgPT4ge3JldHVybiB7Li4uYXBwLCAuLi57ZXN0aWxvX2xvZ286IGFwcC5lc3RpbG8uc3BsaXQoJy0nKVswXX19XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2F0ZWdvcmlhO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG51ZXZhc0FwbGljYWNpb25lcyA9IG51ZXZhc0FwbGljYWNpb25lcy5maWx0ZXIoKGNhdGVnb3JpYSkgPT4gKGNhdGVnb3JpYS5hcGxpY2FjaW9uZXMubGVuZ3RoID4gMCkpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhudWV2YXNBcGxpY2FjaW9uZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YUZpbHRlclN1YmplY3QubmV4dChudWV2YXNBcGxpY2FjaW9uZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50RmlsdGVyJDtcbiAgICB9XG5cbiAgICBleGlzdGUobm9tYnJlOiBzdHJpbmcsIGFycmF5OiBhbnkpIHtcbiAgICAgICAgY29uc3QgZmlsdHJvID0gYXJyYXkuZmlsdGVyKChkYXRhOiBhbnkpID0+IChub21icmUudG9Mb3dlckNhc2UoKSA9PT0gZGF0YS5Ob21icmUudG9Mb3dlckNhc2UoKSkpO1xuICAgICAgICByZXR1cm4gZmlsdHJvLmxlbmd0aCA+IDA7XG4gICAgfVxuXG59XG4iXX0=