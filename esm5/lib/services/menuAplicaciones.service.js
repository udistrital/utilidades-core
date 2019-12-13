/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';
import { BehaviorSubject, fromEvent } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./configuracion.service";
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
                if (((data.path.map((/**
                 * @param {?} info
                 * @return {?}
                 */
                function (info) { return (info.localName); }))).filter((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return (data === 'menu-aplicaciones'); }))).length === 0) {
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
        /** @type {?} */
        var data = [];
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
        /** @type {?} */
        var id_token = localStorage.getItem('id_token');
        /** @type {?} */
        var access_token = localStorage.getItem('access_token');
        if (id_token !== null && access_token !== null) {
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
                        return tslib_1.__assign({}, app, { estilo_logo: app.estilo.split('-')[0] });
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
        }
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
    /** @nocollapse */ MenuAplicacionesService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function MenuAplicacionesService_Factory() { return new MenuAplicacionesService(i0.ɵɵinject(i1.ConfiguracionService)); }, token: MenuAplicacionesService, providedIn: "root" });
    return MenuAplicacionesService;
}());
export { MenuAplicacionesService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudUFwbGljYWNpb25lcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXRpbGlkYWRlcy1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL21lbnVBcGxpY2FjaW9uZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0QsT0FBTyxFQUFHLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUduRDtJQWVJLGlDQUFvQixvQkFBMEM7UUFBOUQsaUJBV0M7UUFYbUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQVh0RCxzQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QyxpQkFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwRCxXQUFNLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsWUFBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7UUFHNUMsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVULGVBQVUsR0FBWSxLQUFLLENBQUM7UUFHL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7O1lBQ3RCLEdBQUcsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQztRQUUxQyxHQUFHLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsSUFBUztZQUNwQixJQUFJLEtBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2IsSUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O2dCQUFDLFVBQUMsSUFBUyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUEs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QW9EOztJQUNwRCwrQ0FBNEQ7Ozs7O0lBRTVELHlDQUF5Qzs7SUFDekMsMENBQTRDOztJQUU1Qyw2Q0FBZ0I7O0lBQ2hCLDBDQUFnQjs7SUFDaEIsd0NBQVc7O0lBQ1gsNkNBQW1DOzs7OztJQUV2Qix1REFBa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmFjaW9uU2VydmljZSB9IGZyb20gJy4vY29uZmlndXJhY2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7ICBCZWhhdmlvclN1YmplY3QsIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVBcGxpY2FjaW9uZXNTZXJ2aWNlIHtcbiAgICBwcml2YXRlIGRhdGFGaWx0ZXJTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG4gICAgcHVibGljIGV2ZW50RmlsdGVyJCA9IHRoaXMuZGF0YUZpbHRlclN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBwcml2YXRlIGFjdGl2byA9IG5ldyBCZWhhdmlvclN1YmplY3Qoe30pO1xuICAgIHB1YmxpYyBhY3Rpdm8kID0gdGhpcy5hY3Rpdm8uYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBjYXRlZ29yaWFzOiBhbnk7XG4gICAgaXNMb2dpbiA9IGZhbHNlO1xuICAgIHJvbGVzOiBhbnk7XG4gICAgcHVibGljIG1lbnVBY3Rpdm86IEJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlndXJhY2lvblNlcnZpY2U6IENvbmZpZ3VyYWNpb25TZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMucm9sZXMgPSB0aGlzLmdldFJvbGUoKTtcbiAgICAgICAgY29uc3QgdXAkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2V1cCcpO1xuXG4gICAgICAgIHVwJC5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZvKSB7XG4gICAgICAgICAgICAgICAgaWYoKChkYXRhLnBhdGgubWFwKChpbmZvOiBhbnkpPT57cmV0dXJuIChpbmZvLmxvY2FsTmFtZSl9KSkuZmlsdGVyKChkYXRhOiBhbnkgKT0+KGRhdGEgPT09ICdtZW51LWFwbGljYWNpb25lcycpKSkubGVuZ3RoID09PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgICAgIFxuICAgIGNsb3NlUGFuZWwoKSB7XG4gICAgICAgIHRoaXMubWVudUFjdGl2byA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFjdGl2by5uZXh0KHsgYWN0aXZvOiB0aGlzLm1lbnVBY3Rpdm8gfSk7XG4gICAgfVxuXG4gICAgZ2V0Um9sZSgpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IFtdO1xuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZF90b2tlbicpICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlzTG9naW4gPSB0cnVlO1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB2YXJpYWJsZS1uYW1lXG4gICAgICAgICAgICBjb25zdCBpZF90b2tlbiA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWRfdG9rZW4nKS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IEpTT04ucGFyc2UoYXRvYihpZF90b2tlblsxXSkpO1xuICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQucm9sZS5tYXAoKGVsZW1lbnQpID0+ICh7IE5vbWJyZTogZWxlbWVudCB9KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzTG9naW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZGF0YUZpbHRlclN1YmplY3QubmV4dCh0aGlzLmNhdGVnb3JpYXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRvb2dsZU1lbnVOb3RpZnkoKSB7XG4gICAgICAgIHRoaXMubWVudUFjdGl2byA9ICF0aGlzLm1lbnVBY3Rpdm87XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7IGFjdGl2bzogdGhpcy5tZW51QWN0aXZvIH1cbiAgICAgICAgdGhpcy5hY3Rpdm8ubmV4dChkYXRhKTtcbiAgICB9XG5cbiAgICBpbml0KGNhdGVnb3JpYXM6IGFueSkge1xuICAgICAgICBjb25zb2xlLmluZm8oJy4uLkluaXQgbGliIG1lbnUnKTtcbiAgICAgICAgdGhpcy5jYXRlZ29yaWFzID0gY2F0ZWdvcmlhcztcbiAgICAgICAgdGhpcy5kYXRhRmlsdGVyU3ViamVjdC5uZXh0KHRoaXMuY2F0ZWdvcmlhcyk7XG4gICAgICAgIHRoaXMuZ2V0QXBsaWNhdGlvbigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBcGxpY2F0aW9uKCk6IGFueSB7XG4gICAgICAgIGNvbnN0IGlkX3Rva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJyk7XG4gICAgICAgIGNvbnN0IGFjY2Vzc190b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NfdG9rZW4nKTtcbiAgICAgICAgaWYgKGlkX3Rva2VuICE9PSBudWxsICYmIGFjY2Vzc190b2tlbiAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYWNpb25TZXJ2aWNlLnBvc3QoJ2FwbGljYWNpb25fcm9sL2FwbGljYWNpb25fcm9sJywgdGhpcy5yb2xlcylcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBudWV2YXNBcGxpY2FjaW9uZXMgPSB0aGlzLmNhdGVnb3JpYXMubWFwKChjYXRlZ29yaWE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yaWEuYXBsaWNhY2lvbmVzID0gY2F0ZWdvcmlhLmFwbGljYWNpb25lcy5maWx0ZXIoKGFwbGljYWNpb246IGFueSkgPT4gKHRoaXMuZXhpc3RlKGFwbGljYWNpb24ubm9tYnJlLCBkYXRhKSkpO1xuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yaWEuYXBsaWNhY2lvbmVzID0gY2F0ZWdvcmlhLmFwbGljYWNpb25lcy5tYXAoKGFwcDogYW55KSA9PiB7cmV0dXJuIHsuLi5hcHAsIC4uLntlc3RpbG9fbG9nbzogYXBwLmVzdGlsby5zcGxpdCgnLScpWzBdfX1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXRlZ29yaWE7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbnVldmFzQXBsaWNhY2lvbmVzID0gbnVldmFzQXBsaWNhY2lvbmVzLmZpbHRlcigoY2F0ZWdvcmlhKSA9PiAoY2F0ZWdvcmlhLmFwbGljYWNpb25lcy5sZW5ndGggPiAwKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKG51ZXZhc0FwbGljYWNpb25lcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhRmlsdGVyU3ViamVjdC5uZXh0KG51ZXZhc0FwbGljYWNpb25lcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRGaWx0ZXIkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhpc3RlKG5vbWJyZTogc3RyaW5nLCBhcnJheTogYW55KSB7XG4gICAgICAgIGNvbnN0IGZpbHRybyA9IGFycmF5LmZpbHRlcigoZGF0YTogYW55KSA9PiAobm9tYnJlLnRvTG93ZXJDYXNlKCkgPT09IGRhdGEuTm9tYnJlLnRvTG93ZXJDYXNlKCkpKTtcbiAgICAgICAgcmV0dXJuIGZpbHRyby5sZW5ndGggPiAwO1xuICAgIH1cblxufVxuIl19