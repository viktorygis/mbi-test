
//src/components/Screens/IntroScreen.jsx - Вводная страница с несколькими секциями
import React from 'react';
import OfferIntroSection from '../Sections/IntroSections/OfferIntroSection';
import PatternsIntroSection from '../Sections/IntroSections/PatternsIntroSection';
import InstructionIntroSection from '../Sections/IntroSections/InstructionIntroSection';
import ContactsIntroSection from '../Sections/IntroSections/ContactsIntroSection';
import StartTestIntroSection from '../Sections/IntroSections/StartTestIntroSection';

const IntroScreen = ({ onStart }) => {
	return (
		<div>
			<OfferIntroSection />
			<PatternsIntroSection />
			<InstructionIntroSection />
			<ContactsIntroSection />
			<StartTestIntroSection onStart={onStart} />
		</div>
	);
};

export default IntroScreen;
