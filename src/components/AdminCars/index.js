import React, {Fragment, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import 'antd/dist/antd.css';
import {Input, Button, Form, Radio, Select, message} from 'antd';

import {makeSelectCarSuccess, makeSelectCarFail} from '../../containers/Admin/selectors'
import {createCarStart, getCars, resetCarMessages, removeCarStart} from '../../containers/Admin/actions';
import {IGNITION_TYPE_START_STOP, IGNITION_TYPE_KEY, IGNITION_TYPE_HYBRID} from '../../containers/Products/constants';

import './style.css'
const {Option} = Select;


function AdminCars(props) {

  const dispatch = useDispatch();
  const success = (text) => {
    message.success(text, 5)
      .then(() => dispatch(resetCarMessages()))
  };
  const error = (text) => {
    message.error(text, 5)
      .then(() => dispatch(resetCarMessages()))
  };

  const carSuccess = useSelector(makeSelectCarSuccess)
  const carFail = useSelector(makeSelectCarFail)

  const [form] = Form.useForm();
  const {t} = useTranslation();

  const [loadCount, setLoadCount] = useState(10);

  const formItemLayout = {labelCol: {span: 6,}, wrapperCol: {span: 14}};
  const validationRule1 = {
    required: true,
    message: t('common:PLEASE_SELECT_THE_FIELD')
  }

  const onFinish = values => {
    const {keyType, make, model} = values;
    dispatch(createCarStart({keyType, make, model}))
  }


  const [carsList, setCarsList] = useState({})
  const [carMake, setCarMake] = useState('')

  const structureCarsList = (_cars) => {
    const obj = {}
    _cars.forEach(car => {
      if (!obj[car.make]) {
        obj[car.make] = car.make
      }
      setCarsList(Object.keys(obj).sort())
      setCarMake(carsList[0])
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getCars())
  }, [])

  useEffect(() => {
    carSuccess && success(carSuccess)
    carFail && error(carFail)
    dispatch(getCars())
  }, [carSuccess, carFail])

  useEffect(() => {
    if (props.cars && props.cars.length) {
      structureCarsList(props.cars)
    }
  }, [props.cars])


  useEffect(() => {
    dispatch(getCars())
    if (carSuccess) {
      form.resetFields()
    }
  }, [carSuccess])

  return (
    <Fragment>
      <Form
        form={form}
        name='validate_other'
        {...formItemLayout}
        onFinish={onFinish}
        className='ant-form-create-product'
      >

        <Form.Item name='typeLabel' label={``}>
          <span className='ant-form-create-header'>Create New Car </span>
        </Form.Item>


        <Form.Item name='make' label={`Manufacturer`} rules={[validationRule1]}>
          <Input placeholder='Please Enter Manufacturer'/>
        </Form.Item>

        <Form.Item
          name='model'
          label={`Model`}
          rules={[validationRule1]}
        >
          <Input placeholder='Please Enter Model'/>
        </Form.Item>


        <Form.Item label={``}>
          <span className='ant-form-text'>{t('common:SELECT_TYPE_IGNITION')}</span>
        </Form.Item>
        <Form.Item name='keyType' label={``} rules={[validationRule1]}>
          <Radio.Group>
            <Radio value={IGNITION_TYPE_START_STOP}>{t('common:IGNITION_TYPE_START_STOP')}</Radio>
            <Radio value={IGNITION_TYPE_KEY}>{t('common:IGNITION_TYPE_KEY')}</Radio>
            <Radio value={IGNITION_TYPE_HYBRID}>{t('common:IGNITION_TYPE_HYBRID')}</Radio>
          </Radio.Group>
        </Form.Item>


        <Form.Item wrapperCol={{span: 12, offset: 6,}}>
          <Button type='primary' htmlType='submit'>
            Create Car
          </Button>
        </Form.Item>

      </Form>


      <div style={{width: '100%', backgroundColor: 'rgb(150, 154, 157)', height: '100px'}}>
        <Select
          style={{width: '200px'}}
          placeholder={t('common:CHOOSE_MODEL_AND_YEAR')}
          value={carMake}
          onChange={e => setCarMake(e)}
        >
          {
            carsList.length &&
            carsList
              .map(make => {
                return (
                  <Option value={make} key={make} style={{width: '150px'}}>{make}</Option>
                )
              })
          }
        </Select>
      </div>
      
      {
        props.cars && carsList && carsList.length &&
        props.cars.filter(car => {

          return car.make === carMake
        })
          .slice(0, loadCount)
          .sort()
          .map(car => {

            return (
              <div className={`car-admin`} key={car.id}>
                <div> {car.make} {car.model} {t(`common:${car.keyType}`)}</div>
                <Button
                  type='primary'
                  danger
                  onClick={e => dispatch(removeCarStart(car.id))
                  }
                >
                  DELETE CAR
                </Button>
              </div>
            )
          })

      }


      <button
        type='button'
        className='app-news-more-btn'
        onClick={() =>{
          setLoadCount(prevState => prevState + 10)
          console.log(loadCount)
        } }
      >
        {t('products:PRODUCTS_LOAD_MORE_BUTTON')}
      </button>

    </Fragment>
  )
}


export default AdminCars;

