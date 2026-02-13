import { StorageEnum } from '../../enum';
import { Proposta } from '../../models';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  const proposta: Proposta = {
    id: 1,
    uid: 'abcde123',
    idContratante: 1,
    idCorretor: 3,
    idPlano: 2,
    nomeContratante: 'Teste',
    nomeCorretor: 'Teste Corretor',
    nomePlano: 'Dental Teste',
    numeroProposta: '1234',
    dataVigencia: '25/11/2024',
    possuiPerfilPagamento: false,
    statusProposta: 6,
    totalSegurados: 2,
    uf: 'rj',
    valor: 38.34,
  };
  const service: StorageService = new StorageService();

  it('Criação do serviço', () => {
    expect(service).toBeTruthy();
  });

  it('Salvando um objeto do tipo proposta', () => {
    expect(() =>
      service.saveData(StorageEnum.Proposta, proposta)
    ).not.toThrowError(Error);
  });

  it('Salvando um objeto do tipo string', () => {
    expect(() =>
      service.saveData(StorageEnum.UID, proposta.uid)
    ).not.toThrowError(Error);
  });

  it('Resgatar um objeto do tipo proposta', () => {
    const response = service.getData<Proposta>(StorageEnum.Proposta);

    expect(response).not.toBeNull();
    expect(response!.id).toEqual(proposta.id);
    expect(response!.uid).toEqual(proposta.uid);
    expect(response!.idContratante).toEqual(proposta.idContratante);
    expect(response!.idCorretor).toEqual(proposta.idCorretor);
    expect(response!.idPlano).toEqual(proposta.idPlano);
    expect(response!.nomeContratante).toEqual(proposta.nomeContratante);
    expect(response!.nomeCorretor).toEqual(proposta.nomeCorretor);
    expect(response!.nomePlano).toEqual(proposta.nomePlano);
    expect(response!.numeroProposta).toEqual(proposta.numeroProposta);
    expect(response!.dataVigencia).toEqual(proposta.dataVigencia);
    expect(response!.possuiPerfilPagamento).toEqual(
      proposta.possuiPerfilPagamento
    );
    expect(response!.statusProposta).toEqual(proposta.statusProposta);
    expect(response!.totalSegurados).toEqual(proposta.totalSegurados);
    expect(response!.uf).toEqual(proposta.uf);
    expect(response!.valor).toEqual(proposta.valor);
  });

  it('Resgatar um objeto do tipo string', () => {
    const response = service.getData<string>(StorageEnum.UID);

    expect(response).not.toBeNull();
    expect(response).toEqual(proposta.uid);
  });

  it('Removendo um objeto', () => {
    expect(() => service.removeData(StorageEnum.UID)).not.toThrowError(Error);
  });

  it('Removendo todos os objetos', () => {
    expect(() => service.removeAll()).not.toThrowError(Error);
  });

  it('Verificação final - Storage Limpo', () => {
    const r1 = service.getData<Proposta>(StorageEnum.Proposta);
    const r2 = service.getData<string>(StorageEnum.UID);

    expect(r1).toBeNull();
    expect(r2).toBeNull();
  });
});
