import React, {Fragment, useState, useEffect} from 'react';
import ReactPlayer from 'react-player/lazy'

import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {Row, Input, Button, Form, message} from 'antd';

import 'antd/dist/antd.css';

import {createNewsStart, resetNewsMessages, removeNewsStart} from '../../containers/Admin/actions';
import {LANGUAGE_EN, LANGUAGE_RU, LANGUAGE_ARM} from '../../containers/App/constants';
import {getNewses} from '../../containers/News/actions';
import {makeSelectNewsSuccess, makeSelectNewsFail} from '../../containers/Admin/selectors'

import Spinner from '../Spinner/Spinner';

import './style.css'


const CheckVideoOrImg = ({imageUrl, videoUrl, title}) => {
  const [className, setPlayClass] = useState('news-cart-header')

  if (videoUrl) {
    return (
      <div className={`${className}`}>
        <ReactPlayer
          url={videoUrl}
          onPlay={() => {
            setPlayClass('news-cart-header-play')
          }}
          onPause={() => setPlayClass('news-cart-header')}
          onEnded={() => setPlayClass('news-cart-header')}
        />
      </div>
    )
  }

  return (
    <div className='news-cart-header'>
      <img src={imageUrl} alt={title}/>
    </div>
  )
}


function AdminNews(props) {
  const dispatch = useDispatch();
  const success = (text) => {
    message.success(text, 5)
      .then(() => dispatch(resetNewsMessages()))
  };
  const error = (text) => {
    message.error(text, 5)
      .then(() => dispatch(resetNewsMessages()))
  };

  const newsSuccess = useSelector(makeSelectNewsSuccess)
  const newsFail = useSelector(makeSelectNewsFail)

  const {appLanguage} = props; 


  const [form] = Form.useForm();
  const {t} = useTranslation();
  const [images, setImages] = useState({})

  const [loadCount, setLoadCount] = useState(10);
  const [className, setPlayClass] = useState('news-cart-header')

  const formItemLayout = {labelCol: {span: 6,}, wrapperCol: {span: 14}};
  const validationRule1 = {
    required: true,
    message: t('common:PLEASE_SELECT_THE_FIELD')
  }
  const onFinish = values => {
    const {imageUrl, videoUrl, titleEn, titleRu, titleArm, descriptionArm, descriptionEn, descriptionRu} = values;
    const newNews = {
      imageUrl,
      videoUrl,
      newsTranslations: [
        {isDefault: true, language: 'en', title: titleEn, description: descriptionEn},
        {isDefault: false, language: 'ru', title: titleRu, description: descriptionRu},
        {isDefault: false, language: 'arm', title: titleArm, description: descriptionArm}
      ]
    }

    dispatch(createNewsStart(newNews))
  };


  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getNewses(LANGUAGE_EN))
    dispatch(getNewses(LANGUAGE_RU))
    dispatch(getNewses(LANGUAGE_ARM))
  }, []);

  useEffect(() => {
    newsSuccess && success(newsSuccess)
    newsFail && error(newsFail)
  }, [newsSuccess, newsFail])

  useEffect(() => {
    dispatch(getNewses(LANGUAGE_EN))
    dispatch(getNewses(LANGUAGE_RU))
    dispatch(getNewses(LANGUAGE_ARM))
    if (newsSuccess) {
      form.resetFields()
      setImages({})
    }
  }, [newsSuccess])

  console.log(props)

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
          <span className='ant-form-create-header'>Create New Product </span>
        </Form.Item>


        <Form.Item name='titleEn' label={`English Title`}>
          <Input placeholder='Please Enter English Title'/>
        </Form.Item>
        <Form.Item name='descriptionEn' label={`English: News Description`}>
          <Input.TextArea placeholder='Please Enter News Description in English'/>
        </Form.Item>


        <Form.Item
          name='titleRu'
          label={`Russian Title`}
          rules={[validationRule1]}
        >
          <Input placeholder='Please Enter Russian Title'/>
        </Form.Item>
        <Form.Item name='descriptionRu' label={`Russian: News Description`} rules={[validationRule1]}>
          <Input.TextArea placeholder='Please Enter News Description in Russian'/>
        </Form.Item>


        <Form.Item
          name='titleArm'
          label={`Armenian Title`}
          rules={[validationRule1]}
        >
          <Input placeholder='Please Enter Armenian Title'/>
        </Form.Item>
        <Form.Item name='descriptionArm' label={`Armenian: News Description`} rules={[validationRule1]}>
          <Input.TextArea placeholder='Please Enter News Description in Armenian'/>
        </Form.Item>


        <Form.Item
          name='imageUrl'
          shouldUpdate={true}
          label={`Image URL`}
          onChange={e => {
            const _e = e.target.value
            setImages(prevState => ({...prevState, ['imageUrl']: _e}))
          }}
        >
          <Input placeholder='Please Enter Image URL'/>
        </Form.Item>
        {images.imageUrl &&
        <Form.Item>
          <div>
            <img src={images.imageUrl} alt={``}/>
          </div>
        </Form.Item>
        }


        <Form.Item
          name='videoUrl'
          shouldUpdate={true}
          label={`Video URL`}
          // rules={[validationRule1]}
          onChange={e => {
            const _e = e.target.value
            setImages(prevState => ({...prevState, ['videoUrl']: _e}))
          }}
        >
          <Input placeholder='Please Enter Image URL'/>
        </Form.Item>
        {images.videoUrl &&
        <Form.Item>

          <div className={`${className}`}>
            <ReactPlayer
              url={images.videoUrl}
              onPlay={() => {
                setPlayClass('news-cart-header-play')
              }}
              onPause={() => setPlayClass('news-cart-header')}
              onEnded={() => setPlayClass('news-cart-header')}
            />
          </div>
        </Form.Item>
        }


        <Form.Item wrapperCol={{span: 12, offset: 6,}} style={{padding: '40px 0px'}}>
          <Button type='primary' htmlType='submit'>
            Create News
          </Button>
        </Form.Item>
      </Form>

      {
        props.appLanguage && props.newses && 
        !props.newses[props.appLanguage]['contentIsLoaded'] &&
        <Spinner/>
        // todo Tatev please improve Spinner position and styles
      }

      {
        props.appLanguage &&
        props.newses &&
        props.newses[props.appLanguage]['contentIsLoaded'] &&
        <Fragment>
          {
            props.newses[props.appLanguage].data
              .map(news => {
                const {imageUrl, videoUrl, title, description} = news;
                return (
                  <div key={`${news.id}_${appLanguage}`} style={{borderBottom: '3px solid black' , padding: '16px 6px' }}>
                    <div>
                      {
                        <CheckVideoOrImg
                          imageUrl={imageUrl}
                          videoUrl={videoUrl}
                          title={title}
                        />
                      }
                      <div>
                        <h4>{title}</h4>
                        <div className='flex'>
                                            <span className='news-cart-date'>
                                                <span className='news-day'>{new Date(news.createdDate).getDate()}</span>
                                              {moment(news.createdDate).format('MM')}/{moment(news.createdDate).format('YY')}
                                            </span>
                          <p>
                            {description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Row gutter={[8, 8]} justify={'space-around'} style={{padding: '40px 0px'}}>
                      <Button
                        type='primary'
                        danger
                        onClick={e => {
                          dispatch(removeNewsStart(news.id))
                        }}
                      >
                        DELETE NEWS
                      </Button>
                    </Row>
                  </div>
                )
              })
          }
        </Fragment>
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


export default AdminNews;
