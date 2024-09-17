'use client';

import axiosInstance from '@/utils/axios.util';
import { API_BASE_URL } from '@/utils/constant.util';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

export default function DashboardProfile() {
	const initialUserFormData = {
		id: '',
		name: '',
		nidn: '',
		nip: '',
		phoneNumber: '',
		address: '',
	};
	const [userFormData, setUserFormData] = useState(initialUserFormData);
	const [staticUserData, setStaticUserData] = useState({
		email: '',
		nidn: '',
		nip: '',
	});
	const [profilePictureUrl, setProfilePictureUrl] = useState('');
	const avatarInput = useRef();

	const getAuthenticatedUser = async () => {
		try {
			const res = await axiosInstance.get('/api/user/authenticated-user', {
				withCredentials: true,
			});
			const user = res.data.user;

			setUserFormData({
				id: user.id,
				name: user.name,
				phoneNumber: user.phone_number,
				address: user.address,
			});
			setStaticUserData({
				email: user.email,
				nidn: user.nidn,
				nip: user.nip,
			});
			setProfilePictureUrl(API_BASE_URL + user.profile_url);
		} catch (error) {
			console.log(error);
		}
	};

	const handleInputOnChange = (e) => {
		setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
	};

	const handleFileInputOnChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setUserFormData({ ...userFormData, [e.target.name]: e.target.files[0] });
			setProfilePictureUrl(URL.createObjectURL(e.target.files[0]));
		}
	};

	const handleUpdateUserData = async (e) => {
		e.preventDefault();

		var formData = new FormData();
		for (var key in userFormData) {
			formData.append(key, userFormData[key]);
		}

		try {
			const res = await axiosInstance.post('/api/user/lecturers/update', formData, {
				withCredentials: true,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			console.log(res);

			Swal.fire({
				icon: 'success',
				title: 'Berhasil',
				text: 'Berhasil update profil',
			}).then(() => {
				window.location.reload();
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditFotoClick = () => {
		avatarInput.current.click();
	};

	useEffect(() => {
		getAuthenticatedUser();
	}, []);

	return (
		<>
			<div className='fixed z-10 w-full h-24 px-40 flex items-center bg-[#F8F9FA] shadow-md'>
				<h1 className='text-biru-dongker font-bold text-2xl md:text-4xl'>Profil</h1>
			</div>
			<div className='container px-4 pt-36 py-8 mx-auto'>
				<div className='flex flex-col md:flex-row gap-4'>
					<div className='basis-2/5'>
						<div className='w-full max-w-[80%] mx-auto space-y-4'>
							<div className='relative'>
								<img src={profilePictureUrl} alt='foto profil' className='w-full mx-auto object-cover' />
								<div onClick={(e) => handleEditFotoClick()} className='absolute bottom-0 w-full p-4 bg-black/70 text-white text-center font-bold text-lg lg:text-xl'>
									Edit foto
								</div>
								<input ref={avatarInput} type='file' name='avatar' onChange={(e) => handleFileInputOnChange(e)} className='hidden' accept='image/png, image/jpeg' />
							</div>
						</div>
					</div>
					<div className='w-full basis-3/5'>
						<form onSubmit={(e) => handleUpdateUserData(e)} className='space-y-4'>
							<div>
								<h6 className='font-bold'>Nama</h6>
								<input type='text' name='name' value={userFormData?.name} onChange={(e) => handleInputOnChange(e)} required className='w-full p-3 rounded-md border-solid border border-gray-400' />
							</div>
							<div className='w-full flex flex-row gap-4'>
								<div className='basis-1/2'>
									<h6 className='font-bold'>NIDN</h6>
									<input type='text' name='nidn' value={staticUserData?.nidn} disabled className='w-full p-3 rounded-md border-solid border border-gray-400 bg-gray-100' />
								</div>
								<div className='basis-1/2'>
									<h6 className='font-bold'>NIP</h6>
									<input type='text' name='nip' value={staticUserData?.nip} disabled className='w-full p-3 rounded-md border-solid border border-gray-400 bg-gray-100' />
								</div>
							</div>
							<div className='w-full flex flex-row gap-4'>
								<div className='basis-1/2'>
									<h6 className='font-bold'>Email</h6>
									<input type='text' value={staticUserData?.email} disabled className='w-full p-3 rounded-md border-solid border border-gray-400 bg-gray-100' />
								</div>
								<div className='basis-1/2'>
									<h6 className='font-bold'>Telepon</h6>
									<input
										type='tel'
										name='phoneNumber'
										value={userFormData?.phoneNumber}
										minLength={10}
										onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
										onChange={(e) => handleInputOnChange(e)}
										className='w-full p-3 rounded-md border-solid border border-gray-400'
									/>
								</div>
							</div>
							<div>
								<h6 className='font-bold'>Alamat</h6>
								<input
									type='text'
									name='address'
									value={userFormData?.address}
									onChange={(e) => handleInputOnChange(e)}
									required
									className='w-full p-3 rounded-md border-solid border border-gray-400'
								/>
							</div>
							<button type='submit' className='w-full py-2 rounded-lg bg-biru-muda text-lg font-bold text-white hover:bg-biru-dongker hover:shadow-sm active:shadow-md'>
								Simpan
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
