'use client';

import { Container, Button, Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import sidLogo from '@/../public/logo/sid-logo.png';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Avatar, Dropdown } from 'flowbite-react';
import axiosInstance from '@/utils/axios.util';
import { API_BASE_URL } from '@/utils/constant.util';

export default function PublicNavbar() {
	const sideBar = useRef(null);

	function showSidebar() {
		if (typeof window !== 'undefined') {
			sideBar.current.style.right = '0';
		}
	}

	function hideSidebar() {
		if (typeof window !== 'undefined') {
			sideBar.current.style.right = '-100%';
		}
	}

	const [user, setUser] = useState(null);
	const [isLoading, setisLoading] = useState(true);
	const getAuthenticatedUser = async () => {
		try {
			const res = await axiosInstance.get('/api/user/authenticated-user', {
				withCredentials: true,
			});
			console.log(res);

			setUser(res.data.user);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAuthenticatedUser();
		setisLoading(false);
	}, []);

	const pathname = usePathname();
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await axiosInstance.get('/api/public/logout', { withCredentials: true });
			router.push('/auth/login');
		} catch (error) {
			console.error(error);
		}
	};

	// Don't render anything until loading done
	if (isLoading) {
		return null;
	}

	return (
		<div>
			<Navbar className='navbar px-[28px] md:px-[80px]'>
				<div className='flex justify-between items-center '>
					<Image className='w-16 inline' src={sidLogo} />
				</div>
				<ul className='w-auto lg:flex hidden gap-[56px]'>
					<Nav.Link
						href='/'
						className={
							pathname === '/'
								? 'active text-xl font-normal w-auto h-auto my-6 md:my-0 px-6 py-1 text-[#2279C9] hover:opacity-[80%]'
								: 'link text-xl text-white font-normal w-auto h-auto my-6 md:my-0 px-6 py-1 hover:text-[#2279C9]'
						}
					>
						Beranda
					</Nav.Link>
					{/* <Nav.Link
						href='/public-access/informasi'
						className={
							pathname === '/public-access/informasi'
								? 'active text-xl font-normal w-auto h-auto my-6 md:my-0 px-6 py-1 text-[#2279C9] hover:opacity-[80%]'
								: 'link text-xl text-white font-normal w-auto h-auto my-6 md:my-0 px-6 py-1 hover:text-[#2279C9]'
						}
					>
						Informasi Dosen
					</Nav.Link> */}
					<Nav.Link
						href='/pengumuman'
						className={
							pathname === '/pengumuman'
								? 'active text-xl font-normal w-auto h-auto my-6 md:my-0 px-6 py-1 text-[#2279C9] hover:opacity-[80%]'
								: 'link text-xl text-white font-normal w-auto h-auto my-6 md:my-0 px-6 py-1 hover:text-[#2279C9]'
						}
					>
						Pengumuman
					</Nav.Link>
					{!user && (
						<Button
							href='/auth/login'
							className='bg-[#2279C9] text-white font-semibold duration-200 px-6 py-2 hover:bg-white rounded hover:text-[#2279C9] transition-all ease-in duration-[400ms] flex justify-center align-center'
						>
							Login
						</Button>
					)}
					{user ? (
						user.profile_url ? (
							<Dropdown label={<Avatar img={`${API_BASE_URL}${user.profile_url}`} rounded />} arrowIcon={false} inline>
								<Dropdown.Header>
									<span className='block text-sm'>{user.name}</span>
									<span className='block truncate text-sm font-medium'>{user.email}</span>
								</Dropdown.Header>
								<Dropdown.Item>
									<Link href='/dashboard'>User area</Link>
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item>
									<span onClick={handleLogout}>Sign out</span>
								</Dropdown.Item>
							</Dropdown>
						) : (
							<Dropdown label={<Avatar rounded />} arrowIcon={false} inline>
								<Dropdown.Header>
									<span className='block text-sm'>{user.name}</span>
									<span className='block truncate text-sm font-medium'>{user.email}</span>
								</Dropdown.Header>
								<Dropdown.Item>
									<Link href='/dashboard'>User area</Link>
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item>
									<span onClick={() => handleLogout()}>Keluar</span>
								</Dropdown.Item>
							</Dropdown>
						)
					) : (
						''
					)}
				</ul>
				<Button onClick={showSidebar} className='lg:hidden block'>
					<FontAwesomeIcon icon={faBars} size='xl' className='text-white' />
				</Button>
			</Navbar>

			<Container ref={sideBar} className='fixed w-[60%] md:w-[350px] h-full sidebar-bg top-0 right-[-100%] p-6 transition-all ease-in-out duration-[400ms] z-40'>
				<Button onClick={hideSidebar} className='m-4 text-white cursor-pointer'>
					<FontAwesomeIcon icon={faXmark} size='xl' />
				</Button>
				<ul className='w-auto gap-16 flex flex-col justify-center align-center m-4'>
					{user && (
						<>
							<div className='text-center text-white space-y-2'>
								<Avatar img={`${API_BASE_URL}${user.profile_url}`} rounded />
								<p>{user.name}</p>
							</div>
							<Nav.Link href='/dashboard' className={pathname === '/dashboard' ? 'active text-[1.35rem] text-[#2279C9] hover:opacity-[80%]' : 'link text-[1.35rem] text-white hover:text-[#2279C9]'}>
								User area
							</Nav.Link>
						</>
					)}
					<Nav.Link href='/' className={pathname === '/' ? 'active text-[1.35rem] text-[#2279C9] hover:opacity-[80%]' : 'link text-[1.35rem] text-white hover:text-[#2279C9]'}>
						Beranda
					</Nav.Link>
					<Nav.Link
						href='/public-access/informasi'
						className={pathname === '/public-access/informasi' ? 'active text-[1.35rem] text-[#2279C9] hover:opacity-[80%]' : 'link text-[1.35rem] text-white hover:text-[#2279C9]'}
					>
						Informasi Dosen
					</Nav.Link>
					<Nav.Link href='/pengumuman' className={pathname === '/pengumuman' ? 'active text-[1.35rem] text-[#2279C9] hover:opacity-[80%]' : 'link text-[1.35rem] text-white hover:text-[#2279C9]'}>
						Pengumuman
					</Nav.Link>
					{!user && (
						<div className='flex justify-center align-center'>
							<Button
								href='/login'
								className='bg-[#2279C9] text-white font-semibold text-xl duration-200 px-6 py-2 hover:bg-white rounded hover:text-[#2279C9] transition-all ease-in w-[120px] flex justify-center align-center'
							>
								Login
							</Button>
						</div>
					)}
				</ul>
			</Container>
		</div>
	);
}
