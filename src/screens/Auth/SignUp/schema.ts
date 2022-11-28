import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: Yup.string()
    .required('Senha obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .max(10, 'A senha deve ter no máximo 10 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'A não atende aos requisitos mínimos de segurança'
    ),
  password_confirmation: Yup.string()
    .required('Confirmação de senha obrigatória')
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
});
