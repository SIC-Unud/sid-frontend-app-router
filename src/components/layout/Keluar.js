import axiosInstance from '@/utils/axios.util';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoAlertCircle } from 'react-icons/io5';

const Keluar = ({ isvisible, onClose }) => {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await axiosInstance.get('/api/public/logout', { withCredentials: true });
			router.push('/auth/login');
		} catch (error) {
			console.log(error);
		}
	};

	if (!isvisible) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
			<div className='inline-flex px-20 py-8 flex-col items-center gap-8 rounded-xl bg-white'>
				<div className='text-red-500 overflow-hidden rounded-full'>
					<IoAlertCircle className='size-40' />
				</div>
				<div className='font-bold text-xl text-center text-black'>Apakah Anda yakin ingin log out?</div>
				<div className='flex gap-4'>
					<button onClick={handleLogout} type='button' className='w-24 px-5 py-2 rounded-lg bg-biru-muda font-bold text-white text-center'>
						Ya
					</button>
					<button className='w-24 px-5 py-2 rounded-lg bg-white border-2 border-solid border-biru-muda font-bold text-biru-muda text-center' onClick={() => onClose()}>
						Tidak
					</button>
				</div>
			</div>
		</div>
	);
};

export default Keluar;
