import { useForm, type Resolver } from "react-hook-form";
import './App.css'
import { Form, FormControl, FormField, FormItem, FormLabel } from './components/ui/form'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { RequestSchema, type RequestFormData } from './schema/request.schema'
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Textarea } from "./components/ui/textarea";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./components/ui/input-group";
import { User2 } from "lucide-react";
import { createRequestService } from "./services/request.service";
import { useState } from "react";
import { Spinner } from "./components/ui/spinner";
import { toast } from "sonner";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<RequestFormData>({
    resolver: zodResolver(RequestSchema) as Resolver<RequestFormData>,
    defaultValues: {
      studentName: "",
      studentEnrollment: "",
      studentClass: 0,
      course: "Ciências da Computação",
      academicYear: "",
      curricularYear: 0,
      type: "OTHER",
      details: ""
    },
  });

  const onSubmit = async (data: RequestFormData) => {
    try {
      setIsLoading(true);
      const result = await createRequestService(data);
      toast.success("Solicitação enviada com sucesso", { position: "top-center", });

      form.reset(); // limpa o formulário
    } catch (error) {
      toast.error("Falha ao enviar solicitação. Tente novamente.", { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-4 rounded-md">
            <div className="w-full max-w-3xl bg-white p-4 rounded-xl shadow">

              <div className="flex justify-center mb-6">
                <img
                  src="https://efetividade.ispcaala.com/caala_logo-01.png"
                  alt="Logo Isp-Caála"
                  className="h-24 object-contain"
                />
              </div>

              <h1 className="my-5 text-lg font-bold">Formulário de Requisitação - Coordenação de Ciências da Computação</h1>

              <div className="md:flex gap-5">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className='mb-5'>
                      <FormLabel>Tipo de Solicitação</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o tipo de solicitação" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DECLARATION">Declaração</SelectItem>
                            <SelectItem value="REVIEW">Revisão</SelectItem>
                            <SelectItem value="MINI_PAUTA">Mini Pauta</SelectItem>
                            <SelectItem value="OTHER">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="academicYear"
                  render={({ field }) => (
                    <FormItem className='mb-5'>
                      <FormLabel>Ano Académico</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Digite o ano académico" {...field} />
                      </FormControl>
                      {/* <FormDescription>{field.value}</FormDescription> */}
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:flex gap-5">
                <FormField
                  control={form.control}
                  name="studentClass"
                  render={({ field }) => (
                    <FormItem className='mb-5'>
                      <FormLabel>Turma</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Informe a turma" {...field} />
                      </FormControl>
                      {/* <FormDescription>{field.value}</FormDescription> */}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="curricularYear"
                  render={({ field }) => (
                    <FormItem className='mb-5'>
                      <FormLabel>Ano Curricular</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Digite o ano curricular que" {...field} />
                      </FormControl>
                      {/* <FormDescription>{field.value}</FormDescription> */}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="studentEnrollment"
                  render={({ field }) => (
                    <FormItem className='mb-5'>
                      <FormLabel>Passe do Estudante</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Digite o seu passe" {...field} />
                      </FormControl>
                      {/* <FormDescription>{field.value}</FormDescription> */}
                    </FormItem>
                  )}
                />

              </div>

              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem className='mb-5'>
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput {...field} placeholder="Nome Completo" />
                        <InputGroupAddon>
                          <User2 />
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    {/* <FormDescription>{field.value}</FormDescription> */}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem className='mb-5'>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <FormLabel>Detalhes da Solicitação</FormLabel>
                        <Textarea placeholder="Digite os detalhes da solicitação" {...field} />
                      </div>
                    </FormControl>
                    {/* <FormDescription>{field.value}</FormDescription> */}
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full text-md font-bold bg-blue-900 hover:bg-blue-950 cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner />
                ) : "Enviar Solicitação"}

              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}

export default App
