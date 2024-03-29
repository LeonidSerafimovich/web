'use client'
import React from 'react'
import ReactDOM from 'react-dom'
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form'
import LableTopInput from '../inputs/LableTopInput'

interface FeedbackFormProps {
	onClose: () => void
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onClose }) => {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors }
	} = useForm<FieldValues>()

	const selectedProduct = watch('product')

	const onSubmit: SubmitHandler<FieldValues> = data => {
		// Обработка отправки данных, например, с использованием API
		// ...

		// Закрытие формы после отправки данных
		onClose()
	}

	return ReactDOM.createPortal(
		<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-white p-8 rounded shadow-md max-w-md w-full'>
				<h2 className='text-2xl font-bold mb-4'>Обратная связь</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='mb-4'>
						<label
							htmlFor='product'
							className='block text-sm font-medium text-gray-600'
						>
							Продукт:
						</label>
						<select
							id='product'
							{...register('product', { required: 'Выберите продукт' })}
							value={selectedProduct}
							onChange={e => setValue('product', e.target.value)}
							className='mt-1 p-2 w-full border rounded-md'
						>
							<option value=''>Выберите продукт</option>
							<option value='1С: Управление нашей фирмой 8 ПРОФ'>
								1С: Управление нашей фирмой 8 ПРОФ
							</option>
							<option value='1С: Зарплата и Управление Персоналом 3'>
								1С: Зарплата и Управление Персоналом 3
							</option>
							<option value='1С: Бухгалтерия 3 ПРОФ'>
								1С: Бухгалтерия 3 ПРОФ
							</option>
							<option value='1C: Управление торговлей 11 ПРОФ'>
								1C: Управление торговлей 11 ПРОФ
							</option>
							{/* ... остальные опции ... */}
						</select>
						{errors.product && (
							<span className='text-red-500 text-sm'>
								{/* {errors.product.message} */}
							</span>
						)}
					</div>
					<div className='mb-4'>
						<LableTopInput
							{...register('userName', {
								required: 'введите имя пользователя'
							})}
							id='userName'
							type='text'
							placeholder='user'
							label='ФИО'
						/>
					</div>
					<div className='mb-4'>
						<LableTopInput
							{...register('email', {
								required: 'введите Email'
							})}
							id='email'
							type='text'
							placeholder='email'
							label='Введите email'
						/>
					</div>
					<div className='flex justify-between'>
						<button
							type='submit'
							className='bg-[#B39C39] normal-case border-2 hover:border-[#B39C39] text-lg  hover:bg-white text-white duration-300 hover:text-[#B39C39] rounded-md py-1 px-2 mr-6 mt-8'
						>
							Отправить
						</button>
						<button
							type='button'
							onClick={onClose}
							className=' normal-case   text-lg  hover:bg-white text-red-500 duration-300 hover:text-red-800 rounded-md py-1 px-2 mr-6 mt-8'
						>
							Закрыть
						</button>
					</div>
				</form>
			</div>
		</div>,
		document.body
	)
}

export default FeedbackForm
