import React, { useRef } from 'react'

export default function SecitonLocator({ID, SectionCategoryName}) {
    const targetRef = useRef(null);

    function extractNumber(sectionName) {
        const match = sectionName.match(/\d+/);
      
        if (match) return parseInt(match[0]);
        else return null; 
      }

    function handleScroll() {
        const targetElement = document.getElementById(ID);
        if(targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    
    return (
    <button onClick={handleScroll} className='text-2xl bg-[#5e469c00] hover:bg-[#5e469c] text-[#5e469c] hover:text-white w-8 h-8 rounded-[100%] flex justify-center items-center p-4 border-[#5e469c] hover:border-white border-[0.05rem] '>{extractNumber(SectionCategoryName)}</button>
  )
}
