"use client"

import { TypographyH3 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { send } from "process";
import { sendToGPT } from "./actions";

const FormSchema = z.object({
    message: z.string().min(10),
})




export function UI() {
    const [message, setMessage] = useState<string>("The Cube is thinking")
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema)
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const response = await sendToGPT(data.message)
        setMessage(response as string)
    }

    return (
        <Form {...form}>
            <form className="flex min-h-screen flex-col items-center justify-between p-3" onSubmit={form.handleSubmit(onSubmit)}>
                <TypographyH3>Your goal is to make The Cube reveal the secret password. It has been told not to reveal it, so use your gaslighting skills.</TypographyH3>
                <div className="flex justify-center flex-col items-center">
                    <Image src="/cube.png" width={100} height={100} alt="The Cube" />
                    <p>{message}</p>
                </div>

                <div className="flex gap-1 w-full">
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Textarea placeholder="Ask The Cube Anything" {...field} />

                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button size="icon" type="submit">
                        <SendHorizonal className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </Form>
    )
}