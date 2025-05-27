import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Manage Your Employees
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Streamline your workforce management with our comprehensive employee
          management system. Track, organize, and optimize your team's
          performance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/login">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
        <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Employee Tracking</h2>
          <p>
            Keep track of all employee information in one centralized location.
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Performance Management</h2>
          <p>
            Monitor employee performance and identify areas for improvement.
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Simplified Workflows</h2>
          <p>
            Automate routine tasks and streamline your management processes.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
