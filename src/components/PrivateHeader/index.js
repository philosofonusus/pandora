import React from 'react';
import {Layout, Col, Row, Button} from 'antd';

import SelectLanguage from '../SelectLanguage';

import './style.css';

const {Header} = Layout;


const PrivateHeader = (props) => {
  return (
    <Header className='privateHeader'>
      <Row
        type='flex'
        justify='space-between'
      >
        <Col span={12} align='left'>
          LOGO
        </Col>
        <Col span={12} align='right'>
          <SelectLanguage
            className='app-lang'
            appLanguage={props.appLanguage}
            changeAppLanguage={props.changeAppLanguage}
          >
          </SelectLanguage>
          <Button
            type='primary'
            onClick={e => props.logout()}
          >
            Log Out
          </Button>

        </Col>
      </Row>
    </Header>
  )
};

export default PrivateHeader





