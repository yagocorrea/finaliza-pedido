import { PropostaService } from './proposta.service';

describe('PropostaService', () => {
  const service: PropostaService = new PropostaService();

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
