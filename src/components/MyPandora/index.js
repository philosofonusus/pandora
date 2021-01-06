import React, {Fragment, useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {Modal, Form, Select, Radio, Button} from 'antd';
import 'antd/dist/antd.css';
import {useTranslation} from 'react-i18next';

import {makeSelectAppLanguage} from '../../containers/App/selectors';
import {
  PRODUCTS_TYPE_CAR_ALARM,
  PRODUCTS_TYPE_MOTO_ALARM,
  IGNITION_TYPE_START_STOP,
  IGNITION_TYPE_KEY,
  IGNITION_TYPE_HYBRID
} from '../../containers/Products/constants';
import {makeSelectProducts} from '../../containers/Products/selectors';

import './style.css';

const {Option} = Select;
const formItemLayout = {labelCol: {span: 6}, wrapperCol: {span: 14,}};


function MyPandora(props) {
  const {products, appLanguage} = props
  const [searchParams, setSearchParams] = useState({
    makeObj: {},
    type: PRODUCTS_TYPE_CAR_ALARM,
    keyType: IGNITION_TYPE_START_STOP,
    make: '',
    model: ''
  })


  useEffect(() => {
      if (products && products[appLanguage] && products[props.appLanguage].contentIsLoaded) {
        makeModelObj()
      }
    }, [props.products])

  const [form] = Form.useForm();
  const {t} = useTranslation();
  const [visible, setVisible] = useState(false);
  const [productsListToOffer, setProductsListToOffer] = useState(null)

  const makeModelObj = () => {
    try{
      const _makeObj = JSON.parse(JSON.stringify(searchParams.makeObj, null, 2))
      products[appLanguage].data.forEach(product => {
            product.cars.forEach(car => {
              if (!_makeObj[car['make']]) {
                _makeObj[car['make']] = {
                  [product.type]: {
                    [car.model]: car.model
                  }
                }
              } else if (_makeObj[car['make']] && ! _makeObj[car['make']][product.type]) {
                _makeObj[car['make']][product.type] = {
                  [car.model]:  car.model
                }
              } else if (_makeObj[car['make']] && _makeObj[car['make']][product.type] && ! _makeObj[car['make']][product.type][car['model']]){
                _makeObj[car['make']][product.type][car['model']] =  car.model
              }
            })
          }
      )

      setSearchParams(prevState => {
        return {...prevState, makeObj: _makeObj}
      })
    }catch (e) {
      console.log(e)}

  }

  const onFinish = values => {
    try{
    const {type, keyType, make, model} = values;
    const list = products[appLanguage].data.filter(product => {
      return product.cars.some(car => {
        return product.type === type && car.keyType === keyType && car.make === make && car.model === model
      })
    })
    setProductsListToOffer(list)}catch (e) {
      console.log(e)
    }
  };

  const validationRule1 = {
    required: true,
    message: t('common:PLEASE_SELECT_THE_FIELD'),
  }

  let isCloseModal = null;
  const handleTClose = () => {
    isCloseModal.classList.add('hide');
  };

  const handleTOpen = () => {
    isCloseModal.classList.remove('hide');
  };
  const closeMobMenu = ()=> {
    document.querySelector('.app-navbar_toggle-btn').classList.remove('active');
    document.querySelector('.app-navbar_content').classList.remove('active');
  };

  return (
    <Fragment>
      <Button onMouseUp={closeMobMenu}  type='primary' onClick={() => setVisible(true)} className={'app-navbar_btn'}>
        {t('common:MY_PANDORA')}
      </Button>

      <Modal
        title={t('common:MY_PANDORA')}
        left
        visible={visible}
        footer={null}
        onOk={() => setVisible(false)}
        onCancel={() => {
          setVisible(false)
        }}
      >


        <Form
          form={form}
          name='validate_other'
          {...formItemLayout}
          initialValues={{
            'type': searchParams.type,
            'keyType': searchParams.keyType
          }}
          onValuesChange={(changedFields, allFields) => setProductsListToOffer(null)}
          onFinish={onFinish}
        >

          <div ref={(input) => { isCloseModal = input; }} className={`productsListToOffer ${productsListToOffer ? 'showProductsListToOffer' : ''}`}>
            <div className="productsListToOffer_top">
              <span>Результат поиска:</span>
              <button type="button" className="productsListClose_btn" onClick={handleTClose}>
                <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="close" width="1em" height="1em"
                     fill="currentColor" aria-hidden="true">
                  <path
                      d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                </svg>
              </button>
            </div>

            {
              productsListToOffer && productsListToOffer.length === 0 &&
              <div className={`no-products-to-offer`}>{t('common:NO_PRODUCTS_TO_OFFER')}</div>
            }

            {
              productsListToOffer && productsListToOffer.length &&
                <Fragment>
                  <ul>
                    {
                      productsListToOffer.map(product => {
                        return (
                          <li key={product.id}
                          onClick={e => {
                            setVisible(false)
                          }}
                          >
                            <NavLink
                              to={`/product/${product.id}`}
                              className={`products-list-to-offer-item`}
                              activeClassName={`products-list-to-offer-item-active`}
                            >
                              {product.name}
                            </NavLink>
                          </li>
                        )
                      })
                    }
                  </ul>

                </Fragment>
            }

          </div>


          <Form.Item name='typeLabel' label={``}>
            <span className='ant-form-text'>{t('common:SELECT_TYPE')}</span>
          </Form.Item>
          <Form.Item
            name='type'
            label={``}
            rules={[validationRule1]}
            onChange={e => form.resetFields(['model', 'make'])}
          >
            <Radio.Group >
              <Radio value={PRODUCTS_TYPE_CAR_ALARM}>{t('common:PRODUCTS_TYPE_CAR_ALARM').split(' ')[0]}</Radio>
              <Radio value={PRODUCTS_TYPE_MOTO_ALARM}>{t('common:PRODUCTS_TYPE_MOTO_ALARM').split(' ')[0]}</Radio>
            </Radio.Group>
          </Form.Item>


          <Form.Item label={``}>
            <span className='ant-form-text'>{t('common:SELECT_TYPE_IGNITION')}</span>
          </Form.Item>
          <Form.Item
            name='keyType'
            label={``}
            rules={[validationRule1]}
            onChange={e => form.resetFields(['model', 'make'])}
          >
            <Radio.Group>
              <Radio
                value={IGNITION_TYPE_START_STOP}
                onChange={() => {
                  form.resetFields(['model', 'make'])
                }}
              >{t('common:IGNITION_TYPE_START_STOP')}</Radio>
              <Radio value={IGNITION_TYPE_KEY}>{t('common:IGNITION_TYPE_KEY')}</Radio>
              <Radio value={IGNITION_TYPE_HYBRID}>{t('common:IGNITION_TYPE_HYBRID')}</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label={``}>
            <span className='ant-form-text'>{t('common:CHOOSE_BRAND')}</span>
          </Form.Item>
          <Form.Item name='make' label={``} hasFeedback rules={[validationRule1]}>
            <Select  className={'selectModal'} placeholder={t('common:CHOOSE_BRAND')}
                    onChange={e => {
                      form.resetFields(['model'])
                      setSearchParams(prevState => {
                        return {...prevState, make: e}
                      })
                    }}
            >
              {
                Object.keys(searchParams.makeObj).length &&
                Object.keys(searchParams.makeObj).map(make => {
                  return (
                    <Option value={make} key={make}>{make}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>

          <Form.Item label={``}>
            <span className='ant-form-text'>{t('common:CHOOSE_MODEL_AND_YEAR')}</span>
          </Form.Item>
          <Form.Item name='model' label={``} hasFeedback rules={[validationRule1]}>
            <Select className={'selectModal'}
              placeholder={t('common:CHOOSE_MODEL_AND_YEAR')}
              onChange={e => {
                setSearchParams(prevState => {
                  return {...prevState, model: e}
                })
              }}
              disabled={searchParams.make ? false : true}
            >

              {
                searchParams.make &&
                Object.values(searchParams.makeObj[searchParams.make][searchParams.type])
                  .map(_model => {
                  return (
                      <Option value={_model} key={_model}>{_model}</Option>
                    )
                  })
              }
            </Select>
          </Form.Item>


          <Form.Item wrapperCol={{span: 12, offset: 6,}}>
            <Button type='primary' htmlType='submit' onClick={handleTOpen}>
              {t('common:SEARCH_DEVICE')}
            </Button>
          </Form.Item>

        </Form>

      </Modal>
    </Fragment>
  );
}


const mapStateToProps = state => {
  return {
    products: makeSelectProducts(state),
    appLanguage: makeSelectAppLanguage(state)
  }
};


export default connect(mapStateToProps, null)(MyPandora)
