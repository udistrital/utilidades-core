/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var ConfiguracionService = /** @class */ (function () {
    function ConfiguracionService(http) {
        this.http = http;
        this.httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('access_token'),
            }),
        };
    }
    /**
     * @param {?} path
     * @return {?}
     */
    ConfiguracionService.prototype.setPath = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        this.path = path;
    };
    /**
     * @param {?} endpoint
     * @return {?}
     */
    ConfiguracionService.prototype.get = /**
     * @param {?} endpoint
     * @return {?}
     */
    function (endpoint) {
        return this.http.get("" + this.path + endpoint, this.httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.hasOwnProperty('Body')) {
                return res['Body'];
            }
            else {
                return res;
            }
        })));
    };
    /**
     * Perform a POST http request
     * @param endpoint service's end-point
     * @param element data to send as JSON
     * @returns Observable<any>
     */
    /**
     * Perform a POST http request
     * @param {?} endpoint service's end-point
     * @param {?} element data to send as JSON
     * @return {?} Observable<any>
     */
    ConfiguracionService.prototype.post = /**
     * Perform a POST http request
     * @param {?} endpoint service's end-point
     * @param {?} element data to send as JSON
     * @return {?} Observable<any>
     */
    function (endpoint, element) {
        return this.http.post("" + this.path + endpoint, element, this.httpOptions);
    };
    /**
     * Perform a PUT http request
     * @param endpoint service's end-point
     * @param element data to send as JSON, With the id to UPDATE
     * @returns Observable<any>
     */
    /**
     * Perform a PUT http request
     * @param {?} endpoint service's end-point
     * @param {?} element data to send as JSON, With the id to UPDATE
     * @return {?} Observable<any>
     */
    ConfiguracionService.prototype.put = /**
     * Perform a PUT http request
     * @param {?} endpoint service's end-point
     * @param {?} element data to send as JSON, With the id to UPDATE
     * @return {?} Observable<any>
     */
    function (endpoint, element) {
        return this.http.put("" + this.path + endpoint + "/" + element.Id, element, this.httpOptions);
    };
    /**
     * Perform a DELETE http request
     * @param endpoint service's end-point
     * @param id element's id for remove
     * @returns Observable<any>
     */
    /**
     * Perform a DELETE http request
     * @param {?} endpoint service's end-point
     * @param {?} id element's id for remove
     * @return {?} Observable<any>
     */
    ConfiguracionService.prototype.delete = /**
     * Perform a DELETE http request
     * @param {?} endpoint service's end-point
     * @param {?} id element's id for remove
     * @return {?} Observable<any>
     */
    function (endpoint, id) {
        return this.http.delete("" + this.path + endpoint + "/" + id, this.httpOptions);
    };
    ConfiguracionService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    /** @nocollapse */
    ConfiguracionService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    /** @nocollapse */ ConfiguracionService.ngInjectableDef = i0.defineInjectable({ factory: function ConfiguracionService_Factory() { return new ConfiguracionService(i0.inject(i1.HttpClient)); }, token: ConfiguracionService, providedIn: "root" });
    return ConfiguracionService;
}());
export { ConfiguracionService };
if (false) {
    /** @type {?} */
    ConfiguracionService.prototype.httpOptions;
    /** @type {?} */
    ConfiguracionService.prototype.path;
    /**
     * @type {?}
     * @private
     */
    ConfiguracionService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhY2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXRpbGlkYWRlcy1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NvbmZpZ3VyYWNpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBR3JDO0lBT0UsOEJBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRztZQUNqQixPQUFPLEVBQUUsSUFBSSxXQUFXLENBQUM7Z0JBQ3ZCLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLGVBQWUsRUFBRSxZQUFVLFlBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFHO2FBQ2xFLENBQUM7U0FDSCxDQUFBO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxzQ0FBTzs7OztJQUFQLFVBQVEsSUFBSTtRQUNWLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBRUQsa0NBQUc7Ozs7SUFBSCxVQUFJLFFBQVE7UUFFVixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFNLEtBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDekUsR0FBRzs7OztRQUNELFVBQUMsR0FBRztZQUNGLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDOUIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDcEI7aUJBQU07Z0JBQ0wsT0FBTyxHQUFHLENBQUM7YUFDWjtRQUNILENBQUMsRUFDRixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7SUFDSCxtQ0FBSTs7Ozs7O0lBQUosVUFBSyxRQUFRLEVBQUUsT0FBTztRQUNwQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFNLEtBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFVLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7SUFDSCxrQ0FBRzs7Ozs7O0lBQUgsVUFBSSxRQUFRLEVBQUUsT0FBTztRQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFNLEtBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLFNBQUksT0FBTyxDQUFDLEVBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7OztJQUNILHFDQUFNOzs7Ozs7SUFBTixVQUFPLFFBQVEsRUFBRSxFQUFFO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQU0sS0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsU0FBSSxFQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7O2dCQTlERixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQU5RLFVBQVU7OzsrQkFEbkI7Q0FvRUMsQUEvREQsSUErREM7U0E1RFksb0JBQW9COzs7SUFDL0IsMkNBQXVDOztJQUN2QyxvQ0FBVTs7Ozs7SUFFRSxvQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhY2lvblNlcnZpY2Uge1xuICBodHRwT3B0aW9uczogeyBoZWFkZXJzOiBIdHRwSGVhZGVyczsgfTtcbiAgcGF0aDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgIHRoaXMuaHR0cE9wdGlvbnMgPSB7XG4gICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzX3Rva2VuJyl9YCxcbiAgICAgIH0pLFxuICAgIH1cbiAgfVxuXG4gIHNldFBhdGgocGF0aCkge1xuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gIH1cblxuICBnZXQoZW5kcG9pbnQpIHtcblxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5wYXRofSR7ZW5kcG9pbnR9YCwgdGhpcy5odHRwT3B0aW9ucykucGlwZShcbiAgICAgIG1hcChcbiAgICAgICAgKHJlcykgPT4ge1xuICAgICAgICAgIGlmIChyZXMuaGFzT3duUHJvcGVydHkoJ0JvZHknKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc1snQm9keSddO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYSBQT1NUIGh0dHAgcmVxdWVzdFxuICAgKiBAcGFyYW0gZW5kcG9pbnQgc2VydmljZSdzIGVuZC1wb2ludFxuICAgKiBAcGFyYW0gZWxlbWVudCBkYXRhIHRvIHNlbmQgYXMgSlNPTlxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPGFueT5cbiAgICovXG4gIHBvc3QoZW5kcG9pbnQsIGVsZW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8YW55PihgJHt0aGlzLnBhdGh9JHtlbmRwb2ludH1gLCBlbGVtZW50LCB0aGlzLmh0dHBPcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtIGEgUFVUIGh0dHAgcmVxdWVzdFxuICAgKiBAcGFyYW0gZW5kcG9pbnQgc2VydmljZSdzIGVuZC1wb2ludFxuICAgKiBAcGFyYW0gZWxlbWVudCBkYXRhIHRvIHNlbmQgYXMgSlNPTiwgV2l0aCB0aGUgaWQgdG8gVVBEQVRFXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGU8YW55PlxuICAgKi9cbiAgcHV0KGVuZHBvaW50LCBlbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQ8YW55PihgJHt0aGlzLnBhdGh9JHtlbmRwb2ludH0vJHtlbGVtZW50LklkfWAsIGVsZW1lbnQsIHRoaXMuaHR0cE9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYSBERUxFVEUgaHR0cCByZXF1ZXN0XG4gICAqIEBwYXJhbSBlbmRwb2ludCBzZXJ2aWNlJ3MgZW5kLXBvaW50XG4gICAqIEBwYXJhbSBpZCBlbGVtZW50J3MgaWQgZm9yIHJlbW92ZVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPGFueT5cbiAgICovXG4gIGRlbGV0ZShlbmRwb2ludCwgaWQpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZTxhbnk+KGAke3RoaXMucGF0aH0ke2VuZHBvaW50fS8ke2lkfWAsIHRoaXMuaHR0cE9wdGlvbnMpO1xuICB9XG59XG4iXX0=