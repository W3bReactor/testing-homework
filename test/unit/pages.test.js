import {CartApi, ExampleApi} from "../../src/client/api";
import {initStore} from "../../src/client/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import React from "react";
import {Home} from "../../src/client/pages/Home";
import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "@jest/globals";
import {Catalog} from "../../src/client/pages/Catalog";
import {Delivery} from "../../src/client/pages/Delivery";
import {Contacts} from "../../src/client/pages/Contacts";

describe('В магазине должны быть страницы: главная, каталог, условия доставки, контакты', () => {
    const basename = '/hw/store';

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    it('Главная', () => {
        //Подготовка
        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Home/>
                </Provider>
            </BrowserRouter>
        );
        const {container} = render(application)
        const heading = screen.getByRole('heading', {
            name: /quickly/i
        })

        // Тестирование
        expect(heading).toBeTruthy()
    });
    it('Каталог', () => {
        //Подготовка
        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Catalog/>
                </Provider>
            </BrowserRouter>
        );
        const {container} = render(application)
        const heading = screen.getByRole('heading', {
            name: /catalog/i
        })

        // Тестирование
        expect(heading).toBeTruthy()
    });

    it('Условия доставки', () => {
        //Подготовка
        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Delivery/>
                </Provider>
            </BrowserRouter>
        );
        const {container} = render(application)
        const heading = screen.getByRole('heading', {
            name: /delivery/i
        })

        // Тестирование
        expect(heading).toBeTruthy()
    });
    it('Контакты', () => {
        //Подготовка
        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Contacts/>
                </Provider>
            </BrowserRouter>
        );
        const {container} = render(application)
        const heading = screen.getByRole('heading', {
            name: /contacts/i
        })

        // Тестирование
        expect(heading).toBeTruthy()
    });

})
