/**
 * @jest-environment jsdom
 */
import {describe} from "@jest/globals";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import React from "react";
import {createStore} from "redux";
import {ProductDetails} from "../../src/client/components/ProductDetails";
import {render} from "@testing-library/react";
import {initialState} from "./common";

describe('На странице с подробной информацией отображаются:', () => {
    const basename = '/hw/store';
    const store = createStore(() => initialState)
    const product = {...initialState.products[0], ...initialState.details[0]}
    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <ProductDetails product={product}/>
            </Provider>
        </BrowserRouter>
    )

    it('Название товара', function () {
        // Подготовка
        const {getByTestId} = render(application)
        const title = getByTestId('product-title')
        // Тестирование
        expect(title.textContent).toContain(store.getState().products[0].name)
    });

    it('Описание товара', function () {
        // Подготовка
        const {getByTestId} = render(application)
        const desc = getByTestId('product-description')
        // Тестирование
        expect(desc.textContent).toContain(store.getState().details[0].description)
    });

    it('Цена товара', function () {
        // Подготовка
        const {getByTestId} = render(application)
        const price = getByTestId('product-price')
        // Тестирование
        expect(price.textContent).toContain(String(store.getState().products[0].price))
    });

    it('Цвет товара', function () {
        // Подготовка
        const {getByTestId} = render(application)
        const color = getByTestId('product-color')
        // Тестирование
        expect(color.textContent).toContain(store.getState().details[0].color)
    });

    it('Материал товара', function () {
        // Подготовка
        const {getByTestId} = render(application)
        const material = getByTestId('product-material')
        // Тестирование
        expect(material.textContent).toContain(store.getState().details[0].material)
    });

    it('Кнопка "Добавить в корзину"', function () {
        // Подготовка
        const {getByTestId} = render(application)
        const btn = getByTestId('product-button')
        // Тестирование
        expect(btn.textContent).toContain("Add to Cart")
    });

})


