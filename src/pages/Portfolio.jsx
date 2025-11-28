import React, { useState } from "react";
import { motion } from "framer-motion";
import PortfolioNavbar from "../components/Portfolio/PortfolioNavbar";
import AnimatedCounter from "../components/Portfolio/AnimatedCounter";
import ActivityGalleryModal from "../components/ActivityGalleryModal/ActivityGalleryModal";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Project data
  const projects = [
    {
      id: 1,
      title: "Vitedo",
      category: "",
      description: " Bringing together health and tech change makers to explore the transformative power of digital innovation in the health sector..",
      image: "/images/Vitendo.png",
      features: ["Vitendo Summit"],
      learnMore: "https://vitendosymposium.com/"
    },
   
    {
      id: 2,
      title: "Yoklinic App",
      category: "Mobile",
      description: "Explore a wide range of medical facilities and specialities ranging from paediatricians, gynaecologists, infectious diseases, dentists and more others.",
      image: "/images/app.png",
      features: ["Video Consultations", "Medical Records", "Prescriptions"],
      learnMore: "https://play.google.com/store/apps/details?id=com.yourcompany.yoklinic&pcampaignid=web_share"
    },
     {
      id: 3,
      title: "Yoklinic Web",
      category: "Web",
      description: "Web-based interface for telemedicine services with advanced patient management features,different facilities and diverse Doctors",
      image: "/images/yoklinic.png",
      features: ["Facilities", "Health Products", "Doctors"],
      learnMore: "https://www.yoklinic.com/"
    },
     {
      id: 4,
      title: "Mobi CHP Biometric Tool",
      category: "Mobile",
      description: "We build technology to radically increase transparency and effectiveness in global development, making sure that every vaccine, every dollar, every public good reaches the people who need them most.",
      image: "/images/buikwe10.png",
      features: [ "Face biometrics", "Health Records"],
      learnMore: "https://www.simprints.com/"
    }, 
    {
      id: 5,
      title: "MobiKlearn",
      category: "Mobile",
      description: "A digital health tool developed for Community Health Providers (CHPs) to store patient data for easy identification and follow-up. CHPs are able to chat, share media with doctors on the platform to enhance decisions about patient treatment and referrals.",
      image: "/images/e-learning.png",
      features: ["Online Courses", "Interactive Content", "Certifications"],
      learnMore: "https://play.google.com/store/apps/details?id=com.melimu.mobiklinic"
    },
   
   
    {
      id: 6,
      title: "Mobi CHP Tool",
      category: "Mobile",
      description: "A digital health tool developed for Community Health Providers (CHPs) to store patient data for easy identification and follow-up. CHPs are able to chat, share media with doctors on the platform to enhance decisions about patient treatment and referrals.",
      image: "/images/chp.png",
      features: ["Data Collection", "Health Monitoring", "Analytics"],
      learnMore: "https://play.google.com/store/apps/details?id=com.mobiklinicapp"
    },
  ];

  // Activities/Events data
  const activities = [
    {
      id: 1,
      title: "Mityana NCDs Fight",
      description: "In Mityana fighting the Non-Communicable Diseases with our MobiCHP Biometric Tool for community Health Providers thats streamlines their interactions with community members.",
      image: "/images/Mityana6.png",
      galleryImages: ["/images/Mityana.png", "/images/Mityana1.png", "/images/Mityana2.png","/images/Mityana3.png","/images/Mityana4.png","/images/Mityana5.png","/images/Mityana7.png","/images/Mityana8.png","/images/Mityana9.png","/images/Mityana10.png","/images/Mityana11.png","/images/Mityana12.png","/images/Mityana13.png","/images/Mityana14.png",],
     
    },
    
    {
      id: 2,
      title: "Immunisation",
      description: "Comprehensive Immunisation program for the children by our healthcare workers with aid of the MobiCHP Biometric Tool.",
      image: "/images/buikwe.png",
      galleryImages: ["/images/buikwe.png", "/images/buikwe3.png", "/images/buikwe4.png"],
      
    },
    {
      id: 3,
      title: "Telemedicine Workshop",
      description: "Interactive workshop introducing telemedicine benefits to healthcare providers and patients",
      image: "/images/buikwe3.png",
      galleryImages: ["/images/buikwe3.png", "/images/buikwe11.png", "/images/buikwe14.png"],
    
    },
    {
      id: 4,
      title: "Team Sensitization before Kicking off Community Work",
      description: "Digital awareness campaign educating patients about remote healthcare services and benefits",
      image: "/images/buikwe14.png",
      galleryImages: ["/images/buikwe14.png", "/images/buikwe.png", "/images/buikwe3.png"],
     
    },
    {
      id: 5,
      title: " Vitendo Health Technology Summit",
      description: "During the annual Vitendo Digital Health Symposium Africa (VIDHSA), a major event that focuses on digital health innovation",
      image: "/images/vitendo5.png",
      galleryImages: ["/images/vitendo5.png", "/images/Vitendo2.png", "/images/Vitendo4.png","/images/Vitendo7.png","/images/Vitendo3.png"],
     
    },
  
    {
      id: 7,
      title: "Community Health Outreach",
      description: "Mobiklinic CHP officials together with the community members of Buikwe.",
      image: "/images/buikwe11.png",
      galleryImages: ["/images/buikwe11.png", "/images/buikwe.png", "/images/buikwe14.png"],
     
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
              <a href="https://mobiklinic.com/" target="_blank" rel="noopener noreferrer">
                <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className=" bg-white  text-sky-500 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                Learn More
              </motion.button>
              </a>
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
                    target="_blank"
                    rel="noopener noreferrer"
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
                  
                </div>

                {/* Activity Info */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-1">
                    {activity.description}
                  </p>

                  {/* Gallery Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedActivity(activity);
                      setIsGalleryOpen(true);
                    }}
                    className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors mt-auto"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    View Gallery
                  </motion.button>

                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Modal */}
      {selectedActivity && (
        <ActivityGalleryModal
          activity={selectedActivity}
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}

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
            <a href="https://mobiklinic.com/" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Get In Touch
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
