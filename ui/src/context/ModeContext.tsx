import { createContext, useState, useContext, ReactNode } from 'react';

interface SelectedCardDataProps {
	id: string;
	color: string;
	created_by: string;
	explanation: string;
	post: string;
	tags: string[];
	title: string;
}
interface ModeContextProps {
	mode: string;
	setMode: React.Dispatch<React.SetStateAction<string>>;
	selectedCardData: SelectedCardDataProps | null;
	setSelectedCardData: React.Dispatch<React.SetStateAction<SelectedCardDataProps | null>>;
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModeContext = createContext<ModeContextProps | undefined>(undefined);

interface ModeProviderProps {
	children: ReactNode;
}

export const ModeProvider: React.FC<ModeProviderProps> = ({ children }) => {
	const [mode, setMode] = useState('view');
	const [selectedCardData, setSelectedCardData] = useState<SelectedCardDataProps | null>(null);
	const [modalOpen, setModalOpen] = useState(false);

	return <ModeContext.Provider value={{ mode, setMode, selectedCardData, modalOpen, setModalOpen, setSelectedCardData }}>{children}</ModeContext.Provider>;
};

export const useMode = (): ModeContextProps => {
	const context = useContext(ModeContext);
	if (!context) {
		throw new Error('useMode must be used within a ModeProvider');
	}
	return context;
};
