import React, {useEffect} from 'react';

import './style.css';

export default function PageNotFound(props) {
  useEffect(
    () => {
      setTimeout(() => {
        props.history.push('/')
      }, 4000)
    }
  );

  return (
    <div >
      <h1 className={'page-not-found'}>Page Not Found</h1>
    </div>
  );
}
