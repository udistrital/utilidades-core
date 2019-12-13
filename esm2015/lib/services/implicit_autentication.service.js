/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import * as i0 from "@angular/core";
export class ImplicitAutenticationService {
    constructor() {
        this.bearer = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'authorization': 'Bearer ' + window.localStorage.getItem('access_token'),
            }),
        };
    }
    /**
     * @param {?} entorno
     * @return {?}
     */
    init(entorno) {
        this.environment = entorno;
        if (window.localStorage.getItem('access_token') === null ||
            window.localStorage.getItem('access_token') === undefined) {
            /** @type {?} */
            var params = {};
            /** @type {?} */
            var queryString = location.hash.substring(1);
            /** @type {?} */
            var regex = /([^&=]+)=([^&]*)/g;
            /** @type {?} */
            let m;
            while (m = regex.exec(queryString)) {
                params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
            }
            // And send the token over to the server
            /** @type {?} */
            const req = new XMLHttpRequest();
            // consider using POST so query isn't logged
            /** @type {?} */
            const query = 'https://' + window.location.host + '?' + queryString;
            req.open('GET', query, true);
            if (params['id_token'] !== null && params['id_token'] !== undefined) {
                window.localStorage.setItem('access_token', params['access_token']);
                //if token setear
                window.localStorage.setItem('id_token', params['id_token']);
                window.localStorage.setItem('expires_in', params['expires_in']);
                window.localStorage.setItem('state', params['state']);
            }
            else {
                this.clearStorage();
            }
            req.onreadystatechange = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        // window.location = params.state;
                    }
                    else if (req.status === 400) {
                        window.alert('There was an error processing the token.');
                    }
                    else {
                    }
                }
            });
        }
        this.setExpiresAt();
        this.timer();
        this.clearUrl();
    }
    /**
     * @return {?}
     */
    logout() {
        this.logout_url = this.environment.SIGN_OUT_URL;
        this.logout_url += '?id_token_hint=' + window.localStorage.getItem('id_token');
        this.logout_url += '&post_logout_redirect_uri=' + this.environment.SIGN_OUT_REDIRECT_URL;
        this.logout_url += '&state=' + window.localStorage.getItem('state');
        this.clearStorage();
        window.location.replace(this.logout_url);
    }
    /**
     * @return {?}
     */
    getPayload() {
        /** @type {?} */
        const id_token = window.localStorage.getItem('id_token').split('.');
        return JSON.parse(atob(id_token[1]));
    }
    /**
     * @return {?}
     */
    logoutValid() {
        /** @type {?} */
        var state;
        /** @type {?} */
        var valid = true;
        /** @type {?} */
        var queryString = location.search.substring(1);
        /** @type {?} */
        var regex = /([^&=]+)=([^&]*)/g;
        /** @type {?} */
        var m;
        while (!!(m = regex.exec(queryString))) {
            state = decodeURIComponent(m[2]);
        }
        if (window.localStorage.getItem('state') === state) {
            this.clearStorage();
            valid = true;
        }
        else {
            valid = false;
        }
        return valid;
    }
    // el flag es un booleano que define si abra boton de login
    /**
     * @param {?} flag
     * @return {?}
     */
    login(flag) {
        if (window.localStorage.getItem('id_token') === 'undefined' || window.localStorage.getItem('id_token') === null || this.logoutValid()) {
            if (!flag) {
                this.getAuthorizationUrl();
            }
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * @return {?}
     */
    live() {
        if (this.login(true)) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @return {?}
     */
    clearUrl() {
        /** @type {?} */
        const clean_uri = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, clean_uri);
    }
    /**
     * @return {?}
     */
    getAuthorizationUrl() {
        this.params = this.environment;
        if (!this.params.nonce) {
            this.params.nonce = this.generateState();
        }
        if (!this.params.state) {
            this.params.state = this.generateState();
        }
        /** @type {?} */
        let url = this.params.AUTORIZATION_URL + '?' +
            'client_id=' + encodeURIComponent(this.params.CLIENTE_ID) + '&' +
            'redirect_uri=' + encodeURIComponent(this.params.REDIRECT_URL) + '&' + // + window.location.href + '&' para redirect con regex
            'response_type=' + encodeURIComponent(this.params.RESPONSE_TYPE) + '&' +
            'scope=' + encodeURIComponent(this.params.SCOPE) + '&' +
            'state_url=' + encodeURIComponent(window.location.hash);
        if (this.params.nonce) {
            url += '&nonce=' + encodeURIComponent(this.params.nonce);
        }
        url += '&state=' + encodeURIComponent(this.params.state);
        window.location.replace(url);
        return url;
    }
    /**
     * @return {?}
     */
    generateState() {
        /** @type {?} */
        const text = ((Date.now() + Math.random()) * Math.random()).toString().replace('.', '');
        return Md5.hashStr(text);
    }
    /**
     * @return {?}
     */
    setExpiresAt() {
        if (window.localStorage.getItem('expires_at') === null || window.localStorage.getItem('expires_at') === undefined || window.localStorage.getItem('expires_at') === 'Invalid Date') {
            /** @type {?} */
            const expires_at = new Date();
            expires_at.setSeconds(expires_at.getSeconds() + parseInt(window.localStorage.getItem('expires_in'), 10) - 60);
            window.localStorage.setItem('expires_at', expires_at.toUTCString());
        }
    }
    /**
     * @return {?}
     */
    expired() {
        return (new Date(window.localStorage.getItem('expires_at')) < new Date());
    }
    /**
     * @return {?}
     */
    timer() {
        setInterval((/**
         * @return {?}
         */
        () => {
            if (window.localStorage.getItem('expires_at') !== null) {
                if (this.expired()) {
                    this.logout();
                    this.clearStorage();
                }
            }
            else {
                window.location.reload();
            }
        }), 5000);
    }
    /**
     * @return {?}
     */
    clearStorage() {
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('id_token');
        window.localStorage.removeItem('expires_in');
        window.localStorage.removeItem('state');
        window.localStorage.removeItem('expires_at');
    }
}
ImplicitAutenticationService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */
ImplicitAutenticationService.ctorParameters = () => [];
/** @nocollapse */ ImplicitAutenticationService.ngInjectableDef = i0.defineInjectable({ factory: function ImplicitAutenticationService_Factory() { return new ImplicitAutenticationService(); }, token: ImplicitAutenticationService, providedIn: "root" });
if (false) {
    /** @type {?} */
    ImplicitAutenticationService.prototype.environment;
    /** @type {?} */
    ImplicitAutenticationService.prototype.logout_url;
    /** @type {?} */
    ImplicitAutenticationService.prototype.bearer;
    /** @type {?} */
    ImplicitAutenticationService.prototype.params;
    /** @type {?} */
    ImplicitAutenticationService.prototype.payload;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wbGljaXRfYXV0ZW50aWNhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXRpbGlkYWRlcy1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2ltcGxpY2l0X2F1dGVudGljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFFBQVEsQ0FBQTs7QUFNNUIsTUFBTSxPQUFPLDRCQUE0QjtJQXNEckM7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsT0FBTyxFQUFFLElBQUksV0FBVyxDQUFDO2dCQUNyQixRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixlQUFlLEVBQUUsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQzthQUMzRSxDQUFDO1NBQ0wsQ0FBQTtJQUNMLENBQUM7Ozs7O0lBckRELElBQUksQ0FBQyxPQUFPO1FBQ1IsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFFM0IsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFJO1lBQ3BELE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLFNBQVMsRUFBRTs7Z0JBQ3ZELE1BQU0sR0FBRyxFQUFFOztnQkFDWCxXQUFXLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOztnQkFDeEMsS0FBSyxHQUFHLG1CQUFtQjs7Z0JBQzNCLENBQUM7WUFDTCxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUVoQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FB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Ozs7O0lBRU0sS0FBSztRQUVSLFdBQVc7OztRQUFDLEdBQUcsRUFBRTtZQUNiLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUNwRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDaEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNkLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDdkI7YUFDSjtpQkFBTTtnQkFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQzVCO1FBQ0wsQ0FBQyxHQUFFLElBQUksQ0FBQyxDQUFBO0lBQ1osQ0FBQzs7OztJQUVNLFlBQVk7UUFDZixNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUVqRCxDQUFDOzs7WUE3TEosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7Ozs7O0lBSUcsbURBQWlCOztJQUNqQixrREFBZ0I7O0lBQ2hCLDhDQUFrQzs7SUFDbEMsOENBQVk7O0lBQ1osK0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTWQ1IH0gZnJvbSAndHMtbWQ1J1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcblxuZXhwb3J0IGNsYXNzIEltcGxpY2l0QXV0ZW50aWNhdGlvblNlcnZpY2Uge1xuICAgIFxuICAgIGVudmlyb25tZW50OiBhbnk7XG4gICAgbG9nb3V0X3VybDogYW55O1xuICAgIGJlYXJlcjogeyBoZWFkZXJzOiBIdHRwSGVhZGVyczsgfTtcbiAgICBwYXJhbXM6IGFueTtcbiAgICBwYXlsb2FkOiBhbnk7XG5cbiAgICBpbml0KGVudG9ybm8pOiBhbnkge1xuICAgICAgICB0aGlzLmVudmlyb25tZW50ID0gZW50b3JubztcblxuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NfdG9rZW4nKSA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NfdG9rZW4nKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge30sXG4gICAgICAgICAgICAgICAgcXVlcnlTdHJpbmcgPSBsb2NhdGlvbi5oYXNoLnN1YnN0cmluZygxKSxcbiAgICAgICAgICAgICAgICByZWdleCA9IC8oW14mPV0rKT0oW14mXSopL2c7XG4gICAgICAgICAgICBsZXQgbTtcbiAgICAgICAgICAgIHdoaWxlIChtID0gcmVnZXguZXhlYyhxdWVyeVN0cmluZykpIHtcblxuICAgICAgICAgICAgICAgIHBhcmFtc1tkZWNvZGVVUklDb21wb25lbnQobVsxXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KG1bMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQW5kIHNlbmQgdGhlIHRva2VuIG92ZXIgdG8gdGhlIHNlcnZlclxuICAgICAgICAgICAgY29uc3QgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICAvLyBjb25zaWRlciB1c2luZyBQT1NUIHNvIHF1ZXJ5IGlzbid0IGxvZ2dlZFxuICAgICAgICAgICAgY29uc3QgcXVlcnkgPSAnaHR0cHM6Ly8nICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyAnPycgKyBxdWVyeVN0cmluZztcbiAgICAgICAgICAgIHJlcS5vcGVuKCdHRVQnLCBxdWVyeSwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAocGFyYW1zWydpZF90b2tlbiddICE9PSBudWxsICYmIHBhcmFtc1snaWRfdG9rZW4nXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY2Nlc3NfdG9rZW4nLCBwYXJhbXNbJ2FjY2Vzc190b2tlbiddKTtcbiAgICAgICAgICAgICAgICAvL2lmIHRva2VuIHNldGVhclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWRfdG9rZW4nLCBwYXJhbXNbJ2lkX3Rva2VuJ10pO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZXhwaXJlc19pbicsIHBhcmFtc1snZXhwaXJlc19pbiddKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0YXRlJywgcGFyYW1zWydzdGF0ZSddKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclN0b3JhZ2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChyZXEucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVxLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aW5kb3cubG9jYXRpb24gPSBwYXJhbXMuc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVxLnN0YXR1cyA9PT0gNDAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoJ1RoZXJlIHdhcyBhbiBlcnJvciBwcm9jZXNzaW5nIHRoZSB0b2tlbi4nKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEV4cGlyZXNBdCgpO1xuICAgICAgICB0aGlzLnRpbWVyKCk7XG4gICAgICAgIHRoaXMuY2xlYXJVcmwoKTtcbiAgICB9XG5cbiAgICBcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJlYXJlciA9IHtcbiAgICAgICAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnYXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzX3Rva2VuJyksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBsb2dvdXQoKSB7XG4gICAgICAgIHRoaXMubG9nb3V0X3VybCA9IHRoaXMuZW52aXJvbm1lbnQuU0lHTl9PVVRfVVJMO1xuICAgICAgICB0aGlzLmxvZ291dF91cmwgKz0gJz9pZF90b2tlbl9oaW50PScgKyB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJyk7XG4gICAgICAgIHRoaXMubG9nb3V0X3VybCArPSAnJnBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaT0nICsgdGhpcy5lbnZpcm9ubWVudC5TSUdOX09VVF9SRURJUkVDVF9VUkw7XG4gICAgICAgIHRoaXMubG9nb3V0X3VybCArPSAnJnN0YXRlPScgKyB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0YXRlJyk7XG4gICAgICAgIHRoaXMuY2xlYXJTdG9yYWdlKCk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHRoaXMubG9nb3V0X3VybCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBheWxvYWQoKSB7XG4gICAgICAgIGNvbnN0IGlkX3Rva2VuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZF90b2tlbicpLnNwbGl0KCcuJyk7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGF0b2IoaWRfdG9rZW5bMV0pKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBsb2dvdXRWYWxpZCgpIHtcbiAgICAgICAgdmFyIHN0YXRlO1xuICAgICAgICB2YXIgdmFsaWQgPSB0cnVlO1xuICAgICAgICB2YXIgcXVlcnlTdHJpbmcgPSBsb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpO1xuICAgICAgICB2YXIgcmVnZXggPSAvKFteJj1dKyk9KFteJl0qKS9nO1xuICAgICAgICB2YXIgbTtcbiAgICAgICAgd2hpbGUgKCEhKG0gPSByZWdleC5leGVjKHF1ZXJ5U3RyaW5nKSkpIHtcbiAgICAgICAgICAgIHN0YXRlID0gZGVjb2RlVVJJQ29tcG9uZW50KG1bMl0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0YXRlJykgPT09IHN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU3RvcmFnZSgpO1xuICAgICAgICAgICAgdmFsaWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgfVxuXG4gICAgLy8gZWwgZmxhZyBlcyB1biBib29sZWFubyBxdWUgZGVmaW5lIHNpIGFicmEgYm90b24gZGUgbG9naW5cbiAgICBwdWJsaWMgbG9naW4oZmxhZykge1xuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZF90b2tlbicpID09PSAndW5kZWZpbmVkJyB8fCB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJykgPT09IG51bGwgfHwgdGhpcy5sb2dvdXRWYWxpZCgpKSB7XG4gICAgICAgICAgICBpZiAoIWZsYWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEF1dGhvcml6YXRpb25VcmwoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBsaXZlKCkge1xuICAgICAgICBpZiAodGhpcy5sb2dpbih0cnVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgcHVibGljIGNsZWFyVXJsKCkge1xuICAgICAgICBjb25zdCBjbGVhbl91cmkgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIGRvY3VtZW50LnRpdGxlLCBjbGVhbl91cmkpO1xuICAgIH1cblxuXG5cblxuICAgIHB1YmxpYyBnZXRBdXRob3JpemF0aW9uVXJsKCkge1xuICAgICAgICB0aGlzLnBhcmFtcyA9IHRoaXMuZW52aXJvbm1lbnQ7XG4gICAgICAgIGlmICghdGhpcy5wYXJhbXMubm9uY2UpIHtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLm5vbmNlID0gdGhpcy5nZW5lcmF0ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnBhcmFtcy5zdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5wYXJhbXMuc3RhdGUgPSB0aGlzLmdlbmVyYXRlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdXJsID0gdGhpcy5wYXJhbXMuQVVUT1JJWkFUSU9OX1VSTCArICc/JyArXG4gICAgICAgICAgICAnY2xpZW50X2lkPScgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5wYXJhbXMuQ0xJRU5URV9JRCkgKyAnJicgK1xuICAgICAgICAgICAgJ3JlZGlyZWN0X3VyaT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMucGFyYW1zLlJFRElSRUNUX1VSTCkgKyAnJicgKyAvLyArIHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgJyYnIHBhcmEgcmVkaXJlY3QgY29uIHJlZ2V4XG4gICAgICAgICAgICAncmVzcG9uc2VfdHlwZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMucGFyYW1zLlJFU1BPTlNFX1RZUEUpICsgJyYnICtcbiAgICAgICAgICAgICdzY29wZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMucGFyYW1zLlNDT1BFKSArICcmJyArXG4gICAgICAgICAgICAnc3RhdGVfdXJsPScgKyBlbmNvZGVVUklDb21wb25lbnQod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgICAgICBpZiAodGhpcy5wYXJhbXMubm9uY2UpIHtcbiAgICAgICAgICAgIHVybCArPSAnJm5vbmNlPScgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5wYXJhbXMubm9uY2UpO1xuICAgICAgICB9XG4gICAgICAgIHVybCArPSAnJnN0YXRlPScgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5wYXJhbXMuc3RhdGUpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh1cmwpO1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZW5lcmF0ZVN0YXRlKCkge1xuICAgICAgICBjb25zdCB0ZXh0ID0gKChEYXRlLm5vdygpICsgTWF0aC5yYW5kb20oKSkgKiBNYXRoLnJhbmRvbSgpKS50b1N0cmluZygpLnJlcGxhY2UoJy4nLCAnJyk7XG4gICAgICAgIHJldHVybiBNZDUuaGFzaFN0cih0ZXh0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RXhwaXJlc0F0KCkge1xuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdleHBpcmVzX2F0JykgPT09IG51bGwgfHwgd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdleHBpcmVzX2F0JykgPT09IHVuZGVmaW5lZCB8fCB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2V4cGlyZXNfYXQnKSA9PT0gJ0ludmFsaWQgRGF0ZScpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4cGlyZXNfYXQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgZXhwaXJlc19hdC5zZXRTZWNvbmRzKGV4cGlyZXNfYXQuZ2V0U2Vjb25kcygpICsgcGFyc2VJbnQod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdleHBpcmVzX2luJyksIDEwKSAtIDYwKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZXhwaXJlc19hdCcsIGV4cGlyZXNfYXQudG9VVENTdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZXhwaXJlZCgpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgRGF0ZSh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2V4cGlyZXNfYXQnKSkgPCBuZXcgRGF0ZSgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdGltZXIoKSB7XG5cbiAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZXhwaXJlc19hdCcpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhwaXJlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nb3V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJTdG9yYWdlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDUwMDApXG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyU3RvcmFnZSgpIHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhY2Nlc3NfdG9rZW4nKTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdpZF90b2tlbicpO1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2V4cGlyZXNfaW4nKTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzdGF0ZScpO1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2V4cGlyZXNfYXQnKTtcblxuICAgIH1cbn1cbiJdfQ==