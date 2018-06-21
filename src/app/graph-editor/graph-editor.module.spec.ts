import { GraphEditorModule } from './graph-editor.module';

describe('GraphEditorModule', () => {
  let graphEditorModule: GraphEditorModule;

  beforeEach(() => {
    graphEditorModule = new GraphEditorModule();
  });

  it('should create an instance', () => {
    expect(graphEditorModule).toBeTruthy();
  });
});
