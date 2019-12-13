/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { MenuAplicacionesService } from '../services/menuAplicaciones.service';
import { NotioasService } from '../services/notioas.service';
import { Router } from '@angular/router';
export class MenuAplicacionesComponent {
    /**
     * @param {?} menuService
     * @param {?} notioasService
     * @param {?} router
     */
    constructor(menuService, notioasService, router) {
        this.menuService = menuService;
        this.notioasService = notioasService;
        this.router = router;
        this.categorias = [];
        this.menuService.eventFilter$
            .subscribe((/**
         * @param {?} categorias
         * @return {?}
         */
        (categorias) => {
            this.categorias = categorias;
        }));
    }
    /**
     * @param {?} link
     * @return {?}
     */
    redirect(link) {
        /** @type {?} */
        const path_sub = window.location.origin;
        if (link.indexOf(path_sub) === -1) {
            window.open(link, '_blank');
        }
        else {
            this.router.navigate([link.substring(link.indexOf('#') + 1)]);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.menuService.activo$
            .subscribe((/**
         * @param {?} isActive
         * @return {?}
         */
        (isActive) => {
            const { activo } = isActive;
            this.activo = activo;
        }));
    }
}
MenuAplicacionesComponent.decorators = [
    { type: Component, args: [{
                selector: 'menu-aplicaciones',
                template: "<div id=\"menu\" [ngClass]=\"{'aplicaciones_menu_container': true, 'menu_is_active': activo }\">\n  <div class=\"container-aplicativos\">\n    <article *ngFor=\"let categoria of categorias\" class=\"card\">\n      <div class=\"title-app-menu-div\" [ngStyle]=\"{'background-color': categoria.color}\">\n        <h5 class=\"categoria-title\" >{{categoria.nombre}}</h5>\n      </div>\n      <div class=\"app-image-container\">\n        <div *ngFor=\"let aplicacion of categoria.aplicaciones\" class=\"image-application\" (click)=\"redirect(aplicacion.url)\">\n            <img class=\"menu-app\" [id]=\"aplicacion.estilo_logo\">\n        </div>\n      </div>\n    </article>\n  </div>\n</div>",
                styles: ["@import url(https://pruebasassets.portaloas.udistrital.edu.co/logo-stylus.css);.aplicaciones_menu_container p{margin-bottom:11px;margin-top:0}.title-notifications{text-align:center;font-family:\"Open Sans\",sans-serif;font-size:22px}.menu-app{border-radius:7px;border:1px solid;box-shadow:0 0 8px #888}#ENVIADA,#enviada,#noleida{background-color:rgba(43,54,67,.1)}.notification-item{display:flex;flex-direction:row;width:100%;cursor:pointer;align-items:center;justify-content:center}.notifications-image-container{width:25%}.notifications-text-container{width:68%;margin-left:5px}.notifications-text-container p{margin:0;font-family:\"Open Sans\",sans-serif;color:#000;white-space:normal;font-size:15px}.form-control{margin:0 23px;font-family:\"Open Sans\",sans-serif;width:86%}.title-app-menu-div{text-align:center;margin-bottom:5px;font-size:21px;font-family:\"Open Sans\",sans-serif}.aplicaciones_menu_container{background:#fff;border:1px solid #d6dae1;color:#000;box-shadow:1px 0 17px #888;position:fixed;top:77px;-webkit-border-radius:2px;right:-100vw;border-radius:2px;overflow-y:auto;overflow-x:hidden;height:560px;width:320px;transition:.3s;z-index:1}.menu_is_active{right:0}.app-image-container{display:flex;justify-content:space-evenly;flex-wrap:wrap;align-items:center}.image-application{width:30%;margin-bottom:10px;display:flex;flex-wrap:wrap;justify-content:center}.categoria-title{color:#fff}"]
            }] }
];
/** @nocollapse */
MenuAplicacionesComponent.ctorParameters = () => [
    { type: MenuAplicacionesService },
    { type: NotioasService },
    { type: Router }
];
if (false) {
    /** @type {?} */
    MenuAplicacionesComponent.prototype.activo;
    /** @type {?} */
    MenuAplicacionesComponent.prototype.categorias;
    /** @type {?} */
    MenuAplicacionesComponent.prototype.menuService;
    /** @type {?} */
    MenuAplicacionesComponent.prototype.notioasService;
    /**
     * @type {?}
     * @private
     */
    MenuAplicacionesComponent.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1hcGxpY2FjaW9uZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXRpbGlkYWRlcy1jb3JlLyIsInNvdXJjZXMiOlsibGliL21lbnUtYXBsaWNhY2lvbmVzL21lbnUtYXBsaWNhY2lvbmVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBT3pDLE1BQU0sT0FBTyx5QkFBeUI7Ozs7OztJQUdwQyxZQUFvQixXQUFvQyxFQUFTLGNBQThCLEVBQVUsTUFBYztRQUFuRyxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFBUyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRHZILGVBQVUsR0FBRyxFQUFFLENBQUE7UUFFYixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVk7YUFDNUIsU0FBUzs7OztRQUFDLENBQUMsVUFBZSxFQUFFLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDL0IsQ0FBQyxFQUFDLENBQUE7SUFDSixDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxJQUFJOztjQUNMLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU07UUFDdkMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzdCO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0Q7SUFDSCxDQUFDOzs7O0lBSUQsUUFBUTtRQUNOLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTzthQUN2QixTQUFTOzs7O1FBQUMsQ0FBQyxRQUFhLEVBQUUsRUFBRTtrQkFDckIsRUFBRSxNQUFNLEVBQUUsR0FBRyxRQUFRO1lBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBaENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3Qiw2ckJBQWlEOzthQUVsRDs7OztZQVJRLHVCQUF1QjtZQUN2QixjQUFjO1lBQ2QsTUFBTTs7OztJQVFiLDJDQUFZOztJQUNaLCtDQUFlOztJQUNGLGdEQUEyQzs7SUFBRSxtREFBcUM7Ozs7O0lBQUUsMkNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1lbnVBcGxpY2FjaW9uZXNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbWVudUFwbGljYWNpb25lcy5zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlvYXNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbm90aW9hcy5zZXJ2aWNlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21lbnUtYXBsaWNhY2lvbmVzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21lbnUtYXBsaWNhY2lvbmVzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWVudS1hcGxpY2FjaW9uZXMuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTWVudUFwbGljYWNpb25lc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGFjdGl2bzogYW55O1xuICBjYXRlZ29yaWFzID0gW11cbiAgY29uc3RydWN0b3IoIHB1YmxpYyBtZW51U2VydmljZTogTWVudUFwbGljYWNpb25lc1NlcnZpY2UsIHB1YmxpYyBub3Rpb2FzU2VydmljZTogTm90aW9hc1NlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICB0aGlzLm1lbnVTZXJ2aWNlLmV2ZW50RmlsdGVyJFxuICAgIC5zdWJzY3JpYmUoKGNhdGVnb3JpYXM6IGFueSkgPT4ge1xuICAgICAgdGhpcy5jYXRlZ29yaWFzID0gY2F0ZWdvcmlhcztcbiAgICB9KVxuICB9XG5cbiAgcmVkaXJlY3QobGluaykge1xuICAgIGNvbnN0IHBhdGhfc3ViID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbjtcbiAgICBpZiAobGluay5pbmRleE9mKHBhdGhfc3ViKSA9PT0gLTEpIHtcbiAgICAgIHdpbmRvdy5vcGVuKGxpbmssICdfYmxhbmsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW2xpbmsuc3Vic3RyaW5nKGxpbmsuaW5kZXhPZignIycpICsgMSldKTtcbiAgICB9XG4gIH1cblxuXG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5tZW51U2VydmljZS5hY3Rpdm8kXG4gICAgLnN1YnNjcmliZSgoaXNBY3RpdmU6IGFueSkgPT4ge1xuICAgICAgY29uc3QgeyBhY3Rpdm8gfSA9IGlzQWN0aXZlO1xuICAgICAgdGhpcy5hY3Rpdm8gPSBhY3Rpdm87XG4gICAgfSk7XG4gIH1cblxufVxuIl19