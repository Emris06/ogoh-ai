import Hero from '../components/Hero.jsx';
import ProblemSolution from '../components/ProblemSolution.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import BusinessModel from '../components/BusinessModel.jsx';
import Team from '../components/Team.jsx';
import WhyUs from '../components/WhyUs.jsx';
import Roadmap from '../components/Roadmap.jsx';

export default function Landing() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <BusinessModel />
      <Team />
      <WhyUs />
      <Roadmap />
    </>
  );
}
