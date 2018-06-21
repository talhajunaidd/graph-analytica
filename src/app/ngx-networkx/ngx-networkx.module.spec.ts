import { NgxNetworkXModule } from './ngx-network-x.module';

describe('NgxNetworkxModule', () => {
  let ngxNetworkxModule: NgxNetworkXModule;

  beforeEach(() => {
    ngxNetworkxModule = new NgxNetworkXModule();
  });

  it('should create an instance', () => {
    expect(ngxNetworkxModule).toBeTruthy();
  });
});
