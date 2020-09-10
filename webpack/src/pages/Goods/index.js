import React,{Component} from 'react';
import { Button,Row,Col,Descriptions } from 'antd';
import {ShoppingCartOutlined,ShoppingOutlined} from '@ant-design/icons'
import http,{request} from '@/utils/http';

import './style.scss';
class Goods extends Component{
    state = {
        data:{}
    }
    add2cart = ()=>{

    }
    buyNow = ()=>{
        const {history} = this.props;

        this.add2cart();

        history.push('/cart');
    }
    async componentDidMount(){
        // 获取商品id
        const {match} = this.props;
        const {id} = match.params;

        // /mobile/index.php?act=goods&op=goods_detail&goods_id=227330&key=
        const {datas} = await http.get('/mobile/index.php',{
            act:'goods',
            op:'goods_detail',
            goods_id:id,
        });

        console.log('datas=',datas)

        this.setState({
            data:{
                ...datas.goods_info,
                imgurl:datas.goods_image,
            }
        })
    }
    render(){
        console.log('Goods',this.props)
        const {data} = this.state;
        return (
            <div className="goods">
                <div className="info">
                    <img src={data.imgurl}/>
                    <h1>{data.goods_name}</h1>
                    <div className="price">
                        <p>原价：<del>${data.goods_marketprice}</del></p>
                        <p>现价：<span>{data.goods_price}</span></p>
                        <p>秒杀价：<span>{data.goods_promotion_price}</span></p>
                    </div>
                </div>
                <Button.Group>
                    <Button type="primary" size="large" icon={<ShoppingCartOutlined />}>添加到购物车</Button>
                    <Button type="danger" size="large" icon={<ShoppingOutlined />} onClick={this.buyNow}>立即购买</Button>
                </Button.Group>
            </div>
        )
    }
}

export default Goods;