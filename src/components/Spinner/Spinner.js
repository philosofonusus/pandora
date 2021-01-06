import React from 'react';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = (
  <LoadingOutlined style={{ fontSize: 60, color: 'black' }} spin />
);

export default function Spinner () {
  return <Spin indicator={antIcon} />
}


