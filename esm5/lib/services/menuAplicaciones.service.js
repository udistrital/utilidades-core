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
    /** @nocollapse */ MenuAplicacionesService.ngInjectableDef = i0.defineInjectable({ factory: function MenuAplicacionesService_Factory() { return new MenuAplicacionesService(i0.inject(i1.ConfiguracionService)); }, token: MenuAplicacionesService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudUFwbGljYWNpb25lcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXRpbGlkYWRlcy1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL21lbnVBcGxpY2FjaW9uZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0QsT0FBTyxFQUFHLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUduRDtJQWVJLGlDQUFvQixvQkFBMEM7UUFBOUQsaUJBV0M7UUFYbUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQVh0RCxzQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QyxpQkFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwRCxXQUFNLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsWUFBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7UUFHNUMsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVULGVBQVUsR0FBWSxLQUFLLENBQUM7UUFHL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7O1lBQ3RCLEdBQUcsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQztRQUUxQyxHQUFHLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsSUFBUztZQUNwQixJQUFJLEtBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBRSxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFF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RUFBQyxDQUFDO2dCQUNDLE9BQU8sU0FBUyxDQUFDO1lBQ3JCLENBQUMsRUFBQztZQUNGLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDLE1BQU07Ozs7WUFBQyxVQUFDLFNBQVMsSUFBSyxPQUFBLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQW5DLENBQW1DLEVBQUMsQ0FBQztZQUNuRyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDakMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3BELENBQUMsRUFBQyxDQUFDO1FBQ1AsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7Ozs7OztJQUVELHdDQUFNOzs7OztJQUFOLFVBQU8sTUFBYyxFQUFFLEtBQVU7O1lBQ3ZCLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTTs7OztRQUFDLFVBQUMsSUFBUyxJQUFLLE9BQUEsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFwRCxDQUFvRCxFQUFDO1FBQ2hHLE9BQU8sTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7Z0JBbEZKLFVBQVUsU0FBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckI7Ozs7Z0JBTlEsb0JBQW9COzs7a0NBRDdCO0NBeUZDLEFBcEZELElBb0ZDO1NBakZZLHVCQUF1Qjs7Ozs7O0lBQ2hDLG9EQUFvRDs7SUFDcEQsK0NBQTREOzs7OztJQUU1RCx5Q0FBeUM7O0lBQ3pDLDBDQUE0Qzs7SUFFNUMsNkNBQWdCOztJQUNoQiwwQ0FBZ0I7O0lBQ2hCLHdDQUFXOztJQUNYLDZDQUFtQzs7Ozs7SUFFdkIsdURBQWtEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlndXJhY2lvblNlcnZpY2UgfSBmcm9tICcuL2NvbmZpZ3VyYWNpb24uc2VydmljZSc7XG5pbXBvcnQgeyAgQmVoYXZpb3JTdWJqZWN0LCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBNZW51QXBsaWNhY2lvbmVzU2VydmljZSB7XG4gICAgcHJpdmF0ZSBkYXRhRmlsdGVyU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuICAgIHB1YmxpYyBldmVudEZpbHRlciQgPSB0aGlzLmRhdGFGaWx0ZXJTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgcHJpdmF0ZSBhY3Rpdm8gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KTtcbiAgICBwdWJsaWMgYWN0aXZvJCA9IHRoaXMuYWN0aXZvLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgY2F0ZWdvcmlhczogYW55O1xuICAgIGlzTG9naW4gPSBmYWxzZTtcbiAgICByb2xlczogYW55O1xuICAgIHB1YmxpYyBtZW51QWN0aXZvOiBCb29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZ3VyYWNpb25TZXJ2aWNlOiBDb25maWd1cmFjaW9uU2VydmljZSkge1xuICAgICAgICB0aGlzLnJvbGVzID0gdGhpcy5nZXRSb2xlKCk7XG4gICAgICAgIGNvbnN0IHVwJCA9IGZyb21FdmVudChkb2N1bWVudCwgJ21vdXNldXAnKTtcblxuICAgICAgICB1cCQuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2bykge1xuICAgICAgICAgICAgICAgIGlmICghKCh3aW5kb3cuaW5uZXJXaWR0aCAtIDMyMCApIDwgZGF0YS5wYWdlWCAmJiBkYXRhLnBhZ2VZID4gNzcgJiYgZGF0YS5wYWdlWSA8IDU3OCApKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgICAgICBcbiAgICBjbG9zZVBhbmVsKCkge1xuICAgICAgICB0aGlzLm1lbnVBY3Rpdm8gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hY3Rpdm8ubmV4dCh7IGFjdGl2bzogdGhpcy5tZW51QWN0aXZvIH0pO1xuICAgIH1cblxuICAgIGdldFJvbGUoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBbXTtcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWRfdG9rZW4nKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pc0xvZ2luID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdmFyaWFibGUtbmFtZVxuICAgICAgICAgICAgY29uc3QgaWRfdG9rZW4gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJykuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSBKU09OLnBhcnNlKGF0b2IoaWRfdG9rZW5bMV0pKTtcbiAgICAgICAgICAgIHJldHVybiBwYXlsb2FkLnJvbGUubWFwKChlbGVtZW50KSA9PiAoeyBOb21icmU6IGVsZW1lbnQgfSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc0xvZ2luID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRhdGFGaWx0ZXJTdWJqZWN0Lm5leHQodGhpcy5jYXRlZ29yaWFzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b29nbGVNZW51Tm90aWZ5KCkge1xuICAgICAgICB0aGlzLm1lbnVBY3Rpdm8gPSAhdGhpcy5tZW51QWN0aXZvO1xuICAgICAgICBjb25zdCBkYXRhID0geyBhY3Rpdm86IHRoaXMubWVudUFjdGl2byB9XG4gICAgICAgIHRoaXMuYWN0aXZvLm5leHQoZGF0YSk7XG4gICAgfVxuXG4gICAgaW5pdChjYXRlZ29yaWFzOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5pbmZvKCcuLi5Jbml0IGxpYiBtZW51Jyk7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhjYXRlZ29yaWFzKTtcblxuICAgICAgICB0aGlzLmNhdGVnb3JpYXMgPSBjYXRlZ29yaWFzO1xuICAgICAgICB0aGlzLmRhdGFGaWx0ZXJTdWJqZWN0Lm5leHQodGhpcy5jYXRlZ29yaWFzKTtcbiAgICAgICAgdGhpcy5nZXRBcGxpY2F0aW9uKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEFwbGljYXRpb24oKTogYW55IHtcblxuICAgICAgICB0aGlzLmNvbmZpZ3VyYWNpb25TZXJ2aWNlLnBvc3QoJ2FwbGljYWNpb25fcm9sL2FwbGljYWNpb25fcm9sJywgdGhpcy5yb2xlcylcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBudWV2YXNBcGxpY2FjaW9uZXMgPSB0aGlzLmNhdGVnb3JpYXMubWFwKChjYXRlZ29yaWE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yaWEuYXBsaWNhY2lvbmVzID0gY2F0ZWdvcmlhLmFwbGljYWNpb25lcy5maWx0ZXIoKGFwbGljYWNpb246IGFueSkgPT4gKHRoaXMuZXhpc3RlKGFwbGljYWNpb24ubm9tYnJlLCBkYXRhKSkpO1xuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yaWEuYXBsaWNhY2lvbmVzID0gY2F0ZWdvcmlhLmFwbGljYWNpb25lcy5tYXAoKGFwcDogYW55KSA9PiB7cmV0dXJuIHsuLi5hcHAsIC4uLntlc3RpbG9fbG9nbzogYXBwLmVzdGlsby5zcGxpdCgnLScpWzBdfX1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXRlZ29yaWE7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbnVldmFzQXBsaWNhY2lvbmVzID0gbnVldmFzQXBsaWNhY2lvbmVzLmZpbHRlcigoY2F0ZWdvcmlhKSA9PiAoY2F0ZWdvcmlhLmFwbGljYWNpb25lcy5sZW5ndGggPiAwKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKG51ZXZhc0FwbGljYWNpb25lcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhRmlsdGVyU3ViamVjdC5uZXh0KG51ZXZhc0FwbGljYWNpb25lcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRGaWx0ZXIkO1xuICAgIH1cblxuICAgIGV4aXN0ZShub21icmU6IHN0cmluZywgYXJyYXk6IGFueSkge1xuICAgICAgICBjb25zdCBmaWx0cm8gPSBhcnJheS5maWx0ZXIoKGRhdGE6IGFueSkgPT4gKG5vbWJyZS50b0xvd2VyQ2FzZSgpID09PSBkYXRhLk5vbWJyZS50b0xvd2VyQ2FzZSgpKSk7XG4gICAgICAgIHJldHVybiBmaWx0cm8ubGVuZ3RoID4gMDtcbiAgICB9XG5cbn1cbiJdfQ==