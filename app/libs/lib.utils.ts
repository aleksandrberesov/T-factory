const isEmptyObject = (obj: Record<string, unknown>): boolean => { 
    return Object.keys(obj).length === 0; 
};

function removeElementById(id: string, parentElement: HTMLElement = document.body): void { 
    if (id === '') { return; }
    const element = parentElement.querySelector(`#${id}`);
    if (!element) { return }
    element.parentElement?.removeChild(element); 
}

export { removeElementById };