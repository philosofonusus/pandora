import React, {Fragment, useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Button} from 'antd';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';


import {
  changeProductSeries,
  changeProductType,
  getProducts,
  loadMoreProducts
} from '../../containers/Products/actions';

import {
  makeSelectDisplayProductsCount,
  makeSelectProducts,
  makeSelectProductSeries
} from '../../containers/Products/selectors';
import Spinner from '../Spinner/Spinner';


function ProductDetails(props) {
  const {t} = useTranslation();
  const [productToView, setProductToView] = useState(null);
  const [indexOfMainImage, setIndexOfMainImage] = useState(0)

  const {productType} = props.products;
  const productId = props.computedMatch.params.id;

  const findProductToView = (_productsArray, _productId) => {
    const result = _productsArray.find(product => product.id == _productId)
    return result ? result : null
  };


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

    if (props.appLanguage && props.products && props.products[props.appLanguage]['contentIsLoaded']) {
      setProductToView(() => findProductToView(props.products[props.appLanguage]['data'], productId))
    }
  }, [props.appLanguage])


  useEffect(() => {
    if (
      props.appLanguage &&
      props.products &&
      props.products[props.appLanguage]['contentIsLoaded']
    ) {

      const _productToView = findProductToView(props.products[props.appLanguage]['data'], productId)

      if (_productToView === null) {
        props.history.push('/products/car')
      } else {
        setProductToView(() => _productToView)
      }
    }
  })

  useEffect(() => {
    if (productToView) {
      const indexOfImage = productToView.productImages.findIndex(item => item.isDefault)

      if (indexOfImage !== -1) {
        setIndexOfMainImage(indexOfImage)
      } else {
        setIndexOfMainImage(0)
      }
    }
  }, [productToView])

  const downHandler = e => {
    if (e.code === 'ArrowLeft') {
      toLeft()
    }
    if (e.code === 'ArrowRight') {
      toRight()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [productToView]);


  const toLeft = () => {
    setIndexOfMainImage(prevIndex => {
      if (prevIndex == 0) {
        return productToView['productImages'].length - 1
      }
      return prevIndex - 1
    })
  }

  const toRight = () => {
    setIndexOfMainImage(prevIndex => {
      if (prevIndex == productToView['productImages'].length - 1) {
        return 0
      }
      return prevIndex + 1
    })
  };

  const buttonPrev = useRef(null);
  useEffect(
      () => {
        const id =  setInterval(()=>{buttonPrev.current .click()}, 6000);;
        return () => clearInterval(id);
      },
      []
  );

  return (
    <main>
      <section className='app-navlink-section border-top'>
        <div className='container'>
          <ul className='flex'>
            <li><Link to='/'>Pandora</Link></li>
            <li><Link to='/products'>{t(`common:CATALOG`)}</Link></li>
            <li><span>{productToView && t(`common:${productToView.type}`)}</span></li>
            <li><span>{productToView && productToView.series} {productToView && productToView.name}</span></li>
          </ul>
        </div>
      </section>

      <section className='app-subcategory-section'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-md-5 col-lg-6'>
              <div className='app-subcategory_slider'>
                {
                  props.appLanguage &&
                  props.products &&
                  !props.products[props.appLanguage]['contentIsLoaded'] &&
                  <Spinner/>
                } {
                props.appLanguage &&
                props.products &&
                props.products[props.appLanguage]['contentIsLoaded'] &&
                productToView &&
                <Fragment>

                  <div className={`swiper-container gallery-top`}>
                    <div className='swiper-wrapper'>
                      <div className={`swiper-slide`}>
                        <Button type='text' className={`swiper-button-prev`}
                                style={{fontSize: '50px', color: 'red', position: 'absolute', left: '-19px'}}
                                onClick={() => toLeft()}
                        >
                          <LeftOutlined/>
                        </Button>

                        <img
                          src={`${productToView['productImages'].length ? productToView['productImages'][indexOfMainImage]['url'] : ''}`}/>

                        <Button ref={buttonPrev} type='text' className={`swiper-button-prev`}
                                style={{fontSize: '50px', color: 'red', position: 'absolute', left: '390px'}}
                                onClick={() => toRight()}
                        >
                          <RightOutlined/>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className='swiper-container gallery-thumbs'>
                    <div className='swiper-wrapper'>
                      {
                        productToView['productImages'].map((imageObj, i) => {
                          return (
                            <div
                              className={`swiper-slide ${indexOfMainImage == i ? 'swiper-slide-thumb-active' : ''}`}
                              key={i}
                              onClick={() => setIndexOfMainImage(i)}
                            >
                              <img src={imageObj['url']}/>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>

                </Fragment>
              }
              </div>
            </div>

            <div className='col-12 col-md-7 col-lg-6'>
              <div className="app-subcategory_product">
                <h1 className="app-subcategory_product-title">
                  {t(`common:${productType}`)} {productToView && productToView.series} {productToView && productToView.name}
                </h1>
                <span className="app-subcategory_product-type">Pandora {productToView && productToView.series}</span>
                <div className="app-subcategory_product-price-box">
                  <span className="app-subcategory_product-price">
                    {productToView && productToView.price} <span>AMD/ {t('products:INCLUDING_INSTALLATION')}
                    </span>

                  </span>
                </div>

                  <p>
                  {productToView && productToView.description}
                </p>

              </div>
            </div>


          </div>
        </div>
      </section>

      <section className="app-subcategory-sameProduct-section">
        <div className="container">
          <h2 className="app-head-title">{t('products:SIMILAR_PRODUCTS')}</h2>
          <p>{t('products:PRODUCTS_P_3')}</p>

          <div className="app-category-content">
            <div className="row">
              {
                productToView &&
                props.products[props.appLanguage]['data']
                  .filter(_product => {
                    return _product.type === productToView.type && _product.series === productToView.series && _product.id !== productToView.id
                  })
                  .slice(0, 3)
                  .map(product => {
                    const indexOfDefaultUrl = product
                      .productImages
                      .findIndex(item => item.isDefault)

                    const imageUrl = indexOfDefaultUrl !== -1 ? (
                      product.productImages[indexOfDefaultUrl].url
                    ) : (product.productImages[0].url)

                    return (
                      <div key={`${product.id}_${props.appLanguage}`} className='col-12 col-md-6 col-lg-4'>
                        <Link
                          to={`/product/${product.id}`}
                          className={`category-cart`}
                          onClick={() => {
                            window.scrollTo(0, 0)
                          }}
                        >
                          <div className='category-cart-header'>
                            <img src={imageUrl} title={``}/>
                          </div>
                          <div className={`category-cart-body`}>
                            <h4 className={`category-cart-title`}>
                              {t(`common:${productType}`)} {product.series} {product && product.name}
                            </h4>
                              <p>
                              {product.description}
                            </p>
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


              <div className="col-12 col-md-6 col-lg-4">

              </div>


            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


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
    getProducts: language => dispatch(getProducts(language)),
    changeProductSeries: data => dispatch(changeProductSeries(data)),
    loadMoreProducts: () => dispatch(loadMoreProducts())

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)



