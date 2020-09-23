import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../store';
import { addProductToCartRequest } from '../store/models/cart/actions';
import { IProduct } from '../store/models/cart/types';

interface CatalogItemProps {
    product: IProduct;
}

const CatalogItem: React.FC<CatalogItemProps> = ({ product }) => {
    const dispash = useDispatch();

    const hasFailedStockCheck = useSelector<IState, boolean>(state => {
        return state.cart.failedStockCheck.includes(product.id);
    })

    const handleAddProductToCart = useCallback(() => {
        dispash(addProductToCartRequest(product));
    }, [dispash, product])

    return (
        <article>
            <strong>{product.title}</strong> {" - "}
            <span>{product.price}</span> {"  "}

            <button 
                type="button"
                onClick={handleAddProductToCart}
            >
                Comprar
            </button>

            { hasFailedStockCheck && <span style={{ color: 'red'}}>Falta de estoque</span> }
        </article>
    )
}

export default CatalogItem