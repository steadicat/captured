import React from 'react';
import {Animate} from 'react-rebound';
import {InlineBlock} from 'stylistic-elements';
import component from '../lib/component';
import {hover} from '../lib/behaviors';
import {Link} from '../ui/core';

export const Icon = component('Icon', ({width, height, color, ...props}) =>
  <InlineBlock
    tag="svg"
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 24 24"
    fill={color}
    {...props}
  />
);

export const FacebookIcon = component('FacebookIcon', props =>
  <Icon {...props}>
    <path style={{fillRule: 'evenodd'}} d="M21.7858055,23 C22.4563739,23 23,22.4563759 23,21.7858101 L23,2.2141899 C23,1.5434592 22.4563739,1 21.7858055,1 L2.21427688,1 C1.54346124,1 1,1.5434592 1,2.2141899 L1,21.7858101 C1,22.4563759 1.54346124,23 2.21427688,23 L21.7858055,23 Z M16.1796563,23 L16.1796563,14.4804754 L19.0393191,14.4804754 L19.4674607,11.1602059 L16.1796563,11.1602059 L16.1796563,9.04036059 C16.1796563,8.0790651 16.4465647,7.42399604 17.8251247,7.42399604 L19.5833574,7.42317175 L19.5833574,4.45355834 C19.2791081,4.41316777 18.2355438,4.32274236 17.0213494,4.32274236 C14.4863784,4.32274236 12.7508964,5.8700308 12.7508964,8.71163083 L12.7508964,11.1602059 L9.88389729,11.1602059 L9.88389729,14.4804754 L12.7508964,14.4804754 L12.7508964,23 L16.1796563,23 Z" />
  </Icon>
);

export const TwitterIcon = component('TwitterIcon', props =>
  <Icon {...props}>
    <path d="M21.4646897,5.11925756 C22.5137955,4.49039197 23.3193993,3.49464284 23.698784,2.30820486 C22.7170761,2.89041734 21.6296514,3.31328461 20.4722923,3.54120535 C19.5453905,2.55369977 18.2248815,1.9366107 16.7635073,1.9366107 C13.9573464,1.9366107 11.682306,4.21156048 11.682306,7.01754022 C11.682306,7.4157674 11.7273285,7.8035769 11.8139312,8.17544282 C7.59105621,7.96355624 3.84712282,5.94071435 1.3410817,2.86668315 C0.903720275,3.61711854 0.653152398,4.48993903 0.653152398,5.42109854 C0.653152398,7.18386076 1.55025062,8.73908466 2.91360801,9.6502241 C2.08064647,9.62386284 1.29723685,9.39530797 0.612115794,9.01474556 C0.61175344,9.03594327 0.61175344,9.05723158 0.61175344,9.07861047 C0.61175344,11.5404444 2.36319209,13.5940864 4.68760321,14.0607985 C4.26120299,14.176933 3.81233682,14.2389861 3.3488859,14.2389861 C3.02149895,14.2389861 2.70317085,14.2071896 2.39299572,14.1478541 C3.03952607,16.1665289 4.91597689,17.6355125 7.13938179,17.6765491 C5.40044435,19.0392724 3.20956074,19.8515797 0.829075325,19.8515797 C0.418981046,19.8515797 0.0145032563,19.8275738 -0.382999217,19.7806489 C1.86558929,21.2222748 4.53641095,22.0633893 7.40580266,22.0633893 C16.7516402,22.0633893 21.8622828,14.3210593 21.8622828,7.60672802 C21.8622828,7.38641672 21.857391,7.16728306 21.8476074,6.94941764 C22.8402765,6.23304354 23.7017735,5.33811945 24.3829992,4.31917965 C23.4717692,4.72329509 22.4925072,4.99641951 21.4646897,5.11925756 Z" />
  </Icon>
);

export const FacebookButton = hover(component('FacebookButton', ({url, hovered, ...props}) =>
  <InlineBlock
    tag="a"
    href={`https://www.facebook.com/sharer/sharer.php?url=${encodeURIComponent(url)}`}
    {...props}>
    <Animate scaleX={hovered ? 1.1 : 1} scaleY={hovered ? 1.1 : 1}>
      <FacebookIcon width={24} height={24} color={hovered ? 'rgb(230, 60, 34)' : '#888'} />
    </Animate>
  </InlineBlock>
));

const tweetText = 'Check out @projectcaptured: people in prison drawing people who should be.';

export const TwitterButton = hover(component('TwitterButton', ({url, hovered, ...props}) =>
  <InlineBlock
    tag="a"
    href={`https://twitter.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(tweetText)}`}
    {...props}>
    <Animate scaleX={hovered ? 1.1 : 1} scaleY={hovered ? 1.1 : 1}>
      <TwitterIcon width={24} height={24} color={hovered ? 'rgb(230, 60, 34)' : '#888'} />
    </Animate>
  </InlineBlock>
));

export const SocialButtons = component('SocialButtons', ({url, ...props}) =>
  <InlineBlock {...props}>
    <FacebookButton url={url} />
    <TwitterButton url={url} marginLeft={12} />
  </InlineBlock>
);

export const SocialLink = hover(component('SocialLink', ({href, text, icon: Ico, hovered, ...props}) =>
  <Link href={href} {...props}>
    <Ico width={16} height={16} color={hovered ? [230, 60, 34] : [0, 0, 0]} verticalAlign="middle" />
    {' '}
    <Animate color={hovered ? [230, 60, 34] : [0, 0, 0]}>
      <span>{text}</span>
    </Animate>
  </Link>
));

export const SocialLinks = component('SocialLinks', ({url, hovered, ...props}) =>
  <InlineBlock {...props}>
    <SocialLink text="capturedproject" href="https://www.facebook.com/capturedproject" icon={FacebookIcon} marginRight={24} />
    <SocialLink text="@projectcaptured" href="https://www.twitter.com/projectcaptured" icon={TwitterIcon} />
  </InlineBlock>
);

