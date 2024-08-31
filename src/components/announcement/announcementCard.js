import styles from '@/../public/styles/global.css';
import { Image } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';

export default function AnnouncementCard({ announcement, setSelectedAnnouncement, isSelected }) {
	const [selectedWords, setSelectedWords] = useState('');

	useEffect(() => {
		extractWords();
	}, []);

	function extractWords() {
		const paragraph = announcement.content;
		const words = paragraph.split(' ');
		const selectedWords = words.slice(0, 15).join(' ');
		setSelectedWords(selectedWords);
	}

	const cardRef = useRef(null);

	function handleDragStart(event) {
		event.dataTransfer.setData('text/plain', 'Dragging card');
		event.target.style.opacity = '90%';
	}

	function handleDragEnd(event) {
		event.target.style.opacity = '100%';
	}

	return (
		<div
			className={`card-shadow p-4 m-4 space-y-4 cursor-pointer transition-all ${isSelected ? 'bg-[#EBF8FF]' : 'bg-white hover:scale-105 hover:bg-gradient-to-t from-gray-100 to-white'}`}
			draggable='true'
			ref={cardRef}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onClick={() => setSelectedAnnouncement(announcement)}
		>
			<div className='flex flex-row items-center justify-between'>
				<div className='rounded-full min-w-[16px] w-[16px] h-[16px] bg-[#3EDA7C] mt-2 sm:mt-0 mr-2 hidden'></div>
				<div className='text-lg font-bold mr-2'>{announcement.title}</div>
				<div className='rounded-full w-auto h-min-[24px] h-[28px] sm:h-auto md:h-auto px-2 text-md font-bold bg-[#FFCDCD] text-[#FC4343]'>{announcement.priority}</div>
			</div>
			<div className='text-md font-normal'>
				<p>{selectedWords}...</p>
			</div>
			<div className='flex justify-between text-md font-normal text-[#A3A3A3]'>
				<div className='flex items-center'>
					{announcement.lecturer.name}
					<Image className='w-[24px] h-[24px] rounded-full object-cover ml-2' src='/user1.png' />
				</div>
				<span>
					{new Date(announcement.createdAt).toLocaleDateString('id-ID', {
						day: '2-digit',
						month: 'short',
						year: 'numeric',
					})}
				</span>
			</div>
		</div>
	);
}
