import { useState } from "react"


export const useUser = () => {
    const [name, setName] = useState<string>('');
    const [mail, setMail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [codeMail, setCodeMail] = useState<string>('')

    return {
        name, mail, password, setName,
        newPassword, codeMail, setMail, setPassword, setNewPassword, setCodeMail
    }
}