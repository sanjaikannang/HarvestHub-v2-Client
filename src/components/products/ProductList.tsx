import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllProducts } from '../../features/products/productSlice';
import { Link } from 'react-router-dom';

const ProductList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector((state) => state.product);
    const [filterStatus, setFilterStatus] = useState<string>('all');

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    const filteredProducts = products.filter((product) => {
        if (filterStatus === 'all') return true;
        return product.status === filterStatus;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
                {error}
            </div>
        );
    }

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Products</h2>
                    <div className="flex gap-2">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="all">All Products</option>
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                            className="block"
                        >
                            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="relative h-48">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${product.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                        product.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-2 text-gray-800">{product.name}</h3>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                                    <div className="flex justify-between items-center">
                                        <div className="text-indigo-600 font-bold">
                                            ${product.startingPrice.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Qty: {product.quantity}
                                        </div>
                                    </div>

                                    <div className="mt-3 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <span>Farmer:</span>
                                            <span className="font-medium">{product.farmer.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>Start:</span>
                                            <span>{new Date(product.startingDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No products found.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductList;