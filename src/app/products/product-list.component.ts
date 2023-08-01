import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "../core/services/product.service";
import { Product } from "../core/models/product";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

    constructor(private productService: ProductService) {}

    pageTitle = 'Product List';
    apiResponse!: any;
    imageWidth = 50;
    imageMargin = 2;
    showImage: boolean = false;
    listFilter: string = 'cart'
    testProducts: Product[] = []
    products: IProduct[] = [
        {
            "productId": 1,
            "productName": "Leaf Rake",
            "productCode": "GDN-0011",
            "releaseDate": "March 19, 2021",
            "description": "Leaf rake with 48-inch wooden handle.",
            "price": 19.95,
            "starRating": 3.2,
            "imageUrl": "assets/images/leaf_rake.png"
        },
        {
            "productId": 2,
            "productName": "Garden Cart",
            "productCode": "GDN-0023",
            "releaseDate": "March 18, 2021",
            "description": "15 gallon capacity rolling garden cart",
            "price": 32.99,
            "starRating": 4.2,
            "imageUrl": "assets/images/garden_cart.png"
        }
    ];

    ngOnInit(): void {
        this.getProduct()
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
}