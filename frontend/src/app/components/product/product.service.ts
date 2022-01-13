import { map, catchError } from "rxjs/operators";
import { IProduct } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  baseUrl = "http://localhost:3001/products";

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }

  read(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }

  readById(id: number): Observable<IProduct> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<IProduct>(url).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }

  update(product: IProduct): Observable<IProduct> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<IProduct>(url, product).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }

  delete(id: number): Observable<IProduct> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<IProduct>(url).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }

  errorHandler(error: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
