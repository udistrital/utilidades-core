import { HttpHeaders } from '@angular/common/http';
export declare class ImplicitAutenticationService {
    environment: any;
    logout_url: any;
    bearer: {
        headers: HttpHeaders;
    };
    params: any;
    payload: any;
    init(entorno: any): any;
    constructor();
    logout(): void;
    getPayload(): any;
    logoutValid(): boolean;
    login(flag: any): boolean;
    live(): boolean;
    clearUrl(): void;
    getAuthorizationUrl(): string;
    generateState(): string | Int32Array;
    setExpiresAt(): void;
    expired(): boolean;
    timer(): void;
    clearStorage(): void;
}
