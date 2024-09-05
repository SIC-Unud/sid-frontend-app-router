'use client';

import Image from 'next/image';
import styles from '@/../public/styles/global.css';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '@/utils/axios.util';
import { API_BASE_URL } from '@/utils/constant.util';
import { Avatar } from 'flowbite-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const AnnouncementCard = ({ announcement }) => {
	const cutContent = (text, max) => {
		const array = text.split(' ');

		if (array.length > max) {
			return array.slice(0, max).join(' ') + '...';
		}

		return text;
	};

	return (
		<div className='flex p-3 flex-col items-start gap-2 self-stretch rounded-lg bg-gray-50 shadow-lg'>
			<div className='flex items-center justify-center gap-2'>
				<div className='w-3 h-3 rounded-full bg-red-500'></div>
				<div className='text-md font-bold text-hitam'>{announcement.title}</div>
				<div className='flex px-2 py-1 justify-center items-center gap-2 rounded-3xl bg-red-200 text-sm font-bold text-red-500'>{announcement.priority}</div>
			</div>
			<p className='self-stretch text-hitam text-justify text-sm font-normal'>{cutContent(announcement.content)}</p>
			<div className='flex justify-between items-center self-stretch'>
				<div className='flex flex-row gap-2 items-center text-sm font-normal text-gray-500'>
					{announcement.lecturer.name}
					{announcement.lecturer.profile_url ? <Avatar img={`${API_BASE_URL}${announcement.lecturer.profile_url}`} rounded size='xs' /> : <Avatar rounded size='xs' />}
				</div>
				<p className='text-justify text-sm font-normal text-gray-500'>
					{new Date(announcement.createdAt).toLocaleDateString('id-ID', {
						day: '2-digit',
						month: 'short',
						year: 'numeric',
					})}
				</p>
			</div>
		</div>
	);
};

export default function PengumumanUser() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [media, setMedia] = useState(null);
	const [priority, setPriority] = useState('penting');
	const form = useRef();
	const [announcements, setAnnouncements] = useState([]);
	const [userAnnouncements, setUserAnnouncements] = useState([]);
	const [page, setPage] = useState(1);
	const limit = 5;
	const [hasMore, setHasMore] = useState(true);
	const [user, setUser] = useState(null);
	const router = useRouter();

	const handleFormSubmit = async (e) => {
		try {
			e.preventDefault();
			var formData = new FormData();

			formData.append('title', title);
			formData.append('content', content);
			formData.append('priority', priority);
			// Loop through the FileList and append each file to the FormData
			if (media) {
				for (let i = 0; i < media.length; i++) {
					formData.append('medias', media[i]);
				}
			}

			const res = await axiosInstance.post('/api/user/announcements', formData, {
				withCredentials: true,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			Swal.fire({
				icon: 'success',
				title: 'Berhasil',
				text: 'Berhasil menambah pengumuman',
			}).then(() => {
				window.location.reload();
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getAnnouncement = async () => {
		try {
			const res = await axiosInstance.get('/api/public/announcements/paginate', {
				params: {
					page: page,
					limit: limit,
				},
			});

			// If there is data
			if (res.data.data.length > 0) {
				setAnnouncements([...announcements, ...res.data.data]);
				setPage(page + 1);
				// set hasMore to false if there is no more data coming
			} else {
				setHasMore(false);
			}
		} catch (error) {}
	};

	const getAuthenticatedUser = async () => {
		try {
			const res = await axiosInstance.get('/api/user/authenticated-user', {
				withCredentials: true,
			});

			setUser(res.data.user);
		} catch (error) {
			router.push('/auth/login');
		}
	};

	const getUserAnnouncement = async () => {
		try {
			const res = await axiosInstance.get('/api/user/announcements/paginate', {
				withCredentials: true,
			});

			setUserAnnouncements(res.data.data);
		} catch (error) {}
	};

	useEffect(() => {
		getAnnouncement();
		getAuthenticatedUser();
		getUserAnnouncement();
	}, []);

	return (
		<>
			<div className='fixed z-10 w-full h-24 px-40 flex items-center bg-[#F8F9FA] shadow-md'>
				<h1 className='text-biru-dongker font-bold text-2xl md:text-4xl'>Pengumuman</h1>
			</div>
			<div className='container px-4 pt-36 py-8 mx-auto'>
				<div className='flex flex-col lg:flex-row gap-4'>
					{/* tabel buat pengumuman */}
					<div className='lg:basis-2/5 w-full p-5 rounded-lg shadow-md bg-white space-y-6'>
						<div className=' font-bold text-xl text-black'>Buat Pengumuman</div>
						<form ref={form} onSubmit={(e) => handleFormSubmit(e)}>
							<div className='flex flex-col items-start gap-4 self-stretch'>
								<div className='w-full space-y-2 text-base font-medium'>
									<h5>Judul Pengumuman</h5>
									<input
										name='title'
										onChange={(e) => setTitle(e.target.value)}
										className='w-full h-12 px-4 rounded-md border-solid border border-gray-400 text-sm font-normal'
										placeholder='Judul Pengumuman'
										required
									></input>
								</div>
								<div className='flex flex-col items-start gap-2 self-stretch'>
									<div className='flex flex-col items-start gap-2 text-base font-medium'>Prioritas</div>
									<div className='flex flex-row gap-2'>
										<button
											type='button'
											onClick={() => setPriority('penting')}
											className={`flex ${
												priority == 'penting' ? 'bg-biru-muda text-white border-biru-muda' : 'border-gray-300'
											} text-gray-500 font-medium border-2 border-solid py-2 px-4 justify-center items-center gap-3 rounded-lg hover:shadow-sm active:shadow-md`}
										>
											Penting
										</button>
										<button
											type='button'
											onClick={() => setPriority('normal')}
											className={`flex ${
												priority == 'normal' ? 'bg-biru-muda text-white border-biru-muda' : 'border-gray-300'
											} text-gray-500 font-medium border-2 border-solid py-2 px-4 justify-center items-center gap-3 rounded-lg hover:shadow-sm active:shadow-md`}
										>
											Normal
										</button>
									</div>
								</div>
								<div className='space-y-2 w-full font-normal text-base text-black'>
									<h5>Isi Pengumuman</h5>
									<textarea
										name='content'
										onChange={(e) => setContent(e.target.value)}
										rows={10}
										className='w-full p-4 rounded border-solid border border-gray-400 font-normal text-base'
										placeholder='Masukan inti dari pengumuman...'
										required
									></textarea>
								</div>
								<div className='space-y-2'>
									<h6 className='font-medium text-base'>Dokumen pengumuman</h6>
									<input type='file' name='medias' id='' multiple onChange={(e) => setMedia(e.target.files)} className='rounded-lg' />
									<p className='text-gray-500 font-normal text-xs'>SVG, PNG, JPG or PDF (max. 2MB)</p>
								</div>
								<button
									type='submit'
									className='flex py-2 px-5 justify-center items-center gap-1 self-stretch rounded-lg bg-biru-muda text-lg font-bold text-white hover:bg-biru-dongker hover:shadow-sm active:shadow-md'
								>
									Buat Pengumuman
								</button>
							</div>
						</form>
					</div>
					{/* tabel pengumuman anda */}
					<div className='lg:basis-3/5 flex w-full flex-col items-start gap-4 rounded-lg shadow-md bg-white'>
						<div className='w-full basis-2/5 p-5 space-y-4'>
							<div className='flex items-center gap-6 self-stretch font-bold text-xl text-black'>Pengumuman Anda</div>
							<div className='w-full h-[13rem] space-y-4 overflow-y-auto'>
								{userAnnouncements.length > 0 ? userAnnouncements.map((announcement) => <AnnouncementCard announcement={announcement} />) : <p className='ml-10'>Tidak ada pengumuman</p>}
							</div>
						</div>
						<div className='basis-3/5 w-full p-5 space-y-4'>
							<h3 className='text-xl text-black font-bold'>Daftar Pengumuman</h3>
							{/* informasi di tabel pengumuman */}
							<div id='scrollableDiv' className='w-full h-[22rem] overflow-y-auto'>
								<InfiniteScroll
									dataLength={announcements.length}
									next={getAnnouncement}
									hasMore={hasMore}
									scrollableTarget='scrollableDiv'
									loader={<h4>Loading...</h4>}
									endMessage={
										<p style={{ textAlign: 'center' }}>
											<b>Yay! You have seen it all</b>
										</p>
									}
									className='space-y-4'
								>
									{announcements.length > 0 && announcements.map((announcement) => <AnnouncementCard announcement={announcement} key={announcement.id} />)}
									{announcements.length == 0 && <p className='ml-10'>Tidak ada pengumuman</p>}
								</InfiniteScroll>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
