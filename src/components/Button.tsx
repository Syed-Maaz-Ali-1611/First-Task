import React, { useState } from 'react';
import './Button.css';

interface PageItem {
  id: string;
  label: string;
  checked: boolean;
}

const Button: React.FC = () => {
  const [pages, setPages] = useState<PageItem[]>([
    { id: 'all', label: 'All pages', checked: false },
    { id: 'page1', label: 'Page 1', checked: false },
    { id: 'page2', label: 'Page 2', checked: false },
    { id: 'page3', label: 'Page 3', checked: false },
    { id: 'page4', label: 'Page 4', checked: false },
  ]);

  const allPagesChecked = pages.find(page => page.id === 'all')?.checked || false;

  const handlePageToggle = (pageId: string) => {
    setPages(prevPages => {
      if (pageId === 'all') {
        const newCheckedState = !allPagesChecked;
        return prevPages.map(page => ({
          ...page,
          checked: newCheckedState
        }));
      }

      const updatedPages = prevPages.map(page =>
        page.id === pageId ? { ...page, checked: !page.checked } : page
      );

      const individualPages = updatedPages.filter(page => page.id !== 'all');
      const allChecked = individualPages.every(page => page.checked);
      
      return updatedPages.map(page => 
        page.id === 'all' ? { ...page, checked: allChecked } : page
      );
    });
  };

  const handleDoneClick = () => {
    const selectedPages = pages
      .filter(page => page.checked && page.id !== 'all')
      .map(page => page.label);
    
    if (selectedPages.length === 0) {
      alert('No pages selected');
    } else {
      alert(`Selected pages: ${selectedPages.join(', ')}`);
    }
    
    console.log('Selected pages:', selectedPages);
  };

  return (
    <div className="button-container">
      <div className="pages-list">
        {pages.map((page, index) => (
          <React.Fragment key={page.id}>
            <label className="page-item checkbox-item">
              <input
                type="checkbox"
                checked={page.checked}
                onChange={() => handlePageToggle(page.id)}
                className="checkbox-input"
              />
              <span className="checkmark"></span>
              <span className="page-label">{page.label}</span>
            </label>
            {/* Add separator after "All pages" */}
            {page.id === 'all' && <div className="separator"></div>}
          </React.Fragment>
        ))}
        <button 
          className="done-button"
          onClick={handleDoneClick}
        >
          Done
        </button>
      </div>
    </div>
  );
};
export default Button;