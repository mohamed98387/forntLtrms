import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}
  addUser(obj: any, headers: any): Observable<any> {
    return this.http.post("http://localhost:8080/users", obj, { headers });
  }
}
