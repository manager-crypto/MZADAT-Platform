import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Award, Users, Globe, Shield, Scale, Lock, Laptop, Zap, TrendingUp, Flag } from 'lucide-react';
import headerLogoImage from 'figma:asset/67935b978652e44c12ae5e3890df993d19556317.png';
import { useTranslation } from 'react-i18next';

export const AboutPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white pt-48 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">

          {/* Text Content (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 space-y-8"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-1 bg-[#47CCD0] rounded-full"></div>
              <span className="text-[#47CCD0] font-bold text-lg">{t('aboutPage.whoWeAre')}</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={headerLogoImage}
                alt="Mazadat Logo"
                className="h-12 w-auto object-contain"
              />
              <h1 className="text-4xl lg:text-5xl font-bold text-[#2B3D50]">{t('aboutPage.mzadatPlatform')}</h1>
            </div>

            <div className="prose prose-lg text-gray-600 leading-relaxed text-justify">
              <p className="text-lg mb-6">
                {t('aboutPage.desc1')}
              </p>

              <p className="text-lg">
                {t('aboutPage.desc2')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {[
                t('aboutPage.feature1'),
                t('aboutPage.feature2'),
                t('aboutPage.feature3'),
                t('aboutPage.feature4')
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#47CCD0]/10 flex items-center justify-center text-[#47CCD0]">
                    <CheckCircle2 size={14} strokeWidth={3} />
                  </div>
                  <span className="text-[#2B3D50] font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('auctions')}
                className="bg-[#2B3D50] hover:bg-[#2B3D50]/90 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 group shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                {t('aboutPage.browseAuctions')}
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Image Content (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1770836560507-ba33be89e547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYXVkaSUyMHRlYW0lMjBkaXNjdXNzaW9uJTIwbWVldGluZyUyMG1vZGVybiUyMG9mZmljZXxlbnwxfHx8fDE3NzE2NDYzNTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt={t('aboutPage.teamImageAlt')}
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B3D50]/60 to-transparent"></div>

              {/* Floating Badge */}
              <div className="absolute bottom-6 end-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100 max-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-[#47CCD0]/20 p-2 rounded-lg text-[#47CCD0]">
                    <Award size={24} />
                  </div>
                  <span className="font-bold text-[#2B3D50]">{t('aboutPage.leadingPlatform')}</span>
                </div>
                <p className="text-xs text-gray-500">{t('aboutPage.leadingPlatformDesc')}</p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-10 -start-10 w-40 h-40 bg-[#47CCD0]/10 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 bottom-10 -end-10 w-40 h-40 bg-[#2B3D50]/10 rounded-full blur-3xl"></div>

            <div className="hidden lg:block absolute -top-6 -end-6">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="2" fill="#47CCD0" fillOpacity="0.4"/>
                </pattern>
                <rect width="100" height="100" fill="url(#dots)"/>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 mb-24">
          {[
            {
              icon: <Globe className="w-8 h-8 text-[#47CCD0]" />,
              title: t('aboutPage.comprehensiveCoverage'),
              desc: t('aboutPage.comprehensiveCoverageDesc')
            },
            {
              icon: <Shield className="w-8 h-8 text-[#47CCD0]" />,
              title: t('aboutPage.reliabilitySecurity'),
              desc: t('aboutPage.reliabilitySecurityDesc')
            },
            {
              icon: <Users className="w-8 h-8 text-[#47CCD0]" />,
              title: t('aboutPage.interactiveCommunity'),
              desc: t('aboutPage.interactiveCommunityDesc')
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (idx * 0.1) }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#47CCD0]/30 transition-all group"
            >
              <div className="w-14 h-14 bg-[#47CCD0]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#47CCD0] transition-colors">
                <div className="group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#2B3D50] mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Goals Section (New) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#F8FAFB] rounded-3xl p-8 lg:p-12 relative overflow-hidden"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 end-0 w-64 h-64 bg-[#47CCD0]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2B3D50] mb-6">{t('aboutPage.platformGoals')}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('aboutPage.platformGoalsDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {[
              {
                icon: <Scale className="w-6 h-6" />,
                titleKey: 'aboutPage.goal1Title',
                descKey: 'aboutPage.goal1Desc'
              },
              {
                icon: <Lock className="w-6 h-6" />,
                titleKey: 'aboutPage.goal2Title',
                descKey: 'aboutPage.goal2Desc'
              },
              {
                icon: <Laptop className="w-6 h-6" />,
                titleKey: 'aboutPage.goal3Title',
                descKey: 'aboutPage.goal3Desc'
              },
              {
                icon: <Zap className="w-6 h-6" />,
                titleKey: 'aboutPage.goal4Title',
                descKey: 'aboutPage.goal4Desc'
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                titleKey: 'aboutPage.goal5Title',
                descKey: 'aboutPage.goal5Desc'
              },
              {
                icon: <Flag className="w-6 h-6" />,
                titleKey: 'aboutPage.goal6Title',
                descKey: 'aboutPage.goal6Desc'
              }
            ].map((goal, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#47CCD0]/40 transition-all flex flex-col gap-4 group"
              >
                <div className="w-12 h-12 bg-[#2B3D50] text-white rounded-lg flex items-center justify-center shadow-lg shadow-[#2B3D50]/20 group-hover:bg-[#47CCD0] group-hover:shadow-[#47CCD0]/30 transition-all duration-300">
                  {goal.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2B3D50] mb-3 group-hover:text-[#47CCD0] transition-colors">{t(goal.titleKey)}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed text-justify">
                    {t(goal.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};
