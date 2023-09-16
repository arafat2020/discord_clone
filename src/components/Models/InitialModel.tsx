"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod'
import axios from 'axios'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "../ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FIleUpload from "../FIleUpload";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function InitialModel() {
    const formSchema = z.object({
        name: z.string().min(1, {
            message: 'Server Name is Required'
        }),
        imageUrl: z.string().min(1, {
            message: 'Image required'
        })
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: ""
        }
    })
    const [isMounted, setIsMounted] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const ld = form.formState.isLoading
    const onsubmitt = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post('/api/server',values)
            form.reset()
            router.refresh()
            window.location.reload()
        } catch (error) {
            console.log(error);
            
        }
    }
    if (!isMounted) {
        return null;
    }

    return (
        <Dialog open={true}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Customize Your Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Create server To Connect People
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onsubmitt)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => {
                                        return <FormItem>
                                            <FormControl>
                                                <FIleUpload value={field.value} endpoint="serverImage" onChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    }}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => {
                                    return <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Server Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input disabled={ld} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter server name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button disabled={ld} variant="primary">Create</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default InitialModel