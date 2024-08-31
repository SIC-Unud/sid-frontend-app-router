import styles from '@/../public/styles/global.css';
import AuthSidebar from '@/components/layout/AuthSidebar';

export default function AuthLayout({ children }) {
	return (
		<div className='relative min-h-full max-h-[100vh]'>
			<AuthSidebar />
			{children}
		</div>
	);
}
