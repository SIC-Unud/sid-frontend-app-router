import styles from '@/../public/styles/global.css';
import AuthSidebar from '@/components/layout/AuthSidebar';

export default function AuthLayout({ children }) {
	return (
		<div className='relative h-full'>
			<AuthSidebar />
			{children}
		</div>
	);
}
