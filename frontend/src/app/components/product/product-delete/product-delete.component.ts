import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IProduct } from "../product.model";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product-delete",
  templateUrl: "./product-delete.component.html",
  styleUrls: ["./product-delete.component.css"],
})
export class ProductDeleteComponent implements OnInit {
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
        .readById(+productId)
        .subscribe((product) => {
          this.product = product;
        });
    }
  }

  deleteProduct() {
    this.productService.delete(this.product.id).subscribe(() => {
      this.productService.showMessage("Produto excluído com sucesso");
      this.router.navigate(["/products"]);
    });
  }

  cancel() {
    this.router.navigate(["/products"]);
  }
}
