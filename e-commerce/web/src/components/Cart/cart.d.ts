import { Dispatch, SetStateAction } from "react";
import ProductItem from "../../types/product";

declare module './' {
  export interface CartItem extends ProductItem {
    quantity: number;
  }

  export type products = Record<string, CartItem>;

  export interface CartProps {
    items: string[];
    products: products;
    setItems: Dispatch<SetStateAction<Record<string, CartItem>>>;
    removeItem(e: string): void;
  }
}