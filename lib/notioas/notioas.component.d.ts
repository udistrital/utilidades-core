import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NotioasService } from './../services/notioas.service';
import { Router } from '@angular/router';
export declare class NotioasComponent implements OnInit {
    notificacionService: NotioasService;
    private router;
    ngOnInit(): void;
    searchTerm$: Subject<string>;
    notificaciones: any;
    activo: Boolean;
    constructor(notificacionService: NotioasService, router: Router);
    searchEntries(term: any): any[];
    redirect(noti: any): void;
}
