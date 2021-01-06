import React, {Fragment, useEffect, useState} from 'react';
import {Select} from 'antd';
import 'antd/dist/antd.css';

import {LANGUAGE_EN, LANGUAGE_RU, LANGUAGE_ARM} from '../../containers/App/constants';

import './style.css';


const {Option} = Select;

function SelectLanguage(props) {

  const [languageToDropdownDisplay, setLanguageToDropdownDisplay] = useState(props.appLanguage)

  useEffect(() => {
    setLanguageToDropdownDisplay(props.appLanguage)
  }, [props.appLanguage])

  const placeholderFunc = () => {
    switch (props.appLanguage) {
      case 'en':
        return 'Eng'
      case 'ru':
        return 'Рус'
      case 'arm':
        return 'ՀԱՅ'
    }
  }

  return (
    <Fragment>
      <Select
        className='select_5'
        defaultValue={languageToDropdownDisplay => languageToDropdownDisplay}
        style={{
          width: 80,
          color: ''
        }}
        showArrow={true}
        dropdownStyle={{color: 'white'}}
        bordered={false}
        placeholder={placeholderFunc(languageToDropdownDisplay)}
        onChange={event => {
          props.changeAppLanguage(event)
          localStorage.setItem('user_language_preference', event)
        }}
      >
        {/*  <Option
          value={LANGUAGE_EN}
          placeholder='Eng'
        >
          Eng
        </Option>*/}
        <Option
            style={{
              color: 'rgb(25, 39, 47)', textAlign: 'center', fontSize: '14px', lineHeight: '1.714', fontFamily: "Roboto"
            }}
            value={LANGUAGE_RU}>
          Рус
        </Option>
        <Option
            style={{
                color: 'rgb(25, 39, 47)', textAlign: 'center', fontSize: '14px', lineHeight: '1.714', fontFamily: "Roboto"
            }}
            value={LANGUAGE_ARM}>
          ՀԱՅ
        </Option>
      </Select>
    </Fragment>
  )
}

export default SelectLanguage;
