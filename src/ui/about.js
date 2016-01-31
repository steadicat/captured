import React from 'react';
import component from '../lib/component';
import {track} from '../lib/behaviors';
import {Block, InlineBlock, Inline} from 'stylistic-elements';
import {TextLink, Link} from '../ui/core';
import {Toolbar} from '../ui/toolbar';
import {ResponsiveColumn} from '../ui/layout';
import {DefaultFont, Text} from '../ui/type';
import {SocialLinks} from '../ui/social';

const AboutSection = component('AboutSection', ({title, titleElement: TitleElement, subtitle, children, get, ...props}) =>
  <Block marginTop={96 * 2} {...props}>
    {TitleElement && <TitleElement marginLeft={24} marginRight={24} height={60} marginBottom={48} />}
    {/*<PageHeading fontSize={48} lineHeight={48} marginBottom={48} marginLeft={24} marginRight={24}>{title}</PageHeading>*/}
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
      </Link>
      <InlineBlock
        textAlign="left"
        width={get('browser.mobile') ? null : '80%'}
        maxWidth={1400}
        {...props}>
        <AboutSection title="Artists’ Statement" titleElement={StatementTitle}>
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
        <AboutSection title="Methodology" titleElement={MethodologyTitle}>
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
        <Block textAlign={get('browser.mobile') ? 'left' : 'right'} marginTop={24}>
          <AboutText fontSize={12} textAlign="left" display="inline-block" marginLeft={get('browser.mobile') ? null : '50%'} textIndent={-6} paddingLeft={24} paddingRight={24}>
            <InlineBlock tag="sup" fontWeight="bold" width={6}>1</InlineBlock>With the exception of BP Oil. Tony Hayward stepped down prior to this project’s start, but BP’s crimes were so destructive during his tenure that it was decided to include him. He is now the Chairman of Glencore, an equally dubious company.
          </AboutText>
        </Block>
        <AboutSection title="Credits & Gratitude" titleElement={CreditsTitle}>
          <AboutColumn>
            <AboutText>
              Project created by <TextLink href="http://jeffgreenspan.com/">Jeff Greenspan</TextLink> and <TextLink href="http://www.andrewtider.com/">Andrew Tider</TextLink>. Site design and development by <TextLink href="https://attardi.org/">Stefano J. Attardi</TextLink>. Book Printing by <TextLink href="http://www.oddi.com/">Oddi</TextLink>.
            </AboutText>
            <AboutText>Special thanks to Gonzalo Torres, Jes Pepe, Meg Worden, Nick McKinney, Arturo Aranda, Jeff Kling, and the friends and families of the imprisoned artists who facilitated communication and helped get the artwork to us.</AboutText>
          </AboutColumn>
        </AboutSection>
      </InlineBlock>
      <SocialLinks marginTop={96} />
    </Block>
  </DefaultFont>
));

export const StatementTitle = component('StatementTitle', ({...props}) =>
  <Block tag="svg" viewBox="0 0 548 61" fill="#444444" {...props}>
    <path d="M21.4584,40.4717 L16.4734,15.0277 L16.2154,15.0277 L10.8864,40.4717 L21.4584,40.4717 Z M12.7774,2.5637 C12.9494,2.0477 13.2074,1.7037 13.7224,1.7037 L18.8794,1.7037 C19.3954,1.7037 19.7394,2.0477 19.8254,2.5637 L32.1164,59.2967 C32.2024,59.8127 31.8584,60.1567 31.3424,60.1567 L26.1854,60.1567 C25.5844,60.1567 25.3264,59.8127 25.2404,59.2967 L22.6614,46.4887 L9.6834,46.4887 L7.1044,59.2967 C7.0184,59.8127 6.7604,60.1567 6.2454,60.1567 L1.0874,60.1567 C0.5724,60.1567 0.2284,59.8127 0.3144,59.2967 L12.7774,2.5637 Z" />
    <path d="M58.7395,18.5518 C58.7395,10.6438 56.1605,8.1508 49.9725,8.1508 L46.2765,8.1508 C45.9325,8.1508 45.7605,8.3228 45.7605,8.6668 L45.7605,28.4368 C45.7605,28.7808 45.9325,28.9528 46.2765,28.9528 L49.9725,28.9528 C55.9895,28.9528 58.7395,26.5458 58.7395,18.5518 L58.7395,18.5518 Z M60.4585,60.1568 C59.9435,60.1568 59.6855,59.9848 59.5135,59.5548 L52.2075,35.1418 C51.4335,35.2278 50.5745,35.2278 49.8005,35.2278 L46.2765,35.2278 C45.9325,35.2278 45.7605,35.3998 45.7605,35.7438 L45.7605,59.2968 C45.7605,59.8128 45.4165,60.1568 44.9015,60.1568 L39.6585,60.1568 C39.1425,60.1568 38.7985,59.8128 38.7985,59.2968 L38.7985,2.5638 C38.7985,2.0478 39.1425,1.7038 39.6585,1.7038 L49.8865,1.7038 C60.2005,1.7038 65.7015,6.1738 65.7015,18.5518 C65.7015,26.3738 63.1235,31.1018 58.5675,33.4228 L66.7335,59.2968 C66.9055,59.7268 66.7335,60.1568 66.3035,60.1568 L60.4585,60.1568 Z" />
    <path d="M82.7351,60.1564 C82.2191,60.1564 81.8751,59.8124 81.8751,59.2964 L81.8751,8.6664 C81.8751,8.3224 81.7031,8.1504 81.3601,8.1504 L71.7331,8.1504 C71.2171,8.1504 70.8741,7.8074 70.8741,7.2914 L70.8741,2.5634 C70.8741,2.0474 71.2171,1.7034 71.7331,1.7034 L98.9801,1.7034 C99.4961,1.7034 99.8391,2.0474 99.8391,2.5634 L99.8391,7.2914 C99.8391,7.8074 99.4961,8.1504 98.9801,8.1504 L89.3531,8.1504 C89.0091,8.1504 88.8371,8.3224 88.8371,8.6664 L88.8371,59.2964 C88.8371,59.8124 88.4941,60.1564 87.9781,60.1564 L82.7351,60.1564 Z" />
    <path d="M106.583,2.5635 C106.583,2.0475 106.927,1.7035 107.442,1.7035 L112.685,1.7035 C113.201,1.7035 113.545,2.0475 113.545,2.5635 L113.545,59.2965 C113.545,59.8125 113.201,60.1565 112.685,60.1565 L107.442,60.1565 C106.927,60.1565 106.583,59.8125 106.583,59.2965 L106.583,2.5635 Z" />
    <path d="M135.4639,60.9302 C126.6109,60.9302 122.1409,55.9442 121.7119,45.8872 C121.7119,45.3712 121.8839,45.0272 122.3999,44.9412 L127.4709,43.9962 C128.0719,43.9102 128.4159,44.2542 128.4159,44.7692 C128.7599,51.9902 131.0799,54.5692 135.5499,54.5692 C140.0199,54.5692 142.0819,52.4202 142.0819,44.5122 C142.0819,37.8072 140.7929,35.3142 136.1519,33.5092 L132.6279,32.1342 C124.6339,29.0392 122.3999,25.0852 122.3999,16.0592 C122.3999,6.0882 126.6969,0.9302 135.4639,0.9302 C144.2309,0.9302 148.2709,5.7442 148.7009,14.8562 C148.7009,15.3712 148.4429,15.7152 147.9269,15.8012 L143.1139,16.5752 C142.5979,16.7472 142.1679,16.4032 142.1679,15.8872 C141.9969,10.1282 140.1059,7.2912 135.6359,7.2912 C131.3379,7.2912 129.2759,9.8702 129.2759,15.8012 C129.2759,21.8182 130.6509,23.8812 135.3779,25.6862 L138.9019,27.0622 C146.3799,30.0702 149.0449,33.9392 149.0449,43.6522 C149.0449,55.4292 145.3489,60.9302 135.4639,60.9302" />
    <path d="M164.2726,60.1564 C163.7566,60.1564 163.4126,59.8124 163.4126,59.2964 L163.4126,8.6664 C163.4126,8.3224 163.2406,8.1504 162.8976,8.1504 L153.2706,8.1504 C152.7546,8.1504 152.4116,7.8074 152.4116,7.2914 L152.4116,2.5634 C152.4116,2.0474 152.7546,1.7034 153.2706,1.7034 L180.5176,1.7034 C181.0336,1.7034 181.3766,2.0474 181.3766,2.5634 L181.3766,7.2914 C181.3766,7.8074 181.0336,8.1504 180.5176,8.1504 L170.8906,8.1504 C170.5466,8.1504 170.3746,8.3224 170.3746,8.6664 L170.3746,59.2964 C170.3746,59.8124 170.0316,60.1564 169.5156,60.1564 L164.2726,60.1564 Z" />
    <path d="M199.8098,60.9302 C190.9568,60.9302 186.4868,55.9442 186.0578,45.8872 C186.0578,45.3712 186.2298,45.0272 186.7458,44.9412 L191.8168,43.9962 C192.4178,43.9102 192.7618,44.2542 192.7618,44.7692 C193.1058,51.9902 195.4258,54.5692 199.8958,54.5692 C204.3648,54.5692 206.4278,52.4202 206.4278,44.5122 C206.4278,37.8072 205.1388,35.3142 200.4978,33.5092 L196.9738,32.1342 C188.9798,29.0392 186.7458,25.0852 186.7458,16.0592 C186.7458,6.0882 191.0428,0.9302 199.8098,0.9302 C208.5768,0.9302 212.6168,5.7442 213.0468,14.8562 C213.0468,15.3712 212.7888,15.7152 212.2728,15.8012 L207.4598,16.5752 C206.9438,16.7472 206.5138,16.4032 206.5138,15.8872 C206.3418,10.1282 204.4518,7.2912 199.9818,7.2912 C195.6838,7.2912 193.6218,9.8702 193.6218,15.8012 C193.6218,21.8182 194.9968,23.8812 199.7238,25.6862 L203.2478,27.0622 C210.7258,30.0702 213.3908,33.9392 213.3908,43.6522 C213.3908,55.4292 209.6948,60.9302 199.8098,60.9302" />
    <path d="M220.3793,15.8872 L220.3793,2.5632 C220.3793,2.0472 220.7233,1.7042 221.2393,1.7042 L225.8803,1.7042 C226.3963,1.7042 226.7403,2.0472 226.7403,2.5632 L226.7403,8.4082 C226.7403,9.2682 226.5683,9.6982 226.1383,10.3862 L222.0983,16.0592 C221.7543,16.4892 221.4963,16.6602 221.0673,16.6602 C220.6373,16.6602 220.3793,16.4032 220.3793,15.8872" />
    <path d="M263.1733,60.9302 C254.3203,60.9302 249.8503,55.9442 249.4213,45.8872 C249.4213,45.3712 249.5933,45.0272 250.1083,44.9412 L255.1803,43.9962 C255.7813,43.9102 256.1253,44.2542 256.1253,44.7692 C256.4693,51.9902 258.7893,54.5692 263.2593,54.5692 C267.7283,54.5692 269.7913,52.4202 269.7913,44.5122 C269.7913,37.8072 268.5023,35.3142 263.8613,33.5092 L260.3373,32.1342 C252.3433,29.0392 250.1083,25.0852 250.1083,16.0592 C250.1083,6.0882 254.4063,0.9302 263.1733,0.9302 C271.9403,0.9302 275.9803,5.7442 276.4103,14.8562 C276.4103,15.3712 276.1523,15.7152 275.6363,15.8012 L270.8233,16.5752 C270.3073,16.7472 269.8773,16.4032 269.8773,15.8872 C269.7053,10.1282 267.8153,7.2912 263.3453,7.2912 C259.0473,7.2912 256.9853,9.8702 256.9853,15.8012 C256.9853,21.8182 258.3603,23.8812 263.0873,25.6862 L266.6113,27.0622 C274.0893,30.0702 276.7543,33.9392 276.7543,43.6522 C276.7543,55.4292 273.0583,60.9302 263.1733,60.9302" />
    <path d="M291.982,60.1564 C291.466,60.1564 291.122,59.8124 291.122,59.2964 L291.122,8.6664 C291.122,8.3224 290.95,8.1504 290.607,8.1504 L280.98,8.1504 C280.464,8.1504 280.121,7.8074 280.121,7.2914 L280.121,2.5634 C280.121,2.0474 280.464,1.7034 280.98,1.7034 L308.227,1.7034 C308.743,1.7034 309.086,2.0474 309.086,2.5634 L309.086,7.2914 C309.086,7.8074 308.743,8.1504 308.227,8.1504 L298.6,8.1504 C298.256,8.1504 298.084,8.3224 298.084,8.6664 L298.084,59.2964 C298.084,59.8124 297.741,60.1564 297.225,60.1564 L291.982,60.1564 Z" />
    <path d="M328.9433,40.4717 L323.9583,15.0277 L323.7003,15.0277 L318.3713,40.4717 L328.9433,40.4717 Z M320.2623,2.5637 C320.4343,2.0477 320.6923,1.7037 321.2073,1.7037 L326.3653,1.7037 C326.8803,1.7037 327.2243,2.0477 327.3103,2.5637 L339.6013,59.2967 C339.6873,59.8127 339.3433,60.1567 338.8273,60.1567 L333.6703,60.1567 C333.0693,60.1567 332.8113,59.8127 332.7253,59.2967 L330.1463,46.4887 L317.1683,46.4887 L314.5893,59.2967 C314.5033,59.8127 314.2453,60.1567 313.7303,60.1567 L308.5723,60.1567 C308.0573,60.1567 307.7133,59.8127 307.7993,59.2967 L320.2623,2.5637 Z" />
    <path d="M350.4336,60.1564 C349.9176,60.1564 349.5736,59.8124 349.5736,59.2964 L349.5736,8.6664 C349.5736,8.3224 349.4016,8.1504 349.0586,8.1504 L339.4316,8.1504 C338.9156,8.1504 338.5726,7.8074 338.5726,7.2914 L338.5726,2.5634 C338.5726,2.0474 338.9156,1.7034 339.4316,1.7034 L366.6786,1.7034 C367.1946,1.7034 367.5376,2.0474 367.5376,2.5634 L367.5376,7.2914 C367.5376,7.8074 367.1946,8.1504 366.6786,8.1504 L357.0516,8.1504 C356.7076,8.1504 356.5356,8.3224 356.5356,8.6664 L356.5356,59.2964 C356.5356,59.8124 356.1926,60.1564 355.6766,60.1564 L350.4336,60.1564 Z" />
    <path d="M374.2815,2.5635 C374.2815,2.0475 374.6255,1.7035 375.1405,1.7035 L397.2305,1.7035 C397.7465,1.7035 398.0905,2.0475 398.0905,2.5635 L398.0905,7.2915 C398.0905,7.8075 397.7465,8.1505 397.2305,8.1505 L381.7595,8.1505 C381.4155,8.1505 381.2435,8.3225 381.2435,8.6665 L381.2435,26.8905 C381.2435,27.2335 381.4155,27.4055 381.7595,27.4055 L395.1675,27.4055 C395.6835,27.4055 396.0275,27.7495 396.0275,28.2655 L396.0275,32.9935 C396.0275,33.5085 395.6835,33.8525 395.1675,33.8525 L381.7595,33.8525 C381.4155,33.8525 381.2435,34.0245 381.2435,34.3685 L381.2435,53.1935 C381.2435,53.5375 381.4155,53.7095 381.7595,53.7095 L397.2305,53.7095 C397.7465,53.7095 398.0905,54.0535 398.0905,54.5695 L398.0905,59.2965 C398.0905,59.8125 397.7465,60.1565 397.2305,60.1565 L375.1405,60.1565 C374.6255,60.1565 374.2815,59.8125 374.2815,59.2965 L374.2815,2.5635 Z" />
    <path d="M405.7177,2.5635 C405.7177,2.0475 406.0617,1.7035 406.5767,1.7035 L411.9057,1.7035 C412.5937,1.7035 412.9377,1.9615 413.1097,2.5635 L423.7677,38.3225 L424.1117,38.3225 L434.5117,2.5635 C434.6837,1.9615 435.1137,1.7035 435.8007,1.7035 L441.0437,1.7035 C441.5597,1.7035 441.9037,2.0475 441.9037,2.5635 L441.9037,59.2965 C441.9037,59.8125 441.5597,60.1565 441.0437,60.1565 L436.4027,60.1565 C435.8867,60.1565 435.5427,59.8125 435.5427,59.2965 L435.5427,18.8095 L435.1137,18.8095 L426.2597,48.8955 C426.0877,49.4115 425.7447,49.7555 425.2287,49.7555 L422.3927,49.7555 C421.7907,49.7555 421.5327,49.4115 421.3607,48.8955 L412.5077,18.8095 L412.0777,18.8095 L412.0777,59.2965 C412.0777,59.8125 411.7347,60.1565 411.2187,60.1565 L406.5767,60.1565 C406.0617,60.1565 405.7177,59.8125 405.7177,59.2965 L405.7177,2.5635 Z" />
    <path d="M452.3807,2.5635 C452.3807,2.0475 452.7247,1.7035 453.2397,1.7035 L475.3297,1.7035 C475.8457,1.7035 476.1897,2.0475 476.1897,2.5635 L476.1897,7.2915 C476.1897,7.8075 475.8457,8.1505 475.3297,8.1505 L459.8587,8.1505 C459.5147,8.1505 459.3427,8.3225 459.3427,8.6665 L459.3427,26.8905 C459.3427,27.2335 459.5147,27.4055 459.8587,27.4055 L473.2667,27.4055 C473.7827,27.4055 474.1267,27.7495 474.1267,28.2655 L474.1267,32.9935 C474.1267,33.5085 473.7827,33.8525 473.2667,33.8525 L459.8587,33.8525 C459.5147,33.8525 459.3427,34.0245 459.3427,34.3685 L459.3427,53.1935 C459.3427,53.5375 459.5147,53.7095 459.8587,53.7095 L475.3297,53.7095 C475.8457,53.7095 476.1897,54.0535 476.1897,54.5695 L476.1897,59.2965 C476.1897,59.8125 475.8457,60.1565 475.3297,60.1565 L453.2397,60.1565 C452.7247,60.1565 452.3807,59.8125 452.3807,59.2965 L452.3807,2.5635 Z" />
    <path d="M483.8168,2.5635 C483.8168,2.0475 484.1608,1.7035 484.6758,1.7035 L491.1228,1.7035 C491.8098,1.7035 492.2398,1.9615 492.4118,2.5635 L505.4768,46.4025 L505.8208,46.4025 L505.8208,2.5635 C505.8208,2.0475 506.1638,1.7035 506.6798,1.7035 L511.2358,1.7035 C511.7508,1.7035 512.0948,2.0475 512.0948,2.5635 L512.0948,59.2965 C512.0948,59.8125 511.7508,60.1565 511.2358,60.1565 L505.1328,60.1565 C504.4458,60.1565 504.0158,59.8985 503.8438,59.2965 L490.5208,15.4575 L490.0908,15.4575 L490.0908,59.2965 C490.0908,59.8125 489.7478,60.1565 489.2318,60.1565 L484.6758,60.1565 C484.1608,60.1565 483.8168,59.8125 483.8168,59.2965 L483.8168,2.5635 Z" />
    <path d="M530.7003,60.1564 C530.1843,60.1564 529.8403,59.8124 529.8403,59.2964 L529.8403,8.6664 C529.8403,8.3224 529.6683,8.1504 529.3253,8.1504 L519.6983,8.1504 C519.1823,8.1504 518.8383,7.8074 518.8383,7.2914 L518.8383,2.5634 C518.8383,2.0474 519.1823,1.7034 519.6983,1.7034 L546.9453,1.7034 C547.4613,1.7034 547.8043,2.0474 547.8043,2.5634 L547.8043,7.2914 C547.8043,7.8074 547.4613,8.1504 546.9453,8.1504 L537.3183,8.1504 C536.9743,8.1504 536.8023,8.3224 536.8023,8.6664 L536.8023,59.2964 C536.8023,59.8124 536.4593,60.1564 535.9433,60.1564 L530.7003,60.1564 Z" />
  </Block>
);

export const MethodologyTitle = component('MethodologyTitle', ({...props}) =>
  <Block tag="svg" viewBox="0 0 383 60" fill="#444444" {...props}>
    <path d="M0.5108,1.6333 C0.5108,1.1173 0.8548,0.7733 1.3698,0.7733 L6.6988,0.7733 C7.3868,0.7733 7.7308,1.0313 7.9028,1.6333 L18.5608,37.3923 L18.9048,37.3923 L29.3048,1.6333 C29.4768,1.0313 29.9068,0.7733 30.5938,0.7733 L35.8368,0.7733 C36.3528,0.7733 36.6968,1.1173 36.6968,1.6333 L36.6968,58.3663 C36.6968,58.8823 36.3528,59.2263 35.8368,59.2263 L31.1958,59.2263 C30.6798,59.2263 30.3358,58.8823 30.3358,58.3663 L30.3358,17.8793 L29.9068,17.8793 L21.0528,47.9653 C20.8808,48.4813 20.5378,48.8253 20.0218,48.8253 L17.1858,48.8253 C16.5838,48.8253 16.3258,48.4813 16.1538,47.9653 L7.3008,17.8793 L6.8708,17.8793 L6.8708,58.3663 C6.8708,58.8823 6.5278,59.2263 6.0118,59.2263 L1.3698,59.2263 C0.8548,59.2263 0.5108,58.8823 0.5108,58.3663 L0.5108,1.6333 Z" />
    <path d="M47.1738,1.6333 C47.1738,1.1173 47.5178,0.7733 48.0328,0.7733 L70.1228,0.7733 C70.6388,0.7733 70.9828,1.1173 70.9828,1.6333 L70.9828,6.3613 C70.9828,6.8773 70.6388,7.2203 70.1228,7.2203 L54.6518,7.2203 C54.3078,7.2203 54.1358,7.3923 54.1358,7.7363 L54.1358,25.9603 C54.1358,26.3033 54.3078,26.4753 54.6518,26.4753 L68.0598,26.4753 C68.5758,26.4753 68.9198,26.8193 68.9198,27.3353 L68.9198,32.0633 C68.9198,32.5783 68.5758,32.9223 68.0598,32.9223 L54.6518,32.9223 C54.3078,32.9223 54.1358,33.0943 54.1358,33.4383 L54.1358,52.2633 C54.1358,52.6073 54.3078,52.7793 54.6518,52.7793 L70.1228,52.7793 C70.6388,52.7793 70.9828,53.1233 70.9828,53.6393 L70.9828,58.3663 C70.9828,58.8823 70.6388,59.2263 70.1228,59.2263 L48.0328,59.2263 C47.5178,59.2263 47.1738,58.8823 47.1738,58.3663 L47.1738,1.6333 Z" />
    <path d="M86.6894,59.2263 C86.1734,59.2263 85.8294,58.8823 85.8294,58.3663 L85.8294,7.7363 C85.8294,7.3923 85.6574,7.2203 85.3144,7.2203 L75.6874,7.2203 C75.1714,7.2203 74.8284,6.8773 74.8284,6.3613 L74.8284,1.6333 C74.8284,1.1173 75.1714,0.7733 75.6874,0.7733 L102.9344,0.7733 C103.4504,0.7733 103.7934,1.1173 103.7934,1.6333 L103.7934,6.3613 C103.7934,6.8773 103.4504,7.2203 102.9344,7.2203 L93.3074,7.2203 C92.9634,7.2203 92.7914,7.3923 92.7914,7.7363 L92.7914,58.3663 C92.7914,58.8823 92.4484,59.2263 91.9324,59.2263 L86.6894,59.2263 Z" />
    <path d="M110.5373,1.6333 C110.5373,1.1173 110.8813,0.7733 111.3963,0.7733 L116.6393,0.7733 C117.1553,0.7733 117.4993,1.1173 117.4993,1.6333 L117.4993,25.5303 C117.4993,25.8743 117.6713,26.0453 118.0153,26.0453 L130.5643,26.0453 C130.9073,26.0453 131.0793,25.8743 131.0793,25.5303 L131.0793,1.6333 C131.0793,1.1173 131.4233,0.7733 131.9393,0.7733 L137.1823,0.7733 C137.6983,0.7733 138.0423,1.1173 138.0423,1.6333 L138.0423,58.3663 C138.0423,58.8823 137.6983,59.2263 137.1823,59.2263 L131.9393,59.2263 C131.4233,59.2263 131.0793,58.8823 131.0793,58.3663 L131.0793,33.0083 C131.0793,32.6643 130.9073,32.4933 130.5643,32.4933 L118.0153,32.4933 C117.6713,32.4933 117.4993,32.6643 117.4993,33.0083 L117.4993,58.3663 C117.4993,58.8823 117.1553,59.2263 116.6393,59.2263 L111.3963,59.2263 C110.8813,59.2263 110.5373,58.8823 110.5373,58.3663 L110.5373,1.6333 Z" />
    <path d="M167.5262,49.3408 C168.0422,47.6218 168.2142,46.3318 168.2142,29.9998 C168.2142,13.6678 168.0422,12.3778 167.5262,10.6588 C166.6662,7.9938 164.4322,6.5328 161.3372,6.5328 C158.2432,6.5328 156.0942,7.9938 155.2352,10.6588 C154.6332,12.3778 154.4612,13.6678 154.4612,29.9998 C154.4612,46.3318 154.6332,47.6218 155.2352,49.3408 C156.0942,52.0058 158.2432,53.4668 161.3372,53.4668 C164.4322,53.4668 166.6662,52.0058 167.5262,49.3408 M148.5312,51.3178 C147.6712,48.7388 147.4132,46.5898 147.4132,29.9998 C147.4132,13.4098 147.6712,11.2608 148.5312,8.6818 C150.3362,3.0948 154.7192,-0.0002 161.3372,-0.0002 C167.9562,-0.0002 172.4252,3.0948 174.1442,8.6818 C175.0042,11.2608 175.2622,13.4098 175.2622,29.9998 C175.2622,46.5898 175.0042,48.7388 174.1442,51.3178 C172.4252,56.9058 167.9562,59.9998 161.3372,59.9998 C154.7192,59.9998 150.3362,56.9058 148.5312,51.3178" />
    <path d="M192.1847,52.7794 L196.9977,52.7794 C200.9517,52.7794 203.1867,51.2324 204.3897,47.7934 C205.1637,45.3864 205.5077,42.2064 205.5077,30.0004 C205.5077,17.7934 205.1637,14.6134 204.3897,12.2064 C203.1867,8.7684 200.9517,7.2204 196.9977,7.2204 L192.1847,7.2204 C191.8407,7.2204 191.6687,7.3924 191.6687,7.7364 L191.6687,52.2634 C191.6687,52.6074 191.8407,52.7794 192.1847,52.7794 L192.1847,52.7794 Z M184.7067,1.6334 C184.7067,1.1174 185.0507,0.7734 185.5667,0.7734 L197.6857,0.7734 C205.0777,0.7734 209.2897,3.8684 211.1797,9.8854 C212.2117,13.0664 212.5557,16.9344 212.5557,30.0004 C212.5557,43.0664 212.2117,46.9344 211.1797,50.1144 C209.2897,56.1314 205.0777,59.2264 197.6857,59.2264 L185.5667,59.2264 C185.0507,59.2264 184.7067,58.8824 184.7067,58.3664 L184.7067,1.6334 Z" />
    <path d="M241.2047,49.3408 C241.7207,47.6218 241.8927,46.3318 241.8927,29.9998 C241.8927,13.6678 241.7207,12.3778 241.2047,10.6588 C240.3447,7.9938 238.1107,6.5328 235.0157,6.5328 C231.9217,6.5328 229.7727,7.9938 228.9137,10.6588 C228.3117,12.3778 228.1397,13.6678 228.1397,29.9998 C228.1397,46.3318 228.3117,47.6218 228.9137,49.3408 C229.7727,52.0058 231.9217,53.4668 235.0157,53.4668 C238.1107,53.4668 240.3447,52.0058 241.2047,49.3408 M222.2097,51.3178 C221.3497,48.7388 221.0917,46.5898 221.0917,29.9998 C221.0917,13.4098 221.3497,11.2608 222.2097,8.6818 C224.0147,3.0948 228.3977,-0.0002 235.0157,-0.0002 C241.6347,-0.0002 246.1037,3.0948 247.8227,8.6818 C248.6827,11.2608 248.9407,13.4098 248.9407,29.9998 C248.9407,46.5898 248.6827,48.7388 247.8227,51.3178 C246.1037,56.9058 241.6347,59.9998 235.0157,59.9998 C228.3977,59.9998 224.0147,56.9058 222.2097,51.3178" />
    <path d="M258.3855,1.6333 C258.3855,1.1173 258.7295,0.7733 259.2445,0.7733 L264.4875,0.7733 C265.0035,0.7733 265.3475,1.1173 265.3475,1.6333 L265.3475,52.2633 C265.3475,52.6073 265.5195,52.7793 265.8635,52.7793 L281.1625,52.7793 C281.6785,52.7793 282.0225,53.1233 282.0225,53.6393 L282.0225,58.3663 C282.0225,58.8823 281.6785,59.2263 281.1625,59.2263 L259.2445,59.2263 C258.7295,59.2263 258.3855,58.8823 258.3855,58.3663 L258.3855,1.6333 Z" />
    <path d="M306.0417,49.3408 C306.5577,47.6218 306.7297,46.3318 306.7297,29.9998 C306.7297,13.6678 306.5577,12.3778 306.0417,10.6588 C305.1817,7.9938 302.9477,6.5328 299.8527,6.5328 C296.7587,6.5328 294.6097,7.9938 293.7507,10.6588 C293.1487,12.3778 292.9767,13.6678 292.9767,29.9998 C292.9767,46.3318 293.1487,47.6218 293.7507,49.3408 C294.6097,52.0058 296.7587,53.4668 299.8527,53.4668 C302.9477,53.4668 305.1817,52.0058 306.0417,49.3408 M287.0467,51.3178 C286.1867,48.7388 285.9287,46.5898 285.9287,29.9998 C285.9287,13.4098 286.1867,11.2608 287.0467,8.6818 C288.8517,3.0948 293.2347,-0.0002 299.8527,-0.0002 C306.4717,-0.0002 310.9407,3.0948 312.6597,8.6818 C313.5197,11.2608 313.7777,13.4098 313.7777,29.9998 C313.7777,46.5898 313.5197,48.7388 312.6597,51.3178 C310.9407,56.9058 306.4717,59.9998 299.8527,59.9998 C293.2347,59.9998 288.8517,56.9058 287.0467,51.3178" />
    <path d="M322.2769,30 C322.2769,13.41 322.5349,11.261 323.3939,8.682 C325.1989,3.095 329.5829,0 336.2009,0 C344.2809,0 348.8359,4.556 349.7819,12.722 C349.8679,13.238 349.6959,13.668 349.1799,13.754 L344.3669,14.699 C343.7649,14.785 343.4209,14.527 343.3349,14.011 C342.7339,9.198 340.4989,6.533 336.2869,6.533 C333.1929,6.533 330.9579,7.994 330.0989,10.659 C329.4969,12.378 329.3249,13.668 329.3249,30 C329.3249,46.332 329.4969,47.622 330.0989,49.341 C330.9579,52.006 333.2789,53.467 336.3729,53.467 C339.4669,53.467 341.7879,52.006 342.6479,49.341 C343.1629,47.708 343.4209,46.332 343.4209,34.384 C343.4209,34.04 343.2489,33.868 342.9059,33.868 L337.1469,33.868 C336.6309,33.868 336.2869,33.524 336.2869,33.009 L336.2869,28.453 C336.2869,27.937 336.6309,27.593 337.1469,27.593 L349.2659,27.593 C349.7819,27.593 350.1259,27.937 350.1259,28.453 L350.1259,30.945 C350.1259,46.59 349.8679,48.739 349.0079,51.318 C347.2889,56.905 342.8199,60 336.2009,60 C329.5829,60 325.1989,56.905 323.3939,51.318 C322.5349,48.739 322.2769,46.59 322.2769,30" />
    <path d="M365.452,59.2263 C364.936,59.2263 364.592,58.8823 364.592,58.3663 L364.592,35.0713 L353.333,1.6333 C353.161,1.1173 353.333,0.7733 353.934,0.7733 L359.349,0.7733 C359.951,0.7733 360.209,1.0313 360.381,1.6333 L368.03,26.1323 L368.288,26.1323 L375.938,1.6333 C376.11,1.0313 376.368,0.7733 376.884,0.7733 L382.213,0.7733 C382.814,0.7733 382.986,1.1173 382.814,1.6333 L371.554,35.0713 L371.554,58.3663 C371.554,58.8823 371.211,59.2263 370.695,59.2263 L365.452,59.2263 Z" />
  </Block>
);

export const CreditsTitle = component('CreditsTitle', ({...props}) =>
  <Block tag="svg" viewBox="0 0 583 61" fill="#444444" {...props}>
    <path d="M0,30.1156 C0,13.5256 0.258,11.1186 1.032,8.7116 C2.837,3.2106 6.962,0.1156 13.581,0.1156 C21.23,0.1156 25.872,4.2416 26.645,13.1816 C26.731,13.7836 26.473,14.1266 25.958,14.2126 L21.058,15.1586 C20.543,15.2446 20.113,14.9866 20.113,14.4706 C19.683,9.2276 17.706,6.6486 13.667,6.6486 C10.572,6.6486 8.681,7.9376 7.822,10.6886 C7.306,12.3216 7.048,13.9546 7.048,30.1156 C7.048,46.2756 7.306,47.9096 7.822,49.5426 C8.681,52.2936 10.572,53.5826 13.667,53.5826 C17.706,53.5826 19.683,51.0036 20.113,45.7606 C20.113,45.2446 20.543,44.9866 21.058,45.0726 L25.958,46.0186 C26.473,46.1036 26.731,46.4476 26.645,47.0496 C25.872,55.9896 21.23,60.1156 13.581,60.1156 C6.962,60.1156 2.837,57.0206 1.032,51.5196 C0.258,49.1126 0,46.7056 0,30.1156" />
    <path d="M53.7963,17.7373 C53.7963,9.8293 51.2173,7.3363 45.0293,7.3363 L41.3333,7.3363 C40.9893,7.3363 40.8173,7.5083 40.8173,7.8523 L40.8173,27.6223 C40.8173,27.9663 40.9893,28.1383 41.3333,28.1383 L45.0293,28.1383 C51.0463,28.1383 53.7963,25.7313 53.7963,17.7373 L53.7963,17.7373 Z M55.5153,59.3423 C54.9993,59.3423 54.7413,59.1703 54.5693,58.7403 L47.2643,34.3273 C46.4903,34.4133 45.6303,34.4133 44.8573,34.4133 L41.3333,34.4133 C40.9893,34.4133 40.8173,34.5853 40.8173,34.9293 L40.8173,58.4823 C40.8173,58.9983 40.4733,59.3423 39.9583,59.3423 L34.7143,59.3423 C34.1993,59.3423 33.8553,58.9983 33.8553,58.4823 L33.8553,1.7493 C33.8553,1.2333 34.1993,0.8893 34.7143,0.8893 L44.9433,0.8893 C55.2573,0.8893 60.7583,5.3593 60.7583,17.7373 C60.7583,25.5593 58.1803,30.2873 53.6243,32.6083 L61.7893,58.4823 C61.9613,58.9123 61.7893,59.3423 61.3603,59.3423 L55.5153,59.3423 Z" />
    <path d="M70.2032,1.7489 C70.2032,1.2329 70.5472,0.8889 71.0632,0.8889 L93.1522,0.8889 C93.6682,0.8889 94.0122,1.2329 94.0122,1.7489 L94.0122,6.4769 C94.0122,6.9929 93.6682,7.3359 93.1522,7.3359 L77.6812,7.3359 C77.3372,7.3359 77.1652,7.5079 77.1652,7.8519 L77.1652,26.0759 C77.1652,26.4189 77.3372,26.5909 77.6812,26.5909 L91.0902,26.5909 C91.6052,26.5909 91.9492,26.9349 91.9492,27.4509 L91.9492,32.1789 C91.9492,32.6939 91.6052,33.0379 91.0902,33.0379 L77.6812,33.0379 C77.3372,33.0379 77.1652,33.2099 77.1652,33.5539 L77.1652,52.3789 C77.1652,52.7229 77.3372,52.8949 77.6812,52.8949 L93.1522,52.8949 C93.6682,52.8949 94.0122,53.2389 94.0122,53.7549 L94.0122,58.4819 C94.0122,58.9979 93.6682,59.3419 93.1522,59.3419 L71.0632,59.3419 C70.5472,59.3419 70.2032,58.9979 70.2032,58.4819 L70.2032,1.7489 Z" />
    <path d="M109.1173,52.8951 L113.9303,52.8951 C117.8843,52.8951 120.1193,51.3481 121.3223,47.9091 C122.0963,45.5021 122.4403,42.3221 122.4403,30.1161 C122.4403,17.9091 122.0963,14.7291 121.3223,12.3221 C120.1193,8.8841 117.8843,7.3361 113.9303,7.3361 L109.1173,7.3361 C108.7733,7.3361 108.6013,7.5081 108.6013,7.8521 L108.6013,52.3791 C108.6013,52.7231 108.7733,52.8951 109.1173,52.8951 L109.1173,52.8951 Z M101.6393,1.7491 C101.6393,1.2331 101.9833,0.8891 102.4993,0.8891 L114.6183,0.8891 C122.0103,0.8891 126.2223,3.9841 128.1123,10.0011 C129.1443,13.1821 129.4883,17.0501 129.4883,30.1161 C129.4883,43.1821 129.1443,47.0501 128.1123,50.2301 C126.2223,56.2471 122.0103,59.3421 114.6183,59.3421 L102.4993,59.3421 C101.9833,59.3421 101.6393,58.9981 101.6393,58.4821 L101.6393,1.7491 Z" />
    <path d="M138.9698,1.7489 C138.9698,1.2329 139.3138,0.8889 139.8298,0.8889 L145.0728,0.8889 C145.5878,0.8889 145.9318,1.2329 145.9318,1.7489 L145.9318,58.4819 C145.9318,58.9979 145.5878,59.3419 145.0728,59.3419 L139.8298,59.3419 C139.3138,59.3419 138.9698,58.9979 138.9698,58.4819 L138.9698,1.7489 Z" />
    <path d="M164.2411,59.3419 C163.7251,59.3419 163.3811,58.9979 163.3811,58.4819 L163.3811,7.8519 C163.3811,7.5079 163.2091,7.3359 162.8661,7.3359 L153.2391,7.3359 C152.7231,7.3359 152.3801,6.9929 152.3801,6.4769 L152.3801,1.7489 C152.3801,1.2329 152.7231,0.8889 153.2391,0.8889 L180.4861,0.8889 C181.0021,0.8889 181.3451,1.2329 181.3451,1.7489 L181.3451,6.4769 C181.3451,6.9929 181.0021,7.3359 180.4861,7.3359 L170.8591,7.3359 C170.5151,7.3359 170.3431,7.5079 170.3431,7.8519 L170.3431,58.4819 C170.3431,58.9979 170.0001,59.3419 169.4841,59.3419 L164.2411,59.3419 Z" />
    <path d="M199.7785,60.1156 C190.9255,60.1156 186.4555,55.1296 186.0265,45.0726 C186.0265,44.5566 186.1975,44.2126 186.7135,44.1266 L191.7845,43.1816 C192.3865,43.0956 192.7305,43.4396 192.7305,43.9546 C193.0745,51.1756 195.3945,53.7546 199.8645,53.7546 C204.3335,53.7546 206.3965,51.6056 206.3965,43.6976 C206.3965,36.9926 205.1075,34.4996 200.4655,32.6946 L196.9415,31.3196 C188.9485,28.2246 186.7135,24.2706 186.7135,15.2446 C186.7135,5.2736 191.0115,0.1156 199.7785,0.1156 C208.5455,0.1156 212.5855,4.9296 213.0145,14.0416 C213.0145,14.5566 212.7575,14.9006 212.2415,14.9866 L207.4285,15.7606 C206.9125,15.9326 206.4825,15.5886 206.4825,15.0726 C206.3105,9.3136 204.4195,6.4766 199.9505,6.4766 C195.6525,6.4766 193.5895,9.0556 193.5895,14.9866 C193.5895,21.0036 194.9645,23.0666 199.6925,24.8716 L203.2165,26.2476 C210.6945,29.2556 213.3585,33.1246 213.3585,42.8376 C213.3585,54.6146 209.6625,60.1156 199.7785,60.1156" />
    <path d="M259.5066,11.4624 C259.5066,7.6804 257.4436,5.5314 254.2636,5.5314 C251.0836,5.5314 249.0206,7.6804 249.0206,11.4624 C249.0206,13.5254 249.7936,16.1904 253.5756,22.8954 C258.3036,17.3074 259.5066,14.8144 259.5066,11.4624 M251.4266,54.1844 C254.6926,54.1844 257.3576,52.6374 260.7096,47.4794 L252.5446,33.2964 C247.1296,39.5714 244.8946,43.1814 244.8946,47.2214 C244.8946,51.6914 247.4736,54.1844 251.4266,54.1844 M249.3636,27.7944 L248.1606,25.7314 C244.6366,19.6284 242.8316,15.6744 242.8316,11.6344 C242.8316,4.5854 247.5586,0.1154 254.1776,0.1154 C260.7956,0.1154 265.6086,4.5854 265.6086,11.6344 C265.6086,16.1904 263.5466,20.4884 256.7566,28.3964 L264.2336,41.3764 L268.1876,34.4994 C268.4456,33.9834 268.7896,33.8114 269.3046,34.1554 L272.6576,36.0464 C273.0866,36.3044 273.1726,36.7344 272.9146,37.2504 L267.4996,46.9634 L269.9066,51.0894 C270.9376,52.9804 271.5396,53.3244 272.5716,53.3244 L272.9146,53.3244 C273.4306,53.3244 273.7746,53.6684 273.7746,54.1844 L273.7746,58.4824 C273.7746,58.9984 273.4306,59.3424 272.9146,59.3424 L271.0246,59.3424 C268.2736,59.3424 267.1566,58.5684 265.6946,55.9894 L263.8906,52.8954 C260.3656,57.7944 256.4126,60.1154 251.0836,60.1154 C243.2616,60.1154 238.7066,55.0444 238.7066,47.3934 C238.7066,41.6344 242.1446,36.3044 249.3636,27.7944" />
    <path d="M299.1347,30.1156 C299.1347,13.5256 299.3927,11.3766 300.2517,8.7976 C302.0567,3.2106 306.4407,0.1156 313.0587,0.1156 C321.1387,0.1156 325.6937,4.6716 326.6397,12.8376 C326.7257,13.3536 326.5537,13.7836 326.0377,13.8696 L321.2247,14.8146 C320.6227,14.9006 320.2787,14.6426 320.1927,14.1266 C319.5917,9.3136 317.3567,6.6486 313.1447,6.6486 C310.0507,6.6486 307.8157,8.1096 306.9567,10.7746 C306.3547,12.4936 306.1827,13.7836 306.1827,30.1156 C306.1827,46.4476 306.3547,47.7376 306.9567,49.4566 C307.8157,52.1216 310.1367,53.5826 313.2307,53.5826 C316.3247,53.5826 318.6457,52.1216 319.5057,49.4566 C320.0217,47.8236 320.2787,46.4476 320.2787,34.4996 C320.2787,34.1556 320.1067,33.9836 319.7637,33.9836 L314.0047,33.9836 C313.4887,33.9836 313.1447,33.6396 313.1447,33.1246 L313.1447,28.5686 C313.1447,28.0526 313.4887,27.7086 314.0047,27.7086 L326.1237,27.7086 C326.6397,27.7086 326.9837,28.0526 326.9837,28.5686 L326.9837,31.0606 C326.9837,46.7056 326.7257,48.8546 325.8657,51.4336 C324.1467,57.0206 319.6777,60.1156 313.0587,60.1156 C306.4407,60.1156 302.0567,57.0206 300.2517,51.4336 C299.3927,48.8546 299.1347,46.7056 299.1347,30.1156" />
    <path d="M355.8781,17.7373 C355.8781,9.8293 353.2991,7.3363 347.1111,7.3363 L343.4151,7.3363 C343.0711,7.3363 342.8991,7.5083 342.8991,7.8523 L342.8991,27.6223 C342.8991,27.9663 343.0711,28.1383 343.4151,28.1383 L347.1111,28.1383 C353.1281,28.1383 355.8781,25.7313 355.8781,17.7373 L355.8781,17.7373 Z M357.5971,59.3423 C357.0811,59.3423 356.8231,59.1703 356.6511,58.7403 L349.3451,34.3273 C348.5721,34.4133 347.7121,34.4133 346.9391,34.4133 L343.4151,34.4133 C343.0711,34.4133 342.8991,34.5853 342.8991,34.9293 L342.8991,58.4823 C342.8991,58.9983 342.5551,59.3423 342.0401,59.3423 L336.7961,59.3423 C336.2811,59.3423 335.9371,58.9983 335.9371,58.4823 L335.9371,1.7493 C335.9371,1.2333 336.2811,0.8893 336.7961,0.8893 L347.0251,0.8893 C357.3391,0.8893 362.8401,5.3593 362.8401,17.7373 C362.8401,25.5593 360.2621,30.2873 355.7061,32.6083 L363.8711,58.4823 C364.0431,58.9123 363.8711,59.3423 363.4421,59.3423 L357.5971,59.3423 Z" />
    <path d="M389.8194,39.6572 L384.8344,14.2132 L384.5764,14.2132 L379.2474,39.6572 L389.8194,39.6572 Z M381.1384,1.7492 C381.3104,1.2332 381.5684,0.8892 382.0834,0.8892 L387.2414,0.8892 C387.7564,0.8892 388.1004,1.2332 388.1864,1.7492 L400.4774,58.4822 C400.5634,58.9982 400.2194,59.3422 399.7034,59.3422 L394.5464,59.3422 C393.9454,59.3422 393.6874,58.9982 393.6014,58.4822 L391.0224,45.6742 L378.0444,45.6742 L375.4654,58.4822 C375.3794,58.9982 375.1214,59.3422 374.6064,59.3422 L369.4484,59.3422 C368.9334,59.3422 368.5894,58.9982 368.6754,58.4822 L381.1384,1.7492 Z" />
    <path d="M411.3097,59.3419 C410.7937,59.3419 410.4497,58.9979 410.4497,58.4819 L410.4497,7.8519 C410.4497,7.5079 410.2777,7.3359 409.9347,7.3359 L400.3077,7.3359 C399.7917,7.3359 399.4487,6.9929 399.4487,6.4769 L399.4487,1.7489 C399.4487,1.2329 399.7917,0.8889 400.3077,0.8889 L427.5547,0.8889 C428.0707,0.8889 428.4137,1.2329 428.4137,1.7489 L428.4137,6.4769 C428.4137,6.9929 428.0707,7.3359 427.5547,7.3359 L417.9277,7.3359 C417.5837,7.3359 417.4117,7.5079 417.4117,7.8519 L417.4117,58.4819 C417.4117,58.9979 417.0687,59.3419 416.5527,59.3419 L411.3097,59.3419 Z" />
    <path d="M435.1573,1.7489 C435.1573,1.2329 435.5013,0.8889 436.0173,0.8889 L441.2603,0.8889 C441.7753,0.8889 442.1193,1.2329 442.1193,1.7489 L442.1193,58.4819 C442.1193,58.9979 441.7753,59.3419 441.2603,59.3419 L436.0173,59.3419 C435.5013,59.3419 435.1573,58.9979 435.1573,58.4819 L435.1573,1.7489 Z" />
    <path d="M460.4287,59.3419 C459.9127,59.3419 459.5687,58.9979 459.5687,58.4819 L459.5687,7.8519 C459.5687,7.5079 459.3967,7.3359 459.0537,7.3359 L449.4267,7.3359 C448.9107,7.3359 448.5677,6.9929 448.5677,6.4769 L448.5677,1.7489 C448.5677,1.2329 448.9107,0.8889 449.4267,0.8889 L476.6737,0.8889 C477.1897,0.8889 477.5327,1.2329 477.5327,1.7489 L477.5327,6.4769 C477.5327,6.9929 477.1897,7.3359 476.6737,7.3359 L467.0467,7.3359 C466.7027,7.3359 466.5307,7.5079 466.5307,7.8519 L466.5307,58.4819 C466.5307,58.9979 466.1877,59.3419 465.6717,59.3419 L460.4287,59.3419 Z" />
    <path d="M484.1905,44.9866 L484.1905,1.7486 C484.1905,1.2326 484.5345,0.8896 485.0505,0.8896 L490.2935,0.8896 C490.8085,0.8896 491.1525,1.2326 491.1525,1.7486 L491.1525,45.8466 C491.1525,50.9176 493.7315,53.5826 497.8575,53.5826 C501.9825,53.5826 504.5615,50.9176 504.5615,45.8466 L504.5615,1.7486 C504.5615,1.2326 504.9045,0.8896 505.4205,0.8896 L510.6635,0.8896 C511.1795,0.8896 511.5235,1.2326 511.5235,1.7486 L511.5235,44.9866 C511.5235,55.0436 506.1945,60.1156 497.8575,60.1156 C489.5195,60.1156 484.1905,55.0436 484.1905,44.9866" />
    <path d="M529.0847,52.8951 L533.8977,52.8951 C537.8517,52.8951 540.0867,51.3481 541.2897,47.9091 C542.0637,45.5021 542.4077,42.3221 542.4077,30.1161 C542.4077,17.9091 542.0637,14.7291 541.2897,12.3221 C540.0867,8.8841 537.8517,7.3361 533.8977,7.3361 L529.0847,7.3361 C528.7407,7.3361 528.5687,7.5081 528.5687,7.8521 L528.5687,52.3791 C528.5687,52.7231 528.7407,52.8951 529.0847,52.8951 L529.0847,52.8951 Z M521.6067,1.7491 C521.6067,1.2331 521.9507,0.8891 522.4667,0.8891 L534.5857,0.8891 C541.9777,0.8891 546.1897,3.9841 548.0797,10.0011 C549.1117,13.1821 549.4557,17.0501 549.4557,30.1161 C549.4557,43.1821 549.1117,47.0501 548.0797,50.2301 C546.1897,56.2471 541.9777,59.3421 534.5857,59.3421 L522.4667,59.3421 C521.9507,59.3421 521.6067,58.9981 521.6067,58.4821 L521.6067,1.7491 Z" />
    <path d="M558.9372,1.7489 C558.9372,1.2329 559.2812,0.8889 559.7972,0.8889 L581.8862,0.8889 C582.4022,0.8889 582.7462,1.2329 582.7462,1.7489 L582.7462,6.4769 C582.7462,6.9929 582.4022,7.3359 581.8862,7.3359 L566.4152,7.3359 C566.0712,7.3359 565.8992,7.5079 565.8992,7.8519 L565.8992,26.0759 C565.8992,26.4189 566.0712,26.5909 566.4152,26.5909 L579.8242,26.5909 C580.3392,26.5909 580.6832,26.9349 580.6832,27.4509 L580.6832,32.1789 C580.6832,32.6939 580.3392,33.0379 579.8242,33.0379 L566.4152,33.0379 C566.0712,33.0379 565.8992,33.2099 565.8992,33.5539 L565.8992,52.3789 C565.8992,52.7229 566.0712,52.8949 566.4152,52.8949 L581.8862,52.8949 C582.4022,52.8949 582.7462,53.2389 582.7462,53.7549 L582.7462,58.4819 C582.7462,58.9979 582.4022,59.3419 581.8862,59.3419 L559.7972,59.3419 C559.2812,59.3419 558.9372,58.9979 558.9372,58.4819 L558.9372,1.7489 Z" />
  </Block>
);
