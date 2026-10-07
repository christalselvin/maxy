// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, type ReactNode } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import PrivacyPolicy from "./components/PrivacyPolicy";
import FAQ from "./components/FAQ";
import { PortalAuthProvider } from "./pages/StudentPortal/context/PortalAuthContext";

const Careers = lazy(() => import("./components/Careers"));

/* ===================== LOGIN ===================== */
const Login = lazy(() => import("./pages/Login/login"));
const User = lazy(() => import("./pages//Login/user"));
const ProtectedRoute = lazy(() => import("./pages/Login/ProtectedRoute"));

/* ===================== STUDENT PORTAL ===================== */
const StudentLogin = lazy(() => import("./pages/StudentPortal/StudentLogin"));
const StudentPortalLayout = lazy(
  () => import("./pages/StudentPortal/StudentPortalLayout"),
);
const StudentDashboardHome = lazy(
  () => import("./pages/StudentPortal/StudentDashboardHome"),
);
const StudentProjects = lazy(
  () => import("./pages/StudentPortal/StudentProjects"),
);
const StudentCertificates = lazy(
  () => import("./pages/StudentPortal/StudentCertificates"),
);
const RequireRole = lazy(() => import("./pages/StudentPortal/RequireRole"));

/* ===================== STUDENT PORTAL — ADMIN ===================== */
const AdminPortalLayout = lazy(
  () => import("./pages/StudentPortal/AdminPortalLayout"),
);
const AdminDashboardHome = lazy(
  () => import("./pages/StudentPortal/AdminDashboardHome"),
);
const AdminStudentDetail = lazy(
  () => import("./pages/StudentPortal/AdminStudentDetail"),
);
const AdminSettings = lazy(
  () => import("./pages/StudentPortal/AdminSettings"),
);
/* ===================== DASHBOARD ===================== */
// const Sidebar = lazy(() => import("./pages/Dashboard/sidebar"));
const Dashboard = lazy(() => import("./pages/Dashboard/dashboard"));

/* ===================== HOME ===================== */
const Home = lazy(() => import("./pages/Home/Home"));
const Service = lazy(() => import("./pages/Home/ServicePage"));
const AboutUS = lazy(() => import("./pages/Home/AboutPage"));
const WhyChooseUs = lazy(() => import("./pages/Home/WhyChooseUs"));
const Testimonials = lazy(() => import("./pages/Home/Testimonial"));
const SecureScalable = lazy(() => import("./pages/Home/SecureScalable"));

/* ===================== ABOUT ===================== */
const AboutPage = lazy(() => import("./pages/About/AboutHero"));
const AboutContent = lazy(() => import("./pages/About/AboutContent"));
const ModelShowcase = lazy(() => import("./pages/About/ModelShowcase"));
const AboutService = lazy(() => import("./pages/About/AboutService"));
const AboutCTA = lazy(() => import("./pages/About/AboutCTA"));
const LightFeatureStrip = lazy(() => import("./pages/About/LightFeatureStrip"));

/* ===================== BLOG ===================== */
const BlogHero = lazy(() => import("./pages/Blog/BlogHero"));
const FeaturedPosts = lazy(() => import("./pages/Blog/FeaturedPosts"));
const BlogDetail = lazy(() => import("./pages/Blog/BlogDetail"));
// const BlogCategories = lazy(() => import("./pages/Blog/BlogCategories"));
// const PopularArticles = lazy(() => import("./pages/Blog/PopularArticles"));
// const NewsletterCTA = lazy(() => import("./pages/Blog/NewsletterCTA"));

/* ===================== AI SERVICES ===================== */
const AIHero = lazy(() => import("./pages/Services/AI/Hero"));
const AIServices = lazy(() => import("./pages/Services/AI/AiService"));
const HowItWorks = lazy(() => import("./pages/Services/AI/HowItWorks"));
const RotatringMetrics = lazy(
  () => import("./pages/Services/AI/RotatingMetrics"),
);
const IndustriesWeServe = lazy(
  () => import("./pages/Services/AI/IndustriesServe"),
);

/* ===================== BPO ===================== */
const Bpohero = lazy(() => import("./pages/Services/Bpo/hero"));
const BpoServices = lazy(() => import("./pages/Services/Bpo/BpoServices"));
const BpoAboutPage = lazy(() => import("./pages/Services/Bpo/BpoAboutPage"));

/* ===================== IT CONSULTING ===================== */
const ItConsultingHero = lazy(
  () => import("./pages/Services/Itconsulting/ItConsultingHero"),
);
const Secound = lazy(() => import("./pages/Services/Itconsulting/Secound"));
const ServicesSection = lazy(
  () => import("./pages/Services/Itconsulting/ServicesSection"),
);
const PlatformSection = lazy(
  () => import("./pages/Services/Itconsulting/PlatformSection"),
);
const TestimonialsSection = lazy(
  () => import("./pages/Services/Itconsulting/TestimonialsSection"),
);

/* ===================== WEB DEVELOPMENT ===================== */
const WebDevHero = lazy(
  () => import("./pages/Services/webdevelopement/HeroSection"),
);
const FeaturesSection = lazy(
  () => import("./pages/Services/webdevelopement/FeaturesSection"),
);
const PerformanceMetrics = lazy(
  () => import("./pages/Services/webdevelopement/PerformanceMetrics"),
);
const TechnologyStack = lazy(
  () => import("./pages/Services/webdevelopement/TechnologyStack"),
);
const InteractiveDemo = lazy(
  () => import("./pages/Services/webdevelopement/InteractiveDemo"),
);
const ProcessSection = lazy(
  () => import("./pages/Services/webdevelopement/ProcessSection"),
);
const CTASection = lazy(
  () => import("./pages/Services/webdevelopement/CTASection"),
);

/* ===================== GRAPHIC DESIGN ===================== */
const GraphicDesignHero = lazy(
  () => import("./pages/Services/Graphicdesign/GraphicDesignHero"),
);
const DesignServices = lazy(
  () => import("./pages/Services/Graphicdesign/DesignServices"),
);
const DesignProcess = lazy(
  () => import("./pages/Services/Graphicdesign/DesignProcess"),
);
const PortfolioShowcase = lazy(
  () => import("./pages/Services/Graphicdesign/PortfolioShowcase"),
);
const ClientTestimonials = lazy(
  () => import("./pages/Services/Graphicdesign/ClientTestimonials"),
);
const DesignContact = lazy(
  () => import("./pages/Services/Graphicdesign/DesignContact"),
);

/* ===================== DIGITAL MARKETING ===================== */
const DigitalMarketingHero = lazy(
  () => import("./pages/Services/Digitalmarketing/DigitalMarketingHero"),
);
const MarketingServices = lazy(
  () => import("./pages/Services/Digitalmarketing/MarketingServices"),
);
const MarketingStrategy = lazy(
  () => import("./pages/Services/Digitalmarketing/MarketingStrategy"),
);
const CampaignShowcase = lazy(
  () => import("./pages/Services/Digitalmarketing/CampaignShowcase"),
);
const MarketingMetrics = lazy(
  () => import("./pages/Services/Digitalmarketing/MarketingMetrics"),
);
const MarketingContact = lazy(
  () => import("./pages/Services/Digitalmarketing/MarketingContact"),
);

/* ===================== VIDEO EDITING ===================== */
const VideoEditingHero = lazy(
  () => import("./pages/Services/Vidioediting/VideoEditingHero"),
);
const EditingServices = lazy(
  () => import("./pages/Services/Vidioediting/EditingServices"),
);
const VideoPortfolio = lazy(
  () => import("./pages/Services/Vidioediting/VideoPortfolio"),
);
const FinalCTA = lazy(() => import("./pages/Services/Vidioediting/FinalCTA"));

/* ===================== CONTACT ===================== */
const Contact = lazy(() => import("./pages/Contact/Contact"));


/* ===================== ERRORS ===================== */
const NotFound = lazy(() => import("./components/NotFound"));
const NetworkError = lazy(() => import("./components/NetworkError"));

/* ===================== LAYOUT WRAPPER ===================== */
function LayoutWrapper({ children }: { children: ReactNode }) {
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/dashboard"];
  const hideNavbar = hideNavbarRoutes.some((path) =>
    location.pathname.startsWith(path),
  );

  const hideFooterRoutes = ["/login", "/dashboard", "/student-portal"];
  const hideFooter = hideFooterRoutes.some((path) =>
    location.pathname.startsWith(path),
  );

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideFooter && <Footer />}
    </>
  );
}

/* ===================== ERROR BOUNDARY (route-aware) ===================== */
// A plain ErrorBoundary would stay tripped forever once it catches an
// error, because client-side navigation doesn't remount components by
// default — so a crash on one page would keep showing "Oops" even after
// navigating elsewhere or logging in as someone else. Keying it on the
// current path forces a fresh remount (and a clean error state) on every
// route change, while still catching and displaying a crash on whichever
// page actually threw it.
function RouteAwareErrorBoundary({ children }: { children: ReactNode }) {
  const location = useLocation();
  return <ErrorBoundary key={location.pathname}>{children}</ErrorBoundary>;
}
/* ===================== APP ===================== */
function App() {
  return (
    <Router>
      <PortalAuthProvider>
        <ScrollToTop />

        <RouteAwareErrorBoundary>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
                Loading...
              </div>
            }
          >
            <LayoutWrapper>
              <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <Service />
                  <SecureScalable />
                  <AboutUS />
                  <WhyChooseUs />
                  <Testimonials />
                </>
              }
            />

            <Route
              path="/about"
              element={
                <>
                  <AboutPage />
                  <AboutContent />
                  <ModelShowcase />
                  <AboutService />
                  <AboutCTA />
                  <LightFeatureStrip />
                </>
              }
            />

            <Route
              path="/blog"
              element={
                <>
                  <BlogHero />
                  <FeaturedPosts />
                  {/* <BlogCategories /> */}
                  {/* <PopularArticles /> */}
                  {/* <NewsletterCTA /> */}
                </>
              }
            />

            <Route path="/blog/:id" element={<BlogDetail />} />

              <Route path="/Careers" element={<Careers />} />
            <Route
              path="/services/ai"
              element={
                <>
                  <AIHero />
                  <AIServices />
                  <HowItWorks />
                  <RotatringMetrics />
                  <IndustriesWeServe />
                </>
              }
            />

            <Route
              path="/services/bpo"
              element={
                <>
                  <Bpohero />
                  <BpoServices />
                  <BpoAboutPage />
                </>
              }
            />

            <Route
              path="/services/itconsulting"
              element={
                <>
                  <ItConsultingHero />
                  <Secound />
                  <ServicesSection />
                  <PlatformSection />
                  <TestimonialsSection />
                </>
              }
            />

            <Route
              path="/services/webdevelopement"
              element={
                <>
                  <WebDevHero />
                  <FeaturesSection />
                  <PerformanceMetrics />
                  <TechnologyStack />
                  <InteractiveDemo />
                  <ProcessSection />
                  <CTASection />
                </>
              }
            />

            <Route
              path="/services/digitalmarketing"
              element={
                <>
                  <DigitalMarketingHero />
                  <MarketingServices />
                  <MarketingStrategy />
                  <CampaignShowcase />
                  <MarketingMetrics />
                  <MarketingContact />
                </>
              }
            />

            <Route
              path="/services/grahicdesign"
              element={
                <>
                  <GraphicDesignHero />
                  <DesignServices />
                  <PortfolioShowcase />
                  <DesignProcess />
                  <ClientTestimonials />
                  <DesignContact />
                </>
              }
            />

            <Route
              path="/services/vidioediting"
              element={
                <>
                  <VideoEditingHero />
                  <EditingServices />
                  <VideoPortfolio />
                  <FinalCTA />
                </>
              }
            />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/user"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <User />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route path="/student-portal" element={<StudentLogin />} />
            <Route
              path="/student-portal/dashboard"
              element={
                <RequireRole role="student">
                  <StudentPortalLayout />
                </RequireRole>
              }
            >
              <Route index element={<StudentDashboardHome />} />
              <Route path="projects" element={<StudentProjects />} />
              <Route path="certificates" element={<StudentCertificates />} />
            </Route>

            {/* Admin routes are gated by RequireRole role="admin", which
                checks the SAME unified session as the student form — a
                logged-in student's session never satisfies role="admin",
                so students cannot view the Admin console even by
                navigating to the URL directly. */}
            <Route
              path="/student-portal/admin"
              element={
                <RequireRole role="admin">
                  <AdminPortalLayout />
                </RequireRole>
              }
            >
              <Route index element={<AdminDashboardHome />} />
              <Route path="students/:studentId" element={<AdminStudentDetail />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            <Route path="/network-error" element={<NetworkError />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LayoutWrapper>
      </Suspense>
        </RouteAwareErrorBoundary>
      </PortalAuthProvider>
    </Router>
  );
}

export default App;
