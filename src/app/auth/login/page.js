'use client';

import styles from '@/../public/styles/global.css';
import Image from 'next/image';
import Link from 'next/link';
import loginImg from '@/../public/login/login.svg';
import PassInput from '@/components/login/passInput';
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axios.util';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';

export default function LoginPage() {
	const initialFormData = {
		username: '',
		password: '',
		remember: false,
	};
	const [formData, setFormData] = useState(initialFormData);
	const router = useRouter();
	const [credentialIsInvalid, setCredentialIsInvalid] = useState(false);

	const handleFormDataChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.type == 'checkbox' ? e.target.checked : e.target.value,
		});
	};

	const handleFormSubmit = async (e) => {
		try {
			e.preventDefault();
			const res = await axiosInstance.post(`/api/public/login`, formData, { withCredentials: true });

			// const cookies = new Cookies(null, { path: '/' });
			// cookies.set('token', res.data.token);

			// if (res.data.refreshToken) {
			// 	cookies.set('refreshToken', res.data.refreshToken);
			// }

			router.push('/');
		} catch (error) {
			console.log(error);

			setCredentialIsInvalid(true);
			setFormData(initialFormData);
		}
	};

	return (
		<main className='flex justify-center items-center h-screen w-screen login-bg'>
			{/* Image Sign In */}
			<div className='w-2/5 hidden lg:block'>
				<Image src={loginImg} alt='Sign In Image' />
			</div>
			{/* Form Section */}
			<div className='lg:w-2/5'>
				<form onSubmit={(e) => handleFormSubmit(e)} className='bg-white rounded-2xl py-10 md:py-20 px-8 md:px-10 grid gap-9 shadow-lg'>
					{/* Title */}
					<div className='text-center grid gap-2'>
						<h1 className='text-l md:text-2xl text-[#1A365D] font-extrabold'>Pusat Informasi Informatika</h1>
						<h1 className='text-l md:text-2xl text-[#1A365D] font-extrabold'>Masuk</h1>
					</div>
					{/* Input Section */}
					<div className='grid gap-3'>
						<div className='grid gap-1'>
							<label htmlFor='username' className='text-xs md:text-base text-[#2279C9] font-semibold inline-block w-full'>
								Username
							</label>
							<input
								type='text'
								id='username'
								name='username'
								onChange={(e) => handleFormDataChange(e)}
								value={formData.username}
								className={`text-xs md:text-base bg-[#0000000A] ${credentialIsInvalid ? 'ring ring-red-200' : ''} rounded-md p-4 normal-case`}
								placeholder='username'
								required
							/>
						</div>
						<PassInput handleFormDataChange={handleFormDataChange} credentialIsInvalid={credentialIsInvalid} formData={formData} />
						{credentialIsInvalid ? <p className='text-red-400'>Username atau password tidak valid</p> : ''}
						{/* Remember-Me Switch */}
						<div className='flex items-center'>
							<label htmlFor='remember' className='bg-[#00000029] w-9 h-5 rounded-xl flex items-center pl-0.5 cursor-pointer'>
								<input type='checkbox' id='remember' name='remember' onChange={(e) => handleFormDataChange(e)} className='sr-only peer' />
								<span className='bg-white rounded-full w-4 h-4 relative left-px peer-checked:bg-[#888] peer-checked:left-4 shadow-md transition-all duration-500'></span>
							</label>
							<label htmlFor='remember' className='text-xs md:text-base font-normal text-[#999C9D] ml-1'>
								Ingat Saya
							</label>
						</div>
					</div>
					{/* Submit Button */}
					<button type='submit' className='text-white text-base md:text-xl font-bold bg-[#1A365D] rounded-md p-2'>
						Login
					</button>
					{/* Need Help */}
					<div className='text-center'>
						<Link href='#' className='text-[#2279C9] text-xs md:text-sm items-center font-semibold w-fit'>
							Butuh Bantuan?
						</Link>
					</div>
				</form>
			</div>
		</main>
	);
}
