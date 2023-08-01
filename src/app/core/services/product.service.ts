import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";
import { Product } from "../models/product";

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    private apiEndpoint: string = `${environment.apiRoot}`

    constructor(private http: HttpClient) {}

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
}

