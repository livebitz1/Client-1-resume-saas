
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-primary">Terms of Service</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Terms of Service and Privacy Policy</h2>
          <p className="text-gray-600 mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-8">
            <section className="space-y-4">
              <h3 className="text-xl font-semibold">1. Introduction</h3>
              <p>
                Welcome to The Resume Hub ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our website, 
                services, and applications (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms 
                and our Privacy Policy.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold">2. Compliance with POPIA</h3>
              <p>
                We are committed to complying with the Protection of Personal Information Act (POPIA) of South Africa. This means that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We only collect personal information for specific, explicitly defined purposes.</li>
                <li>We process personal information lawfully and in a manner that does not infringe on your privacy.</li>
                <li>We ensure that personal information we collect is relevant, adequate, and not excessive.</li>
                <li>We maintain records of our processing activities.</li>
                <li>We implement appropriate security measures to protect personal information.</li>
                <li>We respect your rights as a data subject under POPIA.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold">3. Information We Collect</h3>
              <p>
                To provide our Services, we collect and process the following personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact information, such as name, email address, phone number, and address;</li>
                <li>Account credentials, including usernames and passwords;</li>
                <li>Employment history, education, skills, and other CV-related information;</li>
                <li>Communication preferences;</li>
                <li>Payment information (for premium services);</li>
                <li>Information related to your use of our Services;</li>
                <li>Any additional information you voluntarily provide to us.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold">4. How We Use Your Information</h3>
              <p>
                We use your personal information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing and improving our Services;</li>
                <li>Processing job applications on your behalf;</li>
                <li>Creating and maintaining user accounts;</li>
                <li>Communicating with you about our Services;</li>
                <li>Matching you with potential employers;</li>
                <li>Facilitating recruitment processes;</li>
                <li>Processing payments and managing subscriptions;</li>
                <li>Complying with legal obligations;</li>
                <li>Resolving disputes and enforcing our agreements.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold">5. Your Rights Under POPIA</h3>
              <p>
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The right to be informed about how your personal information is used;</li>
                <li>The right to access your personal information;</li>
                <li>The right to request correction of inaccurate personal information;</li>
                <li>The right to request deletion of your personal information;</li>
                <li>The right to object to processing of your personal information;</li>
                <li>The right to submit a complaint to the Information Regulator.</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at support@resumehub.co.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold">6. Data Security</h3>
              <p>
                We implement reasonable security measures to protect your personal information from unauthorized 
                access, use, or disclosure. However, no method of transmission over the Internet or electronic 
                storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold">7. Data Retention</h3>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined 
                in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold">8. Changes to This Policy</h3>
              <p>
                We may update these Terms and our Privacy Policy from time to time. If we make material changes, 
                we will notify you by email or by posting a notice on our website prior to the changes becoming effective.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold">9. Contact Us</h3>
              <p>
                If you have any questions or concerns about these Terms, our Privacy Policy, or our practices 
                regarding your personal information, please contact us at:
              </p>
              <p className="font-medium">Email: support@resumehub.co</p>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} The Resume Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;
