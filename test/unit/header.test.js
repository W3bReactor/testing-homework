import {describe, expect} from "@jest/globals";
import {CartApi, ExampleApi} from "../../src/client/api";
import {clearCart, initStore} from "../../src/client/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import React from "react";
import {Application} from "../../src/client/Application";
import {render, within} from "@testing-library/react";
import {ProductDetails} from "../../src/client/components/ProductDetails";
import events from "@testing-library/user-event";

describe('В шапке', () => {

    const basename = '/hw/store';

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Application/>
            </Provider>
        </BrowserRouter>
    );


    it('отображаются ссылки на страницы магазина, а также ссылка на корзину', function () {
        //Подготовка
        const {container, getAllByTestId} = render(application)
        const listItem = getAllByTestId('header-link')

        // Тестирование
        expect(listItem.map(item => item)).toHaveLength(4)
    });

    it('название магазина должно быть ссылкой на главную страницу', function () {
        //Подготовка
        const {container, getByTestId} = render(application)
        const nav = getByTestId("navigation")
        const mainLink = within(nav).getByText("Example store")

        // Тестирование
        expect(mainLink.getAttribute('href')).toBe(`${basename}/`)
    });
    it('рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', async function () {
        //Подготовка
        store.dispatch(clearCart())
        const firstItem = await new ExampleApi(basename).getProductById(1)
        const secondItem = await new ExampleApi(basename).getProductById(2)
        const product = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Application/>
                    <ProductDetails product={firstItem.data}/>
                    <ProductDetails product={secondItem.data}/>
                </Provider>
            </BrowserRouter>
        )
        const {getByText, getAllByText} = render(product)
        const productBtns = getAllByText("Add to Cart")
        const headerCartItem = getByText("Cart")
        for (let i = 0; i < productBtns.length; i++) {
            await events.click(productBtns[i])
        }
        const cart = store.getState().cart
        const cartCount = String(Object.keys(cart).length)
        // Тестирование
        expect(Object.keys(cart).length).toBe(2)
        expect(headerCartItem.textContent).toContain(cartCount)
    });
})
