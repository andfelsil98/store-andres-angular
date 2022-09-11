export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}

export interface Category {
  id: string;
  name: string;
}
// en estas lineas se hace uso del concepto data transfer object y omit. en este caso estoy creando una nueva interfaz omitiendo los elementos que no quiero que se incluyan en este caso quiero una nueva interfaz que incluya todo lo de product mas categoryid pero que quite el campo id y el campo category. dto traduce data transfer object
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'>{
  categoryId: number;
}

// creo una nueva interfaz para actualizar los productos en este caso tomo los mismo parametros de la interfaz anterior pero en este caso no necesariamente son obligatorios todos por tanto pongo la palabra partial para volver todos los paamentros opcionales
export interface UpdateProductDTO extends Partial<CreateProductDTO> {}
