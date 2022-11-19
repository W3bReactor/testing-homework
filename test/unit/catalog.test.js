import {describe, expect, it} from "@jest/globals";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {Catalog} from "../../src/client/pages/Catalog";
import React from "react";
import {findAllByTestId, fireEvent, getAllByTestId, render, screen, within} from "@testing-library/react";
import {CartApi, ExampleApi} from "../../src/client/api";
import {addToCart, clearCart, initStore, productsLoad} from "../../src/client/store";
import {createStore} from "redux";
import {ProductDetails} from "../../src/client/components/ProductDetails";
import events from "@testing-library/user-event";
import {ProductItem} from "../../src/client/components/ProductItem";
import {initialState} from "./common";



describe('В каталоге отображаются', () => {
    const basename = '/hw/store';

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);

    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Catalog/>
            </Provider>
        </BrowserRouter>
    )

    it('товары, список которых приходит с сервера', async function () {
        // Подготовка
        const {getByTestId, findAllByTestId, getAllByTestId} = render(application)

        store.dispatch(productsLoad());
        const waiting = await findAllByTestId("1")
        const catalogProducts = store.getState().products
        for (let i = 0; i < catalogProducts.length; i++) {
            const item = getAllByTestId(String(i))
            // Тестирование
            expect(item[0]).toBeTruthy()
        }
    });
})

describe('Для каждого товара в каталоге отображается', () => {
    const basename = '/hw/store';
    const initialState = {
        products: [
            {"id": 0, "name": "Ergonomic Table", "price": 761},
            {"id": 1, "name": "Refined Mouse", "price": 120},
            {"id": 2, "name": "Practical Gloves", "price": 622}
        ],
        cart: {}
    }
    const store = createStore(() => initialState)

    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Catalog/>
            </Provider>
        </BrowserRouter>
    )

    it('Название',  async function () {
        // Подготовка
        const {getAllByTestId} = render(application)
        const title = getAllByTestId("product-title")
        for (let i = 0; i < title.length; i++) {
            // Тестирование
            expect(title[i].textContent).toContain(store.getState().products[i].name)
        }
    });
    it('Цена',  async function () {
        // Подготовка
        const {getAllByTestId} = render(application)
        const price = getAllByTestId("product-price")
        for (let i = 0; i < price.length; i++) {
            // Тестирование
            expect(price[i].textContent).toContain(String(store.getState().products[i].price))
        }
    });
    it('Ссылка на страницу с подробной информацией о товаре',  async function () {
        // Подготовка
        const {getAllByTestId} = render(application)
        const link = getAllByTestId("product-link")
        for (let i = 0; i < link.length; i++) {
            // Тестирование
            expect(link[i].textContent).toContain("Details")
        }
    });
})

describe('Если товар уже добавлен в корзину, отображается сообщение об этом', () => {

    const store = createStore(() => ({
        ...initialState, cart: {0: {}}
    }))
    const product = {...initialState.products[0], ...initialState.details[0]}
    const basename = '/hw/store';
    it('На странице товара',  async function () {
        // Подготовка
        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <ProductDetails product={product}/>
                    <ProductItem product={product}/>
                </Provider>
            </BrowserRouter>
        )
        const {getByTestId} = render(application)
        const productDetails = getByTestId('product-details')
        const detailsMessage = within(productDetails).getByTestId("item-in-cart")
        // Тестирование
        expect(detailsMessage.textContent).toContain('Item in cart')
    });
    it('На странице каталога',  async function () {
        // Подготовка
        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <ProductDetails product={product}/>
                    <ProductItem product={product}/>
                </Provider>
            </BrowserRouter>
        )
        const {getAllByTestId} = render(application)
        const productCatalog = getAllByTestId('0')
        const catalogMessage = within(productCatalog[0]).getByTestId("item-in-cart")
        // Тестирование
        expect(catalogMessage.textContent).toContain('Item in cart')
    });
})

describe('Если продукт добавлен, то повторное нажатие увеличит количество', () => {
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    it('В redux-store', async () => {
        // Подготовка
        store.dispatch(clearCart())
        const {data} = await new ExampleApi(basename).getProductById(1)
        const product = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <ProductDetails product={data}/>
                </Provider>
            </BrowserRouter>
        )
        const {getByText} = render(product)
        const productBtn = getByText("Add to Cart")
        // Действие
        await events.click(productBtn)
        await events.click(productBtn)
        // Тестирование
        const {count} = store.getState().cart['1']
        expect(count).toBe(2)
    });
})


