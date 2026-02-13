import { ProdutoService } from './produto.service';

describe('ProdutoService', () => {
  const service: ProdutoService = new ProdutoService();

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
