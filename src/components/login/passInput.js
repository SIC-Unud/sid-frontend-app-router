'use client';

import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const PasswordEye = ({ passInputRef }) => {
	// State to toggle password visibility
	const [isChecked, setIsChecked] = useState(false);

	// Toggle password visibility
	const togglePasswordVisibility = () => {
		setIsChecked(!isChecked);
		if (passInputRef.current) {
			passInputRef.current.type = isChecked ? 'password' : 'text';
		}
	};

	return (
		<span onClick={togglePasswordVisibility}>
			{isChecked ? (
				<FontAwesomeIcon icon={faEye} className='fa-lg absolute right-4 top-1/2 -translate-y-1/2' style={{ color: '#999C9D' }} />
			) : (
				<FontAwesomeIcon icon={faEyeSlash} className='fa-lg absolute right-4 top-1/2 -translate-y-1/2' style={{ color: '#999C9D' }} />
			)}
		</span>
	);
};

const PassInput = ({ handleFormDataChange, credentialIsInvalid, formData }) => {
	const passInputRef = useRef(null);

	return (
		<div className='grid gap-1'>
			<label htmlFor='password' className='text-xs md:text-base text-[#2279C9] font-semibold inline-block w-full'>
				Password
			</label>
			<div className='relative'>
				<input
					ref={passInputRef}
					type='password'
					id='password'
					name='password'
					value={formData.password}
					onChange={(e) => handleFormDataChange(e)}
					className={`w-full text-xs md:text-base bg-[#0000000A] ${credentialIsInvalid ? 'ring ring-red-200' : ''} rounded-md p-4 normal-case`}
					placeholder='password'
					required
				/>
				<PasswordEye passInputRef={passInputRef} />
			</div>
		</div>
	);
};

export default PassInput;
