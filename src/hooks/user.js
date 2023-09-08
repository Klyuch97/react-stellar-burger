import { useState } from "react"

export const useUser = () => {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [codeMail, setCodeMail] = useState('')

    return {
        name, mail, password, setName, setMail, setPassword,
        newPassword, setNewPassword, codeMail, setCodeMail
    }
}