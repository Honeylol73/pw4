import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage, SignInPage, YourFeedPage, ManageArticle, MyArticle } from '../src/pages/index';

const URL = 'https://realworld.qa.guru/';

const newArticle = {
    title: faker.lorem.words(3),
    annotation: faker.lorem.words(6),
    content: faker.lorem.text(),
    tags: faker.book.genre(),
  };


const commentText = {newCommentText: faker.lorem.words(8)};

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
  
  await expect(page.getByRole('link', { name: 'New Article' })).toBeVisible();
});

test('Пользователь создает новую статью', async ({
  page
}) => {
  const yourFeedpage = new YourFeedPage(page);
  const newArticlePublish = new ManageArticle(page);

await yourFeedpage.createArticle();
await newArticlePublish.postNewArticle(newArticle);


await expect(page.getByRole('heading', { name: newArticle.title})).toBeVisible({ timeout: 15000});

});

test('Пользователь редактирует созданную статью', async ({
  page
}) => {
  const editArticleFields = {
    title: faker.lorem.words(3),
    annotation: faker.lorem.words(6),
    content: faker.lorem.text(),
    tags: faker.book.genre(),
  };
  
  const yourFeedpage = new YourFeedPage(page);
  const newArticlePublish = new ManageArticle(page);

  const myArticlePage = new MyArticle(page);
  const editArticlePage = new ManageArticle(page);

  // Создаем новую статью
  await yourFeedpage.createArticle();
  await newArticlePublish.postNewArticle(newArticle);

  // Редактируем созданную статью
  await myArticlePage.gotoEditArticle();
  await editArticlePage.editArticle(editArticleFields);

  await expect(page.getByRole('heading', { name: editArticleFields.title})).toBeVisible({ timeout: 15000});

});

test('Пользователь пишет комментарий', async ({
  page
}) => {
  const yourFeedpage = new YourFeedPage(page);
  const newArticlePublish = new ManageArticle(page);
  const myArticlePage = new MyArticle(page);


// Создаем новую статью  
await yourFeedpage.createArticle();
await newArticlePublish.postNewArticle(newArticle);

// Пишем комментарий
await myArticlePage.writeComment(commentText);

await expect(page.getByRole('main')).toContainText(commentText.newCommentText);

});

test('Пользователь удаляет свой комментарий', async ({
  page
}) => {
  const yourFeedpage = new YourFeedPage(page);
  const newArticlePublish = new ManageArticle(page);
  const myArticlePage = new MyArticle(page);


// Создаем новую статью  
await yourFeedpage.createArticle();
await newArticlePublish.postNewArticle(newArticle);

// Пишем комментарий
await myArticlePage.writeComment(commentText);

// Тут же передумываем и удаляем комментарий
await myArticlePage.deleteComment(page);

await expect(page.getByText('There are no comments yet...')).toBeVisible({ timeout: 15000});

});

test('Пользователь удаляет созданную статью', async ({
  page
}) => {
  const yourFeedpage = new YourFeedPage(page);
  const newArticlePublish = new ManageArticle(page);
  const myArticlePage = new MyArticle(page);

  

// Пользователь создает статью  
await yourFeedpage.createArticle();
await newArticlePublish.postNewArticle(newArticle);

// Пользователь удаляет статью
await myArticlePage.deleteArticle(page);

await expect(page.getByRole('main')).toContainText('Your Feed');

});

});

