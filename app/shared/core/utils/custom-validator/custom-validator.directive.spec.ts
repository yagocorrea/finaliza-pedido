import { CustomValidatorDirective } from './custom-validator.directive';

describe('CustomValidatorDirective', () => {
  let directive: CustomValidatorDirective;

  beforeEach(() => {
    directive = new CustomValidatorDirective();
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });
});
