import React, {Component, createContext} from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import Cookies from 'js-cookie';
import GlobalStyle from "../styles/global";

const Context = createContext();


const {Provider, Consumer: ThemeConsumer} = Context;

interface IThemeProvider {
    theme: string,
}

class ThemeProvider extends Component<IThemeProvider> {
    state = {
        theme: this.props.theme
    }
    actions = {
        changeTheme: () => {
            const theme = this.state.theme !== 'light' ? 'light' : 'dark';
            Cookies.set('theme', theme);
            this.setState({theme})
        },
    }
    componentDidMount() {
        const {theme} = this.props;
        this.setState({theme})
    }
    render() {
        const {state, actions} = this;
        const value = {state, actions};
        const {theme} = state;

        return (<Provider value={value}>
            <StyledComponentsThemeProvider theme={{theme}}>
                <>
                    <GlobalStyle />
                    {this.props.children}
                </>
            </StyledComponentsThemeProvider>
        </Provider>)
    }
}

export default ThemeProvider
export {ThemeConsumer}