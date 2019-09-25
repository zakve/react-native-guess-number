import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import { Platform, Container, Header, Left, Body, Right, Title } from 'native-base';

export default class HeaderTitle extends React.Component {
    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>{this.props.title}</Title>
                    </Body>
                    <Right />
                </Header>
            </Container>
        );
    }
}