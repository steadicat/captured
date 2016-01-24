import React from 'react';
import component from '../lib/component';
import {track} from '../lib/behaviors';
import {Block, InlineBlock, Inline} from 'stylistic-elements';
import {TextLink, Link} from '../ui/core';
import {HeaderTitle} from '../ui/header';
import {Toolbar} from '../ui/toolbar';
import {ResponsiveColumn} from '../ui/layout';
import {DefaultFont, Text, PageHeading} from '../ui/type';
import {SocialLinks} from '../ui/social';

const AboutSection = component('AboutSection', ({title, subtitle, children, get, ...props}) =>
  <Block marginTop={96 * 2} {...props}>
    <PageHeading fontSize={48} lineHeight={48} marginBottom={48} marginLeft={24} marginRight={24}>{title}</PageHeading>
    <Block>
      {children}
    </Block>
    <Toolbar back />
  </Block>
);

export const AboutColumn = component('AboutColumn', props =>
  <ResponsiveColumn width="50%" paddingLeft={24} paddingRight={24} {...props} />);

export const AboutText = component('AboutText', props =>
  <Text marginBottom={8} {...props} />);

export const About = track(component('About', ({get, ...props}) =>
  <DefaultFont>
    <Block textAlign="center" paddingBottom={192}>
      <Link href="/" display="block" marginTop={48} marginBottom={24}>
        <HeaderTitle width={300} />
      </Link>
      <InlineBlock
        textAlign="left"
        width={get('browser.width') > 800 ? '80%' : null}
        maxWidth={1400}
        {...props}>
        <AboutSection title="Artists’ Statement">
          <AboutColumn>
            <AboutText>
              Corporations frequently commit crimes any average person would be imprisoned for. These corporate crimes devastate our environment, economy and society, yet the companies committing them often <TextLink href="http://prospect.org/article/get-out-jail-free-0/">get away with only paying a settlement</TextLink>. These payouts do little damage to a corporation's bottom line and are practically baked into their budgets. The cost of doing business.
            </AboutText>
            <AboutText>
              CAPTURED shines a light on these crimes masquerading as commerce. Through the use of art made by people in prison, this project imagines the highest levels of corporate leadership being personally responsible for their companies’ illegal actions.
            </AboutText>
            <AboutText>
              Money, power, and political influence allow these companies, and their leaders, to not just break the rules, but make the rules. They are “untouchable.” On the opposite end of society’s spectrum lies another “untouchable”–the incarcerated– who even after paying their debts to society are often <TextLink href="http://www.urban.org/sites/default/files/alfresco/publication-pdfs/411778-Employment-after-Prison-A-Longitudinal-Study-of-Releasees-in-Three-States.PDF">treated as unworthy</TextLink>.
            </AboutText>
          </AboutColumn>
          <AboutColumn>
            <AboutText>
              The artistry displayed within this project may help viewers see the incarcerated as more than one-dimensional criminals and remind them a prisoner is also a person. They may also remind us a corporation is not a person. A corporation has no conscience. It cannot repent or truly pay for its crimes.
            </AboutText>
            <AboutText>
              As consumers, we can say there are injustices we are not willing to tolerate. By not supporting companies endangering our health and freedom, and by questioning a system that wields punishment so unevenly, we can stop being mute witnesses.
            </AboutText>
            <AboutText fontStyle="italic" marginBottom={16}>– Jeff Greenspan & Andrew Tider (2016)</AboutText>
          </AboutColumn>
        </AboutSection>
        <AboutSection title="Methodology">
          <AboutColumn>
            <AboutText>
              Subjects were chosen based upon the leadership of companies with the longest and/or most egregious histories of crimes against the environment, economy, and society. The featured CEOs held their titles at the time the portraits were commissioned, though some have since stepped down.<Inline tag="sup" position="absolute" fontWeight="bold">1</Inline> &nbsp;{' '}In certain cases, a CEO was not in power when the highlighted crimes were committed, but were included because they either held other senior positions during the time in question, or did little to change corrupt business practices once assuming executive control.
            </AboutText>
          </AboutColumn>
          <AboutColumn>
            <AboutText>
              The imprisoned artists were chosen not only for their skills, but also for the crimes they are serving time for, which are similar to those committed by our group of represented companies. All artists were aware of the project’s scope and goals before agreeing to collaborate with us. We chose a CEO for each artist and included a background on the crimes their company had committed. Each artist was compensated for their contribution.
            </AboutText>
          </AboutColumn>
        </AboutSection>
        <Block textAlign={get('browser.width') > 800 ? 'right' : 'left'} marginTop={24}>
          <AboutText fontSize={12} textAlign="left" display="inline-block" marginLeft={get('browser.width') > 800 ? '50%' : null} textIndent={-6} paddingLeft={24} paddingRight={24}>
            <InlineBlock tag="sup" fontWeight="bold" width={6}>1</InlineBlock>With the exception of BP Oil. Tony Hayward stepped down prior to this project’s start, but BP’s crimes were so destructive during his tenure that it was decided to include him. He is now the Chairman of Glencore, an equally dubious company.
          </AboutText>
        </Block>
        <AboutSection title="Credits & Gratitude">
          <AboutColumn>
            <AboutText>
              Project created by <Link href="http://http://jeffgreenspan.com/">Jeff Greenspan</Link> and <Link href="http://www.andrewtider.com/">Andrew Tider</Link>. Site design and development by <Link href="https://attardi.org/">Stefano J. Attardi</Link>. Book Printing by <Link href="http://www.oddi.com/">Oddi</Link>.
            </AboutText>
          </AboutColumn>
          <AboutColumn>
            <AboutText>Special thanks to Gonzalo Torres, Jes Pepe, Meg Worden, Nick McKinney, Arturo Aranda, Jeff Kling, and the friends and families of the imprisoned artists who facilitated communication and helped get the artwork to us.</AboutText>
          </AboutColumn>
        </AboutSection>
      </InlineBlock>
      <SocialLinks marginTop={96} />
    </Block>
  </DefaultFont>
));
