/* eslint-disable @next/next/no-sync-scripts */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFile } from '@fortawesome/free-solid-svg-icons';

export default function Informasi() {
    const data = [
        { profile: '/Rectangle 61.jpg', name: 'Dr. Ir. I Ketut Gede Suhartana, S.Kom., M.Kom., IPM., ASEAN.Eng', nip: '1984082920181113001', nidn: '0829088401', telp: '08246076145' },
        { profile: '/Rectangle 61.jpg', name: 'Dr. Ir. I Ketut Gede Suhartana, S.Kom., M.Kom., IPM., ASEAN.Eng', nip: '1984082920181113001', nidn: '0829088401', telp: '08246076145' },
        { profile: '/Rectangle 61.jpg', name: 'Dr. Ir. I Ketut Gede Suhartana, S.Kom., M.Kom., IPM., ASEAN.Eng', nip: '1984082920181113001', nidn: '0829088401', telp: '08246076145' },
        { profile: '/Rectangle 61.jpg', name: 'Dr. Ir. I Ketut Gede Suhartana, S.Kom., M.Kom., IPM., ASEAN.Eng', nip: '1984082920181113001', nidn: '0829088401', telp: '08246076145' },
        { profile: '/Rectangle 61.jpg', name: 'Dr. Ir. I Ketut Gede Suhartana, S.Kom., M.Kom., IPM., ASEAN.Eng', nip: '1984082920181113001', nidn: '0829088401', telp: '08246076145' },
        { profile: '/Rectangle 61.jpg', name: 'Dr. Ir. I Ketut Gede Suhartana, S.Kom., M.Kom., IPM., ASEAN.Eng', nip: '1984082920181113001', nidn: '0829088401', telp: '08246076145' },
        { profile: '/Rectangle 61.jpg', name: 'Dr. Ir. I Ketut Gede Suhartana, S.Kom., M.Kom., IPM., ASEAN.Eng', nip: '1984082920181113001', nidn: '0829088401', telp: '08246076145' }
    ];

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
        } catch (error) { }
    };
    return (
        <div className='content pt-[90px]'>
            <div className='content w-full px-8 md:px-24 py-12'>
                <h1 className='font-bold text-4xl'>
                    Daftar Dosen Informatika
                </h1>
                <div className='flex flex-row align-center w-full md:w-[470px] justify-between'>
                    <form className='search-bar w-full md:w-[360px] lg:w-[36vw] overflow-x-auto'>
                        <FontAwesomeIcon icon={faSearch} size='lg' className='text-gray-400' />
                        <input
                            type='text'
                            className='w-full bg-transparent border-none ring-0 outline-none focus:outline-none focus:border-none focus:ring-0'
                            placeholder='Cari Pengumuman...'
                        />
                    </form>
                    <div class="max-w-lg ml-4 flex justify-center align-center">
                        <button
                            class="text-white bg-[#2279C9] hover:bg-[#1A365D] font-medium rounded-lg text-lg px-4 md:px-10 py-2 text-center inline-flex items-center"
                            type="button"
                            data-dropdown-toggle="dropdown"
                        >
                            Filter
                            <svg
                                class="w-4 h-4 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                                ></path>
                            </svg>
                        </button>
                        <div
                            class="hidden bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4"
                            id="dropdown"
                        >
                            <ul class="py-1" aria-labelledby="dropdown">
                                <li>
                                    <a
                                        href="#"
                                        class="text-md text-center hover:bg-gray-100 text-gray-700 block px-9 py-2"
                                    >Di Kampus</a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        class="text-md text-center hover:bg-gray-100 text-gray-700 block px-9 py-2"
                                    >Kelas Hari Ini
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        class="text-md text-center hover:bg-gray-100 text-gray-700 block px-9 py-2"
                                    >Piket Hari Ini</a>
                                </li>
                            </ul>
                        </div>
                        <script src='https://unpkg.com/@themesberg/flowbite@latest/dist/flowbite.bundle.js'></script>
                    </div>
                </div>
                <div className='flex flex-row justify-between w-full overflow-x-auto'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nama Dosen</th>
                                <th>NIP</th>
                                <th>NIDN</th>
                                <th>No.Telp</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr className='h-[45px] md:h-[80px]' key={item.id}>
                                    <td className='min-w-[80px] min-h-full flex justify-center items-center'>
                                        <img className="w-[60px] h-[60px] rounded-full object-cover" src={item.profile} />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.nip}</td>
                                    <td>{item.nidn}</td>
                                    <td>{item.telp}</td>
                                    <td>
                                        <button className='flex justify-center align-center bor rounded-[4px] bg-[#2279C9] px-[16px] py-[12px] mx-2 lg:mx-0 text-white hover:bg-[#1A365D] transition-all ease-in duration-[300ms]'>
                                            Detail
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}