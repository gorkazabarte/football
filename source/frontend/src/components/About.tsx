import { motion } from 'framer-motion';
import teamImg from '../assets/aboutme/team.png';

const About = () => {
  return (
    <section id="about" className="scroll-mt-20 py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}  viewport={{ once: true }} className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white"> Football Intelligence Agency 7</h2>
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
              <p>
                <span className="font-bold text-black dark:text-white"> Football Intelligence Agency </span>{" "} brings{" "} <span className="font-bold text-black dark:text-white"> over 5 years of experience </span>{" "} in the professional sports industry.
              </p>
              <p>
                At <span className="font-bold text-black dark:text-white">FIA</span>, we are more than just a football agency —
                we are committed partners in the personal and professional growth of every player we represent.
              </p>
              <div>
                <h3 className="text-xl font-semibold text-black dark:text-white mt-6 mb-2"> Our Mission </h3>
                <p>
                    We aim to guide footballers through every stage of their careers — from youth development to success —
                    with strategic planning, ethical representation, and unwavering support.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-black dark:text-white mt-6 mb-2">
                  What We Do
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Career development & mentoring</li>
                  <li>Contract negotiation & club transfers</li>
                  <li>Endorsements & brand partnerships</li>
                  <li>Post-career planning & legal support</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-black dark:text-white mt-6 mb-2">
                  Why Choose FIA
                </h3>
                <p>
                  Our team is built on <span className="font-semibold">integrity, trust, and results</span>.
                  With a global network and a personal touch, we help players unlock their full potential — both on and off the pitch.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative w-80 h-80 overflow-hidden bg-white dark:bg-gray-950"
              >
                <img src={teamImg} alt="FIA" className="w-full h-full object-contain" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
