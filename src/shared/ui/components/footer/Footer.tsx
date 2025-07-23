'use client';
import Image from 'next/image';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

import {
  WEBSITE_EMAIL,
  WEBSITE_OFFICE_ADDRESS,
  WEBSITE_PHONE,
  WEBSITE_REGISTRATION_ADDRESS,
} from '@/shared/lib/constants/constants';

import { Linkedin } from '../../icons/socials/linkedin/Linkedin';
import styles from './Footer.module.scss';

export const Footer = () => {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={'_container'}>
        <div className={styles.footerTop}>
          <div className={styles.footerTopLeft}>
            <Link href="/">
              <Image src="/logo.svg" alt="logo" width={172} height={28} />
            </Link>
            <div className={styles.footerNavigations}>
              <nav>
                <h3>{t('footer.company.title')}</h3>
                <Link href="/who-we-are">{t('footer.company.whoWeAre')}</Link>
                <Link href="/targeted-sectors">{t('footer.company.targetedSectors')}</Link>
                <Link href="/get-in-touch">{t('footer.company.getInTouch')}</Link>
              </nav>
              <nav>
                <h3>{t('footer.partnership.title')}</h3>
                <Link href="/advertise-with-us">{t('footer.partnership.advertiseWithUs')}</Link>
                <Link href="/partner-with-us">{t('footer.partnership.partnerWithUs')}</Link>
                <Link href="/help-and-support">{t('footer.partnership.helpAndSupport')}</Link>
              </nav>
              <nav>
                <h3>{t('footer.legal.title')}</h3>
                <Link href="/legal/terms-and-conditions">
                  {t('footer.legal.termsAndConditions')}
                </Link>
                <Link href="/legal/privacy-policy">{t('footer.legal.privacyPolicy')}</Link>
                <Link href="/legal/cookie-policy">{t('footer.legal.cookiePolicy')}</Link>
                <Link href="/legal/refund-policy">{t('footer.legal.refundPolicy')}</Link>
              </nav>
            </div>
          </div>
          <Image
            src={'/foot_logo_big_mob.svg'}
            alt="The Clicksly"
            width={1440}
            height={248}
            className={styles.footerBottomImageMob}
          />
          <div className={styles.footerTopRight}>
            <div className={styles.contact}>
              <h3>{t('footer.addresses.contact.title')}</h3>
              <div>
                <h4>{t('footer.addresses.contact.email')}</h4>
                <Link href={`mailto:${WEBSITE_EMAIL}`}>{WEBSITE_EMAIL}</Link>
              </div>
              <div>
                <h4>{t('footer.addresses.contact.phone')}</h4>
                <Link href={`tel:${WEBSITE_PHONE}`}>{WEBSITE_PHONE}</Link>
              </div>
            </div>
            <div className={styles.addresses}>
              <div className={styles.office}>
                <h4>{t('footer.addresses.office.title')}</h4>
                <p>{WEBSITE_OFFICE_ADDRESS}</p>
              </div>
              <div className={styles.registered}>
                <h4>{t('footer.addresses.registered.title')}</h4>
                <p>{WEBSITE_REGISTRATION_ADDRESS}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        src={'/foot_logo_big.svg'}
        alt="The Clicksly"
        width={1440}
        height={248}
        className={styles.footerBottomImage}
      />
      <div className={'_container'}>
        <div className={styles.footerBottom}>
          <div className={styles.footerBottomLeft}>
            <Link href="https://www.linkedin.com/company/the-clicksly/" target="_blank">
              <Linkedin />
            </Link>
          </div>
          <div className={styles.footerBottomRight}>
            <p>© {year} Youmedia Inc</p>
            <p>{t('footer.rightsReserved')}</p>
          </div>
          <nav className={styles.legalMobile}>
            <Link href="/legal/terms-and-conditions">{t('footer.legal.termsAndConditions')}</Link>
            <Link href="/legal/privacy-policy">{t('footer.legal.privacyPolicy')}</Link>
            <Link href="/legal/cookie-policy">{t('footer.legal.cookiePolicy')}</Link>
            <Link href="/legal/refund-policy">{t('footer.legal.refundPolicy')}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
