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
export class UtilidadesCoreService {
    /**
     * @param {?} confService
     * @param {?} notioasService
     * @param {?} menuService
     */
    constructor(confService, notioasService, menuService) {
        this.confService = confService;
        this.notioasService = notioasService;
        this.menuService = menuService;
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    initLib({ CONFIGURACION_SERVICE, NOTIFICACION_SERVICE, entorno, notificaciones, menuApps }) {
        this.confService.setPath(CONFIGURACION_SERVICE);
        if (notificaciones) {
            this.notioasService.init(NOTIFICACION_SERVICE);
        }
        if (menuApps) {
            this.menuService.init(catalogo[entorno]);
        }
    }
}
UtilidadesCoreService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */
UtilidadesCoreService.ctorParameters = () => [
    { type: ConfiguracionService },
    { type: NotioasService },
    { type: MenuAplicacionesService }
];
/** @nocollapse */ UtilidadesCoreService.ngInjectableDef = i0.defineInjectable({ factory: function UtilidadesCoreService_Factory() { return new UtilidadesCoreService(i0.inject(i1.ConfiguracionService), i0.inject(i2.NotioasService), i0.inject(i3.MenuAplicacionesService)); }, token: UtilidadesCoreService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGlkYWRlcy1jb3JlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly91dGlsaWRhZGVzLWNvcmUvIiwic291cmNlcyI6WyJsaWIvdXRpbGlkYWRlcy1jb3JlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUE7QUFDckMsT0FBTyxFQUFFLHVCQUF1QixFQUFDLE1BQU0scUNBQXFDLENBQUM7Ozs7O0FBSzdFLE1BQU0sT0FBTyxxQkFBcUI7Ozs7OztJQUVoQyxZQUFvQixXQUFpQyxFQUFVLGNBQThCLEVBQVUsV0FBb0M7UUFBdkgsZ0JBQVcsR0FBWCxXQUFXLENBQXNCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO0lBQzNJLENBQUM7Ozs7O0lBQ0QsT0FBTyxDQUFDLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUU7UUFDeEYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUVoRCxJQUFJLGNBQWMsRUFBRTtZQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUMxQztJQUNILENBQUM7OztZQWhCRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFQUSxvQkFBb0I7WUFDcEIsY0FBYztZQUVkLHVCQUF1Qjs7Ozs7Ozs7SUFPbEIsNENBQXlDOzs7OztJQUFFLCtDQUFzQzs7Ozs7SUFBRSw0Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmFjaW9uU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY29uZmlndXJhY2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlvYXNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ub3Rpb2FzLnNlcnZpY2UnO1xuaW1wb3J0IHsgY2F0YWxvZ28gfSBmcm9tICcuL2NhdGFsb2dvJ1xuaW1wb3J0IHsgTWVudUFwbGljYWNpb25lc1NlcnZpY2V9IGZyb20gJy4vc2VydmljZXMvbWVudUFwbGljYWNpb25lcy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFV0aWxpZGFkZXNDb3JlU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25mU2VydmljZTogQ29uZmlndXJhY2lvblNlcnZpY2UsIHByaXZhdGUgbm90aW9hc1NlcnZpY2U6IE5vdGlvYXNTZXJ2aWNlLCBwcml2YXRlIG1lbnVTZXJ2aWNlOiBNZW51QXBsaWNhY2lvbmVzU2VydmljZSkge1xuICB9XG4gIGluaXRMaWIoeyBDT05GSUdVUkFDSU9OX1NFUlZJQ0UsIE5PVElGSUNBQ0lPTl9TRVJWSUNFLCBlbnRvcm5vLCBub3RpZmljYWNpb25lcywgbWVudUFwcHMgfSkge1xuICAgIHRoaXMuY29uZlNlcnZpY2Uuc2V0UGF0aChDT05GSUdVUkFDSU9OX1NFUlZJQ0UpO1xuXG4gICAgaWYgKG5vdGlmaWNhY2lvbmVzKSB7XG4gICAgICB0aGlzLm5vdGlvYXNTZXJ2aWNlLmluaXQoTk9USUZJQ0FDSU9OX1NFUlZJQ0UpO1xuICAgIH1cbiAgICBpZiAobWVudUFwcHMpIHtcbiAgICAgIHRoaXMubWVudVNlcnZpY2UuaW5pdChjYXRhbG9nb1tlbnRvcm5vXSk7XG4gICAgfVxuICB9XG59XG4iXX0=