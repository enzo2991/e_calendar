import React,{ useState, useEffect } from 'react';
import { debugData } from './utils/debugData';
import { useNuiEvent } from './hooks/useNuiEvent';
import { useKeyPress } from './hooks/useKeyPress';
import { fetchNui } from './utils/fetchNui';
import CaseComponent from './components/CaseComponent';

interface Case {
    id: number;
    isOpen: boolean;
    style: string;
}

debugData([{
    action:'openUI',
    data: [
        { id: 1, isOpen: false },
        { id: 2, isOpen: false },
        { id: 3, isOpen: false },
        { id: 4, isOpen: false },
        { id: 5, isOpen: false },
        { id: 6, isOpen: false },
        { id: 7, isOpen: false },
        { id: 8, isOpen: false },
        { id: 9, isOpen: false },
        { id: 10, isOpen: false},
        { id: 11, isOpen: false},
        { id: 12, isOpen: false},
        { id: 13, isOpen: false},
        { id: 14, isOpen: false},
        { id: 15, isOpen: false},
        { id: 16, isOpen: false},
        { id: 17, isOpen: false},
        { id: 18, isOpen: false},
        { id: 19, isOpen: false},
        { id: 20, isOpen: false},
        { id: 21, isOpen: false},
        { id: 22, isOpen: false},
        { id: 23, isOpen: false},
        { id: 24, isOpen: false},
        { id: 25, isOpen: false},
    ],
}])



const App: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [cases, setCases] = useState<Case[]>([]);
    const currentDay = new Date().getDate();

    /* KeyPressed */
    const { keyPressed: isEscapePressed, resetKeyPressed: resetEscapeKey } = useKeyPress('Escape');
    const { keyPressed: isBackspacePressed, resetKeyPressed: resetBackspaceKey } = useKeyPress('Backspace');

    const getCaseStyle = (id: number) => {
        switch (id) {
            case 1: return 'bottom-10 right-80 w-[400px] h-[150px]';
            case 2: return 'top-5 left-40 w-[184px] h-[150px]';
            case 3: return 'top-96 left-60 w-[92px] h-[84px]';
            case 4: return 'top-10 right-40 w-[163px] h-[84px]';
            case 5: return 'top-80 right-5 w-[73px] h-[216px]';
            case 6: return 'bottom-56 right-96 w-[187px] h-[165px]';
            case 7: return 'top-5 left-[36rem] w-[87px] h-[89px]';
            case 8: return 'bottom-10 left-10 w-[77px] h-[207px]';
            case 9: return 'top-44 right-96 w-[150px] h-[150px]';
            case 10: return 'top-[12.5rem] left-52 w-[240px] h-[118px]';
            case 11: return 'top-[24rem] right-52 w-[104px] h-[120px]';
            case 12: return 'top-48 left-10 w-[150px] h-[150px]';
            case 13: return 'bottom-56 left-96 w-[303px] h-[82px]';
            case 14: return 'bottom-10 left-40 w-[262px] h-[150px]';
            case 15: return 'top-5 right-5 w-[98px] h-[110px]';
            case 16: return 'top-[23rem] left-10 w-[150px] h-[74px]';
            case 17: return 'top-40 right-52 w-[115px] h-[205px]';
            case 18: return 'top-28 left-[40rem] w-[98px] h-[91px]';
            case 19: return 'bottom-10 right-10 w-[214px] h-[136px]';
            case 20: return 'top-[21rem] left-[22rem] w-[175px] h-[76px]';
            case 21: return 'top-5 right-[22rem] w-[175px] h-[150px]';
            case 22: return 'top-5 left-96 w-[150px] h-[170px]';
            case 23: return 'top-40 right-5 w-[140px] h-[145px]';
            case 24: return 'top-5 left-10 w-[113px] h-[103px]';
            case 25: return 'top-52 left-[34rem] w-[129px] h-[191px]';
            default: return 'hidden';
        }
    }

    function resetAllKey(){
        resetEscapeKey();
        resetBackspaceKey();
    }

    function closePage(){
        document.body.style.display = 'none';
        setIsVisible(false);
        fetchNui("closeUI");
        resetAllKey();
    }

    useEffect(() => {
        if ((isEscapePressed || isBackspacePressed) && isVisible) {
            closePage();
        }
    }, [isEscapePressed, isBackspacePressed, isVisible]);

    useNuiEvent('openUI',(data: Case[]) =>{
        setCases(data);
        document.body.style.display = 'flex';
        setIsVisible(true);
    })

    useNuiEvent('closeUI',() =>{
        closePage();
    })

    const handleOpenCase = (id: number) => {
        const caseToOpen = cases.find((c) => c.id === id);

        if (!caseToOpen || caseToOpen.isOpen) {
            console.warn(`La case ${id} est déjà ouverte ou n'existe pas.`);
            return;
        }

        if (id <= currentDay) {
            setCases((prevCases) =>
                prevCases.map((c) => (c.id === id ? { ...c, isOpen: true } : c))
            );
            fetchNui('openCase', id);
        } else {
            console.warn(`La case ${id} ne peut être ouverte que le jour ${id}. Aujourd'hui, nous sommes le jour ${currentDay}.`);
        }
    };

  return (
    <>
        <div className="w-[1280px] h-[720px] bg-[url('/background.png')] bg-cover bg-center rounded-3xl relative">
            {cases.map((caseData) => (
                <CaseComponent
                    key={caseData.id}
                    id={caseData.id}
                    isOpen={caseData.isOpen}
                    style={getCaseStyle(caseData.id)}
                    canOpen={caseData.id <= currentDay}
                    onClick={() => handleOpenCase(caseData.id)}
                />
            ))}
        </div>
    </>
  )
}

export default App
