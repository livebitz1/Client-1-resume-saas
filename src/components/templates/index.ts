
import { Template } from '@/types/resume';
import BasicTemplate from './BasicTemplate';
import ModernTemplate from './ModernTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';

const templates: Template[] = [
  {
    id: 'basic',
    name: 'Basic',
    component: BasicTemplate,
    thumbnail: '/templates/basic.png',
    image: '/templates/basic.png'
  },
  {
    id: 'modern',
    name: 'Modern',
    component: ModernTemplate,
    thumbnail: '/templates/modern.png',
    image: '/templates/modern.png'
  },
  {
    id: 'professional',
    name: 'Professional',
    component: ProfessionalTemplate,
    thumbnail: '/templates/professional.png',
    image: '/templates/professional.png'
  }
];

export default templates;
