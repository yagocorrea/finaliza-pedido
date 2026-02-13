import { ToastService } from './toast.service';

describe('ToastService', () => {
  const service: ToastService = new ToastService();

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
