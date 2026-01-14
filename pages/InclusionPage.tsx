import React from 'react';
import Inclusion from '../components/Inclusion';
import CallToAction from '../components/CallToAction';

const InclusionPage: React.FC = () => {
  return (
    <div className="pt-24">
      <Inclusion />
      <CallToAction variant="inclusion" />
    </div>
  );
};

export default InclusionPage;
