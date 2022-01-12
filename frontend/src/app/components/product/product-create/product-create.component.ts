import { IProduct } from "./../product.model";
import { ProductService } from "./../product.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.css"],
})
export class ProductCreateComponent implements OnInit {
  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {}

  product: IProduct = {
    name: "",
    price: 0,
  };

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage("Produto criado.");
      this.router.navigate(["/products"]);
    });
  }

  cancelProduct(): void {
    this.router.navigate(["/products"]);
  }
}
