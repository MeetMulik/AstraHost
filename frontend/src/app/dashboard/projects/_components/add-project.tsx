import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/utils/constants";

const formSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  githubUrl: z.string().url("Invalid Git URL"),
  description: z.string().optional(),
});

export function AddProject() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      githubUrl: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("values", values);
      const response = await axios.post(`${BASE_URL}/projects`, values);
      console.log('response', response);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>Enter the details of your new project. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="meet-portfolio-website-1" {...field} />
                  </FormControl>
                  <FormDescription>Enter a unique name for your project.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Git URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/username/repo.git" {...field} />
                  </FormControl>
                  <FormDescription>Enter the Git URL of your project repository.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Input placeholder="A project about.." {...field} />
                  </FormControl>
                  <FormDescription>Enter some details about the project.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save Project</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
