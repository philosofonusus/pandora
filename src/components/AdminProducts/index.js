import React, {Fragment, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from "react-i18next";

import 'antd/dist/antd.css';
import {Row, Col, List, InputNumber, Input, Collapse, Button, Form, Radio, message, Checkbox} from 'antd';

import {
  createProductStart,
  resetProductMessages,
  removeProductStart,
  addCarsToProductStart,
  getCars,
  getProductsShortInfoStart,
  getProductByIdStart
} from '../../containers/Admin/actions';
import {
  PRODUCTS_TYPE_CAR_ALARM, PRODUCTS_TYPE_MOTO_ALARM, PRODUCTS_TYPE_IMMOBILIZERS, PRODUCTS_TYPE_ACCESSORIES,
  PRODUCTS_SERIES_DXL, PRODUCTS_SERIES_DX, PRODUCTS_SERIES_X
} from "../../containers/Products/constants";

import {productDescriptorsFunc} from '../../containers/Admin/arrays';
import {
  makeSelectProductSuccess,
  makeSelectProductFail,
  makeSelectProductsShortInfo,
  makeSelectProductsCars
} from '../../containers/Admin/selectors'

import './style.css'

const {Panel} = Collapse;
const CheckboxGroup = Checkbox.Group;


function AdminProduct(props) {
  const dispatch = useDispatch();
  const success = (text) => {
    message.success(text, 5)
      .then(() => dispatch(resetProductMessages()))
  };
  const error = (text) => {
    message.error(text, 5)
      .then(() => dispatch(resetProductMessages()))
  };

  const productSuccess = useSelector(makeSelectProductSuccess)
  const productsShortInfo = useSelector(makeSelectProductsShortInfo)
  const productsCars = useSelector(makeSelectProductsCars)
  const productFail = useSelector(makeSelectProductFail)

  const {products, appLanguage} = props;

  const callback = (key) => {
    key.length && dispatch(getProductByIdStart(JSON.parse(key)['id']))
  }


  const [form] = Form.useForm();
  const {t} = useTranslation();
  const [images, setImages] = useState({})
  const [productFilterParams, setProductFilterParams] = useState({
    type: PRODUCTS_TYPE_CAR_ALARM,
    series: PRODUCTS_SERIES_DXL
  })
  const [loadCount, setLoadCount] = useState(10);
  const [carsCheckboxes, setCarsCheckboxes] = useState({})

  const modelsToAddToProducts = (carsArr, productsArr) => {
    const modelsToAddToProducts = {};

    productsArr.forEach(product => {
      const carModelsOnProductObj = {};
      const modelsToAddArr = [];

      product.cars.forEach(carOnProduct => {
        carModelsOnProductObj[carOnProduct.id] = carOnProduct;
      })

      carsArr.forEach(car => {
        if (!carModelsOnProductObj[car.id]) {
          modelsToAddArr.push({label: `${car.make} ${car.model}`, value: car.id})
        }
      })

      modelsToAddToProducts[product.id] = {
        options: modelsToAddArr,
        checkedList: [],
        indeterminate: true,
        checkAll: false
      }
    })

    setCarsCheckboxes(modelsToAddToProducts)
  }

  const checkBoxOnChange = (checkedList, productId) => {
    setCarsCheckboxes(prevState => {
      return {
        ...prevState,
        [productId]: {
          ...prevState[productId],
          checkedList,
          indeterminate: !!checkedList.length && checkedList.length < carsCheckboxes[productId].options.length,
          checkAll: checkedList.length === carsCheckboxes[productId].options.length,
        }
      }
    })
  }

  const checkBoxOnCheckAllChange = (e, productId) => {
    setCarsCheckboxes(prevState => {
      return {
        ...prevState,
        [productId]: {
          ...prevState[productId],
          checkedList: e.target.checked ? carsCheckboxes[productId].options : [],
          indeterminate: false,
          checkAll: e.target.checked,
        }
      }
    })
  }

  const formItemLayout = {labelCol: {span: 6,}, wrapperCol: {span: 14}};
  const validationRule1 = {
    required: true,
    message: t('common:PLEASE_SELECT_THE_FIELD')
  }
  const onFinish = values => {
    const {productName: name, series, type, price, en, ru, arm} = values;

    const productToCreate = {
      name,
      series,
      type,
      price,
      productTranslations: [
        {
          language: 'ru',
          description: ru,
          isDefault: false
        }, {
          language: 'arm',
          description: arm,
          isDefault: false
        }
      ],
      productImages: []
    }

    if (en) {
      productToCreate.productTranslations.push({language: 'en', isDefault: true, description: en})
    }

    for (let i = 1; i <= 6; i++) {
      if (values[`image${i}`]) {
        productToCreate.productImages.push({url: values[`image${i}`]})
      }
    }

    dispatch(createProductStart(productToCreate))
  };


  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getCars())
    dispatch(getProductsShortInfoStart())
  }, []);

  useEffect(() => {
    productSuccess && success(productSuccess)
    productFail && error(productFail)
  }, [productSuccess, productFail])

  useEffect(() => {
    dispatch(getProductsShortInfoStart())

    if (productSuccess) {
      form.resetFields()
      setImages({})
      dispatch(getProductsShortInfoStart())
    }
  }, [productSuccess])

  useEffect(() => {
    if (props.cars && Object.values(productsCars).length) {
      modelsToAddToProducts(props.cars, Object.values(productsCars))
    }
  }, [props.cars, productsCars])


  return (
    <Fragment>
      <Form
        form={form}
        name='validate_other'
        {...formItemLayout}
        initialValues={{'type': PRODUCTS_TYPE_CAR_ALARM, 'series': PRODUCTS_SERIES_DXL}}
        onFinish={onFinish}
        className='ant-form-create-product'
      >

        <Form.Item name='typeLabel' label={``}>
          <span className='ant-form-create-header'>Create New Product </span>
        </Form.Item>
        <Form.Item
          name='productName'
          label={`Product Name`}
          rules={[validationRule1]}
        >
          <Input placeholder="Please Enter Product Name"/>
        </Form.Item>


        <Form.Item
          name='type'
          label={`${t('common:SELECT_TYPE')}`}
          rules={[validationRule1]}
        >
          <Radio.Group>
            <Radio value={PRODUCTS_TYPE_CAR_ALARM}>{t('common:PRODUCTS_TYPE_CAR_ALARM').split(' ')[0]}</Radio>
            <Radio value={PRODUCTS_TYPE_MOTO_ALARM}>{t('common:PRODUCTS_TYPE_MOTO_ALARM').split(' ')[0]}</Radio>
            <Radio value={PRODUCTS_TYPE_IMMOBILIZERS}>{t('common:PRODUCTS_TYPE_IMMOBILIZERS').split(' ')[0]}</Radio>
            <Radio value={PRODUCTS_TYPE_ACCESSORIES}>{t('common:PRODUCTS_TYPE_ACCESSORIES').split(' ')[0]}</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name='series'
          label={`${t('common:SELECT_SERIES')}`}
        >
          <Radio.Group>
            <Radio value={PRODUCTS_SERIES_DXL}>{PRODUCTS_SERIES_DXL}</Radio>
            <Radio value={PRODUCTS_SERIES_DX}>{PRODUCTS_SERIES_DX}</Radio>
            <Radio value={PRODUCTS_SERIES_X}>{PRODUCTS_SERIES_X}</Radio>
            <Radio value={`Other`}>Other</Radio>
          </Radio.Group>
        </Form.Item>


        <Form.Item label="Product Price" name={`price`} rules={[validationRule1]}>
          <InputNumber placeholder="Please Enter Product Price"/>
        </Form.Item>


        <Form.Item name="en" label={`English: Product Description`}>
          <Input.TextArea placeholder="Please Enter Product Description in English"/>
        </Form.Item>

        <Form.Item name="ru" label={`Russian: Product Description`} rules={[validationRule1]}>
          <Input.TextArea placeholder="Please Enter Product Description in Russian"/>
        </Form.Item> <Form.Item name="arm" label={`Armenian: Product Description`} rules={[validationRule1]}>
        <Input.TextArea placeholder="Please Enter Product Description in Armenian"/>
      </Form.Item>


        <Form.Item
          name='image1'
          shouldUpdate={true}
          label={`Image URL`}
          rules={[validationRule1]}
          onChange={e => {
            const _e = e.target.value
            setImages(prevState => ({...prevState, ['image1']: _e}))
          }}
        >
          <Input placeholder="Please Enter Image URL"/>
        </Form.Item>
        {images.image1 &&
        <Form.Item>
          <div>
            <img src={images.image1} alt={``}/>
          </div>
        </Form.Item>
        }

        {
          [2, 3, 4, 5, 6].map(imageN => {
            return (
              <Fragment>
                <Form.Item
                  name={`image${imageN}`}
                  shouldUpdate={true}
                  label={`Image URL`}
                  onChange={e => {
                    const _e = e.target.value
                    setImages(prevState => ({...prevState, [`image${imageN}`]: _e}))
                  }}
                >
                  <Input placeholder="Please Enter Image URL"/>
                </Form.Item>
                {images[`image${imageN}`] &&
                <Form.Item>
                  <div>
                    <img src={images[`image${imageN}`]} alt={``}/>
                  </div>
                </Form.Item>
                }
              </Fragment>
            )
          })
        }


        <Form.Item wrapperCol={{span: 12, offset: 6,}}>
          <Button type='primary' htmlType='submit'>
            Create Product
          </Button>
        </Form.Item>

      </Form>


      <Row gutter={[8, 8]} justify={'space-around'} align={`middle`}>
        <Col span={24} style={{backgroundColor: 'rgb(150, 154, 157)', height: '100px'}}>
          <Radio.Group value={productFilterParams.type}
                       onChange={e => setProductFilterParams(prevState => {
                         return {
                           ...prevState,
                           type: e.target.value
                         }
                       })}
          >
            <Radio value={PRODUCTS_TYPE_CAR_ALARM}>{t('common:PRODUCTS_TYPE_CAR_ALARM').split(' ')[0]}</Radio>
            <Radio value={PRODUCTS_TYPE_MOTO_ALARM}>{t('common:PRODUCTS_TYPE_MOTO_ALARM').split(' ')[0]}</Radio>
            <Radio value={PRODUCTS_TYPE_IMMOBILIZERS}>{t('common:PRODUCTS_TYPE_IMMOBILIZERS').split(' ')[0]}</Radio>
            <Radio value={PRODUCTS_TYPE_ACCESSORIES}>{t('common:PRODUCTS_TYPE_ACCESSORIES').split(' ')[0]}</Radio>
          </Radio.Group>
        </Col>
      </Row>

      <Row gutter={[8, 8]} justify={'space-around'} align={`middle`}>
        <Col span={24} style={{
          backgroundColor: 'rgb(150, 154, 157)',
          height: '100px'
        }}>
          <Radio.Group
            value={productFilterParams.series}
            onChange={e => setProductFilterParams(prevState => {
              return {...prevState, series: e.target.value}
            })
            }
          >
            <Radio value={PRODUCTS_SERIES_DXL}>{PRODUCTS_SERIES_DXL}</Radio>
            <Radio value={PRODUCTS_SERIES_DX}>{PRODUCTS_SERIES_DX}</Radio>
            <Radio value={PRODUCTS_SERIES_X}>{PRODUCTS_SERIES_X}</Radio>
            <Radio value={`Other`}>Other</Radio>
          </Radio.Group>
        </Col>
      </Row>


      {

        productsShortInfo && productsShortInfo.length &&
        productsShortInfo
          .filter(_product => {
            return (
              _product.type === productFilterParams.type &&
              _product.series === productFilterParams.series
            )
          })
          .slice(0, loadCount)
          .map(product => {
            const productDescriptors = productDescriptorsFunc(product)

            return (
              <div className={`product-admin`}>
                {/*<Row gutter={[8, 8]} justify={'space-around'} key={product.id}
                     onClick={e => {
                     }}
                >
                  {
                    product.productImages.map(image => {
                      return (
                        <Col span={3}>
                          <img src={image.url} alt={`${product.name}`}/>
                        </Col>
                      )
                    })
                  }
                </Row>*/}
                <Row gutter={[8, 8]} justify={'space-around'}>
                  <Col span={6}>
                    <List
                      dataSource={productDescriptors}
                      renderItem={item => (
                        <List.Item
                          bordered
                          className={`productDescriptors`}
                        >
                          {item.title}: {item.value}
                        </List.Item>
                      )}
                    />
                  </Col>
                  <Col span={18}>
                    <List
                      dataSource={[{title: 'description', value: product.description}]}
                      renderItem={item => (
                        <List.Item bordered className={`productDescriptors`} key={`${product.id}_${appLanguage}`}>
                          {item.value}
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>
                <Row gutter={[8, 8]} justify={'space-around'}>
                  <Collapse onChange={callback} style={{width: '95%'}} forceRender={true}>
                    <Panel header='Models Attached To Product'
                           key={JSON.stringify({modelsAttached: true, id: product.id})}>
                      {
                        productsCars[product.id] &&
                        productsCars[product.id].cars
                          .sort((a, b) => {
                            if (a.make < b.make) return -1
                            if (a.make > b.make) return 1
                            return 0
                          })
                          .map(car => {
                            return (
                              <span key={`${product.id}_${car.id}`} style={{display: 'flex'}}>
                          {car.make}: {car.model}
                        </span>
                            )
                          })}
                    </Panel>
                    <Panel
                      header='Add Model To Product'
                      key={JSON.stringify({addModel: true, id: product.id})}
                    >

                      {
                        Object.keys(carsCheckboxes).length &&
                        carsCheckboxes[product.id] &&
                        <Fragment>
                          <div className="site-checkbox-all-wrapper">
                            <Checkbox
                              indeterminate={carsCheckboxes[product.id].indeterminate}
                              onChange={(e) => checkBoxOnCheckAllChange(e, product.id)}
                              checked={carsCheckboxes[product.id].checkAll}
                            >
                              Check all
                            </Checkbox>
                          </div>
                          <br/>
                          <CheckboxGroup
                            options={carsCheckboxes[product.id].options}
                            value={carsCheckboxes[product.id].checkedList}
                            onChange={(checkedList, productId) => checkBoxOnChange(checkedList, product.id)}
                          />
                          <div style={{padding: '40px 0px'}}>
                            <Button type='primary' htmlType='submit'
                                    onClick={e => {
                                      dispatch(addCarsToProductStart({
                                        productId: product.id,
                                        cars: carsCheckboxes[product.id].checkedList
                                      }))
                                    }}

                            >
                              Add Models
                            </Button>
                          </div>
                        </Fragment>

                      }

                    </Panel>
                  </Collapse>
                </Row>
                <Row gutter={[8, 8]} justify={'space-around'} style={{padding: '40px 0px'}}>
                  <Button
                    type="primary"
                    danger
                    onClick={e => dispatch(removeProductStart(product.id))}
                  >
                    DELETE PRODUCT
                  </Button>

                </Row>
              </div>
            )
          })

      }


      <button
        type='button'
        className='app-news-more-btn'
        onClick={() => setLoadCount(prevState => prevState + 10)}
      >
        {t('products:PRODUCTS_LOAD_MORE_BUTTON')}
      </button>

    </Fragment>
  )

}


export default AdminProduct;
