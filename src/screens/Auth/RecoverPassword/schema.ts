import * as Yup from 'yup';

export const RecoverPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('E-mail inválido')
    .matches(/@prof.cesupa.br$/, 'O email deve ser de professor do cesupa')
});
