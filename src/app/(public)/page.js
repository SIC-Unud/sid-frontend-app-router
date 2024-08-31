'use client';

import styles from '@/../public/styles/global.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axios.util';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Home() {
	const [announcements, setAnnouncements] = useState([]);
	const [page, setPage] = useState(1);
	const limit = 5;
	const [hasMore, setHasMore] = useState(true);

	const getAnnouncement = async () => {
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
	};

	useEffect(() => {
		getAnnouncement();
	}, []);

	return (
		<div className='container mx-auto pt-[90px]'>
			<div className='py-10 lg:py-14'>
				<div className='rounded-lg bg-transparent'>
					<div className='flex flex-col px-4 gap-4 lg:flex-row lg:justify-around'>
						<div className='basis-3/5 bg-blue-50 w-full mx-auto px-10 rounded-lg'>
							<h1 className='pt-8 font-bold text-xl'>Pengumuman</h1>
							<div id='scrollableDiv' className='bg-transparent h-[50vh] lg:h-[55vh] overflow-y-auto'>
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
									className='flex flex-col gap-y-4 pt-4'
								>
									{announcements.length > 0 &&
										announcements.map((announcement, index) => (
											<Link href={`/pengumuman/?id=${announcement.id}`} key={index}>
												<div
													className='bg-white border rounded-xl shadow-md mx-4 px-8 py-4 space-y-2 hover:bg-gradient-to-t from-gray-100 to-white cursor-pointer hover:scale-105 duration-200'
													href='#'
												>
													<div className='flex flex-row gap-4 items-center justify-between'>
														<div>
															<p className='font-bold text-sm lg:text-md'>{announcement.title}</p>
														</div>
														<div className='bg-red-200 border rounded-full px-2 w-min h-min'>
															<p className='font-sm text-center text-red-600 font-bold text-sm'>{announcement.priority}</p>
														</div>
													</div>
													<p className='text-sm lg:text-md'>{announcement.content}</p>
													<div className='flex flex-row justify-between items-center'>
														<div className='flex flex-row gap-2'>
															<p className='text-sm'>{announcement.lecturer.name}</p>
															<img className='rounded-full w-6 h-6' src={`http://localhost:3000/public/${announcement.lecturer.profile_url}`} />
														</div>
														<div>
															<p className='text-sm'>
																{new Date(announcement.createdAt).toLocaleDateString('id-ID', {
																	day: '2-digit',
																	month: 'short',
																	year: 'numeric',
																})}
															</p>
														</div>
													</div>
												</div>
											</Link>
										))}
									{announcements.length == 0 && <p className='ml-10'>Tidak ada pengumuman</p>}
								</InfiniteScroll>
							</div>
						</div>

						<div className='basis-2/5 rounded-lg bg-blue-50 px-10'>
							<div className='flex justify-between items-center my-4'>
								<h1 className='font-bold text-xl leading-none h-min'>Dosen</h1>

								<div className='max-w-lg'>
									<button
										className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center'
										type='button'
										data-dropdown-toggle='dropdown'
									>
										Piket Hari Ini
										<svg className='w-4 h-4 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
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
							<div className='bg-white border rounded-lg shadow-md my-5 py-1 px-4'>
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
				</div>
			</div>
		</div>
	);
}
