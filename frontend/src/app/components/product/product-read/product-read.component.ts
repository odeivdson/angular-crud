import { Router } from "@angular/router";
import { ProductService } from "./../product.service";
import { IProduct } from "./../product.model";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product-read",
  templateUrl: "./product-read.component.html",
  styleUrls: ["./product-read.component.css"],
})
export class ProductReadComponent implements OnInit {
  products: IProduct[] | any;
  displayedColumns = ["id", "name", "price", "actions"];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.read().subscribe((products) => {
      this.products = products;
    });
  }
}
