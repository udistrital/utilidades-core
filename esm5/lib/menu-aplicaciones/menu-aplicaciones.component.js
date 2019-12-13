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
        var _this = this;
        this.menuService = menuService;
        this.notioasService = notioasService;
        this.router = router;
        this.categorias = [];
        this.menuService.eventFilter$
            .subscribe((/**
         * @param {?} categorias
         * @return {?}
         */
        function (categorias) {
            _this.categorias = categorias;
        }));
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
                    template: "<div id=\"menu\" [ngClass]=\"{'aplicaciones_menu_container': true, 'menu_is_active': activo }\">\n  <div class=\"container-aplicativos\">\n    <article *ngFor=\"let categoria of categorias\" class=\"card\">\n      <div class=\"title-app-menu-div\" [ngStyle]=\"{'background-color': categoria.color}\">\n        <h5 class=\"categoria-title\" >{{categoria.nombre}}</h5>\n      </div>\n      <div class=\"app-image-container\">\n        <div *ngFor=\"let aplicacion of categoria.aplicaciones\" class=\"image-application\" (click)=\"redirect(aplicacion.url)\">\n            <img class=\"menu-app\" [id]=\"aplicacion.estilo_logo\">\n        </div>\n      </div>\n    </article>\n  </div>\n</div>",
                    styles: ["@import url(https://pruebasassets.portaloas.udistrital.edu.co/logo-stylus.css);.aplicaciones_menu_container p{margin-bottom:11px;margin-top:0}.title-notifications{text-align:center;font-family:\"Open Sans\",sans-serif;font-size:22px}.menu-app{border-radius:7px;border:1px solid;box-shadow:0 0 8px #888}#ENVIADA,#enviada,#noleida{background-color:rgba(43,54,67,.1)}.notification-item{display:flex;flex-direction:row;width:100%;cursor:pointer;align-items:center;justify-content:center}.notifications-image-container{width:25%}.notifications-text-container{width:68%;margin-left:5px}.notifications-text-container p{margin:0;font-family:\"Open Sans\",sans-serif;color:#000;white-space:normal;font-size:15px}.form-control{margin:0 23px;font-family:\"Open Sans\",sans-serif;width:86%}.title-app-menu-div{text-align:center;margin-bottom:5px;font-size:21px;font-family:\"Open Sans\",sans-serif}.aplicaciones_menu_container{background:#fff;border:1px solid #d6dae1;color:#000;box-shadow:1px 0 17px #888;position:fixed;top:77px;-webkit-border-radius:2px;right:-100vw;border-radius:2px;overflow-y:auto;overflow-x:hidden;height:560px;width:320px;transition:.3s;z-index:1}.menu_is_active{right:0}.app-image-container{display:flex;justify-content:space-evenly;flex-wrap:wrap;align-items:center}.image-application{width:30%;margin-bottom:10px;display:flex;flex-wrap:wrap;justify-content:center}.categoria-title{color:#fff}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1hcGxpY2FjaW9uZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXRpbGlkYWRlcy1jb3JlLyIsInNvdXJjZXMiOlsibGliL21lbnUtYXBsaWNhY2lvbmVzL21lbnUtYXBsaWNhY2lvbmVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpDO0lBUUUsbUNBQW9CLFdBQW9DLEVBQVMsY0FBOEIsRUFBVSxNQUFjO1FBQXZILGlCQUtDO1FBTG1CLGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtRQUFTLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFEdkgsZUFBVSxHQUFHLEVBQUUsQ0FBQTtRQUViLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWTthQUM1QixTQUFTOzs7O1FBQUMsVUFBQyxVQUFlO1lBQ3pCLEtBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQy9CLENBQUMsRUFBQyxDQUFBO0lBQ0osQ0FBQzs7Ozs7SUFFRCw0Q0FBUTs7OztJQUFSLFVBQVMsSUFBSTs7WUFDTCxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNO1FBQ3ZDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM3QjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9EO0lBQ0gsQ0FBQzs7OztJQUlELDRDQUFROzs7SUFBUjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPO2FBQ3ZCLFNBQVM7Ozs7UUFBQyxVQUFDLFFBQWE7WUFDZixJQUFBLHdCQUFNO1lBQ2QsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdkIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOztnQkFoQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLDZyQkFBaUQ7O2lCQUVsRDs7OztnQkFSUSx1QkFBdUI7Z0JBQ3ZCLGNBQWM7Z0JBQ2QsTUFBTTs7SUFvQ2YsZ0NBQUM7Q0FBQSxBQWxDRCxJQWtDQztTQTdCWSx5QkFBeUI7OztJQUNwQywyQ0FBWTs7SUFDWiwrQ0FBZTs7SUFDRixnREFBMkM7O0lBQUUsbURBQXFDOzs7OztJQUFFLDJDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZW51QXBsaWNhY2lvbmVzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL21lbnVBcGxpY2FjaW9uZXMuc2VydmljZSc7XG5pbXBvcnQgeyBOb3Rpb2FzU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25vdGlvYXMuc2VydmljZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZW51LWFwbGljYWNpb25lcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9tZW51LWFwbGljYWNpb25lcy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21lbnUtYXBsaWNhY2lvbmVzLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVBcGxpY2FjaW9uZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBhY3Rpdm86IGFueTtcbiAgY2F0ZWdvcmlhcyA9IFtdXG4gIGNvbnN0cnVjdG9yKCBwdWJsaWMgbWVudVNlcnZpY2U6IE1lbnVBcGxpY2FjaW9uZXNTZXJ2aWNlLCBwdWJsaWMgbm90aW9hc1NlcnZpY2U6IE5vdGlvYXNTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgdGhpcy5tZW51U2VydmljZS5ldmVudEZpbHRlciRcbiAgICAuc3Vic2NyaWJlKChjYXRlZ29yaWFzOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuY2F0ZWdvcmlhcyA9IGNhdGVnb3JpYXM7XG4gICAgfSlcbiAgfVxuXG4gIHJlZGlyZWN0KGxpbmspIHtcbiAgICBjb25zdCBwYXRoX3N1YiA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gICAgaWYgKGxpbmsuaW5kZXhPZihwYXRoX3N1YikgPT09IC0xKSB7XG4gICAgICB3aW5kb3cub3BlbihsaW5rLCAnX2JsYW5rJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtsaW5rLnN1YnN0cmluZyhsaW5rLmluZGV4T2YoJyMnKSArIDEpXSk7XG4gICAgfVxuICB9XG5cblxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMubWVudVNlcnZpY2UuYWN0aXZvJFxuICAgIC5zdWJzY3JpYmUoKGlzQWN0aXZlOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IHsgYWN0aXZvIH0gPSBpc0FjdGl2ZTtcbiAgICAgIHRoaXMuYWN0aXZvID0gYWN0aXZvO1xuICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==