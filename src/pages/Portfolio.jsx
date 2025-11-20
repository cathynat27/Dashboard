import React, { useState } from "react";
import { motion } from "framer-motion";
import PortfolioNavbar from "../components/Portfolio/PortfolioNavbar";
import AnimatedCounter from "../components/Portfolio/AnimatedCounter";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Project data
  const projects = [
    {
      id: 1,
      title: "CHP Tool",
      category: "Mobile",
      description: "A digital health tool developed for Community Health Providers (CHPs) to store patient data for easy identification and follow-up. CHPs are able to chat, share media with doctors on the platform to enhance decisions about patient treatment and referrals.",
      image: "/images/mother.png",
      features: ["Data Collection", "Health Monitoring", "Analytics"],
      learnMore: "#"
    },
    {
      id: 2,
      title: "Yoklinic Platform",
      category: "Mobile",
      description: "Explore a wide range of medical specialities ranging from paediatricians, gynaecologists, infectious diseases, dentists and others.",
      image: "/images/hello.png",
      features: ["Video Consultations", "Medical Records", "Prescriptions"],
      learnMore: "#"
    },
    {
      id: 3,
      title: "MobiKlearn",
      category: "Mobile",
      description: "A digital health tool developed for Community Health Providers (CHPs) to store patient data for easy identification and follow-up. CHPs are able to chat, share media with doctors on the platform to enhance decisions about patient treatment and referrals.",
      image: "/images/hello.png",
      features: ["Online Courses", "Interactive Content", "Certifications"],
      learnMore: "#"
    },
    {
      id: 4,
      title: "Yoklinic Web",
      category: "Web",
      description: "Web-based interface for telemedicine services with advanced patient management features",
      image: "/images/hello.png",
      features: ["Patient Portal", "Appointment Scheduling", "Health Products"],
      learnMore: "#"
    },
    {
      id: 4,
      title: "Simprints",
      category: "Mobile",
      description: "We build technology to radically increase transparency and effectiveness in global development, making sure that every vaccine, every dollar, every public good reaches the people who need them most.",
      image: "/images/hello.png",
      features: ["Biometric tools", "Appointment Scheduling", "Health Records"],
      learnMore: "#"
    }
  ];

  // Activities/Events data
  const activities = [
    {
      id: 1,
      title: "Community Health Outreach",
      description: "Organized free health screening camps across rural communities, reaching over 500 individuals",
      image: "https://via.placeholder.com/300x250?text=Community+Outreach",
      date: "March 2024",
      location: "Rural Communities"
    },
    {
      id: 2,
      title: "Healthcare Worker Training",
      description: "Comprehensive training program for 200+ healthcare workers on digital health solutions",
      image: "https://via.placeholder.com/300x250?text=Training+Program",
      date: "February 2024",
      location: "Training Centers"
    },
    {
      id: 3,
      title: "Telemedicine Workshop",
      description: "Interactive workshop introducing telemedicine benefits to healthcare providers and patients",
      image: "https://via.placeholder.com/300x250?text=Telemedicine+Workshop",
      date: "January 2024",
      location: "Medical Institutions"
    },
    {
      id: 4,
      title: "Patient Awareness Campaign",
      description: "Digital awareness campaign educating patients about remote healthcare services and benefits",
      image: "https://via.placeholder.com/300x250?text=Awareness+Campaign",
      date: "December 2023",
      location: "Online & On-ground"
    },
    {
      id: 5,
      title: "Health Technology Summit",
      description: "Annual summit bringing together healthcare professionals and tech innovators for collaboration",
      image: "https://via.placeholder.com/300x250?text=Health+Summit",
      date: "November 2023",
      location: "Conference Center"
    },
    {
      id: 6,
      title: "Mobile Clinic Launch",
      description: "Launch of mobile clinics equipped with telemedicine technology for underserved areas",
      image: "https://via.placeholder.com/300x250?text=Mobile+Clinic",
      date: "October 2023",
      location: "Urban & Rural Areas"
    }
  ];

  // Filter projects based on category
  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="w-full bg-slate-50">
      <PortfolioNavbar />

      {/* Hero Section */}
      <section
        id="hero"
        className="bg-sky-500 text-white py-16 md:py-24 pt-24 md:pt-32"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mobiklinic Portfolio
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              Transforming Healthcare Through Innovation and Technology
            </p>
            <p className="text-blue-100 mt-3 max-w-2xl mx-auto">
              Empowering communities with telemedicine solutions and digital
              health tools
            </p>
            <div className="mt-10 w-auto">
                <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className=" bg-white  text-sky-500 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                Learn More
              </motion.button>
            </div>            
            
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 mainCard">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Innovative telemedicine and healthcare solutions transforming the
              way communities access medical services
            </p>

            {/* Filter Tabs */}
            <div className="flex justify-center gap-4 flex-wrap">
              {["all", "Mobile", "Web"].map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeTab === category
                      ? "bg-sky-500 text-white shadow-lg"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-sky-600"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="widgetCard overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white group flex flex-col h-full"
              >
                {/* Project Image */}
                <div className="relative h-64 md:h-72 overflow-hidden bg-gray-200">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Info */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="cardInfo px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <motion.a
                    href={project.learnMore}
                    whileHover={{ x: 5 }}
                    className="inline-block text-sky-600 font-semibold hover:text-blue-800 transition-colors mt-auto"
                  >
                    Learn More 
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-16 md:py-24 bg-white mainCard">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Activities & Events
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Engaging with communities and healthcare professionals to drive
              meaningful change through education, outreach, and innovation
            </p>
          </motion.div>

          {/* Activities Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                variants={itemVariants}
                className="widgetCard overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white group flex flex-col"
              >
                {/* Activity Image */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-sky-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {activity.date}
                  </div>
                </div>

                {/* Activity Info */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-1">
                    {activity.description}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-gray-700 text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{activity.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-blue-100 mainCard">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Impact
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Measurable outcomes from our commitment to healthcare innovation
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { number: "500+", label: "Communities Reached", icon: "🌍" },
              { number: "10K+", label: "Patients Served", icon: "👥" },
              {
                number: "200+",
                label: "Healthcare Workers Trained",
                icon: "🏥",
              },
              { number: "6", label: "Active Platforms", icon: "💻" },
            ].map((stat, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <AnimatedCounter
                  number={stat.number}
                  label={stat.label}
                  icon={stat.icon}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 mainCard bg-sky-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Us in Transforming Healthcare
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Partner with us to expand access to quality healthcare through
              innovative telemedicine solutions
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
