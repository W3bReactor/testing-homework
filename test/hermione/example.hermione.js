const { assert } = require('chai');

describe('На сайте работает:', async function() {
    it('Содержимое корзины должно сохраняться между перезагрузками страницы', async function({browser}) {
        await browser.url('/hw/store/catalog/0');
        const page = await browser.$('.Application');
        await page.waitForExist();
        const cartBtn = await browser.$('.ProductDetails-AddToCart')
        await cartBtn.click();
        const firstStorage = await browser.execute(() => localStorage.getItem("example-store-cart"));
        await browser.execute(() => window.location.reload())
        const secondStorage = await browser.execute(() => localStorage.getItem("example-store-cart"));
        assert(firstStorage === secondStorage);
    });
    it('На ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async function({browser}) {
        await browser.url('/hw/store/');
        await browser.setWindowSize(575, 500);
        const page = await browser.$('.Application');
        await page.waitForExist();
        const navbar = await browser.$('.navbar-toggler')
        assert(await navbar.isDisplayed());

    });
    it('При выборе элемента из меню "гамбургера", меню должно закрываться', async function({browser}) {
        await browser.url('/hw/store/');
        await browser.setWindowSize(575, 575);
        const page = await browser.$('.Application');
        await page.waitForExist();
        const navbar = await browser.$('.navbar-toggler');
        await navbar.click();
        const navMenu = await browser.$('.Application-Menu');
        const navLink = await browser.$('.nav-testing-link');
        await navLink.click();
        assert(navMenu.isDisplayed());
    });
});