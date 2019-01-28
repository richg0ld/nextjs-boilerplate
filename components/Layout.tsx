import React, { Component, ReactNode } from 'react'
import Head from 'next/head'
import styled from "styled-components";
import { injectIntl, InjectedIntlProps } from 'react-intl'
import { $themeColor, $themeColor2 } from '../styles/theme'
import Link from 'next/link'
import Router from 'next/router'

const Container = styled.article``;
const Nav = styled.nav`
    background-color: ${$themeColor};
    color: ${$themeColor2};
`;
const Item = styled.li`
    
`;
const H1 = styled.h1`
    font-size: 50px;
    background-color: ${$themeColor};
    color: ${$themeColor2};
`;
const Form = styled.form`
    width: 200px;
    border: 1px solid #000000;
`
const Input = styled.input.attrs({type: "text"})`
    font-size: 16px;
`

export interface ILayout extends InjectedIntlProps {
    title?: string;
    description?: string;
    keywords?: string;
    children: ReactNode;
}

class Layout extends Component<ILayout> {
    state = {
        something: ''
    }
    onSubmit = (e) => {
        e.preventDefault()
        const { something } = this.state
        if (!something) return;

        return Router.push({
            pathname:'/param',
            query: {something}
        }, `/param/${something}`);
    }
    onChange = (e) => {
        this.setState({
            something: e.target.value,
        })
    }
    render() {
        const {
            something
        } = this.state;
        const {
            intl,
            title,
            description,
            keywords,
            children,
        } = this.props;

        const _title = title || intl.formatMessage({id: "meta.title"});
        const _description = description || intl.formatMessage({id: "meta.description"});
        const _keywords = keywords || intl.formatMessage({id: "meta.keywords"});

        return (
            <Container>
                <Head>
                    <title>{_title}</title>
                    <meta name="description" content={_description} />
                    <meta name="keywords" content={_keywords} />
                    <meta property="og:title" content={_title} />
                    <meta property="og:description" content={_description} />
                </Head>
                <Nav>
                    <Item>
                        <Link href="/">
                            <a>home</a>
                        </Link>
                    </Item>
                    <Item>
                        <Link href="/other">
                            <a>other</a>
                        </Link>
                    </Item>
                    <Item>
                        <Link href="/path/depth">
                            <a>depth</a>
                        </Link>
                    </Item>
                    <Item>
                        <a href="/etc/hello.html">hello</a>
                    </Item>
                </Nav>
                <Form onSubmit={this.onSubmit}>
                    <Input value={something}
                           onChange={this.onChange}
                           placeholder={intl.formatMessage({id: "sample.enterText"})}
                    />
                </Form>
                <H1>{intl.formatMessage({id: "sample.helloWorld"})}</H1>
                {children}
            </Container>
        )
    }
}

export default injectIntl(Layout)
