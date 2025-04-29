
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Define the form schema
const formSchema = z.object({
  discordId: z.string().min(1, { message: "Discord ID wird benötigt" }),
  message: z.string().min(10, { message: "Bitte gib mind. 10 Zeichen ein" }).max(1000),
  type: z.enum(["bug", "suggestion"])
});

type FormValues = z.infer<typeof formSchema>;

interface FeedbackFormProps {
  type: "bug" | "suggestion";
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ type }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      discordId: "",
      message: "",
      type: type
    }
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: FormValues) => {
    try {
      const { error } = await supabase
        .from('feedback')
        .insert([{ 
          discord_id: data.discordId, 
          message: data.message,
          type: data.type 
        }]);
        
      if (error) throw error;
      
      toast.success(type === "bug" 
        ? "Bug-Report erfolgreich übermittelt" 
        : "Vorschlag erfolgreich übermittelt");
      
      form.reset({
        discordId: "",
        message: "",
        type: type
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Fehler beim Übermitteln der Nachricht");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="discordId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sorin-text">Discord ID</FormLabel>
              <FormControl>
                <Input 
                  placeholder="z.B. username#1234" 
                  className="bg-sorin-dark/50 border-sorin-accent/30 text-sorin-text" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sorin-text">
                {type === "bug" ? "Bug-Beschreibung" : "Dein Vorschlag"}
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={type === "bug" 
                    ? "Beschreibe den Bug so detailliert wie möglich..." 
                    : "Beschreibe deinen Vorschlag..."
                  }
                  className="bg-sorin-dark/50 border-sorin-accent/30 text-sorin-text min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-sorin-accent hover:bg-sorin-highlight w-full"
        >
          {isSubmitting ? "Wird übermittelt..." : "Absenden"}
        </Button>
      </form>
    </Form>
  );
};

export default FeedbackForm;
