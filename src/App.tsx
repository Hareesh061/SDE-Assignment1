import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import './styles/styles.css';
interface Chip {
  id: string;
  label: string;
  logo: string; 
}

const AutoCompleteChips: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [chips, setChips] = useState<Chip[]>([]);
  const [filteredItems, setFilteredItems] = useState<Chip[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Chip[] = [
    { id: '1', label: 'John Doe', logo: 'https://static.vecteezy.com/system/resources/thumbnails/008/213/768/small/letter-n-thunderbolt-energy-logo-symbol-icon-design-vector.jpg' },
    { id: '2', label: 'Jane Doe', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgbS374EtJlgClinPFR-F63GGCsucl6pxvSFkaH7bDKw&s' },
    { id: '3', label: 'Nick Giannopoulos', logo: 'https://c8.alamy.com/comp/PGF1GF/3d-abstract-people-icons-and-symbols-technology-people-icon-logo-PGF1GF.jpg' },
    { id: '4', label: 'Alice Smith', logo: 'https://cdn-icons-png.flaticon.com/512/164/164600.png' },
    // Add more items as needed
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.trim() === '') {
      setFilteredItems([]);
    } else {
      const filtered = items.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  const handleItemClick = (item: Chip) => {
    const newChips: Chip[] = [...chips, item];
    setChips(newChips);

    const newFilteredItems = filteredItems.filter((i) => i.id !== item.id);
    setFilteredItems(newFilteredItems);

    setInputValue('');
  };

  const handleChipRemove = (chipId: string) => {
    const removedChip = chips.find((chip) => chip.id === chipId);
    if (removedChip) {
      const newChips = chips.filter((chip) => chip.id !== chipId);
      setChips(newChips);

      const newFilteredItems = [...filteredItems, removedChip];
      setFilteredItems(newFilteredItems);
    }
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && inputValue === '' && chips.length > 0) {
      const lastChip = chips[chips.length - 1];
      handleChipRemove(lastChip.id);
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
  <div className="flex flex-col space-y-2 p-4">
    <div className="flex flex-search">
      {chips.map((chip) => (
        <div key={chip.id} className="bg-gray-300 rounded-full p-2 m-1 flex items-center">
          <img src={chip.logo} alt={chip.label} className="w-8 h-8 mr-2 rounded-full" />
          {chip.label}
          <button
            type="button"
            onClick={() => handleChipRemove(chip.id)}
            className="ml-2 cursor-pointer"
          >
            X
          </button>
        </div>
      ))}
    </div>
    <input
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleInputKeyDown}
      className="border border-gray-400 p-2 rounded"
    />
    <ul className="list-none p-0 m-0">
      {filteredItems.map((item) => (
        <li
          key={item.id}
          onClick={() => handleItemClick(item)}
          className="filtered-item flex items-center"
        >
          <img src={item.logo} alt={item.label} className="w-8 h-8 mr-2 rounded-full" />
          {item.label}
        </li>
      ))}
    </ul>
  </div>
);

};

export default AutoCompleteChips;
