import React from 'react';
import { List, Map } from 'immutable'
import Cookies from 'js-cookie';

interface ISelectLanguage {
    lang: string;
}

class SelectLanguage extends React.Component<ISelectLanguage> {
    state = {
        languages: List([
            Map({
                id: 'KO',
                value: 'ko',
                text: '한국어'
            }),
            Map({
                id: 'EN',
                value: 'en',
                text: 'English'
            })
        ])
    }
    onChange = (e) => {
        const lang = e.target.value
        Cookies.set('lang', lang);
        window.location.reload()
    }
    render() {
        const {
            languages
        } = this.state;
        const {
            lang
        } = this.props;
        const current_language = languages.find(v => v.get('value') === lang).get('value')
        return (
            <select value={current_language} onChange={this.onChange}>
                {languages.map(v => (
                    <option key={v.get('id')} value={v.get('value')}>
                        {v.get('text')}
                    </option>
                ))}
            </select>
        );
    }
}

export default SelectLanguage;