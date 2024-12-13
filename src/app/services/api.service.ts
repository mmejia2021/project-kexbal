import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    private apiUrl = "https://kexbal.onrender.com/api";

    constructor(private http: HttpClient, private router: Router) { }

    /* MÉTODOS PÚBLICOS */

    create(resource: any, afterString?: string, params?: any): Observable<any> {
        const url = afterString ? this.makeUrl(afterString) : this.apiUrl;
        return this.http
            .post(url, resource, { headers: this.createHeaders(), params })
            .pipe(
                map(this.extractData),
                catchError((error) => this.handleError(error))
            );
    }

    delete(afterString?: string, id?: string): Observable<any> {
        let url = afterString ? this.makeUrl(afterString) : this.apiUrl;
        if (id) {
            url += `/${id}`;
        }

        return this.http
            .delete(url, { headers: this.createHeaders() })
            .pipe(catchError((error) => this.handleError(error)));
    }

    get(afterString?: string, params?: any): Observable<any> {
        const url = afterString ? this.makeUrl(afterString) : this.apiUrl;
        return this.http
            .get(url, { headers: this.createHeaders(), params })
            .pipe(
                map(this.extractData),
                catchError((error) => this.handleError(error))
            );
    }

    update(resource: any, afterString?: string, id?: string): Observable<any> {
        let url = afterString ? this.makeUrl(afterString) : this.apiUrl;
        if (id) {
            url += `/${id}`;
        }

        return this.http
            .put(url, resource, { headers: this.createHeaders() })
            .pipe(catchError((error) => this.handleError(error)));
    }

    /* MÉTODOS PRIVADOS */

    private extractData(response: any): any {
        return response || {};
    }

    private createHeaders(): HttpHeaders {
        const token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        if (token) {
            headers = headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }

    private makeUrl(path: string): string {
        if (path.startsWith("/")) {
            path = path.slice(1);
        }
        return `${this.apiUrl}/${path}`;
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        if (error.status === 401 || error.status === 403) {
            localStorage.removeItem("user_session");
            localStorage.removeItem("token");
            this.router.navigate(["login"]);
        } else if (error.status === 400 || error.status === 404) {
            console.error('Error 400: Bad Request', error.error);
            // Aquí puedes manejar el error específico o retornar un mensaje
            return throwError(() => new Error(error.error.message));
        }
        // TODO: Mostrar mensaje de error con un modal o notificación
        return throwError(() => new Error(error.message || "Error del servidor"));
    }

}

