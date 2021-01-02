import React from 'react';
import { Field, Form, Formik } from 'formik';

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
};
type FormType = {
    term: string;
};
export const UsersSearchForm = () => {

    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void; }) => {
        setTimeout(() => {
            //alert(JSON.stringify(values));
            setSubmitting(false);
        }, 400);
    };

    return (
        <div>
            <Formik
                initialValues={{ term: '' }}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <button type="submit" disabled={isSubmitting}>
                            Find
           </button>
                    </Form>
                )}
            </Formik>

        </div>
    );
};
