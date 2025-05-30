'use client';
import { useRef } from 'react';

import { motion, useScroll } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { fadeInUp } from '@/shared/lib/helpers/animations';
import Button from '@/shared/ui/kit/button/Button';
import { SectionSubtitle } from '@/shared/ui/kit/section-subtitle/SectionSubtitle';
import { SectionTitle } from '@/shared/ui/kit/section-title/SectionTitle';

import { PersonalizedCard } from './PersonalizedCard';
import styles from './PersonalizedSolutions.module.scss';

export const PersonalizedSolutions = () => {
  const t = useTranslations();
  const isMac = typeof window !== 'undefined' && /Mac/.test(navigator.platform);
  const items = [
    {
      title: t('home.personalizedSolutions.items.item1.title'),
      text: t('home.personalizedSolutions.items.item1.text'),
      backImage: '/images/home/personalized-card/image1.svg',
    },
    {
      title: t('home.personalizedSolutions.items.item2.title'),
      text: t('home.personalizedSolutions.items.item2.text'),
      backImage: '/images/home/personalized-card/image2.svg',
    },
    {
      title: t('home.personalizedSolutions.items.item3.title'),
      text: t('home.personalizedSolutions.items.item3.text'),
      backImage: '/images/home/personalized-card/image3.svg',
    },
    {
      title: t('home.personalizedSolutions.items.item4.title'),
      text: t('home.personalizedSolutions.items.item4.text'),
      backImage: '/images/home/personalized-card/image4.svg',
    },
  ];

  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 10%', 'end end'],
  });

  return (
    <section className={styles.personalizedSolutions}>
      <div className="_container">
        <div className={styles.titleBlock}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <SectionTitle>{t('home.personalizedSolutions.title')}</SectionTitle>
          </motion.div>
        </div>
        <div className={styles.scrollBlock} ref={container}>
          {items.map((item, index) => {
            const targetScale = isMac ? 1 : 1 - (items.length - 1 - index) * 0.05;

            return (
              <PersonalizedCard
                key={index}
                {...item}
                range={[index * 0.33, 1]}
                progress={scrollYProgress}
                i={index}
                targetScale={targetScale}
                isMac={isMac}
              />
            );
          })}
        </div>
        <div className={styles.buttonBlock}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <SectionSubtitle>{t('home.personalizedSolutions.text')}</SectionSubtitle>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Button url="/get-in-touch" type="link" color="green-white">
              {t('home.personalizedSolutions.button')}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
