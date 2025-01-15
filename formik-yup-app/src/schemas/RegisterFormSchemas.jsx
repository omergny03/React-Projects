import * as yup from 'yup';

export const regiserFormSchemas=yup.object().shape({
    
    email: yup.string().email("Geçerli email adresi giriniz").required("Bu alanı doldurmak zorunlu"),
    age: yup.number().positive("0'dan küçük yaş girilmez").required("Bu alanı doldurmak zorunlu").integer("Tam değer giriniz"),
    password: yup.string().required("Bu alanı doldurmak zorunlu"),
    passwordAgain: yup.string().required("Bu alanı doldurmak zorunlu").oneOf([yup.ref('password')], "Şifreler aynı olmak zorunda"),
    term: yup.boolean().required("Lütfen sözleşmeyi kabul ediniz"),
})