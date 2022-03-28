import React, { useState } from 'react'
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField
} from 'formik'
import * as Yup from 'yup'
// import TextError from './TextError'

const initialValues = {
  customerName: '',
  className: '',
  email: '',
  phone: '',
  comment: '',
}

 


const validationSchema = Yup.object({
  customerName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Required'), 
})

const validateComments = value => {
  let error
  if (!value) {
    error = 'Required'
  }
  return error
}
const onSubmit = (values, submitProps) => {
  console.log('Form data', values)
  console.log('submitProps', submitProps)
  submitProps.setSubmitting(false)
  submitProps.resetForm();
  
  // handleSubmit(values);
}
const handleSubmit = async (values) => {
  try {
    const res = await fetch("https://localhost:5001/Customer/AddCustomer", {
      method: "POST",
      body: JSON.stringify({...values,id:"rtwrte"}),
      headers: {
        'Accept': "application/json, text/plain, */*",
        'Content-Type': "application/json;charset=utf-8"
    },
      mode: 'no-cors',
     
    });
    if (!res.ok) {
      
      return;
    }
    const data = await res.json();
    console.log(data);
  } catch (e) {
    
  }
};
const handleUpdate = async (values) => {
  try {
    const res = await fetch(`https://localhost:5001/Customer/UpdatedCustomer/${values.id}`, {
      method: "PUT",
      body: JSON.stringify({...values}),
      headers: {
        'Accept': "application/json, text/plain, */*",
        'Content-Type': "application/json;charset=utf-8"
    },
      mode: 'no-cors',
     
    });
    if (!res.ok) {
      
      return;
    }
    const data = await res.json();
    console.log(data);
  } catch (e) {
    
  }
};
const handleReset = (resetForm) => {
  if (window.confirm('Reset?')) {
    resetForm(initialValues)
  }
}; 
function CustomerForm (props) {
  const [formValues, setFormValues] = useState(null);
  
  React.useEffect(() => {
    setFormValues(null);
    setFormValues(props.cellValue);
   
    }, [props,formValues]);
    function updateForm(setFieldValue){
      handleUpdate(setFieldValue);
    }
  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
      // validateOnChange={false}
      // validateOnBlur={false}
      // validateOnMount
    >
      {formik => {
        console.log('Formik props', formik)
        return (
          <Form>
            <div className='form-control'>
              <label htmlFor='customerName'>Customer Name</label>
              <Field type='text' id='customerName' name='customerName' />
              {/* <ErrorMessage name='name' component={TextError} /> */}
            </div>

            <div className='form-control'>
              <label htmlFor='email'>Email</label>
              <Field type='email' id='email' name='email' />
              <ErrorMessage name='email'>
                {error => <div className='error'>{error}</div>}
              </ErrorMessage>
            </div>

            <div className='form-control'>
              <label htmlFor='className'>Class</label>
              <Field
                type='text'
                id='className'
                name='className'
                placeholder='class name'
              />
              <ErrorMessage name='class' />
            </div>

            <div className='form-control'>
              <label htmlFor='comment'>Comments</label>
              <Field
                as='textarea'
                id='comment'
                name='comment'
                validate={validateComments}
              />
              {/* <ErrorMessage name='comments' component={TextError} /> */}
            </div>

            <div className='form-control'>
              <label htmlFor='phone'>phone number</label>
              <Field type='text' id='phone' name='phone' />
            </div>


         
       
            <button type="reset"  onClick={ () => {formik.resetForm() }}> Reset</button>
            <button
              type='submit'
              disabled={!formik.isValid || formik.isSubmitting || formValues!=null}
            >
              Submit
            </button>
            <button
            disabled={!formik.isValid  || formValues==null}
              onClick={()=>{updateForm(formValues)}}
            >
              Update
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default CustomerForm