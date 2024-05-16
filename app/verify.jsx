export async function generateOTP() {
  
  const randomSixDigitNumber = () => {
    return Math.floor(Math.random() * 900000) + 100000;
	};
  const randomNumber = randomSixDigitNumber();
  return randomNumber;
}

export async function verifyOTP(input) {
  if (input === randomNumber) {
    return true;
  } else {
    return false;
  }
}


