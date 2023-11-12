import { Injectable, inject } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { HModel } from '../model/h-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HCalculationsService {
  http = inject(HttpClient);

  getHModels(radius: number): Observable<HModel[]> {
    const url = "https://halyk-oiy-production.up.railway.app/radius/average";

    const params = { radius: radius.toString() };

    return this.http.get<HModel[]>(url, { params });
  }
}
