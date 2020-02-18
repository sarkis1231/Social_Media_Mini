import React from 'react';
import {RouteComponentProps} from "react-router";
import DynamicFields from "../../Reusable/DynamicFields";
import {experienceInputFields} from "./utilConfig";
import {useForm} from "react-hook-form";
import {useServerErrorHandle} from "../../Hooks/useServerErrorHandle";
import {useDynamicFields} from "../../Hooks/useDynamicFields";
import {sanitizeFormValues} from "../../../util/functions";
import axios from "axios";
import {URL} from "../../../config/config";
import {Button} from "@material-ui/core";
import DatePicker from "../../Reusable/DatePicker";

const Experience: React.FC<RouteComponentProps> = (props) => {
    const {handleSubmit, register, errors, unregister, control} = useForm<FormData>();
    const [serverError, setterError] = useServerErrorHandle();
    // const [checked, setChecked] = React.useState(false); //TODO Change the Checkbox Element with text
    useDynamicFields(experienceInputFields, register, unregister);

    const onSubmit = function (values: any) {
        const sanitizedValues = sanitizeFormValues(values);
        console.log(values);
/*
        axios.post(`${URL}/profile//experience`, sanitizedValues)
            .then(function (res: any) {
                props.history.push('/dashboard');
            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
        });
*/
    };


    return (
        <>

            <h1>Add Experience</h1>
            <p className="centerText">Add any job or position that you might have had</p>
            <div className="form">
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <DynamicFields InputFields={experienceInputFields} register={register} serverError={serverError}
                                   errors={errors} control={control}/>
                    <DatePicker format="MM/dd/yyyy" id="From" label="From" defaultDate={new Date()} name="From" control={control}/>
                    <DatePicker format="MM/dd/yyyy" id="to" label="To" defaultDate={null} name="To" control={control}/>
                    <Button color="primary" variant="contained" size="large" className="submitBtn"
                            type="submit">OK</Button>
                </form>
            </div>
        </>
    );
};

export default Experience;