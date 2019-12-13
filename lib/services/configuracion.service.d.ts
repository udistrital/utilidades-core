import { HttpClient, HttpHeaders } from '@angular/common/http';
export declare class ConfiguracionService {
    private http;
    httpOptions: {
        headers: HttpHeaders;
    };
    path: any;
    constructor(http: HttpClient);
    setPath(path: any): void;
    get(endpoint: any): import("rxjs/internal/Observable").Observable<any>;
    /**
     * Perform a POST http request
     * @param endpoint service's end-point
     * @param element data to send as JSON
     * @returns Observable<any>
     */
    post(endpoint: any, element: any): import("rxjs/internal/Observable").Observable<any>;
    /**
     * Perform a PUT http request
     * @param endpoint service's end-point
     * @param element data to send as JSON, With the id to UPDATE
     * @returns Observable<any>
     */
    put(endpoint: any, element: any): import("rxjs/internal/Observable").Observable<any>;
    /**
     * Perform a DELETE http request
     * @param endpoint service's end-point
     * @param id element's id for remove
     * @returns Observable<any>
     */
    delete(endpoint: any, id: any): import("rxjs/internal/Observable").Observable<any>;
}
