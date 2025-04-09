import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../themes/AppTheme';
import AppAppBar from '../components/landingPage/AppAppBar';
import Hero from '../components/landingPage/Hero';
import LogoCollection from '../components/landingPage/LogoCollection';
import Highlights from '../components/landingPage/Highlights';
import Pricing from '../components/landingPage/Pricing';
import Features from '../components/landingPage/Features';
import Testimonials from '../components/landingPage/Testimonials';
import FAQ from '../components/landingPage/FAQ';
import Footer from '../components/landingPage/Footer';

export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Hero />
      <div>
        {/* <LogoCollection /> */}
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
