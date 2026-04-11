
//src/components/Screens/IntroScreen.jsx - Вводная страница с несколькими секциями
import React from 'react';
import OfferIntroSection from '../Sections/IntroSections/OfferIntroSection';
import MbiIntroSection from '../Sections/IntroSections/MbiIntroSection';
import InstructionIntroSection from '../Sections/IntroSections/InstructionIntroSection';
import ContactsIntroSection from '../Sections/IntroSections/ContactsIntroSection';
import StartTestIntroSection from '../Sections/IntroSections/StartTestIntroSection';

const IntroScreen = ({ onStart }) => {
	return (
		<div>
			<OfferIntroSection />
			<MbiIntroSection />
			<InstructionIntroSection />
			<ContactsIntroSection />
			<StartTestIntroSection onStart={onStart} />
		</div>
	);
};

export default IntroScreen;
