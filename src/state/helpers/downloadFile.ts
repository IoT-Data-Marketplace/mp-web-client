export const downloadFile = (fileName: string, content: string) => {
  const element = document.createElement('a');
  // @ts-ignore
  const file = new Blob([content], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = `${fileName}`;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};
