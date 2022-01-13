import { IProduct } from "./../product.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.css"],
})
export class ProductUpdateComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  product: IProduct | any;

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get("id");

    if (productId) {
      this.product = this.productService
        .readById(productId)
        .subscribe((product) => {
          this.product = product;
        });
    }
  }

  updateProduct() {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage("Produto atualizado com sucesso");
      this.router.navigate(["/products"]);
    });
  }

  cancel() {
    this.router.navigate(["/products"]);
  }
}
