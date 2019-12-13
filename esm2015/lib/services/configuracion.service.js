/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ConfiguracionService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }),
        };
    }
    /**
     * @param {?} path
     * @return {?}
     */
    setPath(path) {
        this.path = path;
    }
    /**
     * @param {?} endpoint
     * @return {?}
     */
    get(endpoint) {
        return this.http.get(`${this.path}${endpoint}`, this.httpOptions).pipe(map((/**
         * @param {?} res
         * @return {?}
         */
        (res) => {
            if (res.hasOwnProperty('Body')) {
                return res['Body'];
            }
            else {
                return res;
            }
        })));
    }
    /**
     * Perform a POST http request
     * @param {?} endpoint service's end-point
     * @param {?} element data to send as JSON
     * @return {?} Observable<any>
     */
    post(endpoint, element) {
        return this.http.post(`${this.path}${endpoint}`, element, this.httpOptions);
    }
    /**
     * Perform a PUT http request
     * @param {?} endpoint service's end-point
     * @param {?} element data to send as JSON, With the id to UPDATE
     * @return {?} Observable<any>
     */
    put(endpoint, element) {
        return this.http.put(`${this.path}${endpoint}/${element.Id}`, element, this.httpOptions);
    }
    /**
     * Perform a DELETE http request
     * @param {?} endpoint service's end-point
     * @param {?} id element's id for remove
     * @return {?} Observable<any>
     */
    delete(endpoint, id) {
        return this.http.delete(`${this.path}${endpoint}/${id}`, this.httpOptions);
    }
}
ConfiguracionService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */
ConfiguracionService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ ConfiguracionService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ConfiguracionService_Factory() { return new ConfiguracionService(i0.ɵɵinject(i1.HttpClient)); }, token: ConfiguracionService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhY2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXRpbGlkYWRlcy1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NvbmZpZ3VyYWNpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBTXJDLE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFJL0IsWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHO1lBQ2pCLE9BQU8sRUFBRSxJQUFJLFdBQVcsQ0FBQztnQkFDdkIsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsZUFBZSxFQUFFLFVBQVUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRTthQUNsRSxDQUFDO1NBQ0gsQ0FBQTtJQUNILENBQUM7Ozs7O0lBRUQsT0FBTyxDQUFDLElBQUk7UUFDVixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDOzs7OztJQUVELEdBQUcsQ0FBQyxRQUFRO1FBRVYsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBTSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDekUsR0FBRzs7OztRQUNELENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDTixJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzlCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3BCO2lCQUFNO2dCQUNMLE9BQU8sR0FBRyxDQUFDO2FBQ1o7UUFDSCxDQUFDLEVBQ0YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7OztJQVFELElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTztRQUNwQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25GLENBQUM7Ozs7Ozs7SUFRRCxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU87UUFDbkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBTSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxJQUFJLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7Ozs7Ozs7SUFRRCxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBTSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRixDQUFDOzs7WUE5REYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBTlEsVUFBVTs7Ozs7SUFRakIsMkNBQXVDOztJQUN2QyxvQ0FBVTs7Ozs7SUFFRSxvQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhY2lvblNlcnZpY2Uge1xuICBodHRwT3B0aW9uczogeyBoZWFkZXJzOiBIdHRwSGVhZGVyczsgfTtcbiAgcGF0aDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgIHRoaXMuaHR0cE9wdGlvbnMgPSB7XG4gICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzX3Rva2VuJyl9YCxcbiAgICAgIH0pLFxuICAgIH1cbiAgfVxuXG4gIHNldFBhdGgocGF0aCkge1xuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gIH1cblxuICBnZXQoZW5kcG9pbnQpIHtcblxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4oYCR7dGhpcy5wYXRofSR7ZW5kcG9pbnR9YCwgdGhpcy5odHRwT3B0aW9ucykucGlwZShcbiAgICAgIG1hcChcbiAgICAgICAgKHJlcykgPT4ge1xuICAgICAgICAgIGlmIChyZXMuaGFzT3duUHJvcGVydHkoJ0JvZHknKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc1snQm9keSddO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYSBQT1NUIGh0dHAgcmVxdWVzdFxuICAgKiBAcGFyYW0gZW5kcG9pbnQgc2VydmljZSdzIGVuZC1wb2ludFxuICAgKiBAcGFyYW0gZWxlbWVudCBkYXRhIHRvIHNlbmQgYXMgSlNPTlxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPGFueT5cbiAgICovXG4gIHBvc3QoZW5kcG9pbnQsIGVsZW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8YW55PihgJHt0aGlzLnBhdGh9JHtlbmRwb2ludH1gLCBlbGVtZW50LCB0aGlzLmh0dHBPcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtIGEgUFVUIGh0dHAgcmVxdWVzdFxuICAgKiBAcGFyYW0gZW5kcG9pbnQgc2VydmljZSdzIGVuZC1wb2ludFxuICAgKiBAcGFyYW0gZWxlbWVudCBkYXRhIHRvIHNlbmQgYXMgSlNPTiwgV2l0aCB0aGUgaWQgdG8gVVBEQVRFXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGU8YW55PlxuICAgKi9cbiAgcHV0KGVuZHBvaW50LCBlbGVtZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQ8YW55PihgJHt0aGlzLnBhdGh9JHtlbmRwb2ludH0vJHtlbGVtZW50LklkfWAsIGVsZW1lbnQsIHRoaXMuaHR0cE9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYSBERUxFVEUgaHR0cCByZXF1ZXN0XG4gICAqIEBwYXJhbSBlbmRwb2ludCBzZXJ2aWNlJ3MgZW5kLXBvaW50XG4gICAqIEBwYXJhbSBpZCBlbGVtZW50J3MgaWQgZm9yIHJlbW92ZVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPGFueT5cbiAgICovXG4gIGRlbGV0ZShlbmRwb2ludCwgaWQpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZTxhbnk+KGAke3RoaXMucGF0aH0ke2VuZHBvaW50fS8ke2lkfWAsIHRoaXMuaHR0cE9wdGlvbnMpO1xuICB9XG59XG4iXX0=