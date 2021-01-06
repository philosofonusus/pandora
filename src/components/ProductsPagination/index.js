import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {PRODUCTS_SERIES_ALL} from '../../containers/Products/constants';


function ProductsPagination({productsArray, displayProductsCount, appLanguage, productSeries, productType}) {

  const {t} = useTranslation();
  const [productsListToDisplay, setProductsListToDisplay] = useState([])

  const filterProductsListToDisplay = () => {
    const newList = productSeries === PRODUCTS_SERIES_ALL ? (
      productsArray
        .filter(product => product.type === productType)
        .slice(0, displayProductsCount)
    ) : (
      productsArray
        .filter(product => product.series === productSeries && product.type === productType)
        .slice(0, displayProductsCount)

    )
    setProductsListToDisplay(ps => newList)
  }

  useEffect(() => {
    filterProductsListToDisplay()
  }, [])

  useEffect(() => {
    filterProductsListToDisplay()
  }, [productsArray, displayProductsCount, appLanguage, productSeries, productType])


  return (
    <Fragment>
      {
        productsListToDisplay.map(product => {

          const indexOfDefaultUrl = product
            .productImages
            .findIndex(item => item.isDefault)

          const imageUrl = indexOfDefaultUrl !== -1 ? (
            product.productImages[indexOfDefaultUrl].url
          ) : (product.productImages.length ? product.productImages[0].url: '')
          // isDefault
          return (
            <div key={`${product.id}_${appLanguage}`} className='col-12 col-md-6 col-lg-4'>
              <Link
                to={`/product/${product.id}`}
                className={`category-cart`}
                onClick={e => console.log('/product/${product.id}', e)}
              >
                <div className='category-cart-header'>
                  <img src={imageUrl} title={``}/>
                </div>
                <div className={`category-cart-body`}>
                  <h4 className={`category-cart-title`}>
                    {t(`common:${productType}`)} {product.series} {product.name}
                  </h4>
                  <p>{product.description}</p>
                  <span className={`category-cart-price-box`}>
                      <span className={`category-cart-price`}>{product.price} AMD</span>
                      /{t('products:INCLUDING_INSTALLATION')}
                    </span>
                </div>
              </Link>
            </div>
          )
        })
      }
    </Fragment>
  )
}

export default ProductsPagination;

