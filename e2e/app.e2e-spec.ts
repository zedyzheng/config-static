import { AdminFePage } from './app.po';

describe('admin-fe App', () => {
  let page: AdminFePage;

  beforeEach(() => {
    page = new AdminFePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
