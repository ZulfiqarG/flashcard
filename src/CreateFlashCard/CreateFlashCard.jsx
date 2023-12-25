
import React, { useRef } from 'react'
import { Form, Field, Formik, FieldArray, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux'
import {  FaEdit, FaRegFileImage,  FaRegTimesCircle } from 'react-icons/fa';
import { MdDeleteForever} from 'react-icons/md';
import { string, object, array } from 'yup';
import { addCard } from '../redux/actions';
import { toast } from 'react-toastify';
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const CreateFlashCard = () => {

    const dispatch = useDispatch();
    const reader = new FileReader(); //defining file readers for image conversion

    const notify = (val) => {
        toast.success(val, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }
    const errorNotify = (val) => {
        toast.warn(val, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }


    const inputRefs = useRef([]);
    inputRefs.current = [];
   // Reference from dinimic input fields are stored in an array.
    const addRefs = (el) => {
        if (el && !inputRefs.current.includes(el)) {
            inputRefs.current.push(el);
        }
    }

    return (
        <div className='md:mt-10 px-5 2xl:px-44 xl:px-20 my-5'>
            {/*============ section 1 getting group details using formic component for form submitting and validation =========== */}
            <Formik
                initialValues={{
                    group: "",
                    groupicon: "",
                    description: "",
                    card: [{
                        id: 1,
                        term: "",
                        defination: "",
                        image: ''
                    }]
                }}
                // --using yup for validation--
                validationSchema={
                    object({
                        group: string()
                            .max(15, 'Must be 15 character or less')
                            .required('Please , Enter Group Name '),

                        description: string()
                            .max(250, 'Must be 250 characters or less')
                            .required('Input Required '),

                        card: array(object({
                            term: string()
                                .max(15, 'Must be 15 character or less')
                                .required('Input Required '),
                            defination: string()
                                .max(250, 'Must be 250 characters or less')
                                .required('Input Required '),
                        }))
                    })
                }
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        resetForm();
                        notify('Submitted');
                        dispatch(addCard(values)) //dispatching form data to redux state after form submit
                        setSubmitting(false);
                    }, 400);
                }
                }>
                {({ values, setFieldValue }) => (
                    <Form >
                        <div className='bg-white p-5 rounded-md space-y-4'>
                            <div className=''>
                                <label htmlFor="group" className='font-semibold'>Create Group*</label><br />
                               {/* if a image is available, groupicon preview */}
                                {values.groupicon ?
                                    <div className="flex items-center space-x-3  my-5">
                                        <div className='w-full min-w-[100px] min-h-[100px] bg-gray-200 max-w-[100px] max-h-[100px]  overflow-hidden  flex rounded-full shadow-md hover:ring-2 hover:-translate-y-1 transition-all ease-in-out duration-300 hover:ring-slate-500 hover:shadow-2xl'>
                                            <img className='object-cover' src={values.groupicon} alt="" />
                                        </div>
                                          {/* modifying the choosen group icon */}
                                        <label htmlFor="groupicon" >
                                            <FaEdit size={"1rem"} color='#6D67E4' />
                                        </label>
                                        {/* removing the choosen groupicon's image  */}
                                        <label onClick={() => setFieldValue(`groupicon`, "")}>
                                            <MdDeleteForever color='#E94560' size={"1rem"} />
                                        </label>
                                    </div>
                                    : ""}
                                <div className='md:inline-block'>
                                    <div className='flex flex-col mb-5'>
                                        <Field
                                            className=' border-slate-200  focus:ring-0 active:ring-0 rounded-md md:w-96 p-2
                                        bg-gray-50 border  text-gray-900 text-sm  '
                                            placeholder='Enter Group Name'
                                            type="text"
                                            name='group'
                                        />
                                        <div className='text-red-500'>
                                            <ErrorMessage name='group' />
                                        </div>
                                    </div>
                                </div>
                                {/*  This button  is used for selecting  groupicon image */}
                                {values.groupicon ? "" :
                                    <label className='border-blue-700  border md:px-6 md:py-2.5 md:ml-10 px-1 py-2 md:mt-0 mt-10 text-blue-700 rounded-lg hover:bg-blue-700 hover:text-white transition-all ease-in-out' htmlFor="groupicon">
                                        <FaRegFileImage className="inline-block mr-2 mb-1 " />Upload Image</label>}
                                <input
                                    id="groupicon"
                                    hidden
                                    className="ml-4 mt-4"
                                    type="file"
                                    name="groupicon"

                                    //validating and creating a url from the image object
                                    onChange={(event) => {
                                        if (event.target.files[0]
                                            && !SUPPORTED_FORMATS.includes(event.target.files[0].type)) {
                                            errorNotify('unsupported file format')
                                        }
                                        else if (event.target.files[0].size > 1024 * 1024) {
                                            errorNotify('image size is very large')
                                        } else if (event.target.files[0].size <= 1024 * 1024) {
                                            reader.readAsDataURL(event.target.files[0]);
                                            reader.onload = () => {
                                                setFieldValue("groupicon", reader.result)
                                            }
                                        }
                                    }} />


                            </div>
                            <div>
                                <label htmlFor="" className='font-semibold'>Add Description*</label><br />
                                <Field as='textarea'
                                    className='w-full border-slate-200 resize-none   rounded-md md:w-3/4 md:h-40 p-2 bg-gray-50 border  text-gray-900 text-sm'
                                    placeholder='Enter  Group  Description'
                                    name="description"
                                />
                                <div className=' text-red-500'>
                                    <ErrorMessage name='description' />
                                </div>
                            </div>
                        </div>
                         {/* utilising a fieldarray formic component in section 2 to obtain card information and add other fields */}
                        <FieldArray

                            name="card"
                            render={arrayHelpers => (
                                <div className='bg-white p-5 rounded-md mt-4  overflow-hidden'>
                                    {values.card && values.card.length > 0
                                        ? (values.card.map((cardItem, index) =>

                                        (<div className='md:flex md:space-x-10 md:items-center relative flex-wrap' key={index}>
                                            <span name={`card.${index}.id`} className='bg-red-500 px-2 rounded-full text-white'>{index + 1}</span>

                                            <div className='flex flex-col'>
                                                <label htmlFor={`card.${index}.term`} className='font-semibold'>Enter Term*</label>
                                                <input ref={addRefs} className='border-slate-200 rounded-md p-2 lg:w-96 md:w-72 bg-gray-50 border  text-gray-900 text-sm' placeholder='Term' type="text"
                                                    name={`card.${index}.term`}
                                                    onChange={(e) => setFieldValue(`card.${index}.term`, e.target.value)}
                                                    value={cardItem.term}
                                                />
                                                <div className='text-red-500'>
                                                    <ErrorMessage name={`card.${index}.term`} />
                                                </div>
                                            </div>

                                            <div className='flex flex-col '>
                                                <label htmlFor="defination" className='font-semibold'>Enter Defination*</label>
                                                <Field as="textarea" className='border-slate-200 h-11 rounded-md focus:h-24 p-2 lg:w-96 md:w-72 resize-none transition-all ease-in-out bg-gray-50 border duration-500  text-gray-900 text-sm' placeholder='Defination' type="text"
                                                    name={`card.${index}.defination`}
                                                />
                                                <div className='text-red-500'>
                                                    <ErrorMessage name={`card.${index}.defination`} />
                                                </div>
                                            </div>

                                            {cardItem.image
                                                ? ""
                                                : <label htmlFor={cardItem.id}
                                                    className='border-blue-700  border flex mx-auto w-32  p-2 mt-5  text-blue-700 rounded-lg shadow-md hover:-translate-y-px hover:bg-blue-700 hover:text-white transition-all ease-in-out'
                                                >Select Image</label>
                                            }

                                            {cardItem.image
                                                ? <div className="md:flex  space-x-4 space-y-4 my-5">
                                                    <div className='w-full relative  min-w-[150px] min-h-[150px]  max-w-[200px] max-h-[150px] p-4 overflow-hidden  flex'>
                                                        <FaRegTimesCircle className='absolute top-0 right-0'
                                                            onClick={() => setFieldValue(`card.${index}.image`, "")}
                                                            color='#7F8487'
                                                            size={"1.2rem"} />
                                                        <label htmlFor={cardItem.id} >
                                                            <img src={cardItem.image} alt="" />
                                                        </label>
                                                    </div>
                                                </div>
                                                : ""}

                                            {/* validating and converting image obj into url  */}
                                            <input type="file"
                                                id={cardItem.id}
                                                hidden
                                                name={`card.${index}.image`}
                                                onChange={(event) => {
                                                    if (event.target.files[0]
                                                        && !SUPPORTED_FORMATS.includes(event.target.files[0].type)) {
                                                        errorNotify('unsupported file format')
                                                    }
                                                    else if (event.target.files[0].size > 1024 * 1024) {
                                                        errorNotify('image size is very large')
                                                    } else if (event.target.files[0].size <= 1024 * 1024) {
                                                        reader.readAsDataURL(event.target.files[0]);
                                                        reader.onload = () => {
                                                            setFieldValue(`card.${index}.image`, reader.result)
                                                        }
                                                    }

                                                }}
                                            />
                                            <div className="absolute space-y-6  bottom-2 md:bottom-8 right-0"  >
                                               {/* remove a field from the list*/}
                                                <MdDeleteForever className='transition-all  ease-in-out  hover:-mb-1 hover:-translate-y-px'
                                                    onClick={() => index > 0 ? arrayHelpers.remove(index) : ""}
                                                    color='#E94560'
                                                    size={"1rem"} />
                                                {/* focus on a field from the list*/}
                                                <FaEdit className='transition-all  ease-in-out  hover:translate-y-1 '
                                                    onClick={() => { inputRefs.current[index].focus() }}
                                                    size={"1rem"}
                                                    color='#6D67E4' />
                                            </div>
                                            <hr className=' border-gray-300 w-full  my-5' />
                                        </div>
                                        ))
                                        ) : (
                                            <button type="button" className='bg-slate-400 px-6 py-3  text-white rounded-lg my-5 w-28 ' onClick={() => arrayHelpers.push()}>
                                                {/* when the user has eliminated all friends from the list, display this */}
                                                Add Card
                                            </button>
                                        )}
                                    <button type='button'
                                        onClick={() => arrayHelpers.push({
                                            id: `${Math.random()}`,
                                            term: "",
                                            defination: "",
                                            image: ''
                                        })}
                                        className=' text-blue-700 mx-auto block md:mx-0 font-bold p-2'>+ Add More</button>
                                </div>
                            )}
                        />
                        <div className='pt-20 relative'>
                            <button type='submit' className='px-6 py-2 mt-10  absolute  w-28 left-0 right-0 mx-auto bottom-1  text-red-500 bg-grey-100 rounded-lg hover:bg-red-500 hover:text-white border-red-500 border-2  hover:-translate-y-1 shadow-lg transition-all ease-in-out duration-500" ' name='card[0].id' >Create</button>
                        </div>
                    </Form>)}
            </Formik>
        </div >
    )
}

export default CreateFlashCard;