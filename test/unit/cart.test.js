import {describe, expect, it} from "@jest/globals";
import {addToCart, clearCart, initStore} from "../../src/client/store";
import {CartApi, ExampleApi} from "../../src/client/api";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {Cart} from "../../src/client/pages/Cart";
import React from "react";
import {render, within} from "@testing-library/react";
import events from "@testing-library/user-event";

describe('Для каждого товара должны отображаться',  () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    it('Цена', async () => {
        // Подготовка
        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart/>
                </Provider>
            </BrowserRouter>
        )
        const {getByTestId} = render(application)

        store.dispatch(clearCart())
        const {data} = await new ExampleApi(basename).getProductById(1)
        store.dispatch(addToCart(data))
        const cartItems = store.getState().cart
        const cartItem = cartItems["1"]
        const cartPrice = getByTestId('cart-price')
        // Тестирование
        expect(cartPrice.textContent).toContain(String(cartItem.price))
    });
    it('Количество', async () => {
        // Подготовка
        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart/>
                </Provider>
            </BrowserRouter>
        )
        const {getByTestId} = render(application)
        store.dispatch(clearCart())
        const {data} = await new ExampleApi(basename).getProductById(1)
        store.dispatch(addToCart(data))
        const cartItems = store.getState().cart
        const cartItem = cartItems["1"]
        const cartCount = getByTestId('cart-count')
        // Тестирование
        expect(cartCount.textContent).toContain(String(cartItem.count))
    });
    it('Cтоимость', async () => {
        // Подготовка
        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart/>
                </Provider>
            </BrowserRouter>
        )
        const {getByTestId} = render(application)
        store.dispatch(clearCart())
        const {data} = await new ExampleApi(basename).getProductById(1)
        store.dispatch(addToCart(data))
        const cartItems = store.getState().cart
        const cartItem = cartItems["1"]
        const cartTotal = getByTestId('cart-total')
        // Тестирование
        expect(cartTotal.textContent).toContain( String(cartItem.count * cartItem.price))
    });
    it('Общая сумма заказа', async () => {
        // Подготовка
        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart/>
                </Provider>
            </BrowserRouter>
        )
        const {getByTestId} = render(application)
        store.dispatch(clearCart())
        const {data} = await new ExampleApi(basename).getProductById(1)
        store.dispatch(addToCart(data))
        const cartItems = store.getState().cart
        const cartTotalPrice = getByTestId('cart-total-price')
        // Тестирование
        expect(cartTotalPrice.textContent).toContain( String(Object.values(cartItems).reduce((sum, { count, price }) => sum + count * price, 0)))
    });
})



describe('На странице корзины',  () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    it('должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async () => {
        // Подготовка
        store.dispatch(clearCart())
        const firstItem = await new ExampleApi(basename).getProductById(1)
        const secondItem = await new ExampleApi(basename).getProductById(2)
        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart/>
                </Provider>
            </BrowserRouter>
        )
        const {getByTestId} = render(application)
        store.dispatch(addToCart(firstItem.data))
        store.dispatch(addToCart(secondItem.data))
        const clearBtn = getByTestId("clear-cart")
        await events.click(clearBtn)
        // Тестирование
        expect(Object.keys(store.getState().cart).length).toBe(0)
    });
    it('если корзина пустая, должна отображаться ссылка на каталог товаров', async () => {
        // Подготовка
        store.dispatch(clearCart())
        const cart = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart/>
                </Provider>
            </BrowserRouter>
        )
        const {getByTestId} = render(cart)
        const cartLink = getByTestId("cart-link")
        // Тестирование
        expect(cartLink.getAttribute("href")).toBe(`${basename}/catalog`)
    });


})