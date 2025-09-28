export class editArticle {
    constructor(page) {
        this.newArticleTitle = page.getByRole('textbox', { name: 'Article Title' });
        this.newArticleAnnotation = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.newArticleContent = page.getByRole('textbox', { name: 'Write your article (in' });
        this.newArticleTags = page.getByRole('textbox', { name: 'Enter tags' });
        this.newArticlePublishButton = page.getByRole('button', { name: 'Publish Article' });
    }

    async postNewArticle (newArticle) {
        const { title, annotation, content, tags} = newArticle;

        await this.newArticleTitle.click();
        await this.newArticleTitle.fill(title);
        await this.newArticleAnnotation.click();
        await this.newArticleAnnotation.fill(annotation);
        await this.newArticleContent.click();
        await this.newArticleContent.fill(content);
        await this.newArticleTags.click();
        await this.newArticleTags.fill(tags);
        await this.newArticlePublishButton.click();

    }
}