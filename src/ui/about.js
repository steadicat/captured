import React from 'react';
import component from '../lib/component';
import {track} from '../lib/behaviors';
import {Block, InlineBlock} from 'stylistic-elements';
import {Link} from '../ui/core';
import {Column} from '../ui/layout';
import {Text, BoldText, PageHeading} from '../ui/type';

const AboutSection = component('AboutSection', ({title, subtitle, children, ...props}) =>
  <Block {...props}>
    <PageHeading marginTop={48} marginBottom={8}>{title}</PageHeading>
    <Text fontStyle="italic" marginBottom={16}>{subtitle}</Text>
    {React.Children.map(children, child =>
      React.cloneElement(child, {marginBottom: 8}))}
  </Block>
);

export const About = track(component('About', ({...props}) =>
  <InlineBlock textAlign="left" maxWidth={700} paddingLeft={24} paddingRight={24} paddingBottom={192} {...props}>
    <AboutSection title="Artists’ Statement" subtitle="Jeff Greenspan & Andrew Tider (2015)">
      <Text>
        Corporations frequently commit crimes any average person would be imprisoned for. These corporate crimes devastate our environment, economy and society, yet the companies committing them often <Link href="http://prospect.org/article/get-out-jail-free-0/">get away with only paying a settlement</Link>. These payouts do little damage to a corporation's bottom line and are practically baked into their budgets. The cost of doing business.
      </Text>
      <Text>
        CAPTURED shines a light on these crimes masquerading as commerce. Through the use of art made by people in prison, this project imagines the highest levels of corporate leadership being personally responsible for their companies’ illegal actions.
      </Text>
      <Text>
        Money, power, and political influence allow these companies, and their leaders, to not just break the rules, but make the rules. They are “untouchable.” On the opposite end of society’s spectrum lies another “untouchable”–the incarcerated– who even after paying their debts to society are often <Link href="http://www.urban.org/sites/default/files/alfresco/publication-pdfs/411778-Employment-after-Prison-A-Longitudinal-Study-of-Releasees-in-Three-States.PDF">treated as unworthy</Link>.
      </Text>
      <Text>
        The artistry displayed within this project may help viewers see the incarcerated as more than one-dimensional criminals and remind them a prisoner is also a person. They may also remind us a corporation is not a person. A corporation has no conscience. It cannot repent or truly pay for its crimes.
      </Text>
      <Text>
        As consumers, we can say there are injustices we are not willing to tolerate. By not supporting companies endangering our health and freedom, and by questioning a system that wields punishment so unevenly, we can stop being mute witnesses.
      </Text>
    </AboutSection>
    <AboutSection title="Methodology">
      <Text>
        Subjects were chosen based upon the leadership of companies with the longest and/or most egregious histories of crimes against the environment, economy, and society. The featured CEOs held their titles at the time the portraits were commissioned, though some have since stepped down<sup>1</sup>. In certain cases, a CEO was not in power when the highlighted crimes were committed, but were included because they either held other senior positions during the time in question, or did little to change corrupt business practices once assuming executive control.
      </Text>
      <Text>
        The imprisoned artists were chosen not only for their skills, but also for the crimes they are serving time for, which are similar to those committed by our group of represented companies. All artists were aware of the project’s scope and goals before agreeing to collaborate with us. We chose a CEO for each artist and included a background on the crimes their company had committed. Each artist was compensated for their contribution.
      </Text>
      <Text fontSize={12}>
        <sup>1</sup> With the exception of BP Oil. Tony Hayward stepped down prior to this project’s start, but BP’s crimes were so destructive during his tenure that it was decided to include him. He is now the Chairman of Glencore, an equally dubious company.
      </Text>
    </AboutSection>
    <AboutSection title="Why Bernie?" marginBottom={96}>
      <Text>
        A limited run of 1,000 CAPTURED fine printed art books (great for coffee tables) are being sold through this website, with all profits going towards efforts to elect <Link href="https://berniesanders.com/">Bernie Sanders</Link> as president in 2016.
      </Text>
      <Text>
        One of the main pillars of Bernie’s campaign is to <Link href="https://berniesanders.com/issues/money-in-politics/">eliminate corporate control</Link> over government, politics, and political campaigns. Since the crimes documented within this project reflect corporate America’s pattern of putting profits before people, this goal has our full support.
      </Text>
    </AboutSection>
    <Column fontSize={12} width="50%">
      <BoldText>Credits</BoldText>
      <Text>
        Project created by Jeff Greenspan and Andrew Tider.
      </Text>
      <Text>
        Site design and development by Stefano Attardi.
      </Text>
      <Text>
        Book Printing by Oddi.
      </Text>
    </Column>
    <Column fontSize={12} width="50%">
      <BoldText>Thanks</BoldText>
      <Text>
        Thanks to all the friends and families of the imprisoned artists who facilitated communication and helped get the artwork shipped to us.
      </Text>
      <Text>
        Gonzalo Torres<br/>
        Jes Pepe<br/>
        Meg Worden<br/>
        Nick McKinney<br/>
        Jeff Kling
      </Text>
    </Column>
  </InlineBlock>
));
