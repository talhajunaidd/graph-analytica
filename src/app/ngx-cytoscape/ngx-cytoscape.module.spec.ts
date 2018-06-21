import { NgxCytoscapeModule } from './ngx-cytoscape.module';

describe('NgxCytoscapeModule', () => {
  let ngxCytoscapeModule: NgxCytoscapeModule;

  beforeEach(() => {
    ngxCytoscapeModule = new NgxCytoscapeModule();
  });

  it('should create an instance', () => {
    expect(ngxCytoscapeModule).toBeTruthy();
  });
});
