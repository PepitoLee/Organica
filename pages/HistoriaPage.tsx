import React from 'react';
import Story from '../components/Story';
import CallToAction from '../components/CallToAction';

const HistoriaPage: React.FC = () => {
  return (
    <div className="pt-24">
      <Story />
      <CallToAction variant="historia" />
    </div>
  );
};

export default HistoriaPage;
