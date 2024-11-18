import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) {}

  get(): Observable<any> { // Aqui ele retorna any, pq é uma definição do db.json que estamos utilizando. No backend real, poderíamos retornar Observable<Tasks>.
    return this.http.get('http://localhost:3000/categories');
  }

}
