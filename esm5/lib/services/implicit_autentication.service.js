/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import * as i0 from "@angular/core";
var ImplicitAutenticationService = /** @class */ (function () {
    function ImplicitAutenticationService() {
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
    ImplicitAutenticationService.prototype.init = /**
     * @param {?} entorno
     * @return {?}
     */
    function (entorno) {
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
            var m = void 0;
            while (m = regex.exec(queryString)) {
                params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
            }
            // And send the token over to the server
            /** @type {?} */
            var req_1 = new XMLHttpRequest();
            // consider using POST so query isn't logged
            /** @type {?} */
            var query = 'https://' + window.location.host + '?' + queryString;
            req_1.open('GET', query, true);
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
            req_1.onreadystatechange = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                if (req_1.readyState === 4) {
                    if (req_1.status === 200) {
                        // window.location = params.state;
                    }
                    else if (req_1.status === 400) {
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
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.logout = /**
     * @return {?}
     */
    function () {
        this.logout_url = this.environment.SIGN_OUT_URL;
        this.logout_url += '?id_token_hint=' + window.localStorage.getItem('id_token');
        this.logout_url += '&post_logout_redirect_uri=' + this.environment.SIGN_OUT_REDIRECT_URL;
        this.logout_url += '&state=' + window.localStorage.getItem('state');
        this.clearStorage();
        window.location.replace(this.logout_url);
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.getPayload = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var id_token = window.localStorage.getItem('id_token').split('.');
        return JSON.parse(atob(id_token[1]));
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.logoutValid = /**
     * @return {?}
     */
    function () {
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
        console.info("state: " + state);
        if (window.localStorage.getItem('state') === state) {
            this.clearStorage();
            valid = true;
        }
        else {
            valid = false;
        }
        return valid;
    };
    // el flag es un booleano que define si abra boton de login
    // el flag es un booleano que define si abra boton de login
    /**
     * @param {?} flag
     * @return {?}
     */
    ImplicitAutenticationService.prototype.login = 
    // el flag es un booleano que define si abra boton de login
    /**
     * @param {?} flag
     * @return {?}
     */
    function (flag) {
        if (window.localStorage.getItem('id_token') === 'undefined' || window.localStorage.getItem('id_token') === null || this.logoutValid()) {
            if (!flag) {
                this.getAuthorizationUrl();
            }
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.live = /**
     * @return {?}
     */
    function () {
        if (this.login(true)) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.clearUrl = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var clean_uri = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, clean_uri);
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.getAuthorizationUrl = /**
     * @return {?}
     */
    function () {
        this.params = this.environment;
        if (!this.params.nonce) {
            this.params.nonce = this.generateState();
        }
        if (!this.params.state) {
            this.params.state = this.generateState();
        }
        /** @type {?} */
        var url = this.params.AUTORIZATION_URL + '?' +
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
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.generateState = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var text = ((Date.now() + Math.random()) * Math.random()).toString().replace('.', '');
        return Md5.hashStr(text);
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.setExpiresAt = /**
     * @return {?}
     */
    function () {
        if (window.localStorage.getItem('expires_at') === null || window.localStorage.getItem('expires_at') === undefined || window.localStorage.getItem('expires_at') === 'Invalid Date') {
            /** @type {?} */
            var expires_at = new Date();
            expires_at.setSeconds(expires_at.getSeconds() + parseInt(window.localStorage.getItem('expires_in'), 10) - 60);
            window.localStorage.setItem('expires_at', expires_at.toUTCString());
        }
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.expired = /**
     * @return {?}
     */
    function () {
        return (new Date(window.localStorage.getItem('expires_at')) < new Date());
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.timer = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setInterval((/**
         * @return {?}
         */
        function () {
            if (window.localStorage.getItem('expires_at') !== null) {
                if (_this.expired()) {
                    _this.logout();
                    _this.clearStorage();
                }
            }
            else {
                window.location.reload();
            }
        }), 5000);
    };
    /**
     * @return {?}
     */
    ImplicitAutenticationService.prototype.clearStorage = /**
     * @return {?}
     */
    function () {
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('id_token');
        window.localStorage.removeItem('expires_in');
        window.localStorage.removeItem('state');
        window.localStorage.removeItem('expires_at');
    };
    ImplicitAutenticationService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    /** @nocollapse */
    ImplicitAutenticationService.ctorParameters = function () { return []; };
    /** @nocollapse */ ImplicitAutenticationService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ImplicitAutenticationService_Factory() { return new ImplicitAutenticationService(); }, token: ImplicitAutenticationService, providedIn: "root" });
    return ImplicitAutenticationService;
}());
export { ImplicitAutenticationService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wbGljaXRfYXV0ZW50aWNhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdXRpbGlkYWRlcy1jb3JlLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2ltcGxpY2l0X2F1dGVudGljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7QUFFN0I7SUEwREk7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsT0FBTyxFQUFFLElBQUksV0FBVyxDQUFDO2dCQUNyQixRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixlQUFlLEVBQUUsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQzthQUMzRSxDQUFDO1NBQ0wsQ0FBQTtJQUNMLENBQUM7Ozs7O0lBckRELDJDQUFJOzs7O0lBQUosVUFBSyxPQUFPO1FBQ1IsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFFM0IsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFJO1lBQ3BELE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLFNBQVMsRUFBRTs7Z0JBQ3ZELE1BQU0sR0FBRyxFQUFFOztnQkFDWCxXQUFXLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOztnQkFDeEMsS0FBSyxHQUFHLG1CQUFtQjs7Z0JBQzNCLENBQUMsU0FBQTtZQUNMLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBRWhDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENB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WiwrQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBNZDUgfSBmcm9tICd0cy1tZDUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcblxuZXhwb3J0IGNsYXNzIEltcGxpY2l0QXV0ZW50aWNhdGlvblNlcnZpY2Uge1xuICAgIFxuICAgIGVudmlyb25tZW50OiBhbnk7XG4gICAgbG9nb3V0X3VybDogYW55O1xuICAgIGJlYXJlcjogeyBoZWFkZXJzOiBIdHRwSGVhZGVyczsgfTtcbiAgICBwYXJhbXM6IGFueTtcbiAgICBwYXlsb2FkOiBhbnk7XG5cbiAgICBpbml0KGVudG9ybm8pOiBhbnkge1xuICAgICAgICB0aGlzLmVudmlyb25tZW50ID0gZW50b3JubztcblxuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NfdG9rZW4nKSA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NfdG9rZW4nKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge30sXG4gICAgICAgICAgICAgICAgcXVlcnlTdHJpbmcgPSBsb2NhdGlvbi5oYXNoLnN1YnN0cmluZygxKSxcbiAgICAgICAgICAgICAgICByZWdleCA9IC8oW14mPV0rKT0oW14mXSopL2c7XG4gICAgICAgICAgICBsZXQgbTtcbiAgICAgICAgICAgIHdoaWxlIChtID0gcmVnZXguZXhlYyhxdWVyeVN0cmluZykpIHtcblxuICAgICAgICAgICAgICAgIHBhcmFtc1tkZWNvZGVVUklDb21wb25lbnQobVsxXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KG1bMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQW5kIHNlbmQgdGhlIHRva2VuIG92ZXIgdG8gdGhlIHNlcnZlclxuICAgICAgICAgICAgY29uc3QgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICAvLyBjb25zaWRlciB1c2luZyBQT1NUIHNvIHF1ZXJ5IGlzbid0IGxvZ2dlZFxuICAgICAgICAgICAgY29uc3QgcXVlcnkgPSAnaHR0cHM6Ly8nICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyAnPycgKyBxdWVyeVN0cmluZztcbiAgICAgICAgICAgIHJlcS5vcGVuKCdHRVQnLCBxdWVyeSwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAocGFyYW1zWydpZF90b2tlbiddICE9PSBudWxsICYmIHBhcmFtc1snaWRfdG9rZW4nXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY2Nlc3NfdG9rZW4nLCBwYXJhbXNbJ2FjY2Vzc190b2tlbiddKTtcbiAgICAgICAgICAgICAgICAvL2lmIHRva2VuIHNldGVhclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWRfdG9rZW4nLCBwYXJhbXNbJ2lkX3Rva2VuJ10pO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZXhwaXJlc19pbicsIHBhcmFtc1snZXhwaXJlc19pbiddKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0YXRlJywgcGFyYW1zWydzdGF0ZSddKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclN0b3JhZ2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChyZXEucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVxLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aW5kb3cubG9jYXRpb24gPSBwYXJhbXMuc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVxLnN0YXR1cyA9PT0gNDAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoJ1RoZXJlIHdhcyBhbiBlcnJvciBwcm9jZXNzaW5nIHRoZSB0b2tlbi4nKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEV4cGlyZXNBdCgpO1xuICAgICAgICB0aGlzLnRpbWVyKCk7XG4gICAgICAgIHRoaXMuY2xlYXJVcmwoKTtcbiAgICB9XG5cbiAgICBcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJlYXJlciA9IHtcbiAgICAgICAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnYXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzX3Rva2VuJyksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBsb2dvdXQoKSB7XG4gICAgICAgIHRoaXMubG9nb3V0X3VybCA9IHRoaXMuZW52aXJvbm1lbnQuU0lHTl9PVVRfVVJMO1xuICAgICAgICB0aGlzLmxvZ291dF91cmwgKz0gJz9pZF90b2tlbl9oaW50PScgKyB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJyk7XG4gICAgICAgIHRoaXMubG9nb3V0X3VybCArPSAnJnBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaT0nICsgdGhpcy5lbnZpcm9ubWVudC5TSUdOX09VVF9SRURJUkVDVF9VUkw7XG4gICAgICAgIHRoaXMubG9nb3V0X3VybCArPSAnJnN0YXRlPScgKyB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0YXRlJyk7XG4gICAgICAgIHRoaXMuY2xlYXJTdG9yYWdlKCk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHRoaXMubG9nb3V0X3VybCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBheWxvYWQoKSB7XG4gICAgICAgIGNvbnN0IGlkX3Rva2VuID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZF90b2tlbicpLnNwbGl0KCcuJyk7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGF0b2IoaWRfdG9rZW5bMV0pKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBsb2dvdXRWYWxpZCgpIHtcbiAgICAgICAgdmFyIHN0YXRlO1xuICAgICAgICB2YXIgdmFsaWQgPSB0cnVlO1xuICAgICAgICB2YXIgcXVlcnlTdHJpbmcgPSBsb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpO1xuICAgICAgICB2YXIgcmVnZXggPSAvKFteJj1dKyk9KFteJl0qKS9nO1xuICAgICAgICB2YXIgbTtcbiAgICAgICAgd2hpbGUgKCEhKG0gPSByZWdleC5leGVjKHF1ZXJ5U3RyaW5nKSkpIHtcbiAgICAgICAgICAgIHN0YXRlID0gZGVjb2RlVVJJQ29tcG9uZW50KG1bMl0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuaW5mbyhcInN0YXRlOiBcIitzdGF0ZSlcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3RhdGUnKSA9PT0gc3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTdG9yYWdlKCk7XG4gICAgICAgICAgICB2YWxpZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxpZDtcbiAgICB9XG5cbiAgICAvLyBlbCBmbGFnIGVzIHVuIGJvb2xlYW5vIHF1ZSBkZWZpbmUgc2kgYWJyYSBib3RvbiBkZSBsb2dpblxuICAgIHB1YmxpYyBsb2dpbihmbGFnKSB7XG4gICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJykgPT09ICd1bmRlZmluZWQnIHx8IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWRfdG9rZW4nKSA9PT0gbnVsbCB8fCB0aGlzLmxvZ291dFZhbGlkKCkpIHtcbiAgICAgICAgICAgIGlmICghZmxhZykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QXV0aG9yaXphdGlvblVybCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGxpdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLmxvZ2luKHRydWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICBwdWJsaWMgY2xlYXJVcmwoKSB7XG4gICAgICAgIGNvbnN0IGNsZWFuX3VyaSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIGNsZWFuX3VyaSk7XG4gICAgfVxuXG5cblxuXG4gICAgcHVibGljIGdldEF1dGhvcml6YXRpb25VcmwoKSB7XG4gICAgICAgIHRoaXMucGFyYW1zID0gdGhpcy5lbnZpcm9ubWVudDtcbiAgICAgICAgaWYgKCF0aGlzLnBhcmFtcy5ub25jZSkge1xuICAgICAgICAgICAgdGhpcy5wYXJhbXMubm9uY2UgPSB0aGlzLmdlbmVyYXRlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMucGFyYW1zLnN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtcy5zdGF0ZSA9IHRoaXMuZ2VuZXJhdGVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB1cmwgPSB0aGlzLnBhcmFtcy5BVVRPUklaQVRJT05fVVJMICsgJz8nICtcbiAgICAgICAgICAgICdjbGllbnRfaWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnBhcmFtcy5DTElFTlRFX0lEKSArICcmJyArXG4gICAgICAgICAgICAncmVkaXJlY3RfdXJpPScgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5wYXJhbXMuUkVESVJFQ1RfVVJMKSArICcmJyArIC8vICsgd2luZG93LmxvY2F0aW9uLmhyZWYgKyAnJicgcGFyYSByZWRpcmVjdCBjb24gcmVnZXhcbiAgICAgICAgICAgICdyZXNwb25zZV90eXBlPScgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5wYXJhbXMuUkVTUE9OU0VfVFlQRSkgKyAnJicgK1xuICAgICAgICAgICAgJ3Njb3BlPScgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5wYXJhbXMuU0NPUEUpICsgJyYnICtcbiAgICAgICAgICAgICdzdGF0ZV91cmw9JyArIGVuY29kZVVSSUNvbXBvbmVudCh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG4gICAgICAgIGlmICh0aGlzLnBhcmFtcy5ub25jZSkge1xuICAgICAgICAgICAgdXJsICs9ICcmbm9uY2U9JyArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnBhcmFtcy5ub25jZSk7XG4gICAgICAgIH1cbiAgICAgICAgdXJsICs9ICcmc3RhdGU9JyArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnBhcmFtcy5zdGF0ZSk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHVybCk7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgcHVibGljIGdlbmVyYXRlU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHRleHQgPSAoKERhdGUubm93KCkgKyBNYXRoLnJhbmRvbSgpKSAqIE1hdGgucmFuZG9tKCkpLnRvU3RyaW5nKCkucmVwbGFjZSgnLicsICcnKTtcbiAgICAgICAgcmV0dXJuIE1kNS5oYXNoU3RyKHRleHQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRFeHBpcmVzQXQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2V4cGlyZXNfYXQnKSA9PT0gbnVsbCB8fCB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2V4cGlyZXNfYXQnKSA9PT0gdW5kZWZpbmVkIHx8IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZXhwaXJlc19hdCcpID09PSAnSW52YWxpZCBEYXRlJykge1xuICAgICAgICAgICAgY29uc3QgZXhwaXJlc19hdCA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBleHBpcmVzX2F0LnNldFNlY29uZHMoZXhwaXJlc19hdC5nZXRTZWNvbmRzKCkgKyBwYXJzZUludCh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2V4cGlyZXNfaW4nKSwgMTApIC0gNjApO1xuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdleHBpcmVzX2F0JywgZXhwaXJlc19hdC50b1VUQ1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBleHBpcmVkKCkge1xuICAgICAgICByZXR1cm4gKG5ldyBEYXRlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZXhwaXJlc19hdCcpKSA8IG5ldyBEYXRlKCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0aW1lcigpIHtcblxuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdleHBpcmVzX2F0JykgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5leHBpcmVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dvdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclN0b3JhZ2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgNTAwMClcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJTdG9yYWdlKCkge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2FjY2Vzc190b2tlbicpO1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2lkX3Rva2VuJyk7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZXhwaXJlc19pbicpO1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N0YXRlJyk7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZXhwaXJlc19hdCcpO1xuXG4gICAgfVxufVxuIl19