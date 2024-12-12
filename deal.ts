import { z } from "zod";

export const dealSchema = z.object({
    name: z.string({message: "Name is required"}).min(6, {
        message: "Name must be at least 6 characters long"
    }),
    link: z.string({message:"link is required"}).url({
        message: "Please enter a valid URL starting with http:// or https://"
    }),
    price: z.coerce.number().min(2, {
        message: "Price must be at least 2 dollars"
    }),
    couponCode: z.string({message:"Coupon code is required"}).min(5,{message:"Coupon code must be at least 5 characters long"}),
    discount: z.coerce.number({message: "discount percentage is required"}).min(1, {message:"Discount must be at least 0%"}).max(100, {message:"Discount percentage  must be greater than 1%"}).max(100,{message:"Discount percentage  must be less than or equal to 100%"}),
})
