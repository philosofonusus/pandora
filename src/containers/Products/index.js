import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import 'swiper/swiper.scss';

import category_hero_bg from '../../assets/images/category/category-hero-bg.png'
import ProductsPagination from '../../components/ProductsPagination';
import Spinner from '../../components/Spinner/Spinner';


import {changeProductType, changeProductSeries, loadMoreProducts,} from './actions'
import {
  PRODUCTS_TYPE_CAR_ALARM,
  PRODUCTS_TYPE_MOTO_ALARM,
  PRODUCTS_TYPE_ACCESSORIES,
  PRODUCTS_TYPE_IMMOBILIZERS,
  PRODUCTS_SERIES_ALL,
  PRODUCTS_SERIES_DXL,
  PRODUCTS_SERIES_DX,
  PRODUCTS_SERIES_X
} from './constants';
import './style.css';
import {makeSelectProducts, makeSelectProductSeries, makeSelectDisplayProductsCount} from './selectors';


const Products = (props) => {
  const {productType} = props.products;
  const path = props.computedMatch.params.productType
  const allowedPaths = [
    PRODUCTS_TYPE_CAR_ALARM,
    PRODUCTS_TYPE_MOTO_ALARM,
    PRODUCTS_TYPE_IMMOBILIZERS,
    PRODUCTS_TYPE_ACCESSORIES
  ]

  if (!allowedPaths.includes(path)) {
    props.history.push('/products/car')
  }

  if (path === PRODUCTS_TYPE_CAR_ALARM && productType !== PRODUCTS_TYPE_CAR_ALARM) {
    props.changeProductType(PRODUCTS_TYPE_CAR_ALARM)
  } else if (path === PRODUCTS_TYPE_MOTO_ALARM && productType !== PRODUCTS_TYPE_MOTO_ALARM) {
    props.changeProductType(PRODUCTS_TYPE_MOTO_ALARM)
  } else if (path === PRODUCTS_TYPE_IMMOBILIZERS && productType !== PRODUCTS_TYPE_IMMOBILIZERS) {
    props.changeProductType(PRODUCTS_TYPE_IMMOBILIZERS)
  } else if (path === PRODUCTS_TYPE_ACCESSORIES && productType !== PRODUCTS_TYPE_ACCESSORIES) {
    props.changeProductType(PRODUCTS_TYPE_ACCESSORIES)
  }

  const {t} = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0)
    if (props.appLanguage && props.products && !props.products[props.appLanguage]['contentIsLoaded']) {
      props.getProducts(props.appLanguage)
    }
  }, []);

  useEffect(() => {
    if (props.appLanguage && props.products && !props.products[props.appLanguage]['contentIsLoaded']) {
      props.getProducts(props.appLanguage)
    }
  }, [props.appLanguage])


  return (
    <main>
      {/*todo <!-- Hero-image-section -->*/}
      <section
        className='hero-image-section'
        style={{backgroundImage: `url(${category_hero_bg})`}}
      >
        <div className='app-correct-info-section'>
          <p>{t('products:PRODUCTS_P_1')}</p>
        </div>
      </section>
      {/*todo  <!--/ Hero-image-section -->*/}

      {/*todo <!-- App-navlink-section -->*/}
      <section className='app-navlink-section'>
        <div className='container'>
          <ul className='flex'>
            <li><Link to='/'>Pandora</Link></li>
            <li><Link to='/products'>{t(`common:CATALOG`)}</Link></li>
            <li><span>{t(`common:${productType}`)}</span></li>
          </ul>
        </div>
      </section>
      {/*todo  <!-- /App-navlink-section -->*/}

      {/*todo <!-- Category-section -->*/}
      <section className='app-category-section'>
        <div className='container'>
          <h2 className='app-head-title'>{t(`common:${productType}`)}</h2>
          <p>{t('products:PRODUCTS_P_2')}</p>
          <div className='app-category-content'>
            <ul className='app-category_filter flex'>
              <li>
                <button
                  type='button'
                  className={`app-category-btn ${props.productSeries === PRODUCTS_SERIES_ALL ? 'active' : ''} `}
                  onClick={() => props.changeProductSeries(PRODUCTS_SERIES_ALL)}
                >{t('products:ALL_PRODUCTS')}</button>
              </li>
              <li>
                <button
                  type='button'
                  className={`app-category-btn ${props.productSeries === PRODUCTS_SERIES_DXL ? 'active' : ''} `}
                  onClick={() => props.changeProductSeries(PRODUCTS_SERIES_DXL)}
                >Pandora DXL
                </button>
              </li>
              <li>
                <button
                  type='button'
                  className={`app-category-btn ${props.productSeries === PRODUCTS_SERIES_DX ? 'active' : ''} `}
                  onClick={() => props.changeProductSeries(PRODUCTS_SERIES_DX)}
                >Pandora DX
                </button>
              </li>
              <li>
                <button
                  type='button'
                  className={`app-category-btn ${props.productSeries === PRODUCTS_SERIES_X ? 'active' : ''} `}
                  onClick={() => props.changeProductSeries(PRODUCTS_SERIES_X)}
                >Pandora X
                </button>
              </li>
            </ul>

            <div className='row'>
              {
                props.appLanguage &&
                props.products &&
                !props.products[props.appLanguage]['contentIsLoaded'] &&
                <Spinner/>
                // todo Tatev please improve Spinner position and styles
              }
              {
                props.appLanguage &&
                props.products &&
                props.products[props.appLanguage]['contentIsLoaded'] &&
                <ProductsPagination
                  productsArray={props.products[props.appLanguage]['data']}
                  displayProductsCount={props.displayProductsCount}
                  appLanguage={props.appLanguage}
                  productSeries={props.productSeries}
                  productType={productType}
                />
              }
            </div>

            <button
              type='button'
              className='app-news-more-btn'
              onClick={() => props.loadMoreProducts()}
            >
              {t('products:PRODUCTS_LOAD_MORE_BUTTON')}
            </button>
          </div>
        </div>
      </section>
      {/*todo <!-- /Category-section -->*/}
    </main>
  )
};


const mapStateToProps = state => {
  return {
    products: makeSelectProducts(state),
    displayProductsCount: makeSelectDisplayProductsCount(state),
    productSeries: makeSelectProductSeries(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeProductType: productType => dispatch(changeProductType(productType)),
    changeProductSeries: data => dispatch(changeProductSeries(data)),
    loadMoreProducts: () => dispatch(loadMoreProducts())

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Products)





