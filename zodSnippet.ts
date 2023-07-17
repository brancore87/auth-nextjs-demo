// import {  ZodType, z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod"

// type FormData = {
//   username: string;
//   email: string;
//   password: string;
// }

//   const schema: ZodType<FormData> = z.object({
//     username: z.string().max(55).min(5),
//     email: z.string().email(),
//     password: z.string().min(8),
//   });
  
//  const {register, handleSubmit} = useForm<FormData>({resolver: zodResolver(schema)});
  // const submitData = (data: FormData) => {
  //   console.log("It worked", data);
  // }

 // {...register("email")}