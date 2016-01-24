import React from 'react';
import {connect} from 'ducts';
import {Block, InlineBlock} from 'stylistic-elements';
import {BuyButton} from '../ui/buy';
import {TextLink, Link} from '../ui/core';
import {CondensedText} from '../ui/type';
import {SocialButtons} from '../ui/social';
import {Bernie} from '../ui/bernie';
import {Animate} from 'react-rebound';

@connect
export class Toolbar extends React.Component {
  constructor() {
    super();
    this.state = {hovered: false};
  }

  static pure = true;

  onMouseEnter = () => {
    this.setState({hovered: true});
  };

  onMouseLeave = () => {
    this.setState({hovered: false});
  };

  render() {
    const {get, back, ...props} = this.props;
    const {hovered} = this.state;
    return (
      <Animate scaleX={hovered ? 1.05 : 1} scaleY={hovered ? 1.05 : 1}>
        <Block
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          borderTopStyle="solid"
          borderTopWidth={1}
          zIndex={4}
          textAlign="center"
          backgroundColor={hovered ? [230, 60, 34] : [255, 255, 255]}
          borderColor={hovered ? [230, 60, 34] : '#444'}
          transformOrigin="50% 100%"
          {...props}>
          <TextLink
            href={back ? '/' : '/about'}
            position="absolute"
            left={0}
            lineHeight={12}
            display={hovered ? 'none' : null}>
            <CondensedText
              fontSize={back ? 28 : 18}
              paddingLeft={16}
              paddingRight={16}
              paddingTop={back ? 15 : 16}
              paddingBottom={16}>
              {back ? '‹' : 'About'}
            </CondensedText>
          </TextLink>
          {get('sold') < 1000 && <BuyButton
            borderWidth={0}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            hovered={this.state.hovered}
            marginLeft={get('browser.width') > 760 ? 145 : 0}
            paddingLeft={16}
            paddingRight={16}
          />}
          {get('browser.width') > 760 && <InlineBlock visibility={hovered ? 'hidden' : null}>
            All profits go to {' '}
            <Link href="https://berniesanders.com/">
              <Bernie height={16} />
            </Link>
          </InlineBlock>}
          <Block
            position="absolute"
            right={0}
            display={hovered ? 'none' : 'inline-block'}
            fontSize={12}>
            SHARE:
            <SocialButtons
              url="https://thecapturedproject.com/"
              paddingRight={16}
              paddingLeft={16}
              paddingTop={12}
              paddingBottom={12}
            />
          </Block>
        </Block>
      </Animate>
    );
  }
}
