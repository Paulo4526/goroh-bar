import { redirect } from "next/navigation";
import { FormEvent } from "react";
export const useUpdateAndDelete = () => {


  

  // -------------------------------- Delete ---------------------------------------------
  const deleteUser = async (
    
      token: string, 
      id:number, 
      setError: (error: string) => void, 
      setConfirm: (confirm: boolean) => void
    
    ) => {
    const res = await fetch(`/goroh/user/delete?id=${id}`, {
    method: "DELETE",
    headers: {"Content-Type" : "application/json", 'Authorization': `Bearer ${token}`}
  })
  if(res.status === 204){
    setConfirm(true)
    redirect(`/show-users`)
  }else if(res.status === 403){
    setError("Ação não autorizada, solicite apoio a um usuário MASTER!")
  }else if(res.status === 404){
    setError("Usuário não encontrado! Verifique o Banco de Dados.")
  }else if (res.status === 500){
    console.log(`Ops! Surgiu um problema! Estamos trabalhando na solução, tente novamente mais tarde!`)
  }else{
    setError("Erro na requição tente novamente mais tarde")
    console.log(`Erro: ${res.status}`)
  }
}

// -------------------------------- Update ---------------------------------------------
const updateUser = async (

  id: number | null, 
  token: string,
  ev: FormEvent<HTMLFormElement>

) => {
    const formElement = ev.currentTarget;
    const formData = new FormData(formElement);

    const name = formData.get("name");

    const email = formData.get("email") !== null && formData.get("email") !== "" ? formData.get("email") : null;

    const password = formData.get("password") !== null && formData.get("password") !== "" ? formData.get("password") :  null

    const role = formData.get("role")

    const newData = () => {
      if(role !== null && role !== ""){
        return ({name, email, password, role})
      }else{
        return({name, email, password})
      }
    }

  const res = await fetch(`/goroh/user/update?id=${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
    body: JSON.stringify(newData())
    
  })
  if(res.status === 202) {
    console.log("Atualização realizada com sucesso!")
  }
}

  return { deleteUser, updateUser};
  
};
