import Image from 'next/image';

export default function DashboardProfile() {
	return (
		<>
			<div className='fixed z-10 w-full h-24 px-40 flex items-center bg-[#F8F9FA] shadow-md'>
				<h1 className='text-biru-dongker font-bold text-2xl md:text-4xl'>Profil</h1>
			</div>
			<div className='container px-4 pt-36 py-8 mx-auto'>
				<div className='flex flex-col md:flex-row gap-4'>
					<div className='basis-2/5'>
						<Image src='/user1.png' width={1} height={1} alt='foto profil' className='w-[80%] mx-auto aspect-[3/4]' />
					</div>
					<div className='w-full basis-3/5'>
						<form action='' className='space-y-4'>
							<div className='flex flex-col items-start gap-1 self-stretch font-bold text-black text-base'>
								Nama
								<input type='text' className='w-full p-3 rounded-md border-solid border border-gray-400 font-normal text-sm' />
							</div>
							<div className='w-full flex flex-row gap-4'>
								<div className='basis-1/2 font-bold text-black text-base'>
									NIDN
									<div className='p-3 rounded-md border-solid border border-gray-400 font-normal text-sm'>123837023</div>
								</div>
								<div className='basis-1/2 font-bold text-black text-base'>
									NIP
									<div className='p-3 rounded-md border-solid border border-gray-400 font-normal text-sm'>12383702324123794</div>
								</div>
							</div>
							<div className='w-full flex flex-row gap-4'>
								<div className='basis-1/2 font-bold text-black text-base'>
									Email
									<div className='flex p-3 items-center gap-3 self-stretch rounded-md border-solid border border-gray-400 font-normal text-sm'>ditapratiwi222@gmail.com</div>
								</div>
								<div className='basis-1/2 font-bold text-black text-base'>
									Telepon
									<div className='flex p-3 items-center gap-3 self-stretch rounded-md border-solid border border-gray-400 font-normal text-sm'>0877665188567</div>
								</div>
							</div>
							<div className='flex flex-col items-start gap-1 self-stretch font-bold text-black text-base'>
								Alamat
								<div className='flex p-3 items-center gap-3 self-stretch rounded-md border-solid border border-gray-400 font-normal text-sm'>denpasar utara banjar selatan</div>
							</div>
							<button className='w-full py-2 rounded-lg bg-biru-muda text-lg font-bold text-white hover:bg-biru-dongker hover:shadow-sm active:shadow-md'>Simpan</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
