'use client';

import axiosInstance from '@/utils/axios.util';
import { API_BASE_URL } from '@/utils/constant.util';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar } from 'flowbite-react';

const AnnouncementCard = ({ announcement }) => {
	const cutContent = (text, max) => {
		const array = text.split(' ');

		if (array.length > max) {
			return array.slice(0, max).join(' ') + '...';
		}

		return text;
	};

	return (
		<div className='bg-white border rounded-xl shadow-md mx-10 px-5 m-5 cursor-pointer hover:scale-105 duration-200' href='#'>
			<div className='flex flex-row'>
				<div className='max-w-[50%]'>
					<h1 className='font-bold text-lg ml-4 my-4 lg:my-7'>{announcement.title}</h1>
				</div>
				<div className='bg-red-100 max-w-[50%] mt-8 lg:ml-8 ml-10 p-2 lg:my-6 lg:mx-4 h-min lg:p-2 rounded-lg'>
					<h2 className='font-bold text-md text-red-600 text-center'>{announcement.priority}</h2>
				</div>
			</div>
			<div className='max-h-40 overflow-y-auto'>
				<p className='ml-4'>{cutContent(announcement.content, 20)}</p>
			</div>

			<div className='flex flex-col lg:flex-row lg:justify-between my-3'>
				<div className='flex items-center py-4 lg:ml-3'>
					<img className='rounded-full w-6 h-6' src='/images/KUSUMA.jpg' />
					<div className='ml-3'>
						<strong>{announcement.lecturer.name}</strong>
					</div>
				</div>
				<div className='flex justify-end lg:items-center py-4'>
					<p className='text-gray-500'>
						{new Date(announcement.createdAt).toLocaleDateString('id-ID', {
							day: '2-digit',
							month: 'short',
							year: 'numeric',
						})}
					</p>
				</div>
			</div>
		</div>
	);
};

export default function UserDashboard() {
	const [announcements, setAnnouncements] = useState([]);
	const [page, setPage] = useState(1);
	const limit = 5;
	const [hasMore, setHasMore] = useState(true);
	const [user, setUser] = useState(null);
	const router = useRouter();

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

	useEffect(() => {
		getAuthenticatedUser();
		getAnnouncement();
	}, []);

	return (
		<>
			<div className='fixed z-10 w-full h-24 px-40 flex items-center bg-[#F8F9FA] shadow-md'>
				<h1 className='text-biru-dongker font-bold text-2xl md:text-4xl'>Dashboard</h1>
			</div>
			<div className='container px-4 pt-36 py-8 mx-auto'>
				<div className='bg-transparent'>
					<div className='flex flex-col bg-transparent gap-y-14 gap-x-8 lg:flex-row lg:justify-between'>
						<div className='h-min w-full space-y-4'>
							{/* Profile */}
							{user && (
								<div className='shadow-lg rounded-lg bg-white p-4 lg:p-8 space-y-4'>
									<div>
										<h5 className='font-bold text-xl'>Status Anda</h5>
									</div>
									<div className='flex items-start max-w-lg'>
										{user.profile_url ? <Avatar img={`${API_BASE_URL}${user.profile_url}`} size='xl' className='rounded-lg' /> : <Avatar size='xl' className='rounded-lg' />}
										<div className='ml-4'>
											<h1 className='font-bold text-md'>{user.name}</h1>
											{/* <div className='flex items-center'>
											<div className='bg-red-500 w-4 h-4 rounded-full mt-3'></div>
											<p className='text-sm mt-3 ml-2'>Mengajar</p>
										</div>
										<p className='text-sm ml-2 mt-1'>Desain Analisis Kepala Manusia</p>
										<p className='text-sm ml-2 mt-1 mb-5'>Gedung Dekanat FMIPA | Ruang 3.2</p> */}
										</div>
									</div>
									<div className='flex flex-row'>
										<button className='bg-blue-600 w-[50%] py-2 mx-2 rounded-lg center cursor-pointer hover:scale-105 duration-200'>
											<h1 className='font-bold text-white text-center'>Ubah Status</h1>
										</button>
										<button className='bg-white border-2 border-blue-600 w-[50%] py-2 mx-2 rounded-lg cursor-pointer hover:scale-105 duration-200'>
											<h1 className='font-bold text-blue-600 text-center'>Edit Profil</h1>
										</button>
									</div>
								</div>
							)}

							{/* Announcement */}
							<div className='shadow-lg rounded-lg bg-white p-4 lg:p-8 space-y-4'>
								{/* Header */}
								<div className='flex flex-row justify-between'>
									<h5 className='font-bold text-xl text-center'>Pengumuman</h5>
									<div className='bg-blue-600 max-w-lg px-6 py-2 rounded-lg text-center cursor-pointer hover:scale-105 duration-200'>
										<h1 className='text-white font-bold'>Tambah</h1>
									</div>
								</div>

								<div id='scrollableDiv' className='bg-transparent h-[50vh] overflow-y-auto'>
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
										{announcements.length > 0 && announcements.map((announcement) => <AnnouncementCard key={announcement.id} announcement={announcement} />)}
										{announcements.length == 0 && <p className='ml-10'>Tidak ada pengumuman</p>}
									</InfiniteScroll>
								</div>
							</div>
						</div>

						{/* <div className='w-full lg:basis-2/5'>
							<div className='shadow-lg rounded-lg p-8 bg-white'>
								<div className='flex flex-row justify-between'>
									<div>
										<h1 className='font-bold text-lg'>Piket Dosen</h1>
									</div>
									<div className='max-w-lg'>
										<button
											className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center'
											type='button'
											data-dropdown-toggle='dropdown'
										>
											Hari Ini
											<svg className='w-4 h-4 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
												<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'></path>
											</svg>
										</button>
										<div className='hidden bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4' id='dropdown'>
											<ul className='py-1' aria-labelledby='dropdown'>
												<li>
													<a href='#' className='text-sm text-center hover:bg-gray-100 text-gray-700 block px-9 py-2'>
														Di Kampus
													</a>
												</li>
												<li>
													<a href='#' className='text-sm text-center hover:bg-gray-100 text-gray-700 block px-9 py-2'>
														Kelas Hari Ini
													</a>
												</li>
												<li>
													<a href='#' className='text-sm text-center hover:bg-gray-100 text-gray-700 block px-9 py-2'>
														Piket Hari Ini
													</a>
												</li>
											</ul>
										</div>

										<script src='https://unpkg.com/@themesberg/flowbite@latest/dist/flowbite.bundle.js'></script>
									</div>
								</div>
								<div className='py-4 space-y-4'>
									<div className='bg-white border rounded-lg shadow-md py-1 px-4 cursor-pointer hover:scale-105 duration-200 mx-4'>
										<div className='flex items-center ml-3'>
											<img src='images/KUSUMA.jpg' className='rounded-full w-14 h-14' />
											<div className='bg-green-500 rounded-full w-4 h-4 -ml-5 mt-10'></div>
											<div className='ml-6 my-2'>
												<h1 className='text-md font-bold py-0.5'>Dr.Nyoman Nyen Kaden adane</h1>
												<p className='text-xs py-0.5'>📌 Gedung BG Informatika</p>
												<p className='text-xs py-0.5'>📕 Sedang Mengajar</p>
											</div>
										</div>
									</div>
									<div className='bg-white border rounded-lg shadow-md py-1 px-4 cursor-pointer hover:scale-105 duration-200 mx-4'>
										<div className='flex items-center ml-3'>
											<img src='images/KUSUMA.jpg' className='rounded-full w-14 h-14' />
											<div className='bg-green-500 rounded-full w-4 h-4 -ml-5 mt-10'></div>
											<div className='ml-6 my-2'>
												<h1 className='text-md font-bold py-0.5'>Dr.Nyoman Nyen Kaden adane</h1>
												<p className='text-xs py-0.5'>📌 Gedung BG Informatika</p>
												<p className='text-xs py-0.5'>📕 Sedang Mengajar</p>
											</div>
										</div>
									</div>
									<div className='bg-white border rounded-lg shadow-md py-1 px-4 cursor-pointer hover:scale-105 duration-200 mx-4'>
										<div className='flex items-center ml-3'>
											<img src='images/KUSUMA.jpg' className='rounded-full w-14 h-14' />
											<div className='bg-green-500 rounded-full w-4 h-4 -ml-5 mt-10'></div>
											<div className='ml-6 my-2'>
												<h1 className='text-md font-bold py-0.5'>Dr.Nyoman Nyen Kaden adane</h1>
												<p className='text-xs py-0.5'>📌 Gedung BG Informatika</p>
												<p className='text-xs py-0.5'>📕 Sedang Mengajar</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
}
