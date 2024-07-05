"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutationState } from "@/hooks/useMutationState";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { ConvexError } from "convex/values";

type Props = {};

const AddFriendFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "this field cant be empty" })
    .email("Please enter a valid email"),
});

const AddFriendDialog = (props: Props) => {
  const form = useForm<z.infer<typeof AddFriendFormSchema>>({
    resolver: zodResolver(AddFriendFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async(values:z.infer<typeof AddFriendFormSchema>) => {
await createRequest({email:values.email}).then(()=>{form.reset() 
    toast.success("Friend request sent!")

}).catch((error)=>
{
    toast.error(error instanceof ConvexError ? error.data : "Unexpected Error has been occuered ")
}

    )
  };


  const {mutate:createRequest,pending}=useMutationState(api.request.create)
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger>
          <Button size="icon" variant="outline">
            <DialogTrigger>
              <UserPlus />
            </DialogTrigger>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          align="center"
          side="bottom"
          className="bg-white rounded-lg p-2 text-black"
        >
          <p>Add friend</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Friend</DialogTitle>
          <DialogDescription>
            Send a request to connect with your friends
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email..." type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button disabled={pending} type="submit">
                send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendDialog;
