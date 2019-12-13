# UtilidadesCore

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

## 1. Configuración de environment.
La librería recibe como parametro el environment con las siguientes variables definidas. 

```ts
*/  environment.ts  */
export const environment = {
  production: false,
  
  entorno: 'test', // para menú de aplicaciones
  notificaciones: true, // Inicializar notificaciones
  menuApps: true, // Inicializar menú de aplicaciones
  
  CONFIGURACION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/'+
  'apioas/configuracion_crud_api/v1/',
  NOTIFICACION_SERVICE: 'wss://pruebasapi.portaloas.udistrital.edu.co:8116/ws',
  ...,
  TOKEN: {
      AUTORIZATION_URL: ...,
      CLIENTE_ID: ....,
      RESPONSE_TYPE: ...,
      SCOPE: ...,
      REDIRECT_URL: ...,
      SIGN_OUT_URL: ...,
      SIGN_OUT_REDIRECT_URL: ...,
  },
};

```

## 2. Importar el módulo.
Si está usando nebular, importe en en módulo theme, de lo contrario importe en el módulo principal o según convenga.

```ts
*/ theme.module.ts  */

import { 
  NotioasModule,  
  MenuAplicacionesModule, 
  UtilidadesCoreModule, 
} from 'utilidades-core';

const UTILIDADES_CORE = [
  NotioasModule,
  MenuAplicacionesModule,
  UtilidadesCoreModule, 
];


@NgModule({
  imports: [...UTILIDADES_CORE],
  exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...PIPES, ...MAT_MODULES],
  declarations: [...COMPONENTS, ...PIPES, DinamicformComponent, SelectComponent],
  entryComponents: [...ENTRY_COMPONENTS],
})
```

## 3. html
Use el componente en el header para notificaciones lib-notioas, para menú de aplicaciones menu-aplicaciones, también puede construir los botones para mostrar y ocultar cada panel.

```html
*/ header.component.html  */

<div class="header-container" [class.left]="position === 'normal'" [class.right]="position === 'inverse'">
  ...
  <lib-notioas></lib-notioas>
  <menu-aplicaciones></menu-aplicaciones>
  ...
 </div>


  <nb-action class="control-item" icon="nb-notifications" 
  [badgeText]="notificacionService.noNotify$ | async"
  badgeStatus="danger" 
  (click)="toggleNotifications()">
  </nb-action>
  <nb-action class="control-item" icon="nb-grid-b" 
  (click)="abrirMenu()">
  </nb-action>

...
```
## 4. typescript
Puede inicializar la librería pasando cómo parametro el environment, también puede usar el método toogleMenuNotify() de cada componente.
```ts

```*/ header.component.ts  */

import { NotioasService, 
        MenuAplicacionesService, 
        UtilidadesCoreService  } 
from 'utilidades-core';
...
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
constructor(
    public notificacionService: NotioasService,
    private utilidadesService: UtilidadesCoreService,
    private menuAplicacionesService: MenuAplicacionesService
	...
) {
	...
    this.liveToken();
  }


 liveToken() {
    if (window.Auth.live()) {
      this.liveTokenValue = window.Auth.live();
      this.username = (window.Auth.getPayload()).sub;
      this.utilidadesService.initLib(environment);
    }
    return window.Auth.live();
  }
  
    toggleNotifications() {
    this.notificacionService.toogleMenuNotify();
  }

  abrirMenu() {
    this.menuAplicacionesService.toogleMenuNotify();
  }
}
```
## 5. Añada en main.ts
```ts
/*   main.ts     */


import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ImplicitAutenticationService } from 'utilidades-core';

if (environment.production) {
  enableProdMode();
}

declare global {
  interface Window { Auth: any; }
}

window.Auth = window.Auth || {};

window.Auth = new ImplicitAutenticationService;
window.Auth.init(environment.TOKEN);
const isButtonLogin = false;

if (window.Auth.login(isButtonLogin)) {
  window.Auth.live();
}

// autenticacion.clearUrl();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```
