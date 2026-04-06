import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '@/components/SEO';

export default function NotFoundPage() {
  return (
    <div data-testid="not-found-page" className="min-h-[80vh] flex items-center justify-center bg-black">
      <SEO title="Page Not Found" description="The page you are looking for does not exist." path="/404" />
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="font-mono text-8xl sm:text-9xl font-bold text-[#EE5A01]/20 mb-4 select-none">404</div>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-[#EEEDE7] uppercase tracking-tight mb-4">
          Page Not Found
        </h1>
        <p className="font-body text-[#666666] mb-8">
          The page you are looking for may have been moved or does not exist. Let us get you back on the road.
        </p>
        <Link
          to="/"
          data-testid="back-home-btn"
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
