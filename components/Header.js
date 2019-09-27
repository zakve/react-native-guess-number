import React from 'react';
import { Header, Left, Body, Right, Title } from 'native-base';

export default class HeaderTitle extends React.Component {
    render() {
        return (
            <Header>
                <Left />
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}