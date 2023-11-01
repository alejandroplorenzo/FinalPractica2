export type products = {
    name: string;
    stock: number;
    description: string;
    price: number;
};

export type client = {
    name: string;
    cif: string;
}

export type invoice = {
    client: string;
    products: products[];
    total: number;
}

