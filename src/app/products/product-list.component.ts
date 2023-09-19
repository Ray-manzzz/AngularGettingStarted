import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "../core/services/product.service";
import { Product } from "../core/models/product";
import { Subscription } from "rxjs";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {

    constructor(private productService: ProductService) {}

    pageTitle = 'Product List';
    apiResponse!: any;
    imageWidth = 50;
    imageMargin = 2;
    showImage: boolean = false;
    errorMessage: string = ''
    sub!: Subscription;

    private _listFilter: string = '';
    get listFilter(): string {
        return this._listFilter
    }

    set listFilter(value: string) {
        this._listFilter = value;
        console.log('In Setter:', value)
        this.filteredProducts = this.performFilter(value);
    }

    testProducts: Product[] = []
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    ngOnInit(): void {
        this.getProduct()

        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products
            },
            error: err => this.errorMessage = err
        })
        this._listFilter = 'rake'
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    toggleImage() :void {
        this.showImage = !this.showImage;
    }

    callApi(): void {
        this.productService.getOkayMessage()
            .subscribe(response => {
        this.apiResponse = response;
        console.log('Received message:', this.apiResponse);
    });
    }

    getProduct(): void {
        this.productService.getProduct()
            .subscribe(response => {
        this.testProducts = response;
        console.log('Received message:', this.testProducts);
    });
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().includes(filterBy));
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}