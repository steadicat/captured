import React from 'react';
import {connect} from 'ducts';
import {Block, InlineBlock} from 'stylistic-elements';
import {BuyButton} from '../ui/buy';
import {TextLink, Link} from '../ui/core';
import {CondensedText, SmallCaps} from '../ui/type';
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
          height={45}
          {...props}>
          <TextLink
            href={back ? '/' : '/about'}
            position="absolute"
            left={0}
            lineHeight={12}
            display={hovered ? 'none' : null}>
            <CondensedText
              fontSize={18}
              paddingLeft={16}
              paddingRight={16}
              paddingTop={17}
              paddingBottom={16}>
              {back ? 'Back' : 'About'}
            </CondensedText>
          </TextLink>
          {get('sold') < 1000 && <BuyButton
            borderWidth={0}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            hovered={this.state.hovered}
            marginLeft={get('browser.mobile') ? 0 : (get('browser.width') > 900 ? 200 : 0)}
            paddingLeft={16}
            paddingRight={16}
          />}
          {!get('browser.mobile') && <InlineBlock
            visibility={hovered ? 'hidden' : null}
            paddingTop={7}
            paddingBottom={8}
            whiteSpace="nowrap">
            {get('browser.width') > 900 ? 'All profits go to help elect' : 'Help elect'} {' '}
            <Link target="_blank" href="https://berniesanders.com/">
              <Bernie height={16} />
            </Link>
          </InlineBlock>}
          <SmallCaps>
            <Block
              position="absolute"
              right={0}
              display={hovered ? 'none' : 'inline-block'}>
              {!get('browser.mobile') && 'SHARE:'}
              <SocialButtons
                url="https://thecapturedproject.com/"
                paddingRight={16}
                paddingLeft={16}
                paddingTop={9}
                paddingBottom={12}
                verticalAlign={2}
              />
            </Block>
          </SmallCaps>
        </Block>
      </Animate>
    );
  }
}
