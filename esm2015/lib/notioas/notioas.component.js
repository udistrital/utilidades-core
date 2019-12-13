/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { NotioasService } from './../services/notioas.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
export class NotioasComponent {
    /**
     * @param {?} notificacionService
     * @param {?} router
     */
    constructor(notificacionService, router) {
        this.notificacionService = notificacionService;
        this.router = router;
        this.searchTerm$ = new Subject();
        this.activo = false;
        this.notificaciones = [];
        this.notificacionService.arrayMessages$
            .subscribe((/**
         * @param {?} notification
         * @return {?}
         */
        (notification) => {
            this.notificaciones = notification;
        }));
        this.searchTerm$
            .pipe(debounceTime(700), distinctUntilChanged(), switchMap((/**
         * @param {?} query
         * @return {?}
         */
        query => this.searchEntries(query)))).subscribe((/**
         * @param {?} response
         * @return {?}
         */
        response => {
            this.notificaciones = response;
        }));
        this.notificacionService.getNotificaciones();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.notificacionService.activo$
            .subscribe((/**
         * @param {?} isActive
         * @return {?}
         */
        (isActive) => {
            const { activo } = isActive;
            this.activo = activo;
        }));
    }
    /**
     * @param {?} term
     * @return {?}
     */
    searchEntries(term) {
        /** @type {?} */
        const array = [];
        array.push(this.notificacionService.listMessage.filter((/**
         * @param {?} notify
         * @return {?}
         */
        (notify) => notify.Content.Message.Message.indexOf(term) !== -1 || notify.User.indexOf(term) !== -1)));
        return array;
    }
    /**
     * @param {?} noti
     * @return {?}
     */
    redirect(noti) {
        this.notificacionService.changeStateToView(noti.Id, noti.Estado);
        console.info(noti);
        /** @type {?} */
        const path_sub = window.location.origin;
        if (noti.Content.Message.Link.indexOf(path_sub) === -1) {
            window.open(noti.Content.Message.Link, '_blank');
        }
        else {
            this.router.navigate([noti.Content.Message.Link.substring(noti.Content.Message.Link.indexOf('#') + 1)]);
        }
    }
}
NotioasComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-notioas',
                template: "<div id=\"menu\" [ngClass]=\"{'aplicaciones_menu_container': true, 'menu_is_active': activo }\">\n  <div class=\"title-notifications\">\n    <p>Notificaciones</p>\n  </div>\n  <div class=\"row\">\n      <div class=\"input-group\">\n        <input type=\"text\" class=\"form-control\" (keyup)=\"searchTerm$.next($event.target.value)\" placeholder=\"Search ...\">\n        <span class=\"input-group-append\">\n        </span>\n      </div>\n    </div>\n    <br>\n    <div class=\"notifications-container\">\n        <div *ngFor=\"let notificacion of notificaciones\" (click)=\"redirect(notificacion)\"\n        [id]=\"notificacion.Estado\" class=\"notification-item\">\n            <div class=\"notifications-image-container\">\n              <div class=\"menu-app\" [id]=\"notificacion.EstiloIcono\"></div>\n            </div>\n            <div class=\"notifications-text-container\" >\n              <p> {{notificacion.Alias}} </p>\n              <p>\n                {{notificacion.Content.Message.Message}}\n              </p>\n              <p>\n                {{notificacion.FechaCreacion | amLocale:'es' | amTimeAgo:true}}\n              </p>\n            </div>\n      </div>\n    </div>\n</div>",
                styles: ["@import url(https://pruebasassets.portaloas.udistrital.edu.co/logo-stylus.css);.aplicaciones_menu_container p{margin-bottom:11px;margin-top:0}.title-notifications{text-align:center;font-family:\"Open Sans\",sans-serif;font-size:22px}.menu-app{border-radius:7px;border:1px solid;-webkit-box-shadow:0 0 8px #888;box-shadow:0 0 8px #888}#ENVIADA,#enviada,#noleida{background-color:rgba(43,54,67,.1)}.notification-item{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;width:100%;cursor:pointer;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.notifications-image-container{width:25%}.notifications-text-container{width:68%;margin-left:5px}.notifications-text-container p{margin:0;font-family:\"Open Sans\",sans-serif;color:#000;white-space:normal;font-size:15px}.form-control{margin:0 23px;font-family:\"Open Sans\",sans-serif;width:86%}.aplicaciones_menu_container{background:#fff;border:1px solid rgba(0,0,0,.2);color:#000;-webkit-box-shadow:0 2px 10px rgba(48,90,208,.2);box-shadow:0 2px 10px rgba(0,0,0,.2);position:fixed;top:77px;-webkit-border-radius:2px;right:-100vw;border-radius:2px;overflow-y:auto;overflow-x:hidden;height:720px;width:320px;-webkit-transition:.3s;transition:.3s;padding-top:10px;z-index:1}.menu_is_active{right:0}"]
            }] }
];
/** @nocollapse */
NotioasComponent.ctorParameters = () => [
    { type: NotioasService },
    { type: Router }
];
if (false) {
    /** @type {?} */
    NotioasComponent.prototype.searchTerm$;
    /** @type {?} */
    NotioasComponent.prototype.notificaciones;
    /** @type {?} */
    NotioasComponent.prototype.activo;
    /** @type {?} */
    NotioasComponent.prototype.notificacionService;
    /**
     * @type {?}
     * @private
     */
    NotioasComponent.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aW9hcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly91dGlsaWRhZGVzLWNvcmUvIiwic291cmNlcyI6WyJsaWIvbm90aW9hcy9ub3Rpb2FzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9FLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQU96QyxNQUFNLE9BQU8sZ0JBQWdCOzs7OztJQVkzQixZQUFtQixtQkFBbUMsRUFBVSxNQUFjO1FBQTNELHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBSjlFLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUdwQyxXQUFNLEdBQVksS0FBSyxDQUFDO1FBRXRCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjO2FBQ3BDLFNBQVM7Ozs7UUFBQyxDQUFDLFlBQWlCLEVBQUUsRUFBRTtZQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQztRQUNyQyxDQUFDLEVBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxXQUFXO2FBQ2IsSUFBSSxDQUNILFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsb0JBQW9CLEVBQUUsRUFDdEIsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUM5QyxDQUFDLFNBQVM7Ozs7UUFBQyxRQUFRLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztRQUNqQyxDQUFDLEVBQUMsQ0FBQTtRQUNKLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQy9DLENBQUM7Ozs7SUExQkQsUUFBUTtRQUNOLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPO2FBQy9CLFNBQVM7Ozs7UUFBQyxDQUFDLFFBQWEsRUFBRSxFQUFFO2tCQUNyQixFQUFFLE1BQU0sRUFBRSxHQUFHLFFBQVE7WUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdkIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQXVCRCxhQUFhLENBQUMsSUFBSTs7Y0FDVixLQUFLLEdBQUcsRUFBRTtRQUNoQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsTUFBTTs7OztRQUNwRCxDQUFDLE1BQVcsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDN0csT0FBTyxLQUFLLENBQUE7SUFDZCxDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O2NBQ2IsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTTtRQUN2QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDdEQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDbEQ7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6RztJQUNILENBQUM7OztZQW5ERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLDhyQ0FBdUM7O2FBRXhDOzs7O1lBUlEsY0FBYztZQUVkLE1BQU07Ozs7SUFlYix1Q0FBb0M7O0lBRXBDLDBDQUFvQjs7SUFDcEIsa0NBQXdCOztJQUNaLCtDQUEwQzs7Ozs7SUFBRSxrQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTm90aW9hc1NlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL25vdGlvYXMuc2VydmljZSc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbm90aW9hcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9ub3Rpb2FzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbm90aW9hcy5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE5vdGlvYXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm5vdGlmaWNhY2lvblNlcnZpY2UuYWN0aXZvJFxuICAgIC5zdWJzY3JpYmUoKGlzQWN0aXZlOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IHsgYWN0aXZvIH0gPSBpc0FjdGl2ZTtcbiAgICAgIHRoaXMuYWN0aXZvID0gYWN0aXZvO1xuICAgIH0pO1xuICB9XG4gIHNlYXJjaFRlcm0kID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gIG5vdGlmaWNhY2lvbmVzOiBhbnk7XG4gIGFjdGl2bzogQm9vbGVhbiA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbm90aWZpY2FjaW9uU2VydmljZTogTm90aW9hc1NlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICB0aGlzLm5vdGlmaWNhY2lvbmVzID0gW107XG4gICAgdGhpcy5ub3RpZmljYWNpb25TZXJ2aWNlLmFycmF5TWVzc2FnZXMkXG4gICAgICAuc3Vic2NyaWJlKChub3RpZmljYXRpb246IGFueSkgPT4ge1xuICAgICAgICB0aGlzLm5vdGlmaWNhY2lvbmVzID0gbm90aWZpY2F0aW9uO1xuICAgICAgfSk7XG4gICAgdGhpcy5zZWFyY2hUZXJtJFxuICAgICAgLnBpcGUoXG4gICAgICAgIGRlYm91bmNlVGltZSg3MDApLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICBzd2l0Y2hNYXAocXVlcnkgPT4gdGhpcy5zZWFyY2hFbnRyaWVzKHF1ZXJ5KSksXG4gICAgICApLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG4gICAgICAgIHRoaXMubm90aWZpY2FjaW9uZXMgPSByZXNwb25zZTtcbiAgICAgIH0pXG4gICAgdGhpcy5ub3RpZmljYWNpb25TZXJ2aWNlLmdldE5vdGlmaWNhY2lvbmVzKCk7XG4gIH1cblxuXG4gIHNlYXJjaEVudHJpZXModGVybSkge1xuICAgIGNvbnN0IGFycmF5ID0gW11cbiAgICBhcnJheS5wdXNoKHRoaXMubm90aWZpY2FjaW9uU2VydmljZS5saXN0TWVzc2FnZS5maWx0ZXIoXG4gICAgICAobm90aWZ5OiBhbnkpID0+IG5vdGlmeS5Db250ZW50Lk1lc3NhZ2UuTWVzc2FnZS5pbmRleE9mKHRlcm0pICE9PSAtMSB8fCBub3RpZnkuVXNlci5pbmRleE9mKHRlcm0pICE9PSAtMSkpO1xuICAgIHJldHVybiBhcnJheVxuICB9XG5cbiAgcmVkaXJlY3Qobm90aSkge1xuICAgIHRoaXMubm90aWZpY2FjaW9uU2VydmljZS5jaGFuZ2VTdGF0ZVRvVmlldyhub3RpLklkLCBub3RpLkVzdGFkbyk7XG4gICAgY29uc29sZS5pbmZvKG5vdGkpO1xuICAgIGNvbnN0IHBhdGhfc3ViID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbjtcbiAgICBpZiAobm90aS5Db250ZW50Lk1lc3NhZ2UuTGluay5pbmRleE9mKHBhdGhfc3ViKSA9PT0gLTEpIHtcbiAgICAgIHdpbmRvdy5vcGVuKG5vdGkuQ29udGVudC5NZXNzYWdlLkxpbmssICdfYmxhbmsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW25vdGkuQ29udGVudC5NZXNzYWdlLkxpbmsuc3Vic3RyaW5nKG5vdGkuQ29udGVudC5NZXNzYWdlLkxpbmsuaW5kZXhPZignIycpICsgMSldKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==