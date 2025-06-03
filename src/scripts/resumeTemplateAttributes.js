
// Apply data attributes to resume templates
document.addEventListener('DOMContentLoaded', function() {
  const resumeTemplate = document.querySelector('.resume-template');
  if (resumeTemplate) {
    resumeTemplate.setAttribute('data-paper-style', 
      getComputedStyle(document.documentElement).getPropertyValue('--resume-paper-style').trim());
    
    resumeTemplate.setAttribute('data-layout', 
      getComputedStyle(document.documentElement).getPropertyValue('--resume-layout-style').trim());
    
    resumeTemplate.setAttribute('data-date-display', 
      getComputedStyle(document.documentElement).getPropertyValue('--resume-date-display').trim());
  }
});
