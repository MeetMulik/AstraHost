"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Deployment } from "@/types/deployment";
import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  deploymentDescription: z.string().min(1, {
    message: "Deployment description is required.",
  }),
});

export function DeployButton({ latestDeployment, projectId }: { latestDeployment: Deployment | null; projectId: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deploymentDescription: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);

    toast.promise(
      async () => {
        const response = await axios.post<Deployment>(
          `${BASE_URL}/deploy`,
          {
            projectId,
            deploymentDescription: values.deploymentDescription,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      },
      {
        loading: "Deploying...",
        success: (deploymentData) => {
          setIsDialogOpen(false);
          form.reset();
          return `Deployment successful!`;
        },
        error: (error) => {
          console.error("Error during deployment:", error);
          return "Deployment failed. Please try again.";
        },
      }
    );
  };

  return (
    <>
      {latestDeployment ? (
        <Button variant={"default"} onClick={() => setIsDialogOpen(true)}>
          Redeploy
        </Button>
      ) : (
        <Button variant="secondary" onClick={() => setIsDialogOpen(true)}>
          Deploy
        </Button>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{latestDeployment ? "Redeploy" : "Deploy"} Project</DialogTitle>
            <DialogDescription>Enter a description for this deployment.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="deploymentDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deployment Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter deployment description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{latestDeployment ? "Redeploy" : "Deploy"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
