import { OnInit } from '@angular/core';
import { MenuAplicacionesService } from '../services/menuAplicaciones.service';
import { NotioasService } from '../services/notioas.service';
import { Router } from '@angular/router';
export declare class MenuAplicacionesComponent implements OnInit {
    menuService: MenuAplicacionesService;
    notioasService: NotioasService;
    private router;
    activo: any;
    constructor(menuService: MenuAplicacionesService, notioasService: NotioasService, router: Router);
    redirect(link: any): void;
    ngOnInit(): void;
}
