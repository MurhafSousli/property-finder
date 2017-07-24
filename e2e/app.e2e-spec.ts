import { Untitled1Page } from './app.po';

describe('untitled1 App', () => {
  let page: Untitled1Page;

  beforeEach(() => {
    page = new Untitled1Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
