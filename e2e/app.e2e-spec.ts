import { ETPAngularPage } from './app.po';

describe('etpangular App', function() {
  let page: ETPAngularPage;

  beforeEach(() => {
    page = new ETPAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
