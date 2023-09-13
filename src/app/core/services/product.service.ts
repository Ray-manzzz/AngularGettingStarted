import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, catchError, tap, throwError } from "rxjs";
import { Product } from "../models/product";
import { IProduct } from "src/app/products/product";

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    private apiEndpoint: string = `${environment.apiRoot}`
    private productUrl = 'api/products/products.json'

    constructor(private http: HttpClient) {}

    // Similar to the way I've done the product service that is subscribing to an API rather than this hard coded stuff, but doing it anyway for the purposes of completion
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getOkayMessage(): Observable<string>{
        console.log("Hitting service")
        return this.http.get<string>(
            `${this.apiEndpoint}/getokaymessage`
            
        )
    }

    getProduct(): Observable<Product[]>{
        console.log("Hitting service")
        return this.http.get<Product[]>(
            `${this.apiEndpoint}/getProduct`
            
        )
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurredL: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
    }
}

