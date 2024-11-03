interface ProductItem {
  id: number;
  price: number;
  title: string;
  description?: string;
  categoryId: number;
  image: string;
}

export interface ProductComment {
  id: number;
  rate: number;
  comment: string;
  product_id: number;
  user_id: number;
  name: string;
  avatar: string;
}

export default ProductItem;
