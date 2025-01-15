import React from 'react'
import '../css/RegisterForm.css'
import { useFormik } from 'formik';
import { regiserFormSchemas} from '../schemas/RegisterFormSchemas';

function RegisterForm() {

   const submit = (values,action)=>{
         console.log(values);
        console.log(action); 
        setTimeout(() => {
           action.resetForm();
        }, 3000);
   }
   
   const {errors,values,handleChange,handleSubmit} = useFormik({   /* object destructing */
      initialValues: {
        email: '',
        age:'',
        password:'',
        passwordAgain:'',
        term:'',
      },
      validationSchema:regiserFormSchemas,
      onSubmit:submit,
    });


  return (
    <div className='register'>
        <form className='form'onSubmit={handleSubmit}>
           
            <div className='form-div'>
                <label style={{marginBottom:'10px'}} >Email:</label>
                <input className='input' type="email" placeholder='Email giriniz' id='email' value={values.email} 
                onChange={handleChange}/>
                <div className='form-div-div'>
                {errors.email && <p style={{margin:'0px',marginTop:'5px',color:'orange'}}>{errors.email}</p>}
                </div>
            </div>
             
             <div className='form-div'>
                <label style={{marginBottom:'10px'}} >Yaş:</label>
                <input className='input' type="number" placeholder='Yaş giriniz' id='age' value={values.age} 
                onChange={handleChange}/>
                {errors.age && <p style={{margin:'0px',marginTop:'5px',color:'orange'}}>{errors.age}</p>}
             </div>
             
             <div className='form-div'>
                <label style={{marginBottom:'10px'}} >Şifre:</label>
                <input className='input' type="password" placeholder='Şifre giriniz' id='password' value={values.password} 
                onChange={handleChange}/>
                {errors.password && <p style={{margin:'0px',marginTop:'5px',color:'orange'}}>{errors.password}</p>}
             </div>
             
             <div className='form-div'>
                <label style={{marginBottom:'10px'}} >Şifre Tekrarı:</label>
                <input className='input' type="password" placeholder='Şifre tekrarı giriniz' id='passwordAgain' value={values.passwordAgain} onChange={handleChange}/>
                {errors.passwordAgain && <p style={{margin:'0px',marginTop:'5px',color:'orange'}}>{errors.passwordAgain}</p>}
             </div>
             
             <div className='form-checkbox'>
                <input type="checkbox" id="term" value={values.term} onChange={handleChange}/>
                <label>Kullanım sözleşmesni kabul ediyorum</label>
             </div>
             <div style={{marginTop:'-35px'}}>
             {errors.term && <p style={{margin:'0px',marginTop:'5px',color:'orange'}}>{errors.term}</p>}   
             </div>
             
             <button type='submit' className='button'><b>Kaydet</b></button>
        </form>
    </div>
  )
}

export default RegisterForm