import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  public getData(url: string) {
    let data = this.http.get(url);
    return data;
  }

  public postData(url: string, data: any) {
    let result = this.http.post(url, data, { headers: this.headers });
    return result;
  }

  public deleteData(url: string) {
    let result = this.http.delete(url, { headers: this.headers });
    return result;
  }
}