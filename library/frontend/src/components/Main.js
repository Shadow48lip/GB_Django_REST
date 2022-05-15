import React from "react";
import {Typography, Row, Col} from 'antd';

const {Title, Text, Link} = Typography;


const MainPage = () => (

    <div>
        <Row>
            <Col xs={24} md={{span: 12, offset: 6}}>
                <Title level={2}>Это главная страница проекта</Title>
            </Col>
        </Row>
        <Row>
            <Col xs={24} md={{span: 14, offset: 5}}>
                <Text>
                    Использовались библиотеки
                    <ul>
                        <li><Link href="https://habr.com/ru/company/kts/blog/598835/">react-router-dom 6.2.2</Link></li>
                        <li><Link href="https://ant.design/">ant.design 4.19.3</Link></li>
                    </ul>
                </Text>
            </Col>
        </Row>

    </div>
)

export default MainPage;