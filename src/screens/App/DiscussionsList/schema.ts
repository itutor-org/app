import * as Yup from 'yup';

export const CreateDiscussionSchema = Yup.object().shape({
  general_subject: Yup.string().required('Assunto obrigatório'),
  specific_subject: Yup.string().required('Descrição obrigatória'),
  duration: Yup.number().required('Duração obrigatória')
});
