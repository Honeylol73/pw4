import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage, SignInPage, YourFeedPage, editArticle } from '../src/pages/index';

const URL = 'https://realworld.qa.guru/';

test.describe('Пользователь работает с приложением после авторизации', () => {
  test.beforeEach(async ({ page }) => {
    const authUser = { 
    email: 'bald@man.com', 
    password: 'BB12345' };
  const mainPage = new MainPage(page);
  const signInPage = new SignInPage(page);

  await page.goto(URL);
  await mainPage.gotoLogin();
  await signInPage.signIn(authUser);
  
  await expect(page.getByRole('link', { name: ' New Article' })).toBeVisible();
});

test('Пользователь создает новую статью', async ({
  page
}) => {
  const newArticle = {
    title: faker.book.title(),
    annotation: faker.lorem.words(6),
    content: faker.lorem.text(),
    tags: faker.book.genre(),
  };
  const yourFeedpage = new YourFeedPage(page);
  const newArtcilePublish = new editArticle (page);

await yourFeedpage.createArticle();
await newArtcilePublish.postNewArticle(newArticle);


await expect(page.getByRole('heading', { name: newArticle.title})).toBeVisible({ timeout: 15000});

})
});

