/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ConfiguracionService } from './services/configuracion.service';
import { NotioasService } from './services/notioas.service';
import { catalogo } from './catalogo';
import { MenuAplicacionesService } from './services/menuAplicaciones.service';
import * as i0 from "@angular/core";
import * as i1 from "./services/configuracion.service";
import * as i2 from "./services/notioas.service";
import * as i3 from "./services/menuAplicaciones.service";
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
    /** @nocollapse */ UtilidadesCoreService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function UtilidadesCoreService_Factory() { return new UtilidadesCoreService(i0.ɵɵinject(i1.ConfiguracionService), i0.ɵɵinject(i2.NotioasService), i0.ɵɵinject(i3.MenuAplicacionesService)); }, token: UtilidadesCoreService, providedIn: "root" });
    return UtilidadesCoreService;
}());
export { UtilidadesCoreService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGlkYWRlcy1jb3JlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly91dGlsaWRhZGVzLWNvcmUvIiwic291cmNlcyI6WyJsaWIvdXRpbGlkYWRlcy1jb3JlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUE7QUFDckMsT0FBTyxFQUFFLHVCQUF1QixFQUFDLE1BQU0scUNBQXFDLENBQUM7Ozs7O0FBRTdFO0lBS0UsK0JBQW9CLFdBQWlDLEVBQVUsY0FBOEIsRUFBVSxXQUFvQztRQUF2SCxnQkFBVyxHQUFYLFdBQVcsQ0FBc0I7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7SUFDM0ksQ0FBQzs7Ozs7SUFDRCx1Q0FBTzs7OztJQUFQLFVBQVEsRUFBa0Y7WUFBaEYsZ0RBQXFCLEVBQUUsOENBQW9CLEVBQUUsb0JBQU8sRUFBRSxrQ0FBYyxFQUFFLHNCQUFRO1FBQ3RGLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFaEQsSUFBSSxjQUFjLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUNoRDtRQUNELElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDOztnQkFoQkYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFQUSxvQkFBb0I7Z0JBQ3BCLGNBQWM7Z0JBRWQsdUJBQXVCOzs7Z0NBSmhDO0NBdUJDLEFBakJELElBaUJDO1NBZFkscUJBQXFCOzs7Ozs7SUFFcEIsNENBQXlDOzs7OztJQUFFLCtDQUFzQzs7Ozs7SUFBRSw0Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmFjaW9uU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY29uZmlndXJhY2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlvYXNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ub3Rpb2FzLnNlcnZpY2UnO1xuaW1wb3J0IHsgY2F0YWxvZ28gfSBmcm9tICcuL2NhdGFsb2dvJ1xuaW1wb3J0IHsgTWVudUFwbGljYWNpb25lc1NlcnZpY2V9IGZyb20gJy4vc2VydmljZXMvbWVudUFwbGljYWNpb25lcy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFV0aWxpZGFkZXNDb3JlU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25mU2VydmljZTogQ29uZmlndXJhY2lvblNlcnZpY2UsIHByaXZhdGUgbm90aW9hc1NlcnZpY2U6IE5vdGlvYXNTZXJ2aWNlLCBwcml2YXRlIG1lbnVTZXJ2aWNlOiBNZW51QXBsaWNhY2lvbmVzU2VydmljZSkge1xuICB9XG4gIGluaXRMaWIoeyBDT05GSUdVUkFDSU9OX1NFUlZJQ0UsIE5PVElGSUNBQ0lPTl9TRVJWSUNFLCBlbnRvcm5vLCBub3RpZmljYWNpb25lcywgbWVudUFwcHMgfSkge1xuICAgIHRoaXMuY29uZlNlcnZpY2Uuc2V0UGF0aChDT05GSUdVUkFDSU9OX1NFUlZJQ0UpO1xuXG4gICAgaWYgKG5vdGlmaWNhY2lvbmVzKSB7XG4gICAgICB0aGlzLm5vdGlvYXNTZXJ2aWNlLmluaXQoTk9USUZJQ0FDSU9OX1NFUlZJQ0UpO1xuICAgIH1cbiAgICBpZiAobWVudUFwcHMpIHtcbiAgICAgIHRoaXMubWVudVNlcnZpY2UuaW5pdChjYXRhbG9nb1tlbnRvcm5vXSk7XG4gICAgfVxuICB9XG59XG4iXX0=