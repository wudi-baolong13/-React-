import React, { useState } from 'react'
import { Card, Image, InputNumber } from "antd";
import './mall.css'

export default function Mall() {
  const [phone, setPhone] = useState([
    {
      name: 'oppo',

      Img: require('../../assets/images/oppo.png'),
      price: 1000
    },
    {
      name: 'vivo',

      Img: require('../../assets/images/vivo.png'),
      price: 2000
    },
    {
      name: 'xiaomi',

      Img: require('../../assets/images/xiaomi.png'),
      price: 3000
    },
    {
      name: 'apple',

      Img: require('../../assets/images/apple.png'),
      price: 4000
    },
    {
      name: 'sanxing',

      Img: require('../../assets/images/sanxing.png'),
      price: 5000
    },
    {
      name: 'meizu',
      Img: require('../../assets/images/meizu.png'),
      price: 6000
    },
  ])

  return (
    <div className='mall-container'>
      {
        phone.map(item => {
          return (
            <Card hoverable key={item.name}>
              <div className='phone_img'>
                <Image src={item.Img} />
              </div>
              <div className='phone_text'>
                <p className='name'>商品名：{item.name}</p>
                <div className='price'>
                  价格：￥
                  <InputNumber
                    min={0}
                    max={100000}
                    defaultValue={item.price}
                    onChange={(value) => {
                      const newPhoneList = phone.map(p => {
                        if (p.name === item.name) {
                          return { ...p, price: value };
                        }
                        return p;
                      });
                      setPhone(newPhoneList);
                    }}
                    style={{ fontSize: '25px' }}
                  />
                </div>
              </div>
            </Card>
          )
        })
      }

    </div>
  )
}
