import React from 'react';
export default function PageHeader({ eyebrow = 'INSIGNIA 2026', title, description }) {
  return <section className="page-header"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{description && <p>{description}</p>}</section>;
}
