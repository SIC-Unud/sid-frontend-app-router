'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { HiUserCircle } from 'react-icons/hi';
import { MdOutlineDashboard } from 'react-icons/md';
import { FiUser, FiUsers } from 'react-icons/fi';
import { GoChecklist } from 'react-icons/go';
import { LuLayoutList } from 'react-icons/lu';
import { LiaBookSolid } from 'react-icons/lia';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import { AiOutlineLogout } from 'react-icons/ai';
import { FiHome } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import Keluar from './Keluar';
import { usePathname } from 'next/navigation';
import { Drawer } from 'flowbite-react';
import sidLogo from '@/../public/logo/sid-logo.png';
import axiosInstance from '@/utils/axios.util';
import { IoLibraryOutline } from 'react-icons/io5';

const sidebarItems = [
	{
		name: 'Dashboard',
		href: '/dashboard',
		icon: MdOutlineDashboard,
	},
	{
		name: 'Pengumuman',
		href: '/dashboard/pengumuman',
		icon: GoChecklist,
	},
	{
		name: 'Kehadiran',
		href: '/admin-page/kehadiran',
		icon: LuLayoutList,
	},
	{
		name: 'Jadwal Mengajar',
		href: '/admin-page/mengajar',
		icon: LiaBookSolid,
	},
];

const sidebarSettings = [
	{
		name: 'Profil',
		href: '/dashboard/profil',
		icon: HiOutlineUserCircle,
	},
];

const AuthSidebar = () => {
	const [showKeluar, setKeluar] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState(null);
	const pathname = usePathname();
	const router = useRouter();

	const getAuthenticatedUser = async () => {
		try {
			const res = await axiosInstance.get('/api/user/authenticated-user', {
				withCredentials: true,
			});

			setUser(res.data.user);
		} catch (error) {
			console.log(error);
			router.push('/auth/login');
		}
	};

	const handleClose = () => setIsOpen(false);

	useEffect(() => {
		getAuthenticatedUser();
	}, []);

	return (
		<>
			<div className='fixed top-0 left-0 z-20 bg-biru-dongker flex items-center justify-center p-5 h-[96px]' onClick={() => setIsOpen(!isOpen)}>
				<Image src={sidLogo} width={'auto'} height={'30'} alt='LOGO' />
			</div>
			<Drawer open={isOpen} onClose={handleClose} className='bg-biru-dongker text-white'>
				{user && (
					<Drawer.Items>
						<div className='flex flex-col items-center p-5 md:flex-row'>
							<div className='w-full md:w-auto flex justify-center md:justify-start'>
								<HiUserCircle className='inline-block size-16 md:size-12' />
							</div>
							<span className='sm:md:ml-2 font-medium text-center md:text-start'>{user.name}</span>
						</div>
					</Drawer.Items>
				)}
				<Drawer.Items>
					<Link href='/' className={`sidebar-link ${pathname === '/' ? 'sidebar-link-active justify-center md:justify-start' : 'justify-center md:justify-start'}`}>
						<FiHome className='inline-block size-7 md:size-5' />
						<span className='hidden sm:md:inline-block ml-2'>Public Area</span>
					</Link>
				</Drawer.Items>
				<div>
					<p className='block text-sm md:text-base md:px-5 py-5 p-0 text-biru-muda font-bold text-center md:text-start'>Main Menu</p>
					<nav>
						{sidebarItems.map(({ name, href, icon: Icon }) => (
							<Drawer.Items key={name}>
								<Link className={`sidebar-link ${pathname === href ? 'sidebar-link-active justify-center md:justify-start' : 'justify-center md:justify-start'}`} href={href}>
									<Icon className='inline-block size-7 md:size-5' />
									<span className='hidden sm:md:inline-block ml-2'>{name}</span>
								</Link>
							</Drawer.Items>
						))}
						{user?.lecturer_account.role == 'admin' && (
							<>
								<Drawer.Items>
									<Link className={`sidebar-link ${pathname === '' ? 'sidebar-link-active justify-center md:justify-start' : 'justify-center md:justify-start'}`} href='#'>
										<FiUser className='inline-block size-7 md:size-5' />
										<span className='hidden sm:md:inline-block ml-2'>User</span>
									</Link>
								</Drawer.Items>
								<Drawer.Items>
									<Link className={`sidebar-link ${pathname === '' ? 'sidebar-link-active justify-center md:justify-start' : 'justify-center md:justify-start'}`} href='#'>
										<IoLibraryOutline className='inline-block size-7 md:size-5' />
										<span className='hidden sm:md:inline-block ml-2'>Jadwal Piket</span>
									</Link>
								</Drawer.Items>
							</>
						)}
					</nav>

					<p className='block text-sm md:text-base md:px-5 py-5 p-0 text-biru-muda font-bold text-center md:text-start'>Settings</p>
					<nav>
						{sidebarSettings.map(({ name, href, icon: Icon }) => (
							<Drawer.Items key={name}>
								<Link className={`sidebar-link ${pathname === href ? 'sidebar-link-active justify-center md:justify-start' : 'justify-center md:justify-start'}`} href={href}>
									<Icon className='inline-block size-7 md:size-5' />
									<span className='hidden sm:md:inline-block ml-2'>{name}</span>
								</Link>
							</Drawer.Items>
						))}
					</nav>

					<button className='sidebar-link w-full justify-center md:justify-start' onClick={() => setKeluar(true)}>
						<div className='inline-block size-7 md:size-5'>
							<AiOutlineLogout className='size-7 md:size-5' />
						</div>
						<span className='hidden sm:md:inline-block ml-2'>Keluar</span>
					</button>

					<Keluar isvisible={showKeluar} onClose={() => setKeluar(false)} />
				</div>
			</Drawer>
		</>
	);
};

export default AuthSidebar;
