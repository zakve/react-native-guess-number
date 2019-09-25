import React from "react";
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Form, Item, Input, Label } from 'native-base';

export default class CardShow extends React.Component {
    render() {
        return (
            <Card>
                <CardItem header>
                    <Text>Select a number </Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Item floatingLabel>
                            <Input />
                        </Item>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}