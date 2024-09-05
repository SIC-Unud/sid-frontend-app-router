import styles from '@/../public/styles/global.css';
import PublicFooter from '@/components/layout/PublicFooter';
import PublicNavbar from '@/components/layout/PublicNavbar';

export default function PublicLayout({ children }) {
	return (
		<div className='h-full'>
			<div className='w-full fixed z-10'>
				<PublicNavbar />
			</div>

			{children}

			<div className='w-full'>
				<PublicFooter />
			</div>
		</div>
	);
}
