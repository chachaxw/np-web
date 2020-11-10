import * as Ad from 'antd';
import * as React from 'react';

const DynamicTabs :React.FC<{}> = ()=>{

  return (
    <div>
      <Ad.Radio.Group style={{ marginBottom: 8 }}>
          <Ad.Radio.Button value="one">全部</Ad.Radio.Button>
          <Ad.Radio.Button value="tow">园区管理</Ad.Radio.Button>
        </Ad.Radio.Group>
    </div>
  )
}

export default DynamicTabs
