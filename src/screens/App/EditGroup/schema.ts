import * as Yup from 'yup';

export const EditGroupSchema = Yup.object().shape({
  group_name: Yup.string().required('Nome do grupo obrigatório'),
  class_name: Yup.string().required('Sigla do grupo é obrigatória')
});

export const EditStudentSchema = Yup.object().shape({
  name: Yup.string()
  .required('Nome obrigatório')
  .test('first-name-only', 'Por favor, insira apenas o primeiro nome.', value => {
    return !value.includes(' ');
  }),
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('E-mail inválido')
    .matches(/@aluno.cesupa.br$/, 'O email deve ser de aluno do cesupa'),
  registration: Yup.string()
    .required('Matrícula obrigatória')
    .min(8, 'Matrícula inválida')
});
