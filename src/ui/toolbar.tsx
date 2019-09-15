import {CondensedText, SmallCaps} from '../ui/type';

import {Animate} from '../react-rebound';
import {Block} from '../stylistic-elements';
import {BuyButton} from '../ui/buy';
import React from 'react';
import {SocialButtons} from '../ui/social';
import {TextLink} from '../ui/core';
import {connect} from '../ducts';

class ToolbarClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hovered: false};
  }

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
      <Animate
        scaleX={hovered ? 1.05 : 1}
        scaleY={hovered ? 1.05 : 1}
        translateY={get('browser.known') ? 0 : 46}
      >
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
          translateY={46}
          transformOrigin="50% 100%"
          height={45}
          {...props}
        >
          <TextLink
            href={back ? '/' : '/about'}
            position="absolute"
            left={0}
            lineHeight={12}
            display={hovered ? 'none' : null}
          >
            <CondensedText
              fontSize={18}
              paddingLeft={16}
              paddingRight={16}
              paddingTop={17}
              paddingBottom={16}
            >
              {back ? 'Back' : 'About'}
            </CondensedText>
          </TextLink>
          <BuyButton
            borderWidth={0}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            hovered={this.state.hovered}
            marginLeft={16}
            paddingLeft={16}
            paddingRight={16}
          />
          <SmallCaps>
            <Block
              position="absolute"
              right={0}
              display={hovered ? 'none' : 'inline-block'}
            >
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

export const Toolbar = connect(ToolbarClass);
