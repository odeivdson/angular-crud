import { IProduct } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  baseUrl = "http://localhost:3001/products";

  showMessage(msg: string): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

  create(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.baseUrl, product);
  }
}
