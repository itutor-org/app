import * as Yup from 'yup';

export const SignInSchema = Yup.object().shape({
  email: Yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: Yup.string().required('Senha obrigatória')
});
