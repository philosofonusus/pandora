import React, {Fragment, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Input, Button, Form, Select, message} from 'antd';
import 'antd/dist/antd.css';

import {createContentStart, resetContentMessages, removeContentStart} from '../../containers/Admin/actions';
import {getContent} from '../../containers/App/actions';
import {makeSelectContentSuccess, makeSelectContentFail} from '../../containers/Admin/selectors'
import {
  LANGUAGE_EN,
  LANGUAGE_RU,
  LANGUAGE_ARM,
  SLIDE_1_LINE_1_PART_1,
  SLIDE_1_LINE_1_PART_2,
  SLIDE_1_LINE_2_PART_1,
  SLIDE_1_LINE_2_PART_2,
  SLIDE_1_PARAGRAPH,
  SLIDE_2_LINE_1_PART_1,
  SLIDE_2_LINE_1_PART_2,
  SLIDE_2_LINE_2_PART_1,
  SLIDE_2_LINE_2_PART_2,
  SLIDE_2_PARAGRAPH,
  SLIDE_3_LINE_1_PART_1,
  SLIDE_3_LINE_1_PART_2,
  SLIDE_3_LINE_2_PART_1,
  SLIDE_3_LINE_2_PART_2,
  SLIDE_3_PARAGRAPH,
  SLIDE_4_LINE_1_PART_1,
  SLIDE_4_LINE_1_PART_2,
  SLIDE_4_LINE_2_PART_1,
  SLIDE_4_LINE_2_PART_2,
  SLIDE_4_PARAGRAPH,
  NEWS_PAGE_PARAGRAPH,
  HOME_PAGE_ABOUT_US_CONTENT_P_1,
  HOME_PAGE_ABOUT_US_CONTENT_P_2,
  HOME_PAGE_ABOUT_US_CONTENT_P_3,
  HOME_PAGE_ABOUT_US_CONTENT_P_4
} from '../../containers/App/constants';

import Spinner from '../Spinner/Spinner';

import './style.css'

const {Option} = Select;
const contentOptionsArr = [
  SLIDE_1_LINE_1_PART_1, SLIDE_1_LINE_1_PART_2, SLIDE_1_LINE_2_PART_1, SLIDE_1_LINE_2_PART_2, SLIDE_1_PARAGRAPH,
  SLIDE_2_LINE_1_PART_1, SLIDE_2_LINE_1_PART_2, SLIDE_2_LINE_2_PART_1, SLIDE_2_LINE_2_PART_2, SLIDE_2_PARAGRAPH,
  SLIDE_3_LINE_1_PART_1, SLIDE_3_LINE_1_PART_2, SLIDE_3_LINE_2_PART_1, SLIDE_3_LINE_2_PART_2, SLIDE_3_PARAGRAPH,
  SLIDE_4_LINE_1_PART_1, SLIDE_4_LINE_1_PART_2, SLIDE_4_LINE_2_PART_1, SLIDE_4_LINE_2_PART_2, SLIDE_4_PARAGRAPH,
  HOME_PAGE_ABOUT_US_CONTENT_P_1, HOME_PAGE_ABOUT_US_CONTENT_P_2, HOME_PAGE_ABOUT_US_CONTENT_P_3, HOME_PAGE_ABOUT_US_CONTENT_P_4,
  NEWS_PAGE_PARAGRAPH
]


function AdminNews(props) {
  const dispatch = useDispatch();
  const success = (text) => {
    message.success(text, 5)
      .then(() => dispatch(resetContentMessages()))
  };
  const error = (text) => {
    message.error(text, 5)
      .then(() => dispatch(resetContentMessages()))
  };

  const contentSuccess = useSelector(makeSelectContentSuccess)
  const contentFail = useSelector(makeSelectContentFail)

  const [form] = Form.useForm();
  const {t} = useTranslation();

  const formItemLayout = {labelCol: {span: 6,}, wrapperCol: {span: 14}};
  const validationRule1 = {
    required: true,
    message: t('common:PLEASE_SELECT_THE_FIELD')
  }
  const onFinish = values => {
    const {title, descriptionArm, descriptionEn, descriptionRu} = values;
    const newContent = {
      page: title,
      contentTranslations: [
        {isDefault: true, language: 'en', title, description: descriptionEn},
        {isDefault: false, language: 'ru', title, description: descriptionRu},
        {isDefault: false, language: 'arm', title, description: descriptionArm}
      ]
    }

    dispatch(createContentStart(newContent))
  };


  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getContent(LANGUAGE_EN))
    dispatch(getContent(LANGUAGE_RU))
    dispatch(getContent(LANGUAGE_ARM))
  }, []);

  useEffect(() => {
    contentSuccess && success(contentSuccess)
    contentFail && error(contentFail)
  }, [contentSuccess, contentFail])

  useEffect(() => {
    dispatch(getContent(LANGUAGE_EN))
    dispatch(getContent(LANGUAGE_RU))
    dispatch(getContent(LANGUAGE_ARM))
    if (contentSuccess) {
      form.resetFields()
    }
  }, [contentSuccess])


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
          <span className='ant-form-create-header'>Create New Content </span>
        </Form.Item>

        <Form.Item name='title' label={`Content Name`} hasFeedback rules={[validationRule1]}>
          <Select placeholder={`content name`}>
            {
              contentOptionsArr.map(title => {
                return (
                  <Option value={title} key={title}>{title}</Option>
                )
              })
            }
          </Select>
        </Form.Item>

        <Form.Item name='descriptionEn' label={`English: Content`}>
          <Input.TextArea placeholder='Please Enter Content in English'/>
        </Form.Item>
        <Form.Item name='descriptionRu' label={`Russian: Contentn`} rules={[validationRule1]}>
          <Input.TextArea placeholder='Please Enter Content in Russian'/>
        </Form.Item>
        <Form.Item name='descriptionArm' label={`Armenian: Content`} rules={[validationRule1]}>
          <Input.TextArea placeholder='Please Enter Content in Armenian'/>
        </Form.Item>

        <Form.Item wrapperCol={{span: 12, offset: 6,}} style={{padding: '40px 0px'}}>
          <Button type='primary' htmlType='submit'>
            Create Content
          </Button>
        </Form.Item>
      </Form>


      {
        props.appLanguage &&
        props.content &&
        !props.content[props.appLanguage]['contentIsLoaded'] &&
        <Spinner/>
        // todo Tatev please improve Spinner position and styles
      }

      {
        props.appLanguage &&
        props.content &&
        props.content[props.appLanguage]['contentIsLoaded'] &&
        props.content[props.appLanguage].data
          .map(content => {
            return (
              <div className={`content-admin`} key={content.id}>
                <div> {content.title}</div>
                <div>{content.description}</div>
                <Button
                  type='primary'
                  danger
                  onClick={e => dispatch(removeContentStart(content.id))
                  }
                >
                  DELETE CONTENT
                </Button>
              </div>
            )
          })
      }
    </Fragment>
  )
}


export default AdminNews;
