import { useState } from "react"

export const useUser = () => {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    return { name, mail, password, setName, setMail, setPassword }
}