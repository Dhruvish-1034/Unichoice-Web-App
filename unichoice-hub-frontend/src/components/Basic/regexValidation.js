export const handleOnchange = (e, revegexValidation, formik) => {
    const inputValue = e?.target?.value;
    const isValid = revegexValidation.test(inputValue);
    const fieldName = e?.target?.name;
    if (isValid || !inputValue) {
        formik.setFieldValue([fieldName], inputValue);
    }
};

export const handleOnBlur = (e, formik) => {
    let fieldName = e?.target?.name;
    formik.setFieldValue(fieldName, formik.values[fieldName]?.trim());
};