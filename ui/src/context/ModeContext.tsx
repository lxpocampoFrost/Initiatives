import { createContext, useState, useContext, ReactNode } from 'react';

interface SelectedCardDataProps {
  id: string;
  color: string;
  created_by: string;
  created_at: string;
  explanation: string;
  post: string;
  tags: string[];
  title: string;
}
interface ModeContextProps {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  selectedCardData: SelectedCardDataProps | null;
  setSelectedCardData: React.Dispatch<
    React.SetStateAction<SelectedCardDataProps | null>
  >;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSortBy: string;
  setSelectedSortBy: React.Dispatch<React.SetStateAction<string>>;
  selectedPostedBy: string;
  setSelectedPostedBy: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const ModeContext = createContext<ModeContextProps | undefined>(undefined);

interface ModeProviderProps {
  children: ReactNode;
}

export const ModeProvider: React.FC<ModeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState('view');
  const [selectedCardData, setSelectedCardData] =
    useState<SelectedCardDataProps | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(['All']);
  const [selectedSortBy, setSelectedSortBy] = useState('desc');
  const [selectedPostedBy, setSelectedPostedBy] = useState('');

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ModeContext.Provider
      value={{
        mode,
        setMode,
        selectedCardData,
        modalOpen,
        setModalOpen,
        selectedTags,
        setSelectedTags,
        selectedSortBy,
        setSelectedSortBy,
        selectedPostedBy,
        setSelectedPostedBy,
        setSelectedCardData,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = (): ModeContextProps => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};
