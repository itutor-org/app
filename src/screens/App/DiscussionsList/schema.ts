import * as Yup from 'yup';

export const CreateDiscussionSchema = Yup.object().shape({
  general_subject: Yup.string()
    .required('Assunto obrigatório')
    .max(25, 'Campo deve ter no máximo 25 caracteres'),
  specific_subject: Yup.string()
    .required('Tópico especifico é obrigatório')
    .max(25, 'Campo deve ter no máximo 25 caracteres'),
  duration: Yup.number()
    .required('Duração obrigatória')
    .typeError('Duração deve ser um número')
});
