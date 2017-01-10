import { ErrorHandlingPage } from './app.po';

describe('error-handling App', function() {
  let page: ErrorHandlingPage;

  beforeEach(() => {
    page = new ErrorHandlingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('eh works!');
  });
});
