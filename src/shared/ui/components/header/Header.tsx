'use client';
import Image from 'next/image';
import Link from 'next/link';

import { useLocale, useTranslations } from 'next-intl';

import { WEBSITE_EMAIL, WEBSITE_PHONE } from '@/shared/lib/constants/constants';

import { Email } from '../../icons/email/email';
import { Phone } from '../../icons/phone/phone';
import { Linkedin } from '../../icons/socials/linkedin/Linkedin';
// import { Facebook } from "../../icons/socials/facebook/facebook";
// import { Instagram } from "../../icons/socials/instagram/instagram";
// import { X } from "../../icons/socials/x/x";
import LangSelector from '../language-switcher/LangSelector';
import { MobileMenu } from '../mobile-menu/MobileMenu';
import styles from './Header.module.scss';

export const Header = () => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <header className={styles.header + ' ' + styles[locale]}>
      <div className={styles.headerTop}>
        <div className={'_container'}>
          <div className={styles.headerTopInner}>
            <div className={styles.headerTopLeft}>
              <Link href={`mailto:${WEBSITE_EMAIL}`}>
                <Email />
                {WEBSITE_EMAIL}
              </Link>
              <Link href={`tel:${WEBSITE_PHONE}`}>
                <Phone />
                {WEBSITE_PHONE}
              </Link>
            </div>
            <div className={styles.headerTopRight}>
              <LangSelector />
              <Link href="https://www.linkedin.com/company/the-clicksly/ " target="_blank">
                <Linkedin />
              </Link>
              {/**<Link href="#" target="_blank">
                <Facebook />
              </Link>
              <Link href="#" target="_blank">
                <Instagram />
              </Link>
              <Link href="#" target="_blank">
                <X />
              </Link> */}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.headerBottom}>
        <div className={'_container'}>
          <div className={styles.headerBottomInner}>
            <Link href="/">
              <Image src="/logo.svg" alt="logo" width={172} height={28} />
            </Link>
            <nav className={styles.headerBottomNav}>
              <Link href="/">{t('header.navigation.home')}</Link>
              <Link href="/who-we-are">{t('header.navigation.whoWeAre')}</Link>
              <Link href="/targeted-sectors">{t('header.navigation.targetedSectors')}</Link>
              <Link href="/advertise-with-us">{t('header.navigation.advertiseWithUs')}</Link>
              <Link href="/partner-with-us">{t('header.navigation.partnerWithUs')}</Link>
              <Link href="/help-and-support">{t('header.navigation.helpAndSupport')}</Link>
            </nav>
            <Link href="/get-in-touch" className={styles.getInTouch}>
              {t('header.navigation.getInTouch')}
            </Link>
            <div className={styles.mobileLang}>
              <LangSelector />
            </div>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
