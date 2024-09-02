import { useForm } from 'react-hook-form'
import { useState } from 'react'

function Formulario() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [ formEnviado, setFormEnviado ] = useState(false)

    const onSubmit = data => {
        console.log(data)
        setFormEnviado(true)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Nome: </label>
                    <input type="text" {...register('nome', { require: true })} />
                    {errors.nome && <p>O nome é obrigatório</p>}
                </div>

                <div>
                    <label>Email: </label>
                    <input type="text" {...register('email', {
                        require: true,
                        pattern: {
                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            message: 'Formato de email inválido'
                        }
                    })} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div>
                    <label>Senha: </label>
                    <input type="password" {...register('senha', { require: true })} />
                    {errors.nome && <p>A senha é obrigatória</p>}
                </div>

                <button type='submit'>Enviar</button>

            </form>

            {formEnviado && <p>Formulário enviado com sucesso!</p>}
        </>
    )
}

export default Formulario
