export interface ProductImage {
  rel: string;
  href: string;
}

export interface ProductVariationSku {
  sku: string;
}

export interface CommonPortalData {
  sku: number;
  productVariations: ProductVariationSku[];
  image: string;
  images: ProductImage[];
  name: string;
  customerReviewAverage: number;
  customerReviewCount: number;
  regularPrice: number;
  salePrice: number;
  modelNumber: string;
  longDescription: string;
}
