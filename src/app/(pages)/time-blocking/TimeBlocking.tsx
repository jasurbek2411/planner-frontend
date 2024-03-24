'use client';

import type { TypeTimeBlockForm } from "@/types/time-block.types";
import { FormProvider, useForm } from "react-hook-form";
import TimeBlockingForm from "./form/TimeBlockingForm";
import TimeBlockList from "./TimeBlockList";


const TimeBlocking = () => {

    const methods = useForm<TypeTimeBlockForm>()

    return (
        <FormProvider {...methods}>
            <div className="grid grid-cols-2 gap-12">
                <TimeBlockList />
                <TimeBlockingForm />
            </div>
        </FormProvider>
    )
}

export default TimeBlocking