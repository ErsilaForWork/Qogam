// Utility functions for complaint generation

export function replaceTemplatePlaceholders(template, values) {
  let result = template;
  result = result.replace(/{fullName}/g, values.fullName || '');
  result = result.replace(/{fullAddress}/g, values.fullAddress || '');
  result = result.replace(/{oblys}/g, values.oblys || '');
  result = result.replace(/{audan}/g, values.audan || '');
  result = result.replace(/{qala}/g, values.qala || '');
  result = result.replace(/{koshe}/g, values.koshe || '');
  result = result.replace(/{yy}/g, values.yy || '');
  result = result.replace(/{date}/g, values.date || '');
  result = result.replace(/{customDescription}/g, values.customDescription || '');
  return result;
}

export function buildFullAddress(oblys, audan, qala, koshe, yy) {
  return `${oblys}, ${audan}, ${qala}, ${koshe} к-сі, ${yy}`;
}

export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function validateForm(formData, selectedProblem) {
  const errors = {};
  
  if (!formData.fullName || formData.fullName.trim() === '') {
    errors.fullName = 'ФИО міндетті өрісі';
  }
  
  if (!formData.oblys || formData.oblys.trim() === '') {
    errors.oblys = 'Облыс міндетті өрісі';
  }
  
  if (!formData.audan || formData.audan.trim() === '') {
    errors.audan = 'Аудан міндетті өрісі';
  }
  
  if (!formData.qala || formData.qala.trim() === '') {
    errors.qala = 'Қала міндетті өрісі';
  }
  
  if (!formData.koshe || formData.koshe.trim() === '') {
    errors.koshe = 'Көше міндетті өрісі';
  }
  
  if (!formData.yy || formData.yy.trim() === '') {
    errors.yy = 'Үй құрылысы міндетті өрісі';
  }
  
  if (!formData.date || formData.date.trim() === '') {
    errors.date = 'Күні міндетті өрісі';
  }
  
  if (selectedProblem === 'basqa' && (!formData.customDescription || formData.customDescription.trim() === '')) {
    errors.customDescription = 'Мәселенің сипаттамасы міндетті';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
