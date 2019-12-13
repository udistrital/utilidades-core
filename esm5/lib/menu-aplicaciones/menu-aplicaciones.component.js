/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { MenuAplicacionesService } from '../services/menuAplicaciones.service';
import { NotioasService } from '../services/notioas.service';
import { Router } from '@angular/router';
var MenuAplicacionesComponent = /** @class */ (function () {
    function MenuAplicacionesComponent(menuService, notioasService, router) {
        this.menuService = menuService;
        this.notioasService = notioasService;
        this.router = router;
    }
    /**
     * @param {?} link
     * @return {?}
     */
    MenuAplicacionesComponent.prototype.redirect = /**
     * @param {?} link
     * @return {?}
     */
    function (link) {
        /** @type {?} */
        var path_sub = window.location.origin;
        if (link.indexOf(path_sub) === -1) {
            window.open(link, '_blank');
        }
        else {
            this.router.navigate([link.substring(link.indexOf('#') + 1)]);
        }
    };
    /**
     * @return {?}
     */
    MenuAplicacionesComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.menuService.activo$
            .subscribe((/**
         * @param {?} isActive
         * @return {?}
         */
        function (isActive) {
            var activo = isActive.activo;
            _this.activo = activo;
        }));
    };
    MenuAplicacionesComponent.decorators = [
        { type: Component, args: [{
                    selector: 'menu-aplicaciones',
                    template: "<div id=\"menu\" [ngClass]=\"{'aplicaciones_menu_container': true, 'menu_is_active': activo }\">\n  <div class=\"container-aplicativos\">\n    <article *ngFor=\"let categoria of menuService.eventFilter$ | async\" class=\"card\">\n      <div class=\"title-app-menu-div\" [ngStyle]=\"{'background-color': categoria.color}\">\n        <h5 class=\"categoria-title\" >{{categoria.nombre}}</h5>\n      </div>\n      <div class=\"app-image-container\">\n        <div *ngFor=\"let aplicacion of categoria.aplicaciones\" class=\"image-application\" (click)=\"redirect(aplicacion.url)\">\n            <img class=\"menu-app\" [id]=\"aplicacion.estilo_logo\">\n        </div>\n      </div>\n    </article>\n  </div>\n</div>",
                    styles: ["@import url(https://pruebasassets.portaloas.udistrital.edu.co/logo-stylus.css);.aplicaciones_menu_container p{margin-bottom:11px;margin-top:0}.title-notifications{text-align:center;font-family:\"Open Sans\",sans-serif;font-size:22px}.menu-app{border-radius:7px;border:1px solid;-webkit-box-shadow:0 0 8px #888;box-shadow:0 0 8px #888}#ENVIADA,#enviada,#noleida{background-color:rgba(43,54,67,.1)}.notification-item{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;width:100%;cursor:pointer;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.notifications-image-container{width:25%}.notifications-text-container{width:68%;margin-left:5px}.notifications-text-container p{margin:0;font-family:\"Open Sans\",sans-serif;color:#000;white-space:normal;font-size:15px}.form-control{margin:0 23px;font-family:\"Open Sans\",sans-serif;width:86%}.title-app-menu-div{text-align:center;margin-bottom:5px}.aplicaciones_menu_container{background:#fff;border:1px solid #d6dae1;color:#000;-webkit-box-shadow:1px 0 17px #888;box-shadow:1px 0 17px #888;position:fixed;top:77px;-webkit-border-radius:2px;right:-100vw;border-radius:2px;overflow-y:auto;overflow-x:hidden;height:560px;width:320px;-webkit-transition:.3s;transition:.3s;z-index:1}.menu_is_active{right:0}.app-image-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:space-evenly;-ms-flex-pack:space-evenly;justify-content:space-evenly;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.image-application{width:30%;margin-bottom:10px;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.categoria-title{color:#fff}"]
                }] }
    ];
    /** @nocollapse */
    MenuAplicacionesComponent.ctorParameters = function () { return [
        { type: MenuAplicacionesService },
        { type: NotioasService },
        { type: Router }
    ]; };
    return MenuAplicacionesComponent;
}());
export { MenuAplicacionesComponent };
if (false) {
    /** @type {?} */
    MenuAplicacionesComponent.prototype.activo;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1hcGxpY2FjaW9uZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXRpbGlkYWRlcy1jb3JlLyIsInNvdXJjZXMiOlsibGliL21lbnUtYXBsaWNhY2lvbmVzL21lbnUtYXBsaWNhY2lvbmVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpDO0lBT0UsbUNBQW9CLFdBQW9DLEVBQVMsY0FBOEIsRUFBVSxNQUFjO1FBQW5HLGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtRQUFTLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7SUFFdkgsQ0FBQzs7Ozs7SUFFRCw0Q0FBUTs7OztJQUFSLFVBQVMsSUFBSTs7WUFDTCxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNO1FBQ3ZDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM3QjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9EO0lBQ0gsQ0FBQzs7OztJQUlELDRDQUFROzs7SUFBUjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPO2FBQ3ZCLFNBQVM7Ozs7UUFBQyxVQUFDLFFBQWE7WUFDZixJQUFBLHdCQUFNO1lBQ2QsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdkIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOztnQkE1QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLG10QkFBaUQ7O2lCQUVsRDs7OztnQkFSUSx1QkFBdUI7Z0JBQ3ZCLGNBQWM7Z0JBQ2QsTUFBTTs7SUFnQ2YsZ0NBQUM7Q0FBQSxBQTlCRCxJQThCQztTQXpCWSx5QkFBeUI7OztJQUNwQywyQ0FBWTs7SUFDQyxnREFBMkM7O0lBQUUsbURBQXFDOzs7OztJQUFFLDJDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZW51QXBsaWNhY2lvbmVzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL21lbnVBcGxpY2FjaW9uZXMuc2VydmljZSc7XG5pbXBvcnQgeyBOb3Rpb2FzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25vdGlvYXMuc2VydmljZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZW51LWFwbGljYWNpb25lcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9tZW51LWFwbGljYWNpb25lcy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21lbnUtYXBsaWNhY2lvbmVzLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVBcGxpY2FjaW9uZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBhY3Rpdm86IGFueTtcbiAgY29uc3RydWN0b3IoIHB1YmxpYyBtZW51U2VydmljZTogTWVudUFwbGljYWNpb25lc1NlcnZpY2UsIHB1YmxpYyBub3Rpb2FzU2VydmljZTogTm90aW9hc1NlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcblxuICB9XG5cbiAgcmVkaXJlY3QobGluaykge1xuICAgIGNvbnN0IHBhdGhfc3ViID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbjtcbiAgICBpZiAobGluay5pbmRleE9mKHBhdGhfc3ViKSA9PT0gLTEpIHtcbiAgICAgIHdpbmRvdy5vcGVuKGxpbmssICdfYmxhbmsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW2xpbmsuc3Vic3RyaW5nKGxpbmsuaW5kZXhPZignIycpICsgMSldKTtcbiAgICB9XG4gIH1cblxuXG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5tZW51U2VydmljZS5hY3Rpdm8kXG4gICAgLnN1YnNjcmliZSgoaXNBY3RpdmU6IGFueSkgPT4ge1xuICAgICAgY29uc3QgeyBhY3Rpdm8gfSA9IGlzQWN0aXZlO1xuICAgICAgdGhpcy5hY3Rpdm8gPSBhY3Rpdm87XG4gICAgfSk7XG4gIH1cblxufVxuIl19