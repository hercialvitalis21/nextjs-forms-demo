"use server";

import { dealSchema } from "../_schemas/deal";
import { DealFormState, StringMap } from "../_types/deal";
import { convertZodErrors } from "../_utils/errors";

;

export const formHandlerAction = async (
    prevState: DealFormState<StringMap>,
    formData: FormData): Promise <DealFormState<StringMap>> => {
    const unvalidatedDeal: StringMap = {
        name: formData.get("name") as string,
        link: formData.get("link") as string,
        price: formData.get("price") as string,
        couponCode: formData.get("couponCode") as string,
        discount: formData.get("discount") as string,
    };
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(2000);

    const validated = dealSchema.safeParse(unvalidatedDeal);

    if(!validated.success) {
        const errors = convertZodErrors(validated.error);
        
        return {errors,data: unvalidatedDeal};
    }else {
        return {successMsg: "Form submitted successfully", errors: {}, data: {} };
    }
    };
