import { CyLayoutModule } from './cy-layout.module';

describe('CyLayoutModule', () => {
  let cyLayoutModule: CyLayoutModule;

  beforeEach(() => {
    cyLayoutModule = new CyLayoutModule();
  });

  it('should create an instance', () => {
    expect(cyLayoutModule).toBeTruthy();
  });
});
