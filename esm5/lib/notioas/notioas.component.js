/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { NotioasService } from './../services/notioas.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
var NotioasComponent = /** @class */ (function () {
    function NotioasComponent(notificacionService, router) {
        var _this = this;
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
        function (notification) {
            _this.notificaciones = notification;
        }));
        this.searchTerm$
            .pipe(debounceTime(700), distinctUntilChanged(), switchMap((/**
         * @param {?} query
         * @return {?}
         */
        function (query) { return _this.searchEntries(query); }))).subscribe((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            _this.notificaciones = response;
        }));
        this.notificacionService.getNotificaciones();
    }
    /**
     * @return {?}
     */
    NotioasComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.notificacionService.activo$
            .subscribe((/**
         * @param {?} isActive
         * @return {?}
         */
        function (isActive) {
            var activo = isActive.activo;
            _this.activo = activo;
        }));
    };
    /**
     * @param {?} term
     * @return {?}
     */
    NotioasComponent.prototype.searchEntries = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        /** @type {?} */
        var array = [];
        array.push(this.notificacionService.listMessage.filter((/**
         * @param {?} notify
         * @return {?}
         */
        function (notify) { return notify.Content.Message.Message.indexOf(term) !== -1 || notify.User.indexOf(term) !== -1; })));
        return array;
    };
    /**
     * @param {?} noti
     * @return {?}
     */
    NotioasComponent.prototype.redirect = /**
     * @param {?} noti
     * @return {?}
     */
    function (noti) {
        this.notificacionService.changeStateToView(noti.Id, noti.Estado);
        console.info(noti);
        /** @type {?} */
        var path_sub = window.location.origin;
        if (noti.Content.Message.Link.indexOf(path_sub) === -1) {
            window.open(noti.Content.Message.Link, '_blank');
        }
        else {
            this.router.navigate([noti.Content.Message.Link.substring(noti.Content.Message.Link.indexOf('#') + 1)]);
        }
    };
    NotioasComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-notioas',
                    template: "<div id=\"menu\" [ngClass]=\"{'aplicaciones_menu_container': true, 'menu_is_active': activo }\">\n  <div class=\"title-notifications\">\n    <p>Notificaciones</p>\n  </div>\n  <div class=\"row\">\n      <div class=\"input-group\">\n        <input type=\"text\" class=\"form-control\" (keyup)=\"searchTerm$.next($event.target.value)\" placeholder=\"Search ...\">\n        <span class=\"input-group-append\">\n        </span>\n      </div>\n    </div>\n    <br>\n    <div class=\"notifications-container\">\n        <div *ngFor=\"let notificacion of notificaciones\" (click)=\"redirect(notificacion)\"\n        [id]=\"notificacion.Estado\" class=\"notification-item\">\n            <div class=\"notifications-image-container\">\n              <div class=\"menu-app\" [id]=\"notificacion.EstiloIcono\"></div>\n            </div>\n            <div class=\"notifications-text-container\" >\n              <p> {{notificacion.Alias}} </p>\n              <p>\n                {{notificacion.Content.Message.Message}}\n              </p>\n              <p>\n                {{notificacion.FechaCreacion | amLocale:'es' | amTimeAgo:true}}\n              </p>\n            </div>\n      </div>\n    </div>\n</div>",
                    styles: ["@import url(https://pruebasassets.portaloas.udistrital.edu.co/logo-stylus.css);.aplicaciones_menu_container p{margin-bottom:11px;margin-top:0}.title-notifications{text-align:center;font-family:\"Open Sans\",sans-serif;font-size:22px}.menu-app{border-radius:7px;border:1px solid;box-shadow:0 0 8px #888}#ENVIADA,#enviada,#noleida{background-color:rgba(43,54,67,.1)}.notification-item{display:flex;flex-direction:row;width:100%;cursor:pointer;align-items:center;justify-content:center}.notifications-image-container{width:25%}.notifications-text-container{width:68%;margin-left:5px}.notifications-text-container p{margin:0;font-family:\"Open Sans\",sans-serif;color:#000;white-space:normal;font-size:15px}.form-control{margin:0 23px;font-family:\"Open Sans\",sans-serif;width:86%}.aplicaciones_menu_container{background:#fff;border:1px solid rgba(0,0,0,.2);color:#000;box-shadow:0 2px 10px rgba(0,0,0,.2);position:fixed;top:77px;-webkit-border-radius:2px;right:-100vw;border-radius:2px;overflow-y:auto;overflow-x:hidden;height:calc(-171px + 100vh);width:318px;transition:.3s;padding-top:10px;z-index:1}.menu_is_active{right:0}@media screen and (max-width:1159px){.aplicaciones_menu_container{height:calc(-175px + 100vh)}}@media screen and (max-width:1132px){.aplicaciones_menu_container{height:calc(-180px + 100vh)}}@media screen and (max-width:823px){.aplicaciones_menu_container{height:calc(-193px + 100vh)}}@media screen and (max-width:768px){.aplicaciones_menu_container{height:calc(-217px + 100vh)}}@media screen and (max-width:620px){.aplicaciones_menu_container{height:calc(-280px + 100vh)}}@media screen and (max-width:529px){.aplicaciones_menu_container{height:calc(-298px + 100vh)}}@media screen and (max-width:330px){.aplicaciones_menu_container{height:calc(-288px + 100vh)}}"]
                }] }
    ];
    /** @nocollapse */
    NotioasComponent.ctorParameters = function () { return [
        { type: NotioasService },
        { type: Router }
    ]; };
    return NotioasComponent;
}());
export { NotioasComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aW9hcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly91dGlsaWRhZGVzLWNvcmUvIiwic291cmNlcyI6WyJsaWIvbm90aW9hcy9ub3Rpb2FzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9FLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QztJQWlCRSwwQkFBbUIsbUJBQW1DLEVBQVUsTUFBYztRQUE5RSxpQkFlQztRQWZrQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQWdCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUo5RSxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFHcEMsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUV0QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYzthQUNwQyxTQUFTOzs7O1FBQUMsVUFBQyxZQUFpQjtZQUMzQixLQUFJLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQztRQUNyQyxDQUFDLEVBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxXQUFXO2FBQ2IsSUFBSSxDQUNILFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsb0JBQW9CLEVBQUUsRUFDdEIsU0FBUzs7OztRQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBekIsQ0FBeUIsRUFBQyxDQUM5QyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLFFBQVE7WUFDbEIsS0FBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7UUFDakMsQ0FBQyxFQUFDLENBQUE7UUFDSixJQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMvQyxDQUFDOzs7O0lBMUJELG1DQUFROzs7SUFBUjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU87YUFDL0IsU0FBUzs7OztRQUFDLFVBQUMsUUFBYTtZQUNmLElBQUEsd0JBQU07WUFDZCxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN2QixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBdUJELHdDQUFhOzs7O0lBQWIsVUFBYyxJQUFJOztZQUNWLEtBQUssR0FBRyxFQUFFO1FBQ2hCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxNQUFNOzs7O1FBQ3BELFVBQUMsTUFBVyxJQUFLLE9BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBdkYsQ0FBdUYsRUFBQyxDQUFDLENBQUM7UUFDN0csT0FBTyxLQUFLLENBQUE7SUFDZCxDQUFDOzs7OztJQUVELG1DQUFROzs7O0lBQVIsVUFBUyxJQUFJO1FBQ1gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O1lBQ2IsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTTtRQUN2QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDdEQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDbEQ7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6RztJQUNILENBQUM7O2dCQW5ERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLDhyQ0FBdUM7O2lCQUV4Qzs7OztnQkFSUSxjQUFjO2dCQUVkLE1BQU07O0lBc0RmLHVCQUFDO0NBQUEsQUFwREQsSUFvREM7U0EvQ1ksZ0JBQWdCOzs7SUFRM0IsdUNBQW9DOztJQUVwQywwQ0FBb0I7O0lBQ3BCLGtDQUF3Qjs7SUFDWiwrQ0FBMEM7Ozs7O0lBQUUsa0NBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5vdGlvYXNTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ub3Rpb2FzLnNlcnZpY2UnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW5vdGlvYXMnLFxuICB0ZW1wbGF0ZVVybDogJy4vbm90aW9hcy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25vdGlvYXMuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBOb3Rpb2FzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5ub3RpZmljYWNpb25TZXJ2aWNlLmFjdGl2byRcbiAgICAuc3Vic2NyaWJlKChpc0FjdGl2ZTogYW55KSA9PiB7XG4gICAgICBjb25zdCB7IGFjdGl2byB9ID0gaXNBY3RpdmU7XG4gICAgICB0aGlzLmFjdGl2byA9IGFjdGl2bztcbiAgICB9KTtcbiAgfVxuICBzZWFyY2hUZXJtJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuICBub3RpZmljYWNpb25lczogYW55O1xuICBhY3Rpdm86IEJvb2xlYW4gPSBmYWxzZTtcbiAgY29uc3RydWN0b3IocHVibGljIG5vdGlmaWNhY2lvblNlcnZpY2U6IE5vdGlvYXNTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgdGhpcy5ub3RpZmljYWNpb25lcyA9IFtdO1xuICAgIHRoaXMubm90aWZpY2FjaW9uU2VydmljZS5hcnJheU1lc3NhZ2VzJFxuICAgICAgLnN1YnNjcmliZSgobm90aWZpY2F0aW9uOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5ub3RpZmljYWNpb25lcyA9IG5vdGlmaWNhdGlvbjtcbiAgICAgIH0pO1xuICAgIHRoaXMuc2VhcmNoVGVybSRcbiAgICAgIC5waXBlKFxuICAgICAgICBkZWJvdW5jZVRpbWUoNzAwKSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgc3dpdGNoTWFwKHF1ZXJ5ID0+IHRoaXMuc2VhcmNoRW50cmllcyhxdWVyeSkpLFxuICAgICAgKS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgICB0aGlzLm5vdGlmaWNhY2lvbmVzID0gcmVzcG9uc2U7XG4gICAgICB9KVxuICAgIHRoaXMubm90aWZpY2FjaW9uU2VydmljZS5nZXROb3RpZmljYWNpb25lcygpO1xuICB9XG5cblxuICBzZWFyY2hFbnRyaWVzKHRlcm0pIHtcbiAgICBjb25zdCBhcnJheSA9IFtdXG4gICAgYXJyYXkucHVzaCh0aGlzLm5vdGlmaWNhY2lvblNlcnZpY2UubGlzdE1lc3NhZ2UuZmlsdGVyKFxuICAgICAgKG5vdGlmeTogYW55KSA9PiBub3RpZnkuQ29udGVudC5NZXNzYWdlLk1lc3NhZ2UuaW5kZXhPZih0ZXJtKSAhPT0gLTEgfHwgbm90aWZ5LlVzZXIuaW5kZXhPZih0ZXJtKSAhPT0gLTEpKTtcbiAgICByZXR1cm4gYXJyYXlcbiAgfVxuXG4gIHJlZGlyZWN0KG5vdGkpIHtcbiAgICB0aGlzLm5vdGlmaWNhY2lvblNlcnZpY2UuY2hhbmdlU3RhdGVUb1ZpZXcobm90aS5JZCwgbm90aS5Fc3RhZG8pO1xuICAgIGNvbnNvbGUuaW5mbyhub3RpKTtcbiAgICBjb25zdCBwYXRoX3N1YiA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW47XG4gICAgaWYgKG5vdGkuQ29udGVudC5NZXNzYWdlLkxpbmsuaW5kZXhPZihwYXRoX3N1YikgPT09IC0xKSB7XG4gICAgICB3aW5kb3cub3Blbihub3RpLkNvbnRlbnQuTWVzc2FnZS5MaW5rLCAnX2JsYW5rJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtub3RpLkNvbnRlbnQuTWVzc2FnZS5MaW5rLnN1YnN0cmluZyhub3RpLkNvbnRlbnQuTWVzc2FnZS5MaW5rLmluZGV4T2YoJyMnKSArIDEpXSk7XG4gICAgfVxuICB9XG59XG4iXX0=