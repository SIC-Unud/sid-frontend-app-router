'use client';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import styles from '@/../public/styles/global.css';
import AnnouncementCard from '@/components/announcement/announcementCard';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axiosInstance from '@/utils/axios.util';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { faSearch, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { API_BASE_URL } from '@/utils/constant.util';

export default function Pengumuman() {
	const [announcements, setAnnouncements] = useState([]);
	const [page, setPage] = useState(1);
	const limit = 5;
	const [hasMore, setHasMore] = useState(true);

	const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
	const searchParams = useSearchParams();
	const id = searchParams.get('id');

	const [search, setSearch] = useState('');

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

	const getAnnouncementById = async (id) => {
		const res = await axiosInstance.get(`/api/public/announcements/${id}`);
		setSelectedAnnouncement(res.data.data);
	};

	const handleSearch = async (e) => {
		try {
			e.preventDefault();
			const res = await axiosInstance.get('/api/public/announcements/paginate', {
				params: {
					page: 1,
					limit: 10,
					title: search,
				},
			});

			setAnnouncements(res.data.data);
		} catch (error) {}
	};

	useEffect(() => {
		getAnnouncement();

		if (id) {
			getAnnouncementById(id);
		}
	}, [id]);

	return (
		<div className='content pt-[90px]'>
			<div className='content w-full px-8 md:px-24 mx-auto py-12'>
				<h1 className='font-bold text-4xl'>Pengumuman Informatika</h1>
				<form onSubmit={(e) => handleSearch(e)} className='search-bar w-full md:w-[360px] lg:w-[36vw] overflow-x-auto'>
					<FontAwesomeIcon icon={faSearch} size='lg' className='text-gray-400' />
					<input
						type='text'
						onChange={(e) => setSearch(e.target.value)}
						className='w-full bg-transparent border-none ring-0 outline-none focus:outline-none focus:border-none focus:ring-0'
						placeholder='Cari Pengumuman...'
					/>
				</form>
				<div className='lg:flex flex-col lg:flex-row gap-x-4 justify-between w-full'>
					<div id='scrollableDiv' className='basis-3/5 h-[600px] lg:h-[70vh] p-4 w-full overflow-y-auto scroll-panel'>
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
							{announcements.length > 0 &&
								announcements.map((announcement, index) => (
									<AnnouncementCard key={index} announcement={announcement} setSelectedAnnouncement={setSelectedAnnouncement} isSelected={selectedAnnouncement?.id == announcement.id} />
								))}
							{announcements.length == 0 && <p className='ml-10'>Tidak ada pengumuman</p>}
						</InfiniteScroll>
					</div>
					<div className='detail-pengumuman mt-[32px] lg:mt-0 lg:w-[45%] h-[480px] lg:h-[600px]'>
						{selectedAnnouncement && (
							<div className='space-y-4'>
								<div className='flex flex-row justify-between'>
									<div className='flex flex-row gap-2'>
										<Image width={24} height={24} className='rounded-full object-cover ml-2' src='/user1.png' />
										<b>{selectedAnnouncement.lecturer.name}</b>
									</div>
									<div className='space-y-1 text-center'>
										<p className='text-gray-400 text-sm'>
											{new Date(selectedAnnouncement.createdAt).toLocaleDateString('id-ID', {
												day: '2-digit',
												month: 'long',
												year: 'numeric',
											})}
										</p>
										<div className='px-8 rounded-full bg-[#FFCDCD] text-[#FC4343]'>
											<b>{selectedAnnouncement.priority}</b>
										</div>
									</div>
								</div>
								<hr className='h-[1px] w-full block bg-gray-300' />
								<div className='h-full max-h-50%'>{selectedAnnouncement.content}</div>
								{selectedAnnouncement.announcement_medias.length > 0 && (
									<>
										<hr className='h-[1px] w-full block bg-gray-300' />
										<div>
											<p>Dokumen pendukung</p>
											<div>
												{selectedAnnouncement.announcement_medias.map((media, index) => (
													<div>
														<FontAwesomeIcon icon={faFile} />
														<Link href={`${API_BASE_URL}${media.media_url}`} className='ml-2'>
															media {index + 1}
														</Link>
													</div>
												))}
											</div>
										</div>
									</>
								)}
							</div>
						)}
						{selectedAnnouncement == null && <div className='flex justify-center items-center w-full h-full text-lg text-[#718096]'>Pilih Pengumuman</div>}
					</div>
				</div>
			</div>
		</div>
	);
}
