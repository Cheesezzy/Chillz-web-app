import { basketballProducts } from "./data";
import { IndividualProductType, ProductType } from "./types";

function IndividualProduct({ product }: IndividualProductType) {
  return (
    <a key={product.id} href={product.href} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm">{product.name}</h3>
      <p className="mt-1 text-lg font-medium">{product.price}</p>
    </a>
  );
}

const Products = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px6 sm:sm-24 lg:max-w-7xl lg:px-9">
      <h2 className="sr-only">Products</h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6">
        {basketballProducts.map((product: ProductType) => (
          <IndividualProduct product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
