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
                template: "<div id=\"menu\" [ngClass]=\"{'aplicaciones_menu_container': true, 'menu_is_active': activo }\">\n  <div class=\"container-aplicativos\">\n    <article *ngFor=\"let categoria of menuService.eventFilter$ | async\" class=\"card\">\n      <div class=\"title-app-menu-div\" [ngStyle]=\"{'background-color': categoria.color}\">\n        <h5 class=\"categoria-title\" >{{categoria.nombre}}</h5>\n      </div>\n      <div class=\"app-image-container\">\n        <div *ngFor=\"let aplicacion of categoria.aplicaciones\" class=\"image-application\" (click)=\"redirect(aplicacion.url)\">\n            <img class=\"menu-app\" [id]=\"aplicacion.estilo_logo\">\n        </div>\n      </div>\n    </article>\n  </div>\n</div>",
                styles: ["@import url(https://pruebasassets.portaloas.udistrital.edu.co/logo-stylus.css);.aplicaciones_menu_container p{margin-bottom:11px;margin-top:0}.title-notifications{text-align:center;font-family:\"Open Sans\",sans-serif;font-size:22px}.menu-app{border-radius:7px;border:1px solid;-webkit-box-shadow:0 0 8px #888;box-shadow:0 0 8px #888}#ENVIADA,#enviada,#noleida{background-color:rgba(43,54,67,.1)}.notification-item{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;width:100%;cursor:pointer;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.notifications-image-container{width:25%}.notifications-text-container{width:68%;margin-left:5px}.notifications-text-container p{margin:0;font-family:\"Open Sans\",sans-serif;color:#000;white-space:normal;font-size:15px}.form-control{margin:0 23px;font-family:\"Open Sans\",sans-serif;width:86%}.title-app-menu-div{text-align:center;margin-bottom:5px}.aplicaciones_menu_container{background:#fff;border:1px solid #d6dae1;color:#000;-webkit-box-shadow:1px 0 17px #888;box-shadow:1px 0 17px #888;position:fixed;top:77px;-webkit-border-radius:2px;right:-100vw;border-radius:2px;overflow-y:auto;overflow-x:hidden;height:560px;width:320px;-webkit-transition:.3s;transition:.3s;z-index:1}.menu_is_active{right:0}.app-image-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:space-evenly;-ms-flex-pack:space-evenly;justify-content:space-evenly;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.image-application{width:30%;margin-bottom:10px;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.categoria-title{color:#fff}"]
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
    MenuAplicacionesComponent.prototype.menuService;
    /** @type {?} */
    MenuAplicacionesComponent.prototype.notioasService;
    /**
     * @type {?}
     * @private
     */
    MenuAplicacionesComponent.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1hcGxpY2FjaW9uZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXRpbGlkYWRlcy1jb3JlLyIsInNvdXJjZXMiOlsibGliL21lbnUtYXBsaWNhY2lvbmVzL21lbnUtYXBsaWNhY2lvbmVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBT3pDLE1BQU0sT0FBTyx5QkFBeUI7Ozs7OztJQUVwQyxZQUFvQixXQUFvQyxFQUFTLGNBQThCLEVBQVUsTUFBYztRQUFuRyxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFBUyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBRXZILENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLElBQUk7O2NBQ0wsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTTtRQUN2QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDN0I7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvRDtJQUNILENBQUM7Ozs7SUFJRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPO2FBQ3ZCLFNBQVM7Ozs7UUFBQyxDQUFDLFFBQWEsRUFBRSxFQUFFO2tCQUNyQixFQUFFLE1BQU0sRUFBRSxHQUFHLFFBQVE7WUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdkIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7WUE1QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLG10QkFBaUQ7O2FBRWxEOzs7O1lBUlEsdUJBQXVCO1lBQ3ZCLGNBQWM7WUFDZCxNQUFNOzs7O0lBUWIsMkNBQVk7O0lBQ0MsZ0RBQTJDOztJQUFFLG1EQUFxQzs7Ozs7SUFBRSwyQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVudUFwbGljYWNpb25lc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9tZW51QXBsaWNhY2lvbmVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aW9hc1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9ub3Rpb2FzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWVudS1hcGxpY2FjaW9uZXMnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWVudS1hcGxpY2FjaW9uZXMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tZW51LWFwbGljYWNpb25lcy5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBNZW51QXBsaWNhY2lvbmVzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgYWN0aXZvOiBhbnk7XG4gIGNvbnN0cnVjdG9yKCBwdWJsaWMgbWVudVNlcnZpY2U6IE1lbnVBcGxpY2FjaW9uZXNTZXJ2aWNlLCBwdWJsaWMgbm90aW9hc1NlcnZpY2U6IE5vdGlvYXNTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG5cbiAgfVxuXG4gIHJlZGlyZWN0KGxpbmspIHtcbiAgICBjb25zdCBwYXRoX3N1YiA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gICAgaWYgKGxpbmsuaW5kZXhPZihwYXRoX3N1YikgPT09IC0xKSB7XG4gICAgICB3aW5kb3cub3BlbihsaW5rLCAnX2JsYW5rJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtsaW5rLnN1YnN0cmluZyhsaW5rLmluZGV4T2YoJyMnKSArIDEpXSk7XG4gICAgfVxuICB9XG5cblxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMubWVudVNlcnZpY2UuYWN0aXZvJFxuICAgIC5zdWJzY3JpYmUoKGlzQWN0aXZlOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IHsgYWN0aXZvIH0gPSBpc0FjdGl2ZTtcbiAgICAgIHRoaXMuYWN0aXZvID0gYWN0aXZvO1xuICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==